import { Nullable, Snowflake } from '../';
import { Activity, ClientStatus, Presence } from '../Activity';
import { Channel } from '../Channel';
import { Command } from '../Command';
import { Emoji, PartialEmoji } from '../Emoji';
import { Guild, UnavailableGuild } from '../Guild';
import { Interaction } from '../Interaction';
import { TargetUser } from '../Invite';
import { Member, Role } from '../Member';
import { Message } from '../Message';
import { PartialUser, User } from '../User';
import { VoiceState } from '../Voice';
import { BasePayload, OPCodes } from './';

interface EventPayload<E extends Event, D = Record<string, any>> extends BasePayload {
	op: OPCodes.Dispatch;
	t: E;
	d: D;
}

interface GuildData {
	/**
	 * The ID of the guild
	 */
	guild_id: Snowflake;
}

export interface ChannelPinsUpdateData {
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
}

/**
 * Sent on connection to the websocket. Defines the heartbeat interval that the client should heartbeat to.
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
 * Sent when an integration is deleted
 */
export interface IntegrationDeleteData extends GuildData {
	/**
	 * Integration ID
	 */
	id: Snowflake;

	/**
	 * ID of the bot/OAuth2 application for this discord integration
	 */
	application_id?: Snowflake;
}

/**
 * Sent to indicate one of at least three different situations:
 *
 * - The gateway could not initialize a session after receiving an {@link https://discord.com/developers/docs/topics/gateway#identify Opcode 2 Identify}
 * - The gateway could not resume a previous session after receiving an {@link https://discord.com/developers/docs/topics/gateway#resume Opcode 6 Resume}
 * - The gateway has invalidated an active session and is requesting client action
 *
 * The inner `d` key is a boolean that indicates whether the session may be resumable. See
 * {@link https://discord.com/developers/docs/topics/gateway#connecting Connecting} and
 * {@link https://discord.com/developers/docs/topics/gateway#resuming Resuming} for more information.
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

export interface InviteCreateData extends GuildData {
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

export interface MemberChunkData extends GuildData {
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
	not_found?: Snowflake[];

	/**
	 * If passing true to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here
	 */
	presences?: Presence[];

	/**
	 * The nonce used in the {@link https://discord.com/developers/docs/topics/gateway#request-guild-members Guild Members Request}
	 */
	nonce?: string;
}

export interface MessageDeleteData extends Partial<GuildData> {
	/**
	 * The ID of the message
	 */
	id: Snowflake;

	/**
	 * The ID of the channel
	 */
	channel_id: Snowflake;
}

export interface MessageReactionData extends Partial<GuildData> {
	/**
	 * The ID of the user
	 */
	user_id: Snowflake;

	/**
	 * The ID of the channel
	 */
	channel_id: Snowflake;

	/**
	 * The id of the message
	 */
	message_id: Snowflake;

	/**
	 * The emoji used to react
	 */
	emoji: PartialEmoji;
}

export interface PresenceUpdateData extends Partial<GuildData> {
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

export interface ReadyData {
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
}

export interface TypingStartData extends Partial<GuildData> {
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;

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
	member?: Member;
}

export interface VoiceServerUpdateData extends GuildData {
	/**
	 * Coice connection token
	 */
	token: string;

