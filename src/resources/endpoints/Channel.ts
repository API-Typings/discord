import type { Nullable, Range, Tuple } from 'extended-utility-types';
import type {
	ActionRow,
	AllowedMentions,
	Attachment,
	AutoArchiveDuration,
	Channel,
	ChannelType,
	FollowedChannel,
	Invite,
	InviteMetadata,
	InviteTargetType,
	Message,
	MessageReference,
	Overwrite,
	PartialEmbed,
	Snowflake,
	ThreadChannel,
	ThreadMember,
	ThreadMetadata,
	User,
	VideoQualityMode
} from '../../';
import type { PartialTuple } from '../../__internal__';

/**
 * Get a channel by ID. Returns a channel object. If the channel is a thread, a thread member
 * object is included in the returned result.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#get-channel) `/channels/{channel.id}`
 */
export interface GetChannel {
	response: Channel & {
		member?: ThreadMember;
	};
}

/**
 * Update a channel's settings. Returns a channel on success, and a `400 Bad Request` on invalid
 * parameters. Fires a Channel Update Gateway event.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/channel#modify-channel) `/channels/{channel.id}`
 */
export interface ModifyGroupDMChannel {
	body: {
		/**
		 * `1-100` character channel name.
		 */
		name?: string;

		/**
		 * Base64 encoded icon.
		 */
		icon?: string;
	};

	response: Channel;
}

/**
 * Update a channel's settings. Returns a channel on success, and a `400 Bad Request` on invalid
 * parameters. Fires a Channel Update Gateway event.
 *
 * Requires the `MANAGE_CHANNELS` permission for the guild.
 *
 * If modifying a category, individual Channel Update events will fire for each child channel that
 * also changes. If modifying permission overwrites, the `MANAGE_ROLES` permission is required. Only
 * permissions a bot has in the guild or channel can be allowed/denied (unless the bot has a
 * `MANAGE_ROLES` overwrite in the channel).
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/channel#modify-channel) `/channels/{channel.id}`
 */
export interface ModifyGuildChannel {
	body: {
		/**
		 * `1-100` character channel name. Applies to all channel types.
		 */
		name?: string;

		/**
		 * The type of Channel; only conversion between text and news is supported and only in
		 * guilds with the `NEWS` feature. Applies to text and news channels.
		 */
		type?: ChannelType;

		/**
		 * The position of the channel in the left-hand listing. Applies to all channel types.
		 */
		position?: Nullable<number>;

		/**
		 * `0-1024` character channel topic. Applies to text and news channels.
		 */
		topic?: Nullable<string>;

		/**
		 * Whether the channel is NSFW. Applies to text, news, and store channels.
		 */
		nsfw?: Nullable<boolean>;

		/**
		 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as
		 * well as users with the permission `MANAGE_MESSAGES` or `MANAGE_CHANNEL`, are unaffected.
		 * Applies to text channels.
		 */
		rate_limit_per_user?: Nullable<number>;

		/**
		 * The bitrate (in bits) of the voice channel; `8000` to `96000` (`128000` for VIP servers).
		 * Applies to voice channels.
		 */
		bitrate?: Nullable<number>;

		/**
		 * The user limit of the voice channel; `0` refers to no limit, `1` to `99` refers to a user
		 * limit. Applies to voice channels.
		 */
		user_limit?: Nullable<Range<0, 99>>;

		/**
		 * Channel or category-specific permissions. Applies to all channel types.
		 */
		permission_overwrites?: Nullable<Overwrite[]>;

		/**
		 * ID of the new parent category for a channel. Applies to text, news, store, and voice
		 * channels.
		 */
		parent_id?: Nullable<Snowflake>;

		/**
		 * Channel voice region ID, automatic when set to `null`. Applies to voice channels.
		 */
		rtc_region?: Nullable<string>;

		/**
		 * The camera video quality mode of the voice channel. Applies to voice channels.
		 */
		video_quality_mode?: Nullable<VideoQualityMode>;

		/**
		 * The default duration for newly created threads in the channel, in minutes, to
		 * automatically archive the thread after recent activity. Applies to text and news
		 * channels.
		 */
		default_auto_archive_duration?: AutoArchiveDuration;
	};

	response: Channel;
}

