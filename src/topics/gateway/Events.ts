import type {
	Activity,
	ApplicationCommand,
	Channel,
	ClientStatus,
	Emoji,
	GatewayOPCode,
	GatewayPayload,
	Guild,
	GuildMember,
	Integration,
	Interaction,
	Message,
	Nullable,
	PartialEmoji,
	PartialUser,
	Role,
	Snowflake,
	TargetUser,
	UnavailableGuild,
	User,
	VoiceState
} from '../../';

// ANCHOR Event Payload

interface EventPayload<E extends Event> extends GatewayPayload {
	op: GatewayOPCode.Dispatch;
	t: E;
}

// ANCHOR Heartbeat

/**
 * Sent in response to receiving a heartbeat to acknowledge that it has been received.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#heartbeating Gateway}
 */
export interface HeartbeatAck {
	op: GatewayOPCode.HeartbeatAck;
}

// ANCHOR Event Enum

/**
 * Events are payloads sent over the socket to a client that correspond to events in Discord.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events Gateway}
 */
export enum Event {
	/**
	 * Contains the initial state information
	 */
	Ready = 'READY',

	/**
	 * Respone to {@link https://discord.com/developers/docs/topics/gateway#resume resume}
	 */
	Resumed = 'RESUMED',

	/**
	 * New guild channel created
	 */
	ChannelCreate = 'CHANNEL_CREATE',

	/**
	 * Channel was updated
	 */
	ChannelUpdate = 'CHANNEL_UPDATE',

	/**
	 * Channel was deleted
	 */
	ChannelDelete = 'CHANNEL_DELETE',

	/**
	 * Message was pinned or unpinned
	 */
	ChannelPinsUpdate = 'CHANNEL_PINS_UPDATE',

	/**
	 * Lazy-load for unavailable guild, guild became available, or user joined a new guild
	 */
	GuildCreate = 'GUILD_CREATE',

	/**
	 * Guild was updated
	 */
	GuildUpdate = 'GUILD_UPDATE',

	/**
	 * Guild became unavailable, or user left/was removed from a guild
	 */
	GuildDelete = 'GUILD_DELETE',

	/**
	 * User was banned from a guild
	 */
	GuildBanAdd = 'GUILD_BAN_ADD',

	/**
	 * User was unbanned from a guild
	 */
	GuildBanRemove = 'GUILD_BAN_REMOVE',

	/**
	 * Guild emojis were updated
	 */
	GuildEmojisUpdate = 'GUILD_EMOJIS_UPDATE',

	/**
	 * Guild integration was updated
	 */
	GuildIntegrationsUpdate = 'GUILD_INTEGRATIONS_UPDATE',

	/**
	 * New user joined a guild
	 */
	GuildMemberAdd = 'GUILD_MEMBER_ADD',

	/**
	 * User was removed from a guild
	 */
	GuildMemberRemove = 'GUILD_MEMBER_REMOVE',

	/**
	 * Guild member was updated
	 */
	GuildMemberUpdate = 'GUILD_MEMBER_UPDATE',

	/**
	 * Response to {@link https://discord.com/developers/docs/topics/gateway#request-guild-members Request Guild Members}
	 */
	GuildMemberChunk = 'GUILD_MEMBERS_CHUNK',

	/**
	 * Guild role was created
	 */
	GuildRoleCreate = 'GUILD_ROLE_CREATE',

	/**
	 * Guild role was updated
	 */
	GuildRoleUpdate = 'GUILD_ROLE_UPDATE',

	/**
	 * Guild role was deleted
	 */
	GuildRoleDelete = 'GUILD_ROLE_DELETE',

	/**
	 * Guild integration was created
	 */
	IntegrationCreate = 'INTEGRATION_CREATE',

	/**
	 * Guild integration was updated
	 */
	IntegrationUpdate = 'INTEGRATION_UPDATE',

	/**
	 * Guild integration was deleted
	 */
	IntegrationDelete = 'INTEGRATION_DELETE',

	/**
	 * Invite to a channel was created
	 */
	InviteCreate = 'INVITE_CREATE',

	/**
	 * Invite to a channel was deleted
	 */
	InviteDelete = 'INVITE_DELETE',

	/**
	 * Message was created
	 */
	MessageCreate = 'MESSAGE_CREATE',

	/**
	 * Message was edited
	 */
	MessageUpdate = 'MESSAGE_UPDATE',

