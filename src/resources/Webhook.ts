import type { Nullable } from 'extended-utility-types';
import type { Guild, Snowflake } from '../';
import type { BaseChannel, BaseWebhook, WithType } from '../__internal__';

/**
 * Represents a low-effort way to post messages to channels. They do not require a bot user or
 * authentication to use.
 *
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure|Webhook}
 */
export type Webhook = IncomingWebhook | ChannelFollowerWebhook | ApplicationWebhook;

/**
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-example-incoming-webhook|Webhook}
 */
export interface IncomingWebhook extends BaseWebhook, WithType<WebhookType.Incoming> {
	/**
	 * The guild ID this webhook is for.
	 */
	guild_id: Snowflake;

	/**
	 * The channel ID this webhook is for.
	 */
	channel_id: Snowflake;

	/**
	 * The secure token of the webhook.
	 */
	token: string;

	/**
	 * The bot/OAuth2 application that created this webhook.
	 */
	application_id: Nullable<Snowflake>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-example-channel-follower-webhook|Webhook}
 */
export interface ChannelFollowerWebhook
	extends BaseWebhook,
		WithType<WebhookType.ChannelFollower>,
		Omit<IncomingWebhook, 'type' | 'token'> {
	/**
	 * The guild of the channel that this webhook is following.
	 */
	source_guild: Pick<Guild, 'id' | 'name' | 'icon'>;

	/**
	 * The channel that this webhook is following.
	 */
	source_channel: Pick<BaseChannel, 'id' | 'name'>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-example-application-webhook|Webhook}
 */
export interface ApplicationWebhook extends Omit<BaseWebhook, 'user'>, WithType<WebhookType.Application> {
	guild_id?: null;
	channel_id: null;

	/**
	 * The bot/OAuth2 application that created this webhook.
	 */
	application_id: Snowflake;
}

export type WebhookURL = `https://discord.com/api/webhooks/${Snowflake}/${string}`;

/**
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types|Webhook}
 */
export enum WebhookType {
	/**
	 * Incoming Webhooks can post messages to channels with a generated token.
	 */
	Incoming = 1,

	/**
	 * Channel Follower Webhooks are internal webhooks used with Channel Following to post new
	 * messages into channels.
	 */
	ChannelFollower,

	/**
	 * Application webhooks are webhooks used with Interactions.
	 */
	Application
}