/**
 * Update a channel's settings. Returns a channel on success, and a `400 Bad Request` on invalid
 * parameters. Fires a Thread Update Gateway event.
 *
 * When setting `archived` to `false`, when `locked` is also `false`, only the `SEND_MESSAGES`
 * permission is required.
 *
 * Otherwise, requires the `MANAGE_THREADS` permission. Requires the thread to have `archived` set
 * to `false` or be set to `false` in the request.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/channel#modify-channel) `/channels/{channel.id}`
 */
export interface ModifyThreadChannel {
	body: Partial<Pick<ThreadMetadata, 'archived' | 'auto_archive_duration' | 'locked'>> &
		Pick<ModifyGuildChannel['body'], 'rate_limit_per_user' | 'name'>;

	response: Channel;
}

/**
 * Delete a channel. Returns a channel object on success. Fires a Channel Delete Gateway event
 * (or Thead Delete if the channel was a thread).
 *
 * Requires the `MANAGE_CHANNELS` permission, or `MANAGE_THREADS` if the channel is a thread.
 *
 * Deleting a category does not delete its child channels; they will have their `parent_id` removed
 * and a Channel Update Gateway event will fire for each of them.
 *
 * @remarks
 * - Deleting a guild channel cannot be undone. Use this with caution, as it is impossible to undo
 * this action.
 * - For Community guilds, the Rules or Guidelines channel and the Community Updates channel cannot
 * be deleted.
 * - This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#deleteclose-channel) `/channels/{channel.id}`
 */
export interface DeleteChannel {
	response: Channel;
}

/**
 * Close a private message. Returns a channel object on success. Fires a Channel Delete Gateway
 * event.
 *
 * @remarks
 * It is possible to undo this action by opening a private message with the recipient again.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#deleteclose-channel) `/channels/{channel.id}`
 */
export interface CloseChannel {
	response: Channel;
}

/**
 * Returns the messages for a channel. Returns an array of message objects on success.
 *
 * If operating on a guild channel, this endpoint requires the `VIEW_CHANNEL` permission to be
 * present on the current user. If the current user is missing the `READ_MESSAGE_HISTORY` permission
 * in the channel, then this will return no messages (since they cannot read the message history).
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#get-channel-messages) `/channels/{channel.id}/messages`
 */
export interface GetChannelMessages {
	/**
	 * @remarks
	 * The before, after, and around keys are mutually exclusive, only one may be passed at a time.
	 */
	query: {
		/**
		 * Max number of messages to return (1-100).
		 *
		 * @defaultValue `50`
		 */
		limit?: Range<1, 100>;
	} & (
		| {
				/**
				 * Get messages around this message ID.
				 */
				around?: Snowflake;
		  }
		| {
				/**
				 * Get messages before this message ID.
				 */
				before?: Snowflake;
		  }
		| {
				/**
				 * Get messages after this message ID.
				 */
				after?: Snowflake;
		  }
	);

	response: Message[];
}

/**
 * Returns a specific message in the channel. Returns a message object on success.
 *
 * If operating on a guild channel, this endpoint requires the `READ_MESSAGE_HISTORY` permission to
 * be present on the current user.
 */
export interface GetChannelMessage {
	response: Message;
}

/**
 * Post a message to a guild text or DM channel. Returns a message object. Fires a Message Create
 * Gateway event.
 *
 * @remarks
 * - When operating on a guild channel, the current user must have the `SEND_MESSAGES` permission.
 * - When sending a message with `tts` set to `true`, the current user must have the
 * `SEND_TTS_MESSAGES` permission.
 * - When creating a message as a reply to another message, the current user must have the
 * `READ_MESSAGE_HISTORY` permission.
 * - For a `file` attachment, the `Content-Disposition` subpart header MUST contain a `filename`
 * parameter.
 * - When uploading files, the `multipart/form-data` content type must be used. Note that in
 * multipart form data, the `embeds` and `allowed_mentions` fields cannot be used.
 * - If `payload_json` is supplied, all fields except for `file` fields will be ignored in the form
 * data.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#create-message) `/channels/{channel.id}/messages`
 */