	/**
	 * Message was deleted
	 */
	MessageDelete = 'MESSAGE_DELETE',

	/**
	 * Multiple messages were deleted at once
	 */
	MessageDeleteBulk = 'MESSAGE_DELETE_BULK',

	/**
	 * User reacted to a message
	 */
	MessageReactionAdd = 'MESSAGE_REACTION_ADD',

	/**
	 * User removed a reaction from a message
	 */
	MessageReactionRemove = 'MESSAGE_REACTION_REMOVE',

	/**
	 * All reactions were explicitly removed from a message
	 */
	MessageReactionRemoveAll = 'MESSAGE_REACTION_REMOVE_ALL',

	/**
	 * All reactions for a given emoji were explicitly removed from a message
	 */
	MessageReactionRemoveEmoji = 'MESSAGE_REACTION_REMOVE_EMOJI',

	/**
	 * User was updated
	 */
	PresenceUpdate = 'PRESENCE_UPDATE',

	/**
	 * User started typing in a channel
	 */
	TypingStart = 'TYPING_START',

	/**
	 * Properties about the user changed
	 */
	UserUpdate = 'USER_UPDATE',

	/**
	 * Someone joined, left, or moved a voice channel
	 */
	VoiceStateUpdate = 'VOICE_STATE_UPDATE',

	/**
	 * Guild's voice server was updated
	 */
	VoiceServerUpdate = 'VOICE_SERVER_UPDATE',

	/**
	 * Guild channel webhook was created, update, or deleted
	 */
	WebhooksUpdate = 'WEBHOOKS_UPDATE',

	/**
	 * New {@link https://discord.com/developers/docs/interactions/slash-commands Slash Command} was created
	 */
	ApplicationCommandCreate = 'APPLICATION_COMMAND_CREATE',

	/**
	 * {@link https://discord.com/developers/docs/interactions/slash-commands Slash Command} was updated
	 */
	ApplicationCommandUpdate = 'APPLICATION_COMMAND_UPDATE',

	/**
	 * {@link https://discord.com/developers/docs/interactions/slash-commands Slash Command} was deleted
	 */
	ApplicationCommandDelete = 'APPLICATION_COMMAND_DELETE',

	/**
	 * User used a {@link https://discord.com/developers/docs/interactions/slash-commands Slash Command}
	 */
	InteractionCreate = 'INTERACTION_CREATE'
}

// SECTION Gateway Events

// SECTION Connecting and Resuming

/**
 * Sent on connection to the websocket. Defines the heartbeat interval that the client should heartbeat to.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#hello Gateway}
 */
export interface Hello {
	op: GatewayOPCode.Hello;
	d: {
		/**
		 * The interval (in milliseconds) the client should heartbeat with
		 */
		heartbeat_interval: number;
	};
}

/**
 * Dispatched when a client has completed the initial handshake with the gateway (for new sessions).
 *
 * @remarks
 * The ready event can be the largest and most complex event the gateway will send, as it contains
 * all the state required for a client to begin interacting with the rest of the platform.
 *
 * `guilds` are the guilds of which your bot is a member. They start out as unavailable when you connect to the
 * gateway. As they become available, your bot will be notified via [Guild Create][1] events. `private_channels`
 * will be an empty array. As bots receive private messages, they will be notified via [Channel Create][2] events.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#ready Gateway}
 *
 * [1]: https://discord.com/developers/docs/topics/gateway#guild-create
 * [2]: https://discord.com/developers/docs/topics/gateway#channel-create
 */
export interface Ready extends EventPayload<Event.Ready> {
	d: {
		/**
		 * {@link https://discord.com/developers/docs/topics/gateway#gateways-gateway-versions Gateway version}
		 */
		v: number;

		/**
		 * Information about the user including email
		 */
		user: PartialUser;

		/**
		 * Empty array
		 */
		private_channels: [];

		/**
		 * The guilds the user is in
		 */
		guilds: UnavailableGuild[];

		/**
		 * Used for resuming connections
		 */
		session_id: string;

		/**
		 * The shard information associated with this session, if sent when identifying
		 */
		shard?: [number, number];

		/**
		 * Contains `id` and `flags`
		 */
		application: {
			/**
			 * The ID of the app
			 */
			id: Snowflake;

			/**
			 * The application's public flags
			 */
			flags: number;
		};
	};
}

