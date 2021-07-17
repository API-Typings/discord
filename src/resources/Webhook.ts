import type { Nullable } from 'extended-utility-types';
import type { Guild, Snowflake, User } from '../';
import type { BaseChannel, GuildIdentifiable, Identifiable, WithType } from '../__internal__';

/**
 * Represents a low-effort way to post messages to channels. They do not require a bot user or
 * authentication to use.
 *
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure|Webhook}
 */
export interface Webhook extends Identifiable, Partial<GuildIdentifiable>, WithType<WebhookType> {
	/**
	 * The channel ID this webhook is for, if any.
	 */
	channel_id: Nullable<Snowflake>;

	/**
	 * The user this webhook was created by (not returned when getting a webhook with its token).
	 */
	user?: User;

	/**
	 * The default name of the webhook.
	 */
	name: Nullable<string>;

	/**
	 * The default user avatar hash of the webhook.
	 */
	avatar: Nullable<string>;

	/**
	 * The secure token of the webhook (returned for Incoming Webhooks).
	 */
	token?: string;

	/**
	 * The bot/OAuth2 application that created this webhook.
	 */
	application_id: Nullable<Snowflake>;

	/**
	 * The guild of the channel that this webhook is following (returned for Channel Follower
	 * Webhooks).
	 */
	source_guild?: Pick<Guild, 'id' | 'name' | 'icon'>;

	/**
	 * The channel that this webhook is following (returned for Channel Follower Webhooks).
	 */
	source_channel?: Pick<BaseChannel, 'id' | 'name'>;

	/**
	 * The URL used for executing the webhook (returned by the Webhooks OAuth2 flow).
	 */
	url?: WebhookURL;
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