export interface CreateMessage {
	body: {
		/**
		 * `true` if this is a TTS message.
		 *
		 * @defaultValue `false`
		 */
		tts?: boolean;

		/**
		 * JSON encoded body of non-file params (`multipart/form-data` only).
		 */
		payload_json?: string;

		/**
		 * Allowed mentions for a message.
		 */
		allowed_mentions?: AllowedMentions;

		/**
		 * Include to make the message a reply.
		 */
		message_reference?: MessageReference;

		/**
		 * The components to include with the message.
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
		| {
				/**
				 * IDs of up to 3 stickers in the server to send in the message.
				 */
				sticker_ids: PartialTuple<Snowflake, 2>;
		  }
	);

	response: Message;
}

/**
 * Crosspost a message in a News Channel to following channels. Returns a message object.
 *
 * This endpoint requires the `SEND_MESSAGES` permission, if the current user sent the message, or
 * additionally the `MANAGE_MESSAGES` permission, for all other messages, to be present for the
 * current user.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#crosspost-message) `/channels/{channel.id}/messages/{message.id}/crosspost`
 */
export interface CrosspostMessage {
	response: Message;
}

/**
 * Create a reaction for the message. Returns a `204` empty response on success.
 *
 * This endpoint requires the `READ_MESSAGE_HISTORY` permission to be present on the current user.
 * Additionally, if nobody else has reacted to the message using this emoji, this endpoint requires
 * the `ADD_REACTIONS` permission to be present on the current user.
 *
 * The `emoji` must be URL Encoded or the request will fail with `10014: Unknown Emoji`. To use a
 * custom emoji, it must be encoded in the format `name:id` with the emoji name and emoji ID.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#create-reaction) `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
 */
export interface CreateReaction {
	response: never;
}

/**
 * Delete a reaction the current user has made for the message. Returns a `204` empty response on
 * success.
 *
 * The `emoji` must be URL Encoded or the request will fail with `10014: Unknown Emoji`. To use a
 * custom emoji, it must be encoded in the format `name:id` with the emoji name and emoji ID.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-own-reaction) `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
 */
export interface DeleteOwnReaction {
	response: never;
}

/**
 * Deletes another user's reaction. Returns a `204` empty response on success.
 *
 * This endpoint requires the `MANAGE_MESSAGES` permission to be present on the current user.
 *
 * The `emoji` must be URL Encoded or the request will fail with `10014: Unknown Emoji`. To use a
 * custom emoji, it must be encoded in the format `name:id` with the emoji name and emoji ID.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-user-reaction) `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}`
 */
export interface DeleteUserReaction {
	response: never;
}

/**
 * Get a list of users that reacted with this emoji. Returns an array of user objects on success.
 *
 * The `emoji` must be URL Encoded or the request will fail with `10014: Unknown Emoji`. To use a
 * custom emoji, it must be encoded in the format `name:id` with the emoji name and emoji ID.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#get-reactions) `/channels/{channel.id}/messages/{message.id}/reactions/{emoji.id}`
 */
export interface GetReactions {
	query: {
		/**
		 * Get users after this user ID.
		 */
		after?: Snowflake;

		/**
		 * Max number of users to return.
		 *
		 * @defaultValue `25`
		 */
		limit?: Range<1, 100>;
	};

	response: User[];
}

/**
 * Deletes all reactions on a message. Fires a Message Reaction Remove All Gateway event.
 *
 * This endpoint requires the `MANAGE_MESSAGES` permission to be present on the current user.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-all-reactions) `/channels/{channel.id}/messages/{message.id}/reactions`
 */
export interface DeleteAllReactions {
	response: never;
}

/**
 * Deletes all the reactions for a given emoji on a message. Fires a Message Reaction Remove Emoji
 * Gateway event.
 *
 * This endpoint requires the `MANAGE_MESSAGES` permission to be present on the current user.
 *
 * The `emoji` must be URL Encoded or the request will fail with `10014: Unknown Emoji`. To use a
 * custom emoji, it must be encoded in the format `name:id` with the emoji name and emoji ID.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji) `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
 */
export interface DeleteAllEmojiReactions {
	response: never;
}