/**
 * Sent to indicate one of at least three different situations:
 *
 * - The gateway could not initialize a session after receiving an [Opcode 2 Identify][1]
 * - The gateway could not resume a previous session after receiving an [Opcode 6 Resume][2]
 * - The gateway has invalidated an active session and is requesting client action
 *
 * The inner `d` key is a boolean that indicates whether the session may be resumable.
 * See [Connecting][3] and [Resuming][4] for more information.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invalid-session Gateway}
 *
 * [1]: https://discord.com/developers/docs/topics/gateway#identify
 * [2]: https://discord.com/developers/docs/topics/gateway#resume
 * [3]: https://discord.com/developers/docs/topics/gateway#connecting
 * [4]: https://discord.com/developers/docs/topics/gateway#resuming
 */
export interface InvalidSession {
	op: GatewayOPCode.InvalidSession;

	/**
	 * A boolean that indicates whether the session may be resumable
	 */
	d: boolean;
}

// !SECTION

// SECTION Channels

/**
 * Sent when a new guild channel is created, relevant to the current user. The inner payload is a [channel][1] object.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-create Gateway}
 *
 * [1]: https://discord.com/developers/docs/resources/channel#channel-object
 */
export interface ChannelCreate extends EventPayload<Event.ChannelCreate> {
	d: Channel;
}

/**
 * Sent when a channel is updated. The inner payload is a [channel][1] object.
 *
 * @remarks
 * This is not sent when the field `last_message_id` is altered. To keep track of
 * the `last_message_id` changes, you must listen for [Message Create][2] events.
 *
 * [1]: https://discord.com/developers/docs/resources/channel#channel-object
 * [2]: https://discord.com/developers/docs/topics/gateway#message-create
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-update Gateway}
 */
export interface ChannelUpdate extends EventPayload<Event.ChannelUpdate> {
	d: Channel;
}

/**
 * Sent when a channel relevant to the current user is deleted. The inner payload is a [channel][1] object.
 *
 * [1]: https://discord.com/developers/docs/resources/channel#channel-object
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-delete Gateway}
 */
export interface ChannelDelete extends EventPayload<Event.ChannelDelete> {
	d: Channel;
}

/**
 * Sent when a message is pinned or unpinned in a text channel. This is not sent when a pinned message is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-pins-update Gateway}
 */
export interface ChannelPinsUpdate extends EventPayload<Event.ChannelPinsUpdate> {
	d: {
		/**
		 * The ID of the guild
		 */
		guild_id?: Snowflake;

		/**
		 * The ID of the channel
		 */
		channel_id: Snowflake;

		/**
		 * The time at which the most recent pinned message was pinned
		 */
		last_pin_timestamp?: Nullable<string>;
	};
}

// !SECTION

// SECTION Guilds

/**
 * This event can be sent in three different scenarios:
 *
 * 1. When a user is initially connecting, to lazily load and backfill information for all unavailable guilds sent
 * 	  in the [Ready][1] event. Guilds that are unavailable due to an outage will send a [Guild Delete][2] event
 * 2. When a Guild becomes available again to the client
 * 3. When the current user joins a new Guild
 *
 * The inner payload is a [guild][3] object, with all the extra fields specified.
 *
 * @warning
 * If you are using Gateway Intents, members and presences returned in this event will only
 * contain your bot and users in voice channels unless you specify the `GUILD_PRESENCES` intent.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-create Gateway}​
 *
 * [1]: https://discord.com/developers/docs/topics/gateway#ready
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-delete
 * [3]: https://discord.com/developers/docs/resources/guild#guild-object
 */
export interface GuildCreate extends EventPayload<Event.GuildCreate> {
	d: Guild;
}

/**
 * Sent when a guild is updated. The inner payload is a [guild][1] object.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-update Gateway}
 *
 * [1]: https://discord.com/developers/docs/resources/guild#guild-object
 */
export interface GuildUpdate extends EventPayload<Event.GuildUpdate> {
	d: Guild;
}

/**
 * Sent when a guild becomes or was already unavailable due to an outage, or when the user
 * leaves or is removed from a guild. The inner payload is an [unavailable guild][1] object.
 *
 * @remarks
 * If the unavailable `field` is not set, the user was removed from the guild.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-delete Gateway}
 *
 * [1]: https://discord.com/developers/docs/resources/guild#unavailable-guild-object
 */
