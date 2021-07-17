import type { Nullable } from 'extended-utility-types';
import type { ActionRow, AllowedMentions, Attachment, Message, PartialEmbed, Snowflake, Webhook } from '../../';
import type { PartialTuple } from '../../__internal__';

/**
 * Create a new webhook. Returns a webhook object on success.
 *
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/webhook#create-webhook) `/channels/{channel.id}/webhooks`
 */
export interface CreateWebhook {
	body: {
		/**
		 * Name of the webhook (`1-80` characters). Cannot be `clyde`.
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
 * Returns a list of channel webhook objects.
 *
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-channel-webhooks) `/channels/{channel.id}/webhooks`
 */
export interface GetChannelWebhooks {
	response: Webhook[];
}

/**
 * Returns a list of guild webhook objects.
 *
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-guild-webhooks) `/guilds/{guild.id}/webhooks`
 */
export interface GetGuildWebhooks {
	response: Webhook[];
}

/**
 * Returns the new webhook object for the given ID.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-webhook) `/webhooks/{webhook.id}`
 */
export interface GetWebhook {
	response: Webhook;
}

/**
 * Returns the new webhook object for the given ID, except this call does not require authentication
 * and returns no user in the webhook object.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-webhook-with-token) `/webhooks/{webhook.id}/{webhook.token}`
 */
export interface GetWebookWithToken {
	response: Omit<Webhook, 'user'>;
}

/**
 * Modify a webhook. Returns the updated webhook object on success.
 *
 * Requires the `MANAGE_WEBHOOKS` permission.
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
 * Delete a webhook permanently. Returns a `204 No Content` response on success.
 *
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/webhook#delete-webhook) `/webhooks/{webhook.id}`
 */
export interface DeleteWebhook {
	response: never;
}

/**
 * Delete a webhook permanently, except this call does not require authentication.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/webhook#delete-webhook-with-token) `/webhooks/{webhook.id}/{webhook.token}`
 */
export interface DeleteWebhookWithToken {
	response: never;
}

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

		/**
		 * The components to include with the message.
		 *
		 * @remarks
		 * Requires an application-owned webhook.
		 */
		components?: PartialTuple<ActionRow, 4>;
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
				embeds: PartialTuple<PartialEmbed, 9>;
		  }
	);

	response: Message;
}

/**
 * Returns a previously-sent webhook message from the same token. Returns a message object on
 * success.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/webhook#get-webhook-message) `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
 */
export interface GetWebhookMessage {
	response: Message;
}

/**
 * Edits a previously-sent webhook message from the same token. Returns a message object on success.
 *
 * When the `content` field is edited, the `mentions` array in the message object will be
 * reconstructed from scratch based on the new content. The `allowed_mentions` field of the edit
 * request controls how this happens. If there is no explicit `allowed_mentions` in the edit
 * request, the content will be parsed with *default* allowances, that is, without regard to whether
 * or not an `allowed_mentions` was present in the request that originally created the message.
 *
 * @remarks
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
		embeds?: Nullable<PartialTuple<PartialEmbed, 9>>;

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

		/**
		 * The components to include with the message.
		 *
		 * @remarks
		 * Requires an application-owned webhook.
		 */
		components?: PartialTuple<ActionRow, 4>;
	};

	response: Message;
}

/**
 * Deletes a message that was created by the webhook. Returns a `204 No Content` response on
 * success.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/webhook#delete-webhook-message) `/webhooks/{webhook.id}/{webhook.token}/messages/{message.id}`
 */
export interface DeleteWebhookMessage {
	response: never;
}
