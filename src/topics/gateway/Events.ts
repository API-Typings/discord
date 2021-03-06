import type { Nullable, Range } from 'extended-utility-types';
import type {
	Activity,
	Application,
	ApplicationCommand,
	Channel,
	ClientStatus,
	Emoji,
	GatewayOPCode,
	Guild,
	GuildMember,
	Integration,
	Interaction,
	InviteTargetType,
	Message,
	PartialApplication,
	PartialEmoji,
	PartialUser,
	Role,
	Snowflake,
	StageInstance,
	Sticker,
	ThreadChannel,
	ThreadMember,
	UnavailableGuild,
	User,
	VoiceState
} from '../../';
import type { EventPayload, GuildIdentifiable, Identifiable } from '../../__internal__';

export type GatewayEventPayload =
	| Hello
	| Ready
	| Resumed
	| Reconnect
	| InvalidSession
	| ApplicationCommandCreate
	| ApplicationCommandUpdate
	| ApplicationCommandDelete
	| ChannelCreate
	| ChannelUpdate
	| ChannelDelete
	| ChannelPinsUpdate
	| ThreadCreate
	| ThreadUpdate
	| ThreadDelete
	| ThreadListSync
	| ThreadMemberUpdate
	| ThreadMembersUpdate
	| GuildCreate
	| GuildUpdate
	| GuildDelete
	| GuildBanAdd
	| GuildBanRemove
	| GuildEmojisUpdate
	| GuildIntegrationsUpdate
	| GuildMemberAdd
	| GuildMemberRemove
	| GuildMemberUpdate
	| GuildMemberChunk
	| GuildRoleCreate
	| GuildRoleUpdate
	| GuildRoleDelete
	| IntegrationCreate
	| IntegrationUpdate
	| IntegrationDelete
	| InteractionCreate
	| InviteCreate
	| InviteDelete
	| MessageCreate
	| MessageUpdate
	| MessageDelete
	| MessageDeleteBulk
	| MessageReactionAdd
	| MessageReactionRemove
	| MessageReactionRemoveAll
	| MessageReactionRemoveEmoji
	| PresenceUpdate
	| StageInstanceCreate
	| StageInstanceUpdate
	| StageInstanceDelete
	| TypingStart
	| UserUpdate
	| VoiceStateUpdate
	| VoiceServerUpdate
	| WebhooksUpdate;

/**
 * Sent in response to receiving a heartbeat to acknowledge that it has been received.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#heartbeating|Gateway}
 */
export interface HeartbeatAck {
	op: GatewayOPCode.HeartbeatAck;
}

/**
 * Events are payloads sent over the socket to a client that correspond to events in Discord.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events|Gateway}
 */
export enum GatewayEvent {
	/**
	 * Defines the heartbeat interval.
	 */
	Hello = 'HELLO',

	/**
	 * Contains the initial state information.
	 */
	Ready = 'READY',

	/**
	 * Response to resume.
	 */
	Resumed = 'RESUMED',

	/**
	 * Server is going away, client should reconnect to gateway and resume.
	 */
	Reconnect = 'RECONNECT',

	/**
	 * Failure response to `Identify` or `Resume` or invalid active session.
	 */
	InvalidSession = 'INVALID_SESSION',

	/**
	 * New Slash Command was created.
	 */
	ApplicationCommandCreate = 'APPLICATION_COMMAND_CREATE',

	/**
	 * Slash Command was updated.
	 */
	ApplicationCommandUpdate = 'APPLICATION_COMMAND_UPDATE',

	/**
	 * Slash Command was deleted.
	 */
	ApplicationCommandDelete = 'APPLICATION_COMMAND_DELETE',

	/**
	 * New guild channel created.
	 */
	ChannelCreate = 'CHANNEL_CREATE',

	/**
	 * Channel was updated.
	 */
	ChannelUpdate = 'CHANNEL_UPDATE',

	/**
	 * Channel was deleted.
	 */
	ChannelDelete = 'CHANNEL_DELETE',