	/**
	 * The voice server host
	 */
	endpoint: Nullable<string>;
}

export enum Event {
	Ready = 'READY',
	Resumed = 'RESUMED',
	GuildCreate = 'GUILD_CREATE',
	GuildDelete = 'GUILD_DELETE',
	GuildUpdate = 'GUILD_UPDATE',
	InviteCreate = 'INVITE_CREATE',
	InviteDelete = 'INVITE_DELETE',
	MemberAdd = 'GUILD_MEMBER_ADD',
	MemberRemove = 'GUILD_MEMBER_REMOVE',
	MemberUpdate = 'GUILD_MEMBER_UPDATE',
	MemberChunk = 'GUILD_MEMBERS_CHUNK',
	GuildIntegrationsUpdate = 'GUILD_INTEGRATIONS_UPDATE',
	IntegrationCreate = 'INTEGRATION_CREATE',
	IntegrationUpdate = 'INTEGRATION_UPDATE',
	IntegrationDelete = 'INTEGRATION_DELETE',
	RoleCreate = 'GUILD_ROLE_CREATE',
	RoleDelete = 'GUILD_ROLE_DELETE',
	RoleUpdate = 'GUILD_ROLE_UPDATE',
	GuildBanAdd = 'GUILD_BAN_ADD',
	GuildBanRemove = 'GUILD_BAN_REMOVE',
	EmojisUpdate = 'GUILD_EMOJIS_UPDATE',
	InteractionCreate = 'INTERACTION_CREATE',
	ApplicationCommandCreate = 'APPLICATION_COMMAND_CREATE',
	ApplicationCommandUpdate = 'APPLICATION_COMMAND_UPDATE',
	ApplicationCommandDelete = 'APPLICATION_COMMAND_DELETE',
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
 * Sent when a new {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommand Slash Command} is created, relevant to the current user
 */
export type ApplicationCommandCreate = EventPayload<Event.ApplicationCommandCreate, Command & GuildData>;

/**
 * Sent when a new {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommand Slash Command} relevant to the current user is updated
 */
export type ApplicationCommandDelete = EventPayload<Event.ApplicationCommandDelete, Command & GuildData>;

/**
 * Sent when a new {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommand Slash Command} relevant to the current user is deleted
 */
export type ApplicationCommandUpdate = EventPayload<Event.ApplicationCommandUpdate, Command & GuildData>;

/**
 * Sent when a new guild channel is created, relevant to the current user. The inner payload is
 * a {@link https://discord.com/developers/docs/resources/channel#channel-object channel} object.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-create Gateway}
 */
export type ChannelCreate = EventPayload<Event.ChannelCreate, Channel>;

/**
 * Sent when a channel relevant to the current user is deleted. The inner payload is
 * a {@link https://discord.com/developers/docs/resources/channel#channel-object channel} object.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-delete Gateway}
 */
export type ChannelDelete = EventPayload<Event.ChannelDelete, Channel>;

/**
 * Sent when a message is pinned or unpinned in a text channel. This is not sent when a pinned message is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-pins-update Gateway}
 */
export type ChannelPinsUpdate = EventPayload<Event.ChannelPinsUpdate, ChannelPinsUpdateData>;
/**
 * Sent when a channel is updated. The inner payload is a {@link https://discord.com/developers/docs/resources/channel#channel-object channel} object.
 *
 * @remarks
 * This is not sent when the field `last_message_id` is altered. To keep track of the `last_message_id` changes, you
 * must listen for {@link https://discord.com/developers/docs/topics/gateway#message-create Message Create} events.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#channel-update Gateway}
 */
export type ChannelUpdate = EventPayload<Event.ChannelUpdate, Channel>;

/**
 * Sent when a guild's emojis have been updated
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-emojis-update Gateway}
 */
export type EmojisUpdate = EventPayload<Event.EmojisUpdate, EmojisUpdateData>;

export type EmojisUpdateData = GuildData & {
	/**
	 * Array of {@link https://discord.com/developers/docs/resources/emoji#emoji-object emojis}
	 */
	emojis: Emoji[];
};

/**
 * Sent when a user is banned from a guild.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-ban-add Gateway}
 */
export type GuildBanAdd = EventPayload<Event.GuildBanAdd, GuildBanData>;

export type GuildBanData = GuildData & {
	/**
	 * The banned user
	 */
	user: User;
};

/**
 * Sent when a user is unbanned from a guild
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-ban-remove Gateway}
 */
export type GuildBanRemove = EventPayload<Event.GuildBanRemove, GuildBanData>;

/**
 * This event can be sent in three different scenarios:
 *
 * 1. When a user is initially connecting, to lazily load and backfill information for all unavailable guilds sent in
 * 	  the {@link https://discord.com/developers/docs/topics/gateway#ready Ready} event. Guilds that are unavailable due
 *    to an outage will send a {@link https://discord.com/developers/docs/topics/gateway#guild-delete Guild Delete} event.
 * 2. When a Guild becomes available again to the client.
 * 3. When the current user joins a new Guild.
 *
 * The inner payload is a {@link https://discord.com/developers/docs/resources/guild#guild-object guild} object, with all the extra fields specified.
 *
 * @warning
 * If you are using Gateway Intents, members and presences returned in this event will only
 * contain your bot and users in voice channels unless you specify the `GUILD_PRESENCES` intent.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-create Gateway}
 */
export type GuildCreate = EventPayload<Event.GuildCreate, Guild>;

/**
 * Sent when a guild becomes or was already unavailable due to an outage, or when the user leaves or is removed from a guild. The
 * inner payload is an {@link https://discord.com/developers/docs/resources/guild#unavailable-guild-object unavailable guild} object.
 * If the unavailable `field` is not set, the user was removed from the guild.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-delete Gateway}
 */
export type GuildDelete = EventPayload<Event.GuildDelete, Guild>;

/**
 * Sent when a guild integration is updated
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-integrations-update Gateway}
 */
export type IntegrationsUpdate = EventPayload<Event.GuildIntegrationsUpdate, GuildData>;

/**
 * Sent when a guild is updated. The inner payload is a {@link https://discord.com/developers/docs/resources/guild#guild-object guild} object.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-update Gateway}
 */
export type GuildUpdate = EventPayload<Event.GuildUpdate, Guild>;

/**
 * Sent when a user in a guild uses a {@link https://discord.com/developers/docs/interactions/slash-commands Slash Command}
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#interaction-create Gateway}
 */
export type InteractionCreate = EventPayload<Event.InteractionCreate, Interaction>;

/**
 * Sent when a new invite to a channel is created
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invite-create Gateway}
 */
export type InviteCreate = EventPayload<Event.InviteCreate, InviteCreateData>;

/**
 * Sent when an invite is deleted
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#invite-delete Gateway}
 */
export type InviteDelete = EventPayload<Event.InviteDelete, InviteDeleteData>;

export type InviteDeleteData = Pick<InviteCreateData, 'guild_id' | 'channel_id' | 'code'>;

/**
 * Sent when a new user joins a guild. The inner payload is a
 * {@link https://discord.com/developers/docs/resources/guild#guild-member-object guild member} object with an extra `guild_id` key
 *
 * @warning If using Gateway Intents, the `GUILD_MEMBERS` intent will be required to receive this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-add Gateway}
 */
export type MemberAdd = EventPayload<Event.MemberAdd, MemberAddData>;

export type MemberAddData = Member & GuildData;

/**
 * Sent in response to {@link https://discord.com/developers/docs/topics/gateway#request-guild-members Guild Request Members}.
 * You can use the `chunk_index` and `chunk_count` to calculate how many chunks are left for your request.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-members-chunk Gateway}
 */
export type MemberChunk = EventPayload<Event.MemberChunk, MemberChunkData>;

/**
 * Sent when a user is removed from a guild (leave/kick/ban).
 *
 * @warning If using Gateway Intents, the `GUILD_MEMBERS` intent will be required to receive this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-remove Gateway}
 */
export type MemberRemove = EventPayload<Event.MemberRemove, MemberRemoveData>;

export type MemberRemoveData = GuildData & {
	/**
	 * The user who was removed
	 */
	user: User;
};

/**
 * Sent when a guild member is updated. This will also fire when the user object of a guild member changes.
 *
 * @warning If using Gateway Intents, the `GUILD_MEMBERS` intent will be required to receive this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-member-update Gateway}
 */
export type MemberUpdate = EventPayload<Event.MemberUpdate, MemberUpdateData>;

export type MemberUpdateData = GuildData &
	Required<Pick<Member, 'user'>> &
	Partial<Pick<Member, 'deaf' | 'mute'>> & {
		/**
		 * User role IDs
		 */
		roles: Snowflake[];
	};

/**
 * Sent when multiple messages are deleted at once.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-delete-bulk Gateway}
 */
export type MessageBulkDelete = EventPayload<Event.MessageDeleteBulk, MessageBulkDeleteData>;

export type MessageBulkDeleteData = Pick<MessageDeleteData, 'channel_id' | 'guild_id'> & {
	/**
	 * The IDs of the messages
	 */
	ids: Snowflake[];
};

/**
 * Sent when a message is created. The inner payload is a {@link https://discord.com/developers/docs/resources/channel#message-object message} object.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-create Gateway}
 */
export type MessageCreate = EventPayload<Event.MessageCreate, Message>;

/**
 * Sent when a message is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-delete Gateway}
 */
export type MessageDelete = EventPayload<Event.MessageDelete, MessageDeleteData>;

/**
 * Sent when a user removes a reaction from a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove Gateway}
 */
export type MessageReactionRemove = EventPayload<Event.MessageReactionRemove, MessageReactionData>;

/**
 * Sent when a bot removes all instances of a given emoji from the reactions of a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji Gateway}
 */
export type MessageReactionRemoveEmoji = EventPayload<Event.MessageReactionRemoveEmoji, MessageReactionRemoveEmojiData>;

export type MessageReactionRemoveEmojiData = Pick<MessageReactionData, 'channel_id' | 'guild_id' | 'message_id'> & {
	/**
	 * The emoji that was removed
	 */
	emoji: PartialEmoji;
};

/**
 * Sent when a user adds a reaction to a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-add Gateway}
 */
export type MessageReactionAdd = EventPayload<Event.MessageReactionAdd, MessageReactionAddData>;

export type MessageReactionAddData = Omit<MessageReactionData, 'emoji'> & {
	/**
	 * The member who reacted if this happened in a guild
	 */
	member?: Member;
};

/**
 * Sent when a user explicitly removes all reactions from a message.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all Gateway}
 */
export type MessageReactionRemoveAll = EventPayload<Event.MessageReactionRemoveAll, MessageReactionRemoveAllData>;

export type MessageReactionRemoveAllData = Omit<MessageReactionRemoveEmoji, 'o' | 'd' | 't' | 'emoji'>;

/**
 * Sent when a message is updated. The inner payload is a {@link https://discord.com/developers/docs/resources/channel#message-object message} object.
 *
 * @warning Unlike creates, message updates may contain only a subset of the full message object payload (but will always contain an `id` and `channel_id`).
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#message-update Gateway}
 */
export type MessageUpdate = EventPayload<Event.MessageUpdate, Message>;

/**
 * Sent when a user's presence or info, such as name or avatar, is updated.
 *
 * @warning
 * - If you are using Gateway Intents, you must specify the `GUILD_PRESENCES` intent in order to receive Presence Update events
 * - The user object within this event can be partial, the only field which must be sent is the `id` field, everything else is optional. Along with this
 *   limitation, no fields are required, and the types of the fields are not validated. Your client should expect any combination of fields and types within this event.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#presence-update Gateway}
 */
export type PresenceUpdate = EventPayload<Event.PresenceUpdate, PresenceUpdateData>;

/**
 * Dispatched when a client has completed the initial handshake with the gateway (for new sessions).
 *
 * @remarks
 * The ready event can be the largest and most complex event the gateway will send, as it contains
 * all the state required for a client to begin interacting with the rest of the platform.
 *
 * `guilds` are the guilds of which your bot is a member. They start out as unavailable when you connect to the gateway. As they become available, your bot
 *  will be notified via {@link https://discord.com/developers/docs/topics/gateway#guild-create Guild Create} events. `private_channels` will be an empty array.
 *  As bots receive private messages, they will be notified via {@link https://discord.com/developers/docs/topics/gateway#channel-create Channel Create} events.
 */
export type Ready = EventPayload<Event.Ready, ReadyData>;

/**
 * Sent when a guild role is created
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-create Gateway}
 */
export type RoleCreate = EventPayload<Event.RoleCreate, RoleData>;

export type RoleData = GuildData & {
	/**
	 * The role created/updated
	 */
	role: Role;
};

/**
 * Sent when a guild role is deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-delete Gateway}
 */
export type RoleDelete = EventPayload<Event.RoleDelete, RoleDeleteData>;

export type RoleDeleteData = GuildData & {
	/**
	 * ID of the role
	 */
	role_id: Snowflake;
};

/**
 * Sent when a guild role is updated.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#guild-role-update Gateway}
 */
export type RoleUpdate = EventPayload<Event.RoleUpdate, RoleData>;

/**
 * Sent when a user starts typing in a channel.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#typing-start Gateway}
 */
export type TypingStart = EventPayload<Event.TypingStart, TypingStartData>;

/**
 * Sent when properties about the user change.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#user-update Gateway}
 */
export type UserUpdate = EventPayload<Event.UserUpdate, User>;

/**
 * Sent when a guild's voice server is updated.
 */
export type VoiceServerUpdate = EventPayload<Event.VoiceServerUpdate, VoiceServerUpdateData>;

/**
 * Sent when someone joins/leaves/moves voice channels.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#voice-state-update Gateway}
 */
export type VoiceStateUpdate = EventPayload<Event.VoiceStateUpdate, VoiceState>;

/**
 * Sent when a guild channel's webhook is created, updated, or deleted.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#webhooks-update Gateway}
 */
export type WebhooksUpdate = EventPayload<Event.WebhooksUpdate, WebhooksUpdateData>;

export type WebhooksUpdateData = GuildData & {
	/**
	 * ID of the channel
	 */
	channel_id: Snowflake;
};
