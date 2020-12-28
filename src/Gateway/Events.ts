import { Nullable } from '..';
import { Channel } from '../Channel';
import { Message } from '../Message';
import { VoiceState } from '../Voice';
import { TargetUser } from '../Invite';
import { BasePayload, OPCodes } from '.';
import { Member, Role } from '../Member';
import { PartialUser, User } from '../User';
import { Emoji, PartialEmoji } from '../Emoji';
import { Guild, UnavailableGuild } from '../Guild';
import { Activity, ClientStatus, Presence } from '../Activity';
import { Interaction } from '../Interaction';

interface EventPayload<E extends Events, D = Record<string, any>> extends BasePayload {
	op: OPCodes.Dispatch;
	t: E;
	d: D;
}

interface GuildData {
	/**
	 * The ID of the guild
	 */
	guild_id: string;
}

/**
 * Sent when a message is pinned or unpinned in a text channel
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-pins-update Gateway}
 */
export interface ChannelPinsUpdate extends EventPayload<Events.ChannelPinsUpdate, ChannelPinsUpdate> {
	/**
	 * The ID of the guild
	 */
	guild_id?: string;

	/**
	 * The ID of the channel
	 */
	channel_id: string;

	/**
	 * The time at which the most recent pinned message was pinned
	 */
	last_pin_timestamp?: Nullable<string>;
}

/**
 * Sent in response to {@link https://discord.com/developers/docs/topics/gateway#request-guild-members Guild Request Members}
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-members-chunk Gateway}
 */
export interface GuildMembersChunk extends GuildData, EventPayload<Events.GuildMembersChunk, GuildMembersChunk> {
	/**
	 * Set of guild members
	 */
	members: Member[];

	/**
	 * The chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count)
	 */
	chunk_index: number;

	/**
	 * The total number of expected chunks for this response
	 */
	chunk_count: number;

	/**
	 * If passing an invalid ID to `REQUEST_GUILD_MEMBERS`, it will be returned here
	 */
	not_found?: string[];

	/**
	 * If passing true to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here
	 */
	presences?: Presence[];

	/**
	 * The nonce used in the {@link https://discord.com/developers/docs/topics/gateway#request-guild-members Guild Members Request}
	 */
	nonce?: string;
}

/**
 * Sent when a guild member is updated
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-update Gateway}
 */
export interface GuildMemberUpdate extends GuildData, EventPayload<Events.GuildMemberUpdate, GuildMemberUpdate> {
	/**
	 * User role IDs
	 */
	roles: string[];

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
}

/**
 * Sent on connection to the websocket. Defines the heartbeat interval that the client should heartbeat to
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#hello-hello-structure Gateway}
 */
export interface Hello {
	op: OPCodes.Hello;
	d: {
		/**
		 * The interval (in milliseconds) the client should heartbeat with
		 */
		heartbeat_interval: number;
	};
}

/**
 * Sent in response to receiving a heartbeat to acknowledge that it has been received
 */
export interface HeartbeatAck {
	op: OPCodes.HeartbeatAck;
}

/**
 * Sent when:
 *
 * 1. The gateway could not initialize a session after receiving an {@link https://discord.com/developers/docs/topics/gateway#identify Opcode 2 Identify}
 * 2. The gateway could not resume a previous session after receiving an {@link https://discord.com/developers/docs/topics/gateway#resume Opcode 6 Resume}
 * 3. The gateway has invalidated an active session and is requesting client action
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invalid-session Gateway}
 */
export interface InvalidSession {
	op: OPCodes.InvalidSession;

	/**
	 * A boolean that indicates whether the session may be resumable
	 */
	d: boolean;
}

/**
 * Sent when a new invite to a channel is created
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invite-create Gateway}
 */
export interface InviteCreate extends GuildData, EventPayload<Events.InviteCreate, InviteCreate> {
	/**
	 * The channel the invite is for
	 */
	channel_id: string;

	/**
	 * The unique invite {@link https://discord.com/developers/docs/resources/invite#invite-object code}
	 */
	code: string;

	/**
	 * The time at which the invite was created
	 */
	created_at: string;

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
}

/**
 * Sent when a message is deleted
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-delete Gateway}
 */
export interface MessageDelete extends Partial<GuildData>, EventPayload<Events.MessageDelete, MessageDelete> {
	/**
	 * The ID of the message
	 */
	id: string;

	/**
	 * The ID of the channel
	 */
	channel_id: string;
}

export interface MessageReactionData extends Partial<GuildData> {
	/**
	 * The ID of the user
	 */
	user_id: string;

	/**
	 * The ID of the channel
	 */
	channel_id: string;

	/**
	 * The id of the message
	 */
	message_id: string;

	/**
	 * The emoji used to react
	 */
	emoji: PartialEmoji;
}

/**
 * Sent when a user's presence or info, such as name or avatar, is updated
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#presence-update Gateway}
 */
export interface PresenceUpdate extends Partial<GuildData>, EventPayload<Events.PresenceUpdate, PresenceUpdate> {
	/**
	 * tThe user presence is being updated for
	 */
	user?: Partial<User>;