	/**
	 * Message was pinned or unpinned.
	 */
	ChannelPinsUpdate = 'CHANNEL_PINS_UPDATE',

	/**
	 * Thread created, also sent when being added to a private thread.
	 */
	ThreadCreate = 'THREAD_CREATE',

	/**
	 * Thread was updated.
	 */
	ThreadUpdate = 'THREAD_UPDATE',

	/**
	 * Thread was deleted.
	 */
	ThreadDelete = 'THREAD_DELETE',

	/**
	 * Sent when gaining access to a channel, contains all active threads in that channel.
	 */
	ThreadListSync = 'THREAD_LIST_SYNC',

	/**
	 * Thread member for the current user was updated.
	 */
	ThreadMemberUpdate = 'THREAD_MEMBER_UPDATE',

	/**
	 * Some user(s) were added to or removed from a thread.
	 */
	ThreadMembersUpdate = 'THREAD_MEMBERs_UPDATE',

	/**
	 * Lazy-load for unavailable guild, guild became available, or user joined a new guild.
	 */
	GuildCreate = 'GUILD_CREATE',

	/**
	 * Guild was updated.
	 */
	GuildUpdate = 'GUILD_UPDATE',

	/**
	 * Guild became unavailable, or user left/was removed from a guild.
	 */
	GuildDelete = 'GUILD_DELETE',

	/**
	 * User was banned from a guild.
	 */
	GuildBanAdd = 'GUILD_BAN_ADD',

	/**
	 * User was unbanned from a guild.
	 */
	GuildBanRemove = 'GUILD_BAN_REMOVE',

	/**
	 * Guild emojis were updated.
	 */
	GuildEmojisUpdate = 'GUILD_EMOJIS_UPDATE',

	/**
	 * Guild stickers were updated.
	 */
	GuildStickersUpdate = 'GUILD_STICKERS_UPDATE',

	/**
	 * Guild integration was updated.
	 */
	GuildIntegrationsUpdate = 'GUILD_INTEGRATIONS_UPDATE',

	/**
	 * New user joined a guild.
	 */
	GuildMemberAdd = 'GUILD_MEMBER_ADD',

	/**
	 * User was removed from a guild.
	 */
	GuildMemberRemove = 'GUILD_MEMBER_REMOVE',

	/**
	 * Guild member was updated.
	 */
	GuildMemberUpdate = 'GUILD_MEMBER_UPDATE',

	/**
	 * Response to Request Guild Members.
	 */
	GuildMemberChunk = 'GUILD_MEMBERS_CHUNK',

	/**
	 * Guild role was created.
	 */
	GuildRoleCreate = 'GUILD_ROLE_CREATE',

	/**
	 * Guild role was updated.
	 */
	GuildRoleUpdate = 'GUILD_ROLE_UPDATE',

	/**
	 * Guild role was deleted.
	 */
	GuildRoleDelete = 'GUILD_ROLE_DELETE',

	/**
	 * Guild integration was created.
	 */
	IntegrationCreate = 'INTEGRATION_CREATE',

	/**
	 * Guild integration was updated.
	 */
	IntegrationUpdate = 'INTEGRATION_UPDATE',

	/**
	 * Guild integration was deleted.
	 */
	IntegrationDelete = 'INTEGRATION_DELETE',

	/**
	 * User used a Slash Command.
	 */
	InteractionCreate = 'INTERACTION_CREATE',

	/**
	 * Invite to a channel was created.
	 */
	InviteCreate = 'INVITE_CREATE',

	/**
	 * Invite to a channel was deleted.
	 */
	InviteDelete = 'INVITE_DELETE',

	/**
	 * Message was created.
	 */
	MessageCreate = 'MESSAGE_CREATE',

	/**
	 * Message was edited.
	 */
	MessageUpdate = 'MESSAGE_UPDATE',

	/**
	 * Message was deleted.
	 */
	MessageDelete = 'MESSAGE_DELETE',

	/**
	 * Multiple messages were deleted at once.
	 */
	MessageDeleteBulk = 'MESSAGE_DELETE_BULK',