/**
 * Edit a previously sent message. Returns a message object. Fires a Message Update Gateway event.
 *
 * The fields `content`, `embeds`, `allowed_mentions` and `flags` can be edited by the original
 * message author. Other users can only edit `flags` and only if they have the `MANAGE_MESSAGES`
 * permission in the corresponding channel. When specifying flags, ensure to include all
 * previously set flags/bits in addition to the ones being modified.
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
 * multipart form data, the `embeds` and `allowed_mentions` fields cannot be used.
 * - If `payload_json` is supplied, all fields except for `file` fields will be ignored in the form
 * data.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/channel#edit-message) `/channels/{channel.id}/messages/{message.id}`
 */
export interface EditMessage {
	body: {
		/**
		 * The new message contents (up to `2000` characters),
		 */
		content?: Nullable<string>;

		/**
		 * Embedded `rich` content,
		 */
		embeds?: Nullable<PartialTuple<PartialEmbed, 9>>;

		/**
		 * Edit the flags of a message (only `SUPPRESS_EMBEDS` can currently be set/unset).
		 */
		flags?: Nullable<number>;

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
		 */
		components?: Nullable<PartialTuple<ActionRow, 4>>;
	};

	response: Message;
}

/**
 * Delete a message. Returns a `204` empty response on success. Fires a Message Delete Gateway
 * event.
 *
 * If operating on a guild channel and trying to delete a message that was not sent by the current
 * user, this endpoint requires the `MANAGE_MESSAGES` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 */
export interface DeleteMessage {
	response: never;
}

/**
 * Delete multiple messages in a single request. Returns a `204` empty response on success. Fires
 * a Message Delete Bulk Gateway event.
 *
 * This endpoint can only be used on guild channels and requires the `MANAGE_MESSAGES` permission.
 *
 * Any message IDs given that do not exist or are invalid will count towards the minimum and
 * maximum message count (currently `2` and `100` respectively).
 *
 * @remarks
 * - This endpoint will not delete messages older than 2 weeks, and will fail with a
 * `400 Bad Request` if any message provided is older than that or if any duplicate message IDs are
 * provided.
 * - This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#bulk-delete-messages) `/channels/{channel.id}/messages/bulk-delete`
 */
export interface BulkDeleteMessages {
	body: {
		/**
		 * An array of message IDs to delete (`2-100`).
		 */
		messages: PartialTuple<Snowflake, 98, 2>;
	};

	response: never;
}

/**
 * Edit the channel permission overwrites for a user or role in a channel. Returns a `204` empty
 * response on success.
 *
 * Only usable for guild channels. Requires the `MANAGE_ROLES` permission. Only permissions a bot
 * has in the guild or channel can be allowed/denied (unless the bot has a `MANAGE_ROLES` overwrite
 * in the channel).
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#edit-channel-permissions) `/channels/{channel.id}/permissions/{overwrite.id}`
 */
export interface EditChannelPermissions {
	body: {
		/**
		 * The bitwise value of all allowed permissions.
		 */
		allow?: string;

		/**
		 * The bitwise value of all disallowed permissions.
		 */
		deny?: string;

		/**
		 * `0` for a role or `1` for a member.
		 */
		type?: 0 | 1;
	};

	response: never;
}

/**
 * Returns a list of invite objects (with invite metadata) for the channel.
 *
 * Only usable for guild channels. Requires the `MANAGE_CHANNELS` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#get-channel-invites) `/channels/{channel.id}/invites`
 */
export interface GetChannelInvites {
	response: InviteMetadata[];
}

/**
 * Create a new invite object for the channel. Returns an invite object. Fires an Invite Create
 * Gateway event.
 *
 * Only usable for guild channels. Requires the `CREATE_INSTANT_INVITE` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#create-channel-invite) `/channels/{channel.id}/invites`
 */
export interface CreateChannelInvite {
	body:
		| {
				/**
				 * Duration of invite in seconds before expiry, or `0` for never. Between `0` and
				 * `604800` (7 days).
				 *
				 * @defaultValue `86400` (24 hours)
				 */
				max_age?: number;

				/**
				 * Max number of uses or `0` for unlimited.
				 *
				 * @defaultValue `0`
				 */
				max_uses?: Range<0, 100>;

				/**
				 * Whether this invite only grants temporary membership.
				 *
				 * @defaultValue `false`
				 */
				temporary?: boolean;

				/**
				 * If `true`, don't try to reuse a similar invite (useful for creating many unique
				 * one time use invites).
				 *
				 * @defaultValue `false`
				 */
				unique?: boolean;

				/**
				 * The type of target for this voice channel invite.
				 */
				target_type?: InviteTargetType;

				/**
				 * The ID of the user whose stream to display for this invite, required if
				 * `target_type` is 1, the user must be streaming in the channel.
				 */
				target_user_id?: Snowflake;

				/**
				 * The ID of the embedded application to open for this invite, required if
				 * `target_type` is 2, the application must have the `EMBEDDED` flag.
				 */
				target_application_id?: Snowflake;
		  }
		| Record<string, never>;

