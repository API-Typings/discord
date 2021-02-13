import type { Nullable } from '@api-typings/core';
import type {
	AllowedMentions,
	Channel,
	Embed,
	Guild,
	Snowflake,
	User
} from '../';

/**
 * Represents a low-effort way to post messages to channels. They do not require a bot user or authentication to use.
 *
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure|Webhook}
 */
export interface Webhook {
	/**
	 * The ID of the webhook
	 */
	id: Snowflake;

	/**
	 * The {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types|type} of the webhook
	 */
	type: WebhookType;

	/**
	 * The guild ID this webhook is for
	 */
	guild_id?: Snowflake;

	/**
	 * The channel ID this webhook is for
	 */
	channel_id: Snowflake;

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
	application_id: Nullable<Snowflake>;

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
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types|Webhook}
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

// SECTION Endpoints

/**
 * Create a new webhook. Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @remarks
 * Webhook names follow the naming restrictions that can be found in the [Usernames and Nicknames][1] documentation, with the following additional stipulations:
 * - Webhook names cannot be: `clyde`
 *
 * @endpoint [POST] `/channels/{channel.id}/webhooks`
 *
 * @returns A [webhook][2] object on success.
 *
 * [POST]: https://discord.com/developers/docs/resources/webhook#create-webhook
 * [1]: https://discord.com/developers/docs/resources/user#usernames-and-nicknames
 * [2]: https://discord.com/developers/docs/resources/webhook#webhook-object
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
 * Modify a webhook. Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @endpoint [PATCH] `/webhooks/{webhook.id}`
 *
 * @returns The [webhook][1] object on success.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/webhook#modify-webhook
 * [1]: https://discord.com/developers/docs/resources/webhook#webhook-object
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
	channel_id?: Nullable<Snowflake>;
}

/**
 * @info
 * For the webhook embed objects, you can set every field except `type` (it will be `rich` regardless of if
 * you try to set it), `provider`, `video`, and any `height`, `width`, or `proxy_url` values for images.
 *
 * @warning
 * This endpoint supports both JSON and form data bodies. It does require `multipart/form-data` requests instead of the normal JSON
 * request type when uploading files. Make sure you set your `Content-Type` to `multipart/form-data` if you're doing that. Note that
 * in that case, the `embeds` field cannot be used, but you can pass an url-encoded JSON body as a form value for `payload_json`.
 *
 * @endpoint [POST] `/webhooks/{webhook.id}/{webhook.token}`
 *
 * [POST]: https://discord.com/developers/docs/resources/webhook#execute-webhook
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
 * Edits a previously-sent webhook message from the same token.
 *
 * @endpoint [PATCH] `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
 *
 * @returns A [message] object on success.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/webhook#edit-webhook-message
 * [1]: https://discord.com/developers/docs/resources/channel#message-object
 */
export interface EditWebhookMessage {
	/**
	 * The message contents (up to 2000 characters)
	 */
	content?: Nullable<string>;

	/**
	 * Embedded rich content
	 */
	embeds?: Nullable<Embed[]>;

	/**
	 * Allowed mentions for the message
	 */
	allowed_mentions?: Nullable<AllowedMentions>;
}

// !SECTION