	/**
	 * User reacted to a message.
	 */
	MessageReactionAdd = 'MESSAGE_REACTION_ADD',

	/**
	 * User removed a reaction from a message.
	 */
	MessageReactionRemove = 'MESSAGE_REACTION_REMOVE',

	/**
	 * All reactions were explicitly removed from a message.
	 */
	MessageReactionRemoveAll = 'MESSAGE_REACTION_REMOVE_ALL',

	/**
	 * All reactions for a given emoji were explicitly removed from a message.
	 */
	MessageReactionRemoveEmoji = 'MESSAGE_REACTION_REMOVE_EMOJI',

	/**
	 * User was updated.
	 */
	PresenceUpdate = 'PRESENCE_UPDATE',

	/**
	 * Stage instance was created.
	 */
	StageInstanceCreate = 'STAGE_INSTANCE_CREATE',

	/**
	 * Stage instance was deleted or created.
	 */
	StageInstanceUpdate = 'STAGE_INSTANCE_UPDATE',

	/**
	 * Stage instance was updated.
	 */
	StageInstanceDelete = 'STAGE_INSTANCE_DELETE',

	/**
	 * User started typing in a channel.
	 */
	TypingStart = 'TYPING_START',

	/**
	 * Properties about the user changed.
	 */
	UserUpdate = 'USER_UPDATE',

	/**
	 * Someone joined, left, or moved a voice channel.
	 */
	VoiceStateUpdate = 'VOICE_STATE_UPDATE',

	/**
	 * Guild's voice server was updated.
	 */
	VoiceServerUpdate = 'VOICE_SERVER_UPDATE',

	/**
	 * Guild channel webhook was created, update, or deleted.
	 */
	WebhooksUpdate = 'WEBHOOKS_UPDATE'
}

/**
 * Sent on connection to the websocket. Defines the heartbeat interval that the client should
 * heartbeat to.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#hello|Gateway}
 */