export interface GuildDelete extends EventPayload<Event.GuildDelete> {
	d: UnavailableGuild;
}

/**
 * Sent when a user is banned from a guild.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-ban-add Gateway}
 */
export interface GuildBanAdd extends EventPayload<Event.GuildBanAdd> {
	d: {
		/**
		 * ID of the guild
		 */
		guild_id: Snowflake;

		/**
		 * The banned user
		 */
		user: User;
	};
}

/**
 * Sent when a user is unbanned from a guild.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-ban-remove Gateway}
 */
export interface GuildBanRemove extends EventPayload<Event.GuildBanRemove> {
	d: {
		/**
		 * ID of the guild
		 */
		guild_id: Snowflake;

		/**
		 * The unbanned user
		 */
		user: User;
	};
}

/**
 * Sent when a guild's emojis have been updated.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-emojis-update Gateway}
 */
export interface GuildEmojisUpdate extends EventPayload<Event.GuildEmojisUpdate> {
	d: {
		/**
		 * ID of the guild
		 */
		guild_id: Snowflake;

		/**
		 * Array of {@link https://discord.com/developers/docs/resources/emoji#emoji-object emojis}
		 */
		emojis: Emoji[];
	};
}

/**
 * Sent when a guild integration is updated.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-integrations-update Gateway}
 */
export interface GuildIntegrationsUpdate extends EventPayload<Event.GuildIntegrationsUpdate> {
	d: {
		/**
		 * ID of the guild whose integrations were updated
		 */
		guild_id: Snowflake;
	};
}

// SECTION Guild Members

/**
 * Sent when a new user joins a guild. The inner payload is a [guild member][1] object with an extra `guild_id` key.
 *
 * @warning
 * If using Gateway Intents, the `GUILD_MEMBERS` intent will be required to receive this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-add Gateway}
 *
 * [1]: https://discord.com/developers/docs/resources/guild#guild-member-object
 */
export interface GuildMemberAdd extends EventPayload<Event.GuildMemberAdd> {
	d: GuildMember & {
		/**
		 * ID of the guild
		 */
		guild_id: Snowflake;
	};
}

/**
 * Sent when a user is removed from a guild (leave/kick/ban).
 *
 * @warning
 * If using Gateway Intents, the `GUILD_MEMBERS` intent will be required to receive this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-remove Gateway}
 */
export interface GuildMemberRemove extends EventPayload<Event.GuildMemberRemove> {
	d: {
		/**
		 * The ID of the guild
		 */
		guild_id: Snowflake;

		/**
		 * The user who was removed
		 */
		user: User;
	};
}

/**
 * Sent when a guild member is updated. This will also fire when the user object of a guild member changes.
 *
 * @warning
 * If using Gateway Intents, the `GUILD_MEMBERS` intent will be required to receive this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-update Gateway}
 */
export interface GuildMemberUpdate extends EventPayload<Event.GuildMemberUpdate> {
	d: {
		/**
		 * The ID of the guild
		 */
		guild_id: Snowflake;

		/**
		 * User role IDs
		 */
		roles: Snowflake[];

		/**
		 * The user
		 */
		user: User;

		/**
		 * Nickname of the user in the guild
		 */
		nick?: Nullable<string>;

		/**
		 * When the user joined the guild
		 */
		joined_at: string;

		/**
		 * When the user starting {@link https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting- boosting} the guild
		 */
		premium_since?: Nullable<string>;

		/**
		 * Whether the user has not yet passed the guild's {@link https://discord.com/developers/docs/resources/guild#membership-screening-object Membership Screening} requirements
		 */
		pending?: boolean;
	};
}

/**
 * Sent in response to [Guild Request Members][1].
 *
 * @remarks
 * You can use the `chunk_index` and `chunk_count` to calculate how many chunks are left for your request.
 *​
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-members-chunk Gateway}
 *
 * [1]: https://discord.com/developers/docs/topics/gateway#request-guild-members
 */
export interface GuildMemberChunk extends EventPayload<Event.GuildMemberChunk> {
	d: {
		/**
		 * The ID of the guild
		 */
		guild_id: Snowflake;

		/**
		 * Set of guild members
		 */
		members: GuildMember[];

		/**
		 * The chunk index in the expected chunks for this response
		 * (`0` <= `chunk_index` < `chunk_count`)
		 */
		chunk_index: number;

		/**
		 * The total number of expected chunks for this response
		 */
		chunk_count: number;

		/**
		 * If passing an invalid ID to `REQUEST_GUILD_MEMBERS`, it will be returned here
		 */
		not_found?: Snowflake[];

		/**
		 * If passing true to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here
		 */
		presences?: PresenceUpdate['d'][];

		/**
		 * The nonce used in the {@link https://discord.com/developers/docs/topics/gateway#request-guild-members Guild Members Request}
		 */
		nonce?: string;
	};
}

