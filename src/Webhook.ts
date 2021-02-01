import { AllowedMentions, Embed, Nullable, User } from './';
import { Channel } from './Channel';
import { Guild } from './Guild';

/**
 * Represents a low-effort way to post messages to channels
 *
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure Webhook}
 */
export interface Webhook {
	/**
	 * The ID of the webhook
	 */
	id: string;

	/**
	 * The {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types type} of the webhook
	 */
	type: WebhookType;

	/**
	 * The guild ID this webhook is for
	 */
	guild_id?: string;

	/**
	 * The channel ID this webhook is for
	 */
	channel_id: string;

	/**
	 * The user this webhook was created by (not returned when getting a webhook with its token)
	 */
	user?: User;

	/**
	 * The default name of the webhook
	 */
	name: Nullable<string>;

	/**
	 * The default avatar of the webhook
	 */
	avatar: Nullable<string>;

	/**
	 * The secure token of the webhook (returned for Incoming Webhooks)
	 */
	token?: string;

	/**
	 * The bot/OAuth2 application that created this webhook
	 */
	application_id: Nullable<string>;

	/**
	 * The guild of the channel that this webhook is following (returned for Channel Follower Webhooks)
	 */
	source_guild?: Pick<Guild, 'id' | 'name' | 'icon'>;

	/**
	 * The channel that this webhook is following (returned for Channel Follower Webhooks)
	 */
	source_channel?: Pick<Channel, 'id' | 'name'>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types Webhook}
 */
export enum WebhookType {
	/**
	 * Incoming Webhooks can post messages to channels with a generated token
	 */
	Incoming = 1,

	/**
	 * Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels
	 */
	ChannelFollower
}

// - ENDPOINTS

/**
 * Create a new webhook
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/webhook#create-webhook) `/channels/{channel.id}/webhooks`
 *
 * @returns A {@link https://discord.com/developers/docs/resources/webhook#webhook-object webhook} object on success
 */
export interface CreateWebhook {
	/**
	 * Name of the webhook (1-80 characters)
	 */
	name: string;

	/**
	 * Image for the default webhook avatar
	 */
	avatar: Nullable<string>;
}

/**
 * Modify a webhook
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/webhook#modify-webhook) `/webhooks/{webhook.id}`
 *
 * @returns The {@link https://discord.com/developers/docs/resources/webhook#webhook-object webhook} object on success
 */
export interface ModifyWebhook {
	/**
	 * The default name of the webhook
	 */
	name?: string;

	/**
	 * Image for the default webhook avatar
	 */
	avatar?: Nullable<string>;

	/**
	 * The new channel id this webhook should be moved to
	 */
	channel_id?: Nullable<string>;
}

/**
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token) `/webhooks/{webhook.id}/{webhook.token}`
 */
export type ModifyWebhookWithToken = Omit<ModifyWebhook, 'channel_id'>;

/**
 * @endpoint [POST](https://discord.com/developers/docs/resources/webhook#execute-webhook) `/webhooks/{webhook.id}/{webhook.token}`
 */
export interface ExecuteWebhook {
	/**
	 * Waits for server confirmation of message send before response, and returns the created message body
	 * (defaults to `false`; when `false` a message that is not saved does not return an error)
	 */
	wait?: boolean;

	/**
	 * The message contents (up to 2000 characters)
	 */
	content?: string;

	/**
	 * Override the default username of the webhook
	 */
	username?: string;

	/**
	 * Override the default avatar of the webhook
	 */
	avatar_url?: string;

	/**
	 * True if this is a TTS message
	 */
	tts?: boolean;

	/**
	 * The contents of the file being sent
	 */
	file?: unknown;

	/**
	 * Embedded `rich` content
	 */
	embeds?: Embed[];
	payload_json?: string;

	/**
	 * Allowed mentions for the message
	 */
	allowed_mentions?: AllowedMentions;
	flags?: number;
}

/**
 * @endpoint [POST](https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook) `/webhooks/{webhook.id}/{webhook.token}/slack`
 */
export type ExecuteSlackWebhook = Pick<ExecuteWebhook, 'wait'>;

/**
 * @endpoint [POST](https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook) `/webhooks/{webhook.id}/{webhook.token}/github`
 */
export type ExecuteGitHubWebhook = Pick<ExecuteWebhook, 'wait'>;

/**
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/webhook#edit-webhook-message) `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
 *
 * @returns A {@link https://discord.com/developers/docs/resources/channel#message-object message} object on success
 */
export interface EditWebhookMessage {
	/**
	 * The message contents (up to 2000 characters)
	 */
	content?: Nullable<string>;

	/**
	 * Embedded `rich` content
	 */
	embeds?: Nullable<Embed[]>;

	/**
	 * Allowed mentions for the message
	 */
	allowed_mentions?: Nullable<AllowedMentions>;
}