	response: Invite;
}

/**
 * Delete a channel permission overwrite for a user or role in a channel. Returns a `204` empty
 * response on success.
 *
 * Only usable for guild channels. Requires the `MANAGE_ROLES` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-channel-permission) `/channels/{channel.id}/permissions/{overwrite.id}`
 */
export interface DeleteChannelPermission {
	response: never;
}

/**
 * Follow a News Channel to send messages to a target channel. Returns a followed channel object.
 *
 * Requires the `MANAGE_WEBHOOKS` permission in the target channel.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#follow-news-channel) `/channels/{channel.id}/followers`
 */
export interface FollowNewsChannel {
	body: {
		/**
		 * ID of target channel.
		 */
		webhook_channel_id: Snowflake;
	};

	response: FollowedChannel;
}

/**
 * Post a typing indicator for the specified channel. Returns a `204` empty response on success.
 * Fires a Typing Start Gateway event.
 *
 * Generally bots should **not** implement this route. However, if a bot is responding to a command
 * and expects the computation to take a few seconds, this endpoint may be called to let the user
 * know that the bot is processing their message.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#trigger-typing-indicator) `/channels/{channel.id}/typing`
 */
export interface TriggerTypingIndicator {
	response: never;
}

/**
 * Returns all pinned messages in the channel as an array of message objects.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#get-pinned-messages) `/channels/{channel.id}/pins`
 */
export interface GetPinnedMessages {
	response: Partial<Tuple<Message, 50>>;
}

/**
 * Pin a message in a channel. Returns a `204` empty response on success.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * @remarks
 * - The max pinned messages is `50`.
 * - This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#add-pinned-channel-message) `/channels/{channel.id}/pins/{message.id}`
 */
export interface PinMessage {
	response: never;
}

/**
 * Unpin a message in a channel. Returns a `204` empty response on success.
 *
 * Requires the `MANAGE_MESSAGES` permission.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-pinned-channel-message) `/channels/{channel.id}/pins/{message.id}`
 */
export interface UnpinMessage {
	response: never;
}

/**
 * Adds a recipient to a Group DM using their access token.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient) `/channels/{channel.id}/recipients/{user.id}`
 */
export interface GroupDMAddRecipient {
	body: {
		/**
		 * Access token of a user that has granted an app the `gdm.join` scope.
		 */
		access_token: string;

		/**
		 * Nickname of the user being added.
		 */
		nick?: string;
	};

	response: never;
}

/**
 * Removes a recipient from a Group DM.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#group-dm-delete-recipient) `/channels/{channel.id}/recipients/{user.id}`
 */
export interface GroupDMRemoveRecipient {
	response: never;
}

/**
 * Creates a new public thread from an existing message. Returns a channel on success, and a
 * `400 Bad Request` on invalid parameters. Fires a Thread Create Gateway event.
 *
 * When called on a `GUILD_TEXT` channel, creates a `GUILD_PUBLIC_THREAD`. When called on a
 * `GUILD_NEWS` channel, creates a `GUILD_NEWS_THREAD`. The ID of the created thread will be the
 * same as the ID of the message, and as such a message can only have a single thread created from
 * it.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#start-thread-with-message) `/channels/{channel.id}/messages/{message.id}/threads`
 */
export interface StartThreadWithMessage {
	body: Required<Pick<ModifyThreadChannel['body'], 'name' | 'auto_archive_duration'>>;
	response: ThreadChannel;
}

/**
 * Creates a new thread that is not connected to an existing message. Returns a channel on success,
 * and a `400 Bad Request` on invalid parameters. Fires a Thread Create Gateway event
 *
 * The created thread defaults to a `GUILD_PRIVATE_THREAD`. Creating a private thread required the
 * server to be boosted. The guild features will indicate if that is possible for the guild.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#start-thread-without-message) `/channels/{channel.id}/threads`
 */