// !SECTION

// SECTION Guild Roles

/**
 * Sent when a guild role is created.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-create Gateway}
 */
export interface GuildRoleCreate extends EventPayload<Event.GuildRoleCreate> {
	d: {
		/**
		 * The ID of the guild
		 */
		guild_id: Snowflake;

		/**
		 * The role updated
		 */
		role: Role;
	};
}

/**
 * Sent when a guild role is updated.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-update Gateway}
 */
export interface GuildRoleUpdate extends EventPayload<Event.GuildRoleUpdate> {
	d: {
		/**
		 * The ID of the guild
		 */
		guild_id: Snowflake;

		/**
		 * The role updated
		 */
		role: Role;
	};
}

/**
 * Sent when a guild role is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-delete Gateway}
 */
export interface GuildRoleDelete extends EventPayload<Event.GuildRoleDelete> {
	d: {
		/**
		 * ID of the guild
		 */
		guild_id: Snowflake;

		/**
		 * ID of the role
		 */
		role_id: Snowflake;
	};
}

// !SECTION

// !SECTION

// SECTION Integrations

/**
 * Sent when an integration is created. The inner payload is an [integration][1] object with an `guild_id` key.
 *
 * [1]: https://discord.com/developers/docs/resources/guild#integration-object
 */
export interface IntegrationCreate extends EventPayload<Event.IntegrationCreate> {
	d: Integration & {
		/**
		 * ID of the guild
		 */
		guild_id: Snowflake;
	};
}

/**
 * Sent when an integration is updated. The inner payload is an [integration][1] object with an `guild_id` key.
 *
 * [1]: https://discord.com/developers/docs/resources/guild#integration-object
 */
export interface IntegrationUpdate extends EventPayload<Event.IntegrationUpdate> {
	d: Integration & {
		/**
		 * ID of the guild
		 */
		guild_id: Snowflake;
	};
}

/**
 * Sent when an integration is deleted.
 */
export interface IntegrationDelete extends EventPayload<Event.IntegrationDelete> {
	d: {
		/**
		 * ID of the guild
		 */
		guild_id: Snowflake;
		/**
		 * Integration ID
		 */
		id: Snowflake;

		/**
		 * ID of the bot/OAuth2 application for this discord integration
		 */
		application_id?: Snowflake;
	};
}

// !SECTION

// SECTION Invites

/**
 * Sent when a new invite to a channel is created.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invite-create Gateway}
 */
export interface InviteCreate extends EventPayload<Event.InviteCreate> {
	d: {
		/**
		 * The channel the invite is for
		 */
		channel_id: Snowflake;

		/**
		 * The unique invite {@link https://discord.com/developers/docs/resources/invite#invite-object code}
		 */
		code: string;

		/**
		 * The time at which the invite was created
		 */
		created_at: string;

		/**
		 * The guild of the invite
		 */
		guild_id?: Snowflake;

		/**
		 * The user that created the invite
		 */
		inviter?: User;

		/**
		 * How long the invite is valid for (in seconds)
		 */
		max_age: number;

		/**
		 * The maximum number of times the invite can be used
		 */
		max_uses: number;

		/**
		 * The target user for this invite
		 */
		target_user?: PartialUser;

		/**
		 * The {@link https://discord.com/developers/docs/resources/invite#invite-object-target-user-types type of user target} for this invite
		 */
		target_user_type?: TargetUser;

		/**
		 * Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role)
		 */
		temporary: boolean;

		/**
		 * How many times the invite has been used (always will be 0)
		 */
		uses: number;
	};
}

/**
 * Sent when an invite is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invite-delete Gateway}
 */
export interface InviteDelete extends EventPayload<Event.InviteDelete> {
	d: Pick<InviteCreate['d'], 'guild_id' | 'code'> & {
		/**
		 * The channel of the invite
		 */
		channel_id: Snowflake;
	};
}

// !SECTION

// SECTION Messages