	/**
	 * Either "idle", "dnd", "online", or "offline"
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
}

/**
 * Dispatched when a client has completed the initial handshake with the gateway (for new sessions)
 */
export interface Ready extends EventPayload<Events.Ready, Ready> {
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
		id: string;

		/**
		 * The application's public flags
		 */
		flags: number;
	};
}

/**
 * Sent when a user starts typing in a channel
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#typing-start Gateway}
 */
export interface TypingStart extends Partial<GuildData>, EventPayload<Events.TypingStart, TypingStart> {
	/**
	 * ID of the channel
	 */
	channel_id: string;

	/**
	 * ID of the user
	 */
	user_id: string;

	/**
	 * Unix time (in seconds) of when the user started typing
	 */
	timestamp: number;

	/**
	 * The member who started typing if this happened in a guild
	 */
	member?: Member;
}

export interface VoiceServerUpdate extends GuildData, EventPayload<Events.VoiceServerUpdate, VoiceServerUpdate> {
	/**
	 * Coice connection token
	 */
	token: string;

	/**
	 * The voice server host
	 */
	endpoint: string;
}

export enum Events {
	Ready = 'READY',
	Resumed = 'RESUMED',
	GuildCreate = 'GUILD_CREATE',
	GuildDelete = 'GUILD_DELETE',
	GuildUpdate = 'GUILD_UPDATE',
	InviteCreate = 'INVITE_CREATE',
	InviteDelete = 'INVITE_DELETE',
	GuildMemberAdd = 'GUILD_MEMBER_ADD',
	GuildMemberRemove = 'GUILD_MEMBER_REMOVE',
	GuildMemberUpdate = 'GUILD_MEMBER_UPDATE',
	GuildMembersChunk = 'GUILD_MEMBERS_CHUNK',
	GuildIntegrationsUpdate = 'GUILD_INTEGRATIONS_UPDATE',
	GuildRoleCreate = 'GUILD_ROLE_CREATE',
	GuildRoleDelete = 'GUILD_ROLE_DELETE',
	GuildRoleUpdate = 'GUILD_ROLE_UPDATE',
	GuildBanAdd = 'GUILD_BAN_ADD',
	GuildBanRemove = 'GUILD_BAN_REMOVE',
	GuildEmojisUpdate = 'GUILD_EMOJIS_UPDATE',
	InteractionCreate = 'INTERACTION_CREATE',
	ChannelCreate = 'CHANNEL_CREATE',
	ChannelDelete = 'CHANNEL_DELETE',
	ChannelUpdate = 'CHANNEL_UPDATE',
	ChannelPinsUpdate = 'CHANNEL_PINS_UPDATE',
	MessageCreate = 'MESSAGE_CREATE',
	MessageDelete = 'MESSAGE_DELETE',
	MessageUpdate = 'MESSAGE_UPDATE',
	MessageDeleteBulk = 'MESSAGE_DELETE_BULK',
	MessageReactionAdd = 'MESSAGE_REACTION_ADD',
	MessageReactionRemove = 'MESSAGE_REACTION_REMOVE',
	MessageReactionRemoveAll = 'MESSAGE_REACTION_REMOVE_ALL',
	MessageReactionRemoveEmoji = 'MESSAGE_REACTION_REMOVE_EMOJI',
	UserUpdate = 'USER_UPDATE',
	PresenceUpdate = 'PRESENCE_UPDATE',
	TypingStart = 'TYPING_START',
	VoiceStateUpdate = 'VOICE_STATE_UPDATE',
	VoiceServerUpdate = 'VOICE_SERVER_UPDATE',
	WebhooksUpdate = 'WEBHOOKS_UPDATE'
}

/**
 * Sent when a new guild channel is created, relevant to the current user
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-create Gateway}
 */
export type ChannelCreate = EventPayload<Events.ChannelCreate, Channel>;

/**
 * Sent when a channel relevant to the current user is deleted
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-delete Gateway}
 */
export type ChannelDelete = EventPayload<Events.ChannelDelete, Channel>;

/**
 * Sent when a channel is updated
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-update Gateway}
 */
export type ChannelUpdate = EventPayload<Events.ChannelUpdate, Channel>;

/**
 * Sent when a user is banned from a guild
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-ban-add Gateway}
 */
export type GuildBanAdd = EventPayload<
	Events.GuildBanAdd,
	GuildData & {
		/**
		 * The banned user
		 */
		user: User;
	}
>;

/**
 * Sent when a user is unbanned from a guild
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-ban-remove Gateway}
 */
export type GuildBanRemove = EventPayload<
	Events.GuildBanRemove,
	GuildData & {
		/**
		 * The unbanned user
		 */
		user: User;
	}
>;

/**
 * Sent when:
 *
 * 1. A user is initially connecting, to lazily load and backfill information for all unavailable guilds sent in the {@link https://discord.com/developers/docs/topics/gateway#ready Ready} event
 * 2. A Guild becomes available again to the client
 * 3. The current user joines a new Guild
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-create Gateway}
 */
export type GuildCreate = EventPayload<Events.GuildCreate, Guild>;

