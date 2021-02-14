import type { Nullable, RangeOf } from '@api-typings/core';
import type { Activity, GatewayOPCode, GatewayPayload, Snowflake } from '../../';

// ANCHOR Command Payload

interface GatewayCommandPayload<O extends GatewayOPCode> extends GatewayPayload {
	op: O;
	t: null;
	s: null;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties|Gateway}
 */
export interface ConnectionProperties {
	/**
	 * Your operating system
	 */
	$os: string;

	/**
	 * Your library name
	 */
	$browser: string;

	/**
	 * Your library name
	 */
	$device: string;
}

// SECTION Gateway Commands

// ANCHOR Identify

/**
 * Used to trigger the initial handshake with the gateway.
 *
 * @remarks
 * If the payload is valid, the gateway will respond with a [Ready][1] event. Clients are limited
 * by [maximum concurrency][2] when [Identify][3]ing; if they exceed this limit, the gateway will
 * respond with an [Opcode 9 Invalid Session][4].
 *
 * @warning
 * Clients are limited to 1000 `IDENTIFY` calls to the websocket in a 24-hour period. This limit is
 * global and across all shards, but does not include `RESUME` calls. Upon hitting this limit, all
 * active sessions for the bot will be terminated, the bot's token will be reset, and the owner will
 * receive an email notification.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#identify|Gateway}
 *
 * [1]: https://discord.com/developers/docs/topics/gateway#ready
 * [2]: https://discord.com/developers/docs/topics/gateway#session-start-limit-object
 * [3]: https://discord.com/developers/docs/topics/gateway#identify
 * [4]: https://discord.com/developers/docs/topics/gateway#invalid-session
 */
export interface Identify extends GatewayCommandPayload<GatewayOPCode.Identify> {
	d: {
		/**
		 * Authentication token
		 */
		token: string;

		/**
		 * {@link https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties|Connection properties}
		 */
		properties: ConnectionProperties;

		/**
		 * Whether this connection supports compression of packets
		 *
		 * @defaultValue false
		 */
		compress?: boolean;

		/**
		 * Value between 50 and 250, total number of members where the gateway will stop sending
		 * offline members in the guild member list
		 *
		 * @defaultValue 50
		 */
		large_threshold?: RangeOf<50, 250>;

		/**
		 * Used for {@link https://discord.com/developers/docs/topics/gateway#sharding|Guild Sharding}
		 */
		shard?: [shard_id: number, num_shards: number];

		/**
		 * Presence structure for initial presence information
		 */
		presence?: Omit<UpdateStatus, 'op' | 'd'>;

		/**
		 * The {@link https://discord.com/developers/docs/topics/gateway#gateway-intents|Gateway Intents} you wish to receive
		 */
		intents: number;
	};
}

// ANCHOR Resume

/**
 * Used to replay missed events when a disconnected client resumes.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#resume|Gateway}
 */
export interface Resume extends GatewayCommandPayload<GatewayOPCode.Resume> {
	d: {
		/**
		 * Session token
		 */
		token: string;

		/**
		 * Session ID
		 */
		session_id: string;
		/**
		 * Last sequence number received
		 */
		seq: number;
	};
}

// ANCHOR Heartbeat

/**
 * Used to maintain an active gateway connection.
 *
 * @remarks
 * Must be sent every `heartbeat_interval` milliseconds after the [Opcode 10 Hello][1] payload is
 * received. The inner `d` key is the last sequence number—`s`—received by the client. If you have
 * not yet received one, send `null`.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#heartbeat|Gateway}
 *
 * [1]: https://discord.com/developers/docs/topics/gateway#hello
 */
export interface Heartbeat extends GatewayCommandPayload<GatewayOPCode.Heartbeat> {
	d: Nullable<number>;
}

// ANCHOR Request Guild Members

/**
 * Used to request all members for a guild or a list of guilds.
 *
 * @remarks
 * When initially connecting, if you are using [Gateway Intents][1] and don't have the
 * `GUILD_PRESENCES` intent, or if the guild is over 75k members, it will only send members who are
 * in voice, plus the member for you (the connecting user). Otherwise, if a guild has over
 * `large_threshold` members (value in the [Gateway Identify][2]), it will only send members who
 * are online, have a role, have a nickname, or are in a voice channel, and if it has under
 * `large_threshold` members, it will send all members.
 *
 * @limitations
 * - `GUILD_PRESENCES` intent is required to set `presences = true`. Otherwise, it will always be
 *   false
 * - `GUILD_MEMBERS` intent is required to request the entire member list—`(query=‘’, limit=0<=n)`
 * - You will be limited to requesting 1 `guild_id` per request
 * - Requesting a prefix (`query` parameter) will return a maximum of 100 members
 * - Requesting `user_ids` will continue to be limited to returning 100 members
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#request-guild-members|Gateway}
 *
 * [1]: https://discord.com/developers/docs/topics/gateway#gateway-intents
 * [2]: https://discord.com/developers/docs/topics/gateway#identify
 */
// prettier-ignore
export interface RequestGuildMembers extends GatewayCommandPayload<GatewayOPCode.RequestGuildMembers> {
	d: {
		/**
		 * ID of the guild to get members for
		 */
		guild_id: Snowflake;

		/**
		 * String that username starts with, or an empty string to return all members
		 */
		query?: string;

		/**
		 * Maximum number of members to send matching the `query`; a limit of `0` can be used with
		 * an empty string `query` to return all members
		 */
		limit: number;

		/**
		 * Used to specify if we want the presences of the matched members
		 */
		presences?: boolean;

		/**
		 * Used to specify which users you wish to fetch
		 */
		user_ids?: Snowflake | Snowflake[];

		/**
		 * Nonce to identify the {@link https://discord.com/developers/docs/topics/gateway#guild-members-chunk|Guild Members Chunk} response
		 */
		nonce?: string;
	};
}

// ANCHOR Update Voice State

/**
 * Sent when a client wants to join, move, or disconnect from a voice channel.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#update-voice-state|Gateway}
 */
export interface UpdateVoiceState {
	/**
	 * ID of the guild
	 */
	guild_id: Snowflake;

	/**
	 * ID of the voice channel client wants to join (`null` if disconnecting)
	 */
	channel_id: Nullable<Snowflake>;

	/**
	 * Is the client muted
	 */
	self_mute: boolean;

	/**
	 * Is the client deafened
	 */
	self_deaf: boolean;
}

// ANCHOR Update Status

/**
 * Sent by the client to indicate a presence or status update.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#update-status|Gateway}
 */
export interface UpdateStatus extends GatewayCommandPayload<GatewayOPCode.PresenceUpdate> {
	d: {
		/**
		 * Unix time (in milliseconds) of when the client went idle, or null if the client is not
		 * idle
		 */
		since: Nullable<number>;

		/**
		 * `null`, or the user's activities
		 */
		activities: Nullable<Activity[]>;

		/**
		 * The user's new {@link https://discord.com/developers/docs/topics/gateway#update-status-status-types|status}
		 */
		status: StatusType;

		/**
		 * Whether or not the client is AFK
		 */
		afk: boolean;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#update-status-status-types|Gateway}
 */
export type StatusType = 'idle' | 'dnd' | 'online' | 'offline' | 'invisbile';

// !SECTION