export interface Hello {
	op: GatewayOPCode.Hello;
	d: {
		/**
		 * The interval (in milliseconds) the client should heartbeat with.
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
 * `guilds` are the guilds of which your bot is a member. They start out as unavailable when
 * connecting to the gateway. As they become available, your bot will be notified via Guild Create
 * events.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#ready|Gateway}
 */
export interface Ready extends EventPayload<GatewayEvent.Ready> {
	d: {
		/**
		 * Gateway version.
		 */
		v: number;

		/**
		 * Information about the user including email.
		 */
		user: PartialUser;

		/**
		 * The guilds the user is in.
		 */
		guilds: UnavailableGuild[];

		/**
		 * Used for resuming connections.
		 */
		session_id: string;

		/**
		 * The shard information associated with this session, if sent when identifying.
		 */
		shard?: [shard_id: number, num_shards: number];

		/**
		 * Contains `id` and `flags`.
		 */
		application: Pick<Application, 'id' | 'flags'>;
	};
}

/**
 * The resumed event is dispatched when a client has sent a resume payload to the gateway (for
 * resuming existing sessions).
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#resumed|Gateway}
 */
export interface Resumed extends EventPayload<GatewayEvent.Resumed> {
	d: null;
}

/**
 * The reconnect event is dispatched when a client should reconnect to the gateway (and resume their
 * existing session, if they have one). This event usually occurs during deploys to migrate sessions
 * gracefully off old hosts.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#reconnect|Gateway}
 */
export interface Reconnect {
	op: GatewayOPCode.Reconnect;
	d: null;
}

/**
 * Sent to indicate one of at least three different situations:
 *
 * - The gateway could not initialize a session after receiving an Opcode 2 Identify.
 * - The gateway could not resume a previous session after receiving an Opcode 6 Resume.
 * - The gateway has invalidated an active session and is requesting client action.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invalid-session|Gateway}
 */
export interface InvalidSession {
	op: GatewayOPCode.InvalidSession;

	/**
	 * A boolean that indicates whether the session may be resumable.
	 */
	d: boolean;
}

/**
 * Sent when a new guild channel is created, relevant to the current user.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-create|Gateway}
 */
export interface ChannelCreate extends EventPayload<GatewayEvent.ChannelCreate> {
	d: Channel;
}

/**
 * Sent when a channel is updated.
 *
 * @remarks
 * This is not sent when the field `last_message_id` is altered. To keep track of the
 * `last_message_id` changes, you must listen for Message Create events.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-update|Gateway}
 */
export interface ChannelUpdate extends EventPayload<GatewayEvent.ChannelUpdate> {
	d: Channel;
}

/**
 * Sent when a channel relevant to the current user is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-delete|Gateway}
 */
export interface ChannelDelete extends EventPayload<GatewayEvent.ChannelDelete> {
	d: Channel;
}

/**
 * Sent when a message is pinned or unpinned in a text channel. This is not sent when a pinned
 * message is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-pins-update|Gateway}
 */
export interface ChannelPinsUpdate extends EventPayload<GatewayEvent.ChannelPinsUpdate> {
	d: Partial<GuildIdentifiable> & {
		/**
		 * The ID of the channel.
		 */
		channel_id: Snowflake;

		/**
		 * The time at which the most recent pinned message was pinned.
		 */
		last_pin_timestamp?: Nullable<string>;
	};
}

/**
 * Sent when a thread is created, relevant to the current user, or when the current user is added
 * to a private thread. When being added to an existing private thread, includes a thread member
 * object.
 */
export interface ThreadCreate extends EventPayload<GatewayEvent.ThreadCreate> {
	d: ThreadChannel;
}

/**
 * Sent when a thread is updated. This is not sent when the field `last_message_id` is altered.
 */
export interface ThreadUpdate extends EventPayload<GatewayEvent.ThreadUpdate> {
	d: ThreadChannel;
}

/**
 * Sent when a thread relevant to the current user is deleted.
 */
export interface ThreadDelete extends EventPayload<GatewayEvent.ThreadDelete> {
	d: Pick<ThreadChannel, 'id' | 'guild_id' | 'parent_id' | 'type'>;
}

/**
 * Sent when the current user *gains* access to a channel.
 */
export interface ThreadListSync extends EventPayload<GatewayEvent.ThreadListSync> {
	d: Partial<GuildIdentifiable> & {
		/**
		 * The parent channel IDs whose threads are being synced. If omitted, then threads were
		 * synced for the entire guild. This array may contain `channel_id`s that have no active
		 * threads as well, so you know to clear that data.
		 */
		channel_ids?: Snowflake[];

		/**
		 * All active threads in the given channels that the current user can access.
		 */
		threads: ThreadChannel[];

		/**
		 * Any thread member objects from the synced threads for the current user, indicating which
		 * threads are joined.
		 */
		members: ThreadMember[];
	};
}

/**
 * Sent when the thread member object for the current user is updated.
 */
export interface ThreadMemberUpdate extends EventPayload<GatewayEvent.ThreadMemberUpdate> {
	d: ThreadMember;
}

/**
 * Sent when anyone is added to or removed from a thread.
 *
 * If the current user does not have the `GUILD_MEMBERS` Gateway Intent, then this event will only
 * be sent if the current user was added or removed from the thread.
 */
export interface ThreadMembersUpdate extends EventPayload<GatewayEvent.ThreadMembersUpdate> {
	d: Identifiable &
		GuildIdentifiable & {
			/**
			 * The approximate number of members in the thread, capped at 50.
			 */
			member_count: Range<0, 50>;

			/**
			 * The users who were added to the thread.
			 */
			added_members?: ThreadMember[];

			/**
			 * The ID of the users who were removed from the thread.
			 */
			removed_member_ids?: Snowflake[];
		};
}

/**
 * This event can be sent in three different scenarios:
 *
 * 1. When a user is initially connecting, to lazily load and backfill information for all
 * unavailable guilds sent in the Ready event. Guilds that are unavailable due to an outage
 * will send a Guild Delete event.
 * 2. When a Guild becomes available again to the client.
 * 3. When the current user joins a new Guild.
 *
 * @remarks
 * If you are using Gateway Intents, members and presences returned in this event will only contain
 * your bot and users in voice channels unless you specify the `GUILD_PRESENCES` intent.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-create|Gateway}​
 */
export interface GuildCreate extends EventPayload<GatewayEvent.GuildCreate> {
	d: Guild;
}

/**
 * Sent when a guild is updated.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-update|Gateway}
 */
export interface GuildUpdate extends EventPayload<GatewayEvent.GuildUpdate> {
	d: Guild;
}

/**
 * Sent when a guild becomes or was already unavailable due to an outage, or when the user leaves or
 * is removed from a guild.
 *
 * @remarks
 * If the unavailable `field` is not set, the user was removed from the guild.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-delete|Gateway}
 */
export interface GuildDelete extends EventPayload<GatewayEvent.GuildDelete> {
	d: UnavailableGuild;
}

/**
 * Sent when a user is banned from a guild.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-ban-add|Gateway}
 */
export interface GuildBanAdd extends EventPayload<GatewayEvent.GuildBanAdd> {
	d: GuildIdentifiable & {
		/**
		 * The banned user.
		 */
		user: User;
	};
}

/**
 * Sent when a user is unbanned from a guild.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-ban-remove|Gateway}
 */
export interface GuildBanRemove extends EventPayload<GatewayEvent.GuildBanRemove> {
	d: GuildIdentifiable & {
		/**
		 * The unbanned user.
		 */
		user: User;
	};
}

/**
 * Sent when a guild's emojis have been updated.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-emojis-update|Gateway}
 */
export interface GuildEmojisUpdate extends EventPayload<GatewayEvent.GuildEmojisUpdate> {
	d: GuildIdentifiable & {
		/**
		 * Array of emojis.
		 */
		emojis: Emoji[];
	};
}

/**
 * Sent when a guild's stickers have been updated.
 */
export interface GuildStickersUpdate extends EventPayload<GatewayEvent.GuildStickersUpdate> {
	d: GuildIdentifiable & {
		/**
		 * Array of stickers.
		 */
		stickers: Sticker[];
	};
}

/**
 * Sent when a guild integration is updated.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-integrations-update|Gateway}
 */
export interface GuildIntegrationsUpdate extends EventPayload<GatewayEvent.GuildIntegrationsUpdate> {
	d: GuildIdentifiable;
}

/**
 * Sent when a new user joins a guild.
 *
 * @remarks
 * If using Gateway Intents, the `GUILD_MEMBERS` intent will be required to receive this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-add|Gateway}
 */
export interface GuildMemberAdd extends EventPayload<GatewayEvent.GuildMemberAdd> {
	d: GuildMember & GuildIdentifiable;
}

/**
 * Sent when a user is removed from a guild (leave/kick/ban).
 *
 * @remarks
 * If using Gateway Intents, the `GUILD_MEMBERS` intent will be required to receive this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-remove|Gateway}
 */
export interface GuildMemberRemove extends EventPayload<GatewayEvent.GuildMemberRemove> {
	d: GuildIdentifiable & {
		/**
		 * The user who was removed.
		 */
		user: User;
	};
}

/**
 * Sent when a guild member is updated. This will also fire when the user object of a guild member
 * changes.
 *
 * @remarks
 * If using Gateway Intents, the `GUILD_MEMBERS` intent will be required to receive this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-update|Gateway}
 */
export interface GuildMemberUpdate extends EventPayload<GatewayEvent.GuildMemberUpdate> {
	d: GuildIdentifiable & {
		/**
		 * User role IDs.
		 */
		roles: Snowflake[];

		/**
		 * The user.
		 */
		user: User;

		/**
		 * Nickname of the user in the guild.
		 */
		nick?: Nullable<string>;

		/**
		 * The member's guild avatar hash.
		 */
		avatar: Nullable<string>;

		/**
		 * When the user joined the guild.
		 */
		joined_at: Nullable<string>;

		/**
		 * When the user starting boosting the guild.
		 */
		premium_since?: Nullable<string>;

		/**
		 * Whether the user is deafened in voice channels.
		 */
		deaf?: boolean;

		/**
		 * Whether the user is muted in voice channels.
		 */
		mute?: boolean;

		/**
		 * Whether the user has not yet passed the guild's Membership Screening requirements.
		 */
		pending?: boolean;
	};
}

/**
 * Sent in response to Guild Request Members. You can use the `chunk_index` and `chunk_count`
 * to calculate how many chunks are left for your request.
 *​
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-members-chunk|Gateway}
 */
export interface GuildMemberChunk extends EventPayload<GatewayEvent.GuildMemberChunk> {
	d: GuildIdentifiable & {
		/**
		 * Set of guild members.
		 */
		members: GuildMember[];

		/**
		 * The chunk index in the expected chunks for this response (`0` ≤ `chunk_index` \<
		 * `chunk_count`)
		 */
		chunk_index: number;

		/**
		 * The total number of expected chunks for this response.
		 */
		chunk_count: number;

		/**
		 * If passing an invalid ID to `REQUEST_GUILD_MEMBERS`, it will be returned here.
		 */
		not_found?: Snowflake[];

		/**
		 * If passing `true` to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be
		 * here.
		 */
		presences?: PresenceUpdate['d'][];

		/**
		 * The nonce used in the Guild Members Request.
		 */
		nonce?: string;
	};
}

/**
 * Sent when a guild role is created.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-create|Gateway}
 */
export interface GuildRoleCreate extends EventPayload<GatewayEvent.GuildRoleCreate> {
	d: GuildIdentifiable & {
		/**
		 * The role created.
		 */
		role: Role;
	};
}

/**
 * Sent when a guild role is updated.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-update|Gateway}
 */
export interface GuildRoleUpdate extends EventPayload<GatewayEvent.GuildRoleUpdate> {
	d: GuildIdentifiable & {
		/**
		 * The role updated.
		 */
		role: Role;
	};
}

/**
 * Sent when a guild role is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-delete|Gateway}
 */
export interface GuildRoleDelete extends EventPayload<GatewayEvent.GuildRoleDelete> {
	d: GuildIdentifiable & {
		/**
		 * ID of the role.
		 */
		role_id: Snowflake;
	};
}

/**
 * Sent when an integration is created.
 */
export interface IntegrationCreate extends EventPayload<GatewayEvent.IntegrationCreate> {
	d: Integration & GuildIdentifiable;
}

/**
 * Sent when an integration is updated.
 */
export interface IntegrationUpdate extends EventPayload<GatewayEvent.IntegrationUpdate> {
	d: Integration & GuildIdentifiable;
}

/**
 * Sent when an integration is deleted.
 */
export interface IntegrationDelete extends EventPayload<GatewayEvent.IntegrationDelete> {
	d: Identifiable &
		GuildIdentifiable & {
			/**
			 * ID of the bot/OAuth2 application for this discord integration.
			 */
			application_id?: Snowflake;
		};
}

/**
 * Sent when a new invite to a channel is created.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invite-create|Gateway}
 */
export interface InviteCreate extends EventPayload<GatewayEvent.InviteCreate> {
	d: Partial<GuildIdentifiable> & {
		/**
		 * The channel the invite is for.
		 */
		channel_id: Snowflake;

		/**
		 * The unique invite code.
		 */
		code: string;

		/**
		 * The time at which the invite was created.
		 */
		created_at: string;

		/**
		 * The user that created the invite.
		 */
		inviter?: User;

		/**
		 * How long the invite is valid for (in seconds).
		 */
		max_age: number;

		/**
		 * The maximum number of times the invite can be used.
		 */
		max_uses: number;

		/**
		 * The type of target for this voice channel invite.
		 */
		target_type?: InviteTargetType;

		/**
		 * The user whose stream to display for this voice channel stream invite.
		 */
		target_user?: User;

		/**
		 * The embedded application to open for this voice channel embedded application invite
		 */
		target_application?: PartialApplication;

		/**
		 * Whether or not the invite is temporary (invited users will be kicked on disconnect unless
		 * they're assigned a role).
		 */
		temporary: boolean;

		/**
		 * How many times the invite has been used.
		 */
		readonly uses: 0;
	};
}

/**
 * Sent when an invite is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invite-delete|Gateway}
 */
export interface InviteDelete extends EventPayload<GatewayEvent.InviteDelete> {
	d: Pick<InviteCreate['d'], 'guild_id' | 'code'> & {
		/**
		 * The channel of the invite.
		 */
		channel_id: Snowflake;
	};
}

/**
 * Sent when a message is created.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-create|Gateway}
 */
export interface MessageCreate extends EventPayload<GatewayEvent.MessageCreate> {
	d: Message;
}

/**
 * Sent when a message is updated.
 *
 * @remarks
 * Unlike creates, message updates may contain only a subset of the full message object payload (but
 * will always contain an `id` and `channel_id`).
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-update|Gateway}
 */
export interface MessageUpdate extends EventPayload<GatewayEvent.MessageUpdate> {
	d: Message;
}

/**
 * Sent when a message is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-delete|Gateway}
 */
export interface MessageDelete extends EventPayload<GatewayEvent.MessageDelete> {
	d: Identifiable &
		GuildIdentifiable & {
			/**
			 * The ID of the channel.
			 */
			channel_id: Snowflake;
		};
}

/**
 * Sent when multiple messages are deleted at once.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-delete-bulk|Gateway}
 */
export interface MessageDeleteBulk extends EventPayload<GatewayEvent.MessageDeleteBulk> {
	d: Pick<MessageDelete['d'], 'channel_id' | 'guild_id'> & {
		/**
		 * The IDs of the messages.
		 */
		ids: Snowflake[];
	};
}

/**
 * Sent when a user adds a reaction to a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-add|Gateway}
 */
export interface MessageReactionAdd extends EventPayload<GatewayEvent.MessageReactionAdd> {
	d: Partial<GuildIdentifiable> & {
		/**
		 * The ID of the user.
		 */
		user_id: Snowflake;

		/**
		 * The ID of the channel.
		 */
		channel_id: Snowflake;

		/**
		 * The ID of the message.
		 */
		message_id: Snowflake;

		/**
		 * The member who reacted if this happened in a guild.
		 */
		member?: GuildMember;

		/**
		 * The emoji used to react.
		 */
		emoji: PartialEmoji;
	};
}

/**
 * Sent when a user removes a reaction from a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove|Gateway}
 */
export interface MessageReactionRemove extends EventPayload<GatewayEvent.MessageReactionRemove> {
	d: Omit<MessageReactionAdd['d'], 'member'>;
}

/**
 * Sent when a user explicitly removes all reactions from a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all|Gateway}
 */
export interface MessageReactionRemoveAll extends EventPayload<GatewayEvent.MessageReactionRemoveAll> {
	d: Omit<MessageReactionRemove, 'user_id' | 'emoji'>;
}

/**
 * Sent when a bot removes all instances of a given emoji from the reactions of a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji|Gateway}
 */
export interface MessageReactionRemoveEmoji extends EventPayload<GatewayEvent.MessageReactionRemoveEmoji> {
	d: MessageReactionRemoveAll & {
		/**
		 * The emoji that was removed.
		 */
		emoji: PartialEmoji;
	};
}

/**
 * Sent when a user's presence or info, such as name or avatar, is updated.
 *
 * @remarks
 * - If you are using Gateway Intents, you *must* specify the `GUILD_PRESENCES` intent in order to
 * receive Presence Update events.
 * - The user object within this event can be partial, the only field which must be sent is the `id`
 * field, everything else is optional. Along with this limitation, no fields are required, and the
 * types of the fields are **not** validated. Your client should expect any combination of fields
 * and types within this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#presence-update|Gateway}
 */
export interface PresenceUpdate extends EventPayload<GatewayEvent.PresenceUpdate> {
	d: Partial<GuildIdentifiable> & {
		/**
		 * The user presence is being updated for.
		 */
		user?: Required<Pick<User, 'id'>> & Partial<Omit<User, 'id'>>;

		/**
		 * Either `idle`, `dnd`, `online`, or `offline`.
		 */
		status?: string;

		/**
		 * The user's current activities.
		 */
		activities: Activity[];

		/**
		 * User's platform-dependent status.
		 */
		client_status?: ClientStatus;
	};
}

/**
 * Sent when a user starts typing in a channel.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#typing-start|Gateway}
 */
export interface TypingStart extends EventPayload<GatewayEvent.TypingStart> {
	d: Partial<GuildIdentifiable> & {
		/**
		 * ID of the channel.
		 */
		channel_id: Snowflake;

		/**
		 * ID of the user.
		 */
		user_id: Snowflake;

		/**
		 * Unix time (in seconds) of when the user started typing.
		 */
		timestamp: number;

		/**
		 * The member who started typing if this happened in a guild.
		 */
		member?: GuildMember;
	};
}

/**
 * Sent when properties about the user change.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#user-update|Gateway}
 */
export interface UserUpdate extends EventPayload<GatewayEvent.UserUpdate> {
	d: User;
}

/**
 * Sent when someone joins/leaves/moves voice channels.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#voice-state-update|Gateway}
 */
export interface VoiceStateUpdate extends EventPayload<GatewayEvent.VoiceStateUpdate> {
	d: VoiceState;
}

/**
 * Sent when a guild's voice server is updated. This is sent when initially connecting to voice, and
 * when the current voice instance fails over to a new server.
 *
 * @remarks
 * A `null` endpoint means that the voice server allocated has gone away and is trying to be
 * reallocated. You should attempt to disconnect from the currently connected voice server, and not
 * attempt to reconnect until a new voice server is allocated.
 */
export interface VoiceServerUpdate extends EventPayload<GatewayEvent.VoiceServerUpdate> {
	d: GuildIdentifiable & {
		/**
		 * Voice connection token.
		 */
		token: string;

		/**
		 * The voice server host.
		 */
		endpoint: Nullable<string>;
	};
}

/**
 * Sent when a guild channel's webhook is created, updated, or deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#webhooks-update|Gateway}
 */
export interface WebhooksUpdate extends EventPayload<GatewayEvent.WebhooksUpdate> {
	d: GuildIdentifiable & {
		/**
		 * ID of the channel.
		 */
		channel_id: Snowflake;
	};
}

/**
 * Sent when a new Slash Command is created, relevant to the current user.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#application-command-create|Gateway}
 */
export interface ApplicationCommandCreate extends EventPayload<GatewayEvent.ApplicationCommandCreate> {
	d: ApplicationCommand & Partial<GuildIdentifiable>;
}

/**
 * Sent when a new Slash Command relevant to the current user is updated.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#application-command-update|Gateway}
 */
export interface ApplicationCommandDelete extends EventPayload<GatewayEvent.ApplicationCommandDelete> {
	d: ApplicationCommand & Partial<GuildIdentifiable>;
}

/**
 * Sent when a new Slash Command relevant to the current user is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#application-command-delete|Gateway}
 */
export interface ApplicationCommandUpdate extends EventPayload<GatewayEvent.ApplicationCommandUpdate> {
	d: ApplicationCommand & Partial<GuildIdentifiable>;
}

/**
 * Sent when a user in a guild uses a Slash Command.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#interaction-create|Gateway}
 */
export interface InteractionCreate extends EventPayload<GatewayEvent.InteractionCreate> {
	d: Interaction;
}

/**
 * Sent when a Stage Instance is created.
 */
export interface StageInstanceCreate extends EventPayload<GatewayEvent.StageInstanceCreate> {
	d: StageInstance;
}

/**
 * Sent when a Stage Instance has been updated.
 */
export interface StageInstanceUpdate extends EventPayload<GatewayEvent.StageInstanceUpdate> {
	d: StageInstance;
}

/**
 * Sent when a Stage Instance has been deleted.
 */
export interface StageInstanceDelete extends EventPayload<GatewayEvent.StageInstanceCreate> {
	d: StageInstance;
}