/**
 * Sent when a message is created. The inner payload is a [message][1] object.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-create Gateway}
 *
 * [1]: https://discord.com/developers/docs/resources/channel#message-object
 */
export interface MessageCreate extends EventPayload<Event.MessageCreate> {
	d: Message;
}

/**
 * Sent when a message is updated. The inner payload is a [message][1] object.
 *
 * @warning
 * Unlike creates, message updates may contain only a subset of the full message object payload (but will always contain an `id` and `channel_id`).
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-update Gateway}
 *
 * [1]: https://discord.com/developers/docs/resources/channel#message-object
 */
export interface MessageUpdate extends EventPayload<Event.MessageUpdate> {
	d: Message;
}

/**
 * Sent when a message is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-delete Gateway}
 */
export interface MessageDelete extends EventPayload<Event.MessageDelete> {
	d: {
		/**
		 * The ID of the message
		 */
		id: Snowflake;

		/**
		 * The ID of the channel
		 */
		channel_id: Snowflake;

		/**
		 * The ID of the guild
		 */
		guild_id?: Snowflake;
	};
}

/**
 * Sent when multiple messages are deleted at once.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-delete-bulk Gateway}
 */
export interface MessageDeleteBulk extends EventPayload<Event.MessageDeleteBulk> {
	d: Pick<MessageDelete['d'], 'channel_id' | 'guild_id'> & {
		/**
		 * The IDs of the messages
		 */
		ids: Snowflake[];
	};
}

/**
 * Sent when a user adds a reaction to a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-add Gateway}
 */
export interface MessageReactionAdd extends EventPayload<Event.MessageReactionAdd> {
	d: {
		/**
		 * The ID of the user
		 */
		user_id: Snowflake;

		/**
		 * The ID of the channel
		 */
		channel_id: Snowflake;

		/**
		 * The ID of the message
		 */
		message_id: Snowflake;

		/**
		 * The ID of the guild
		 */
		guild_id?: Snowflake;

		/**
		 * The member who reacted if this happened in a guild
		 */
		member?: GuildMember;

		/**
		 * The emoji used to react
		 */
		emoji: PartialEmoji;
	};
}

/**
 * Sent when a user removes a reaction from a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove Gateway}
 */
export interface MessageReactionRemove extends EventPayload<Event.MessageReactionRemove> {
	d: Omit<MessageReactionAdd['d'], 'member'>;
}

/**
 * Sent when a user explicitly removes all reactions from a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all Gateway}
 */
export interface MessageReactionRemoveAll extends EventPayload<Event.MessageReactionRemoveAll> {
	d: Omit<MessageReactionRemove, 'user_id' | 'emoji'>;
}

/**
 * Sent when a bot removes all instances of a given emoji from the reactions of a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji Gateway}
 */
export interface MessageReactionRemoveEmoji extends EventPayload<Event.MessageReactionRemoveEmoji> {
	d: MessageReactionRemoveAll & {
		/**
		 * The emoji that was removed
		 */
		emoji: PartialEmoji;
	};
}

// !SECTION

// ANCHOR Presence Update

/**
 * Sent when a user's presence or info, such as name or avatar, is updated.
 *
 * @warning
 * - If you are using Gateway Intents, you *must* specify the `GUILD_PRESENCES` intent in order to receive Presence Update events
 * - The user object within this event can be partial, the only field which must be sent is the `id` field, everything else is
 * 	 optional. Along with this limitation, no fields are required, and the types of the fields are **not** validated. Your client
 *   should expect any combination of fields and types within this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#presence-update Gateway}
 */
export interface PresenceUpdate extends EventPayload<Event.PresenceUpdate> {
	d: {
		/**
		 * The user presence is being updated for
		 */
		user?: Required<Pick<User, 'id'>> & Partial<Omit<User, 'id'>>;

		/**
		 * ID of the guild
		 */
		guild_id?: Snowflake;

		/**
		 * Either `idle`, `dnd`, `online`, or `offline`
		 */
		status?: string;

		/**
		 * User's current activities
		 */
		activities?: Activity[];

		/**
		 * User's platform-dependent status
		 */
		client_status?: ClientStatus;
	};
}

// ANCHOR Typing Start

/**
 * Sent when a user starts typing in a channel.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#typing-start Gateway}
 */
