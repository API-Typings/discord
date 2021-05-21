import type { Nullable, Tuple } from 'extended-utility-types';
import type { AllowedMentions, Attachment, Channel, Guild, Message, PartialEmbed, Snowflake, User } from '../';

/**
 * Represents a low-effort way to post messages to channels. They do not require a bot user or
 * authentication to use.
 *
 * @source {@link https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure|Webhook}
 */
export interface Webhook {
	/**
	 * The ID of the webhook.
	 */
	id: Snowflake;

	/**
	 * The type of the webhook.
	 */
	type: WebhookType;

	/**
	 * The guild ID this webhook is for, if any.
	 */
	guild_id?: Snowflake;

	/**
	 * The channel ID this webhook is for, if any.
	 */
	channel_id: Snowflake;

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
	source_channel?: Pick<Channel, 'id' | 'name'>;

	/**
	 * The URL used for executing the webhook (returned by the Webhooks OAuth2 flow).
	 */
	url?: `https://discord.com/api/webhooks/${Snowflake}/${string}`;
}

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

// SECTION Endpoints

/**
 * Create a new webhook. Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @remarks
 * Webhook names follow the naming restrictions that can be found in the Usernames and Nicknames
 * documentation, with the following additional stipulations:
 * - Webhook names cannot be: `clyde`.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/webhook#create-webhook) `/channels/{channel.id}/webhooks`
 */
export interface CreateWebhook {
	body: {
		/**
		 * Name of the webhook (`1-80` characters).
		 */
		name: string;

		/**
		 * Image for the default webhook avatar.
		 */
		avatar?: Nullable<string>;
	};

	response: Webhook;
}

/**
 * Returns a list of channel webhook objects. Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-channel-webhooks) `/channels/{channel.id}/webhooks`
 */
export type GetChannelWebhooks = { response: Webhook[] };

/**
 * Returns a list of guild webhook objects. Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-guild-webhooks) `/guilds/{guild.id}/webhooks`
 */
export type GetGuildWebhooks = { response: Webhook[] };

/**
 * Returns the new webhook object for the given ID.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-webhook) `/webhooks/{webhook.id}`
 */
export type GetWebhook = { response: Webhook };

/**
 * Returns the new webhook object for the given ID, except this call does not require authentication
 * and returns no user in the webhook object.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-webhook-with-token) `/webhooks/{webhook.id}/{webhook.token}`
 */
export type GetWebookWithToken = { response: Omit<Webhook, 'user'> };

/**
 * Modify a webhook. Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/webhook#modify-webhook) `/webhooks/{webhook.id}`
 */
export interface ModifyWebhook {
	body: {
		/**
		 * The default name of the webhook.
		 */
		name?: string;

		/**
		 * Image for the default webhook avatar.
		 */
		avatar?: Nullable<string>;

		/**
		 * The new channel ID this webhook should be moved to.
		 */
		channel_id?: Nullable<Snowflake>;
	};

	/**
	 * The updated webhook object.
	 */
	response: Webhook;
}

/**
 * Modifies a webhook, except this call does not require authentication, does not accept a
 * `channel_id` parameter in the body, and does not return a user in the webhook object.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/webhook#modify-webhook-with-token) `/webhooks/{webhook.id}/{webhook.token}`
 */
export interface ModifyWebhookWithToken {
	body: Omit<ModifyWebhook['body'], 'channel_id'>;
	response: GetWebookWithToken['response'];
}

/**
 * Delete a webhook permanently. Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/webhook#delete-webhook) `/webhooks/{webhook.id}`
 */
export type DeleteWebhook = { response: never };

/**
 * Delete a webhook permanently, except this call does not require authentication.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token) `/webhooks/{webhook.id}/{webhook.token}`
 */
export type DeleteWebhookWithToken = { response: never };

/**
 * @remarks
 * - For a `file` attachment, the `Content-Disposition` subpart header MUST contain a `filename`
 * parameter.
 * - When uploading files, the `multipart/form-data` content type must be used. Note that in
 * multipart form data, the `embed` and `allowed_mentions` fields cannot be used.
 * - If `payload_json` is supplied, all fields except for `file` fields will be ignored in the form
 * data.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/webhook#execute-webhook) `/webhooks/{webhook.id}/{webhook.token}`
 */
export interface ExecuteWebhook {
	query: {
		/**
		 * Waits for server confirmation of message send before response, and returns the created
		 * message body (when `false`, a message that is not saved does not return an error).
		 *
		 * @defaultValue `false`
		 */
		wait?: boolean;

		/**
		 * Send a message to the specified thread within a webhook's channel. The thread will
		 * automatically be unarchived.
		 */
		thread_id?: Snowflake;
	};

	body: {
		/**
		 * Override the default username of the webhook.
		 */
		username?: string;

		/**
		 * Override the default avatar of the webhook.
		 */
		avatar_url?: string;

		/**
		 * `true` if this is a TTS message.
		 *
		 * @defaultValue `false`
		 */
		tts?: boolean;

		/**
		 * JSON encoded body of non-file params (`multipart/form-data` only).
		 */
		payload_json?: Nullable<string>;

		/**
		 * Allowed mentions for the message.
		 */
		allowed_mentions?: AllowedMentions;
	} & (
		| {
				/**
				 * The message contents (up to `2000` characters).
				 */
				content: string;
		  }
		| {
				/**
				 * The contents of the file being sent.
				 */
				file: unknown;
		  }
		| {
				/**
				 * Embedded `rich` content.
				 */
				embeds: [PartialEmbed, ...Partial<Tuple<PartialEmbed, 9>>];
		  }
	);

	response: Message;
}

/**
 * Returns a previously-sent webhook message from the same token.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-webhook-message) `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
 */
export type GetWebhookMessage = { response: Message };

/**
 * Edits a previously-sent webhook message from the same token.
 *
 * @remarks
 * - When the `content` field is edited, the `mentions` array in the message object will be
 * reconstructed from scratch based on the new content. The `allowed_mentions` field of the edit
 * request controls how this happens. If there is no explicit `allowed_mentions` in the edit
 * request, the content will be parsed with *default* allowances, that is, without regard to whether
 * or not an `allowed_mentions` was present in the request that originally created the message.
 * - For a `file` attachment, the `Content-Disposition` subpart header MUST contain a `filename`
 * parameter.
 * - When uploading files, the `multipart/form-data` content type must be used. Note that in
 * multipart form data, the `embed` and `allowed_mentions` fields cannot be used.
 * - If `payload_json` is supplied, all fields except for `file` fields will be ignored in the form
 * data.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/webhook#edit-webhook-message) `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
 */
export interface EditWebhookMessage {
	body: {
		/**
		 * The message contents (up to `2000` characters).
		 */
		content?: Nullable<string>;

		/**
		 * Embedded `rich` content.
		 */
		embeds?: Nullable<[PartialEmbed, ...Partial<Tuple<PartialEmbed, 9>>]>;

		/**
		 * The contents of the file being sent/edited.
		 */
		file?: Nullable<unknown>;

		/**
		 * JSON encoded body of non-file params (`multipart/form-data` only).
		 */
		payload_json?: Nullable<string>;

		/**
		 * Allowed mentions for the message.
		 */
		allowed_mentions?: Nullable<AllowedMentions>;

		/**
		 * Attached files to keep.
		 */
		attachments?: Nullable<Attachment[]>;
	};

	response: Message;
}

/**
 * Deletes a message that was created by the webhook.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/webhook#delete-webhook-message) `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
 */
export type DeleteWebhookMessage = { response: never };

// !SECTION