/**
 * Sent when a guild becomes or was already unavailable due to an outage, or when the user leaves or is removed from a guild
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-delete Gateway}
 */
export type GuildDelete = EventPayload<Events.GuildDelete, Guild>;

/**
 * Sent when a guild's emojis have been updated
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-emojis-update Gateway}
 */
export type GuildEmojisUpdate = EventPayload<
	Events.GuildEmojisUpdate,
	GuildData & {
		/**
		 * Array of {@link https://discord.com/developers/docs/resources/emoji#emoji-object} emojis
		 */
		emojis: Emoji[];
	}
>;

/**
 * Sent when a guild integration is updated
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-integrations-update Gateway}
 */
export type GuildIntegrationsUpdate = EventPayload<Events.GuildIntegrationsUpdate, GuildData>;

/**
 * Sent when a new user joins a guild
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-add Gateway}
 */
export type GuildMemberAdd = EventPayload<Events.GuildMemberAdd, Member & GuildData>;

/**
 * Sent when a user is removed from a guild (leave/kick/ban)
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-remove Gateway}
 */
export type GuildMemberRemove = EventPayload<
	Events.GuildMemberRemove,
	GuildData & {
		/**
		 * The user who was removed
		 */
		user: User;
	}
>;

/**
 * Sent when a guild role is created
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-create Gateway}
 */
export type GuildRoleCreate = EventPayload<
	Events.GuildRoleCreate,
	GuildData & {
		/**
		 * The role created
		 */
		role: Role;
	}
>;

/**
 * Sent when a guild role is deleted
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-delete Gateway}
 */
export type GuildRoleDelete = EventPayload<
	Events.GuildRoleDelete,
	GuildData & {
		/**
		 * ID of the role
		 */
		role_id: string;
	}
>;

/**
 * Sent when a guild role is updated
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-update Gateway}
 */
export type GuildRoleUpdate = EventPayload<
	Events.GuildRoleUpdate,
	GuildData & {
		/**
		 * The role updated
		 */
		role: Role;
	}
>;

/**
 * Sent when a guild is updated
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-update Gateway}
 */
export type GuildUpdate = EventPayload<Events.GuildUpdate, Guild>;

/**
 * Sent when a user in a guild uses a {@link https://discord.com/developers/docs/interactions/slash-commands Slash Command}
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#interaction-create Gateway}
 */
export type InteractionCreate = EventPayload<Events.InteractionCreate, Interaction>;

/**
 * Sent when an invite is deleted
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invite-delete Gateway}
 */
export type InviteDelete = EventPayload<Events.InviteDelete, Pick<InviteCreate, 'guild_id' | 'channel_id' | 'code'>>;

/**
 * Sent when multiple messages are deleted at once
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-delete-bulk Gateway}
 */
export type MessageBulkDelete = EventPayload<
	Events.MessageDeleteBulk,
	Pick<MessageDelete, 'channel_id' | 'guild_id'> & {
		/**
		 * The IDs of the messages
		 */
		ids: string[];
	}
>;

/**
 * Sent when a message is created
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-create Gateway}
 */
export type MessageCreate = EventPayload<Events.MessageCreate, Message>;

/**
 * Sent when a user removes a reaction from a message
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove Gateway}
 */
export type MessageReactionRemove = EventPayload<Events.MessageReactionRemove, MessageReactionData>;

/**
 * Sent when a bot removes all instances of a given emoji from the reactions of a message
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji Gateway}
 */
export type MessageReactionRemoveEmoji = EventPayload<
	Events.MessageReactionRemoveEmoji,
	Pick<MessageReactionData, 'channel_id' | 'guild_id' | 'message_id'> & {
		/**
		 * The emoji that was removed
		 */
		emoji: PartialEmoji;
	}
>;

/**
 * Sent when a user adds a reaction to a message
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-add Gateway}
 */
export type MessageReactionAdd = EventPayload<
	Events.MessageReactionAdd,
	Omit<MessageReactionData, 'emoji'> & {
		/**
		 * The member who reacted if this happened in a guild
		 */
		member?: Member;
	}
>;

/**
 * Sent when a user explicitly removes all reactions from a message
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all Gateway}
 */
export type MessageReactionRemoveAll = EventPayload<
	Events.MessageReactionRemoveAll,
	Omit<MessageReactionRemoveEmoji, 'o' | 'd' | 't' | 'emoji'>
>;

/**
 * Sent when a message is updated
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-update Gateway}
 */
export type MessageUpdate = EventPayload<Events.MessageUpdate, Message>;

/**
 * Sent when properties about the user change
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#user-update Gateway}
 */
export type UserUpdate = EventPayload<Events.UserUpdate, User>;

/**
 * Sent when someone joins/leaves/moves voice channels
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#voice-state-update Gateway}
 */
export type VoiceStateUpdate = EventPayload<Events.VoiceStateUpdate, VoiceState>;

/**
 * Sent when a guild channel's webhook is created, updated, or deleted
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#webhooks-update Gateway}
 */
export type WebhooksUpdate = EventPayload<
	Events.WebhooksUpdate,
	GuildData & {
		/**
		 * ID of the channel
		 */
		channel_id: string;
	}
>;