export interface StartThreadWithoutMessage {
	body: StartThreadWithMessage['body'] & {
		/**
		 * The type of thread to create.
		 */
		type?: ThreadChannel['type'];
	};

	response: ThreadChannel;
}

/**
 * Adds the current user to a thread. Returns a `204` empty response on success. Fires a Thread
 * Members Update Gateway event.
 *
 * Requires the thread is not archived.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#join-thread) `/channels/{channel.id}/thread-members/@me`
 */
export interface JoinThread {
	response: never;
}

/**
 * Adds another member to a thread. Returns a `204` empty response on success. Fires a Thread
 * Members Update Gateway event.
 *
 * Requires the ability to send messages in the thread. Also requires the thread is not archived.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#add-thread-member) `/channels/{channel.id}/thread-members/{user.id}`
 */
export interface AddThreadMember {
	response: never;
}

/**
 * Removes the current user from a thread. Returns a `204` empty response on success. Fires a Thread
 * Members Update Gateway event.
 *
 * Requires the thread is not archived.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#leave-thread) `/channels/{channel.id}/thread-members/@me`
 */
export interface LeaveThread {
	response: never;
}

/**
 * Removes another member from a thread. Returns a `204` empty response on success. Fires a Thread
 * Members Update Gateway event.
 *
 * Requires the `MANAGE_MESSAGES` permission, or the creator of the thread if it is a
 * `GUILD_PRIVATE_THREAD`. Also requires the thread is not archived.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#remove-thread-member) `/channels/{channel.id}/thread-members/{user.id}`
 */
export interface RemoveThreadMember {
	response: never;
}

/**
 * Returns an array of thread member objects that are members of the thread.
 *
 * @remarks
 * This endpoint is restricted according to whether the `GUILD_MEMBERS` Privileged Intent is enabled
 * for your application.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#list-thread-members) `/channels/{channel.id}/thread-members`
 */
export interface ListThreadMembers {
	response: ThreadMember[];
}

/**
 * Returns all active threads in the channel, including public and private threads.
 *
 * Threads are ordered by their `id`, in descending order.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#list-active-threads) `/channels/{channel.id}/threads/active`
 */
export interface ListActiveThreads {
	response: {
		/**
		 * The threads.
		 */
		threads: ThreadChannel[];

		/**
		 * A thread member object for each returned thread the current user has joined.
		 */
		members: ThreadMember;

		/**
		 * Whether there are potentially additional threads that could be returned on a subsequent
		 * call.
		 */
		has_more: boolean;
	};
}

/**
 * Returns archived threads in the channel that are public.
 *
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * When called on a `GUILD_TEXT` channel, returns threads of type `PUBLIC_THREAD`. When called on a
 * `GUILD_NEWS` channel, returns threads of type `NEWS_THREAD`. Threads are ordered by
 * `archive_timestamp`, in descending order.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#list-public-archived-threads) `/channels/{channel.id}/threads/archived/public`
 */
export interface ListPublicArchivedThreads {
	query: {
		/**
		 * Returns threads before this timestamp.
		 */
		before?: string;

		/**
		 * Optional maximum number of threads to return.
		 */
		limit?: number;
	};

	response: ListActiveThreads['response'];
}

/**
 * Returns archived threads in the channel that are of type `PRIVATE_THREAD`.
 *
 * Requires both the `READ_MESSAGE_HISTORY` and `MANAGE_THREADS` permissions. Threads are ordered
 * by `archive_timestamp`, in descending order.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#list-private-archived-threads) `/channels/{channel.id}/threads/archived/private`
 */
export type ListPrivateArchivedThreads = ListPublicArchivedThreads;

/**
 * Returns archived threads in the channel that are of type `PRIVATE_THREAD`, and the user has
 * joined.
 *
 * Requires the `READ_MESSAGE_HISTORY` permission.
 *
 * Threads are ordered by their `id`, in descending order.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads) `/channels/{channel.id}/users/@me/threads/archived/private`
 */
export type ListJoinedPrivateArchivedThreads = ListPublicArchivedThreads;