export interface TypingStart extends EventPayload<Event.TypingStart> {
	d: {
		/**
		 * ID of the channel
		 */
		channel_id: Snowflake;

		/**
		 * ID of the guild
		 */
		guild_id?: Snowflake;

		/**
		 * ID of the user
		 */
		user_id: Snowflake;

		/**
		 * Unix time (in seconds) of when the user started typing
		 */
		timestamp: number;

		/**
		 * The member who started typing if this happened in a guild
		 */
		member?: GuildMember;
	};
}

// ANCHOR User Update

/**
 * Sent when properties about the user change. Inner payload is a [user][1] object.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#user-update Gateway}
 *
 * [1]: https://discord.com/developers/docs/resources/user#user-object
 */
export interface UserUpdate extends EventPayload<Event.UserUpdate> {
	d: User;
}

// SECTION Voice

/**
 * Sent when someone joins/leaves/moves voice channels. Inner payload is a [voice state][1] object.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#voice-state-update Gateway}
 *
 * [1]: https://discord.com/developers/docs/resources/voice#voice-state-object
 */
export interface VoiceStateUpdate extends EventPayload<Event.VoiceStateUpdate> {
	d: VoiceState;
}

/**
 * Sent when a guild's voice server is updated. This is sent when initially
 * connecting to voice, and when the current voice instance fails over to a new server.
 */
export interface VoiceServerUpdate extends EventPayload<Event.VoiceServerUpdate> {
	d: {
		/**
		 * Voice connection token
		 */
		token: string;

		/**
		 * The guild this voice server update is for
		 */
		guild_id: Snowflake;

		/**
		 * The voice server host
		 */
		endpoint: Nullable<string>;
	};
}

// !SECTION

// ANCHOR Webhooks

/**
 * Sent when a guild channel's webhook is created, updated, or deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#webhooks-update Gateway}
 */
export interface WebhooksUpdate extends EventPayload<Event.WebhooksUpdate> {
	d: {
		/**
		 * ID of the guild
		 */
		guild_id: Snowflake;

		/**
		 * ID of the channel
		 */
		channel_id: Snowflake;
	};
}

// SECTION Commands

/**
 * Sent when a new [Slash Command][1] is created, relevant to the current user. The inner
 * payload is an [ApplicationCommand][2] object, with an optional extra `guild_id` key.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#application-command-create Gateway}
 *
 * [1]: https://discord.com/developers/docs/interactions/slash-commands
 * [2]: https://discord.com/developers/docs/interactions/slash-commands#applicationcommand
 */
export interface ApplicationCommandCreate extends EventPayload<Event.ApplicationCommandCreate> {
	d: ApplicationCommand & {
		/**
		 * ID of the guild the command is in
		 */
		guild_id?: Snowflake;
	};
}

/**
 * Sent when a new [Slash Command][1] relevant to the current user is updated. The inner
 * payload is an [ApplicationCommand][2] object, with an optional extra `guild_id` key.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#application-command-update Gateway}
 *
 * [1]: https://discord.com/developers/docs/interactions/slash-commands
 * [2]: https://discord.com/developers/docs/interactions/slash-commands#applicationcommand
 */
export interface ApplicationCommandDelete extends EventPayload<Event.ApplicationCommandDelete> {
	d: ApplicationCommand & {
		/**
		 * ID of the guild the command is in
		 */
		guild_id?: Snowflake;
	};
}

/**
 * Sent when a new [Slash Command][1] relevant to the current user is deleted. The inner
 * payload is an [ApplicationCommand][2] object, with an optional extra `guild_id` key.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#application-command-delete Gateway}
 *
 * [1]: https://discord.com/developers/docs/interactions/slash-commands
 * [2]: https://discord.com/developers/docs/interactions/slash-commands#applicationcommand
 */
export interface ApplicationCommandUpdate extends EventPayload<Event.ApplicationCommandUpdate> {
	d: ApplicationCommand & {
		/**
		 * ID of the guild the command is in
		 */
		guild_id?: Snowflake;
	};
}

// !SECTION

// ANCHOR Interaction

/**
 * Sent when a user in a guild uses a [Slash Command][1]. Inner payload is an [Interaction][2].
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#interaction-create Gateway}
 *
 * [1]: https://discord.com/developers/docs/interactions/slash-commands
 * [2]: https://discord.com/developers/docs/interactions/slash-commands#interaction
 */
export interface InteractionCreate extends EventPayload<Event.InteractionCreate> {
	d: Interaction;
}

// !SECTION