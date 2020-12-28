import { Nullable } from '..';
import { BasePayload, OPCodes } from '.';
import { Activity, StatusType } from '../Activity';

interface CommandPayload<O extends OPCodes, D = Record<string, any>> extends Omit<BasePayload, 't' | 's'> {
	op: O;
	d: D;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties Gateway}
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

/**
 * Used to trigger the initial handshake with the gateway
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#identify-identify-structure Gateway}
 */
export interface Identify extends CommandPayload<OPCodes.Identify, Identify> {
	/**
	 * Authentication token
	 */
	token: string;

	/**
	 * {@link https://discord.com/developers/docs/topics/gateway#identify-identify-connection-properties Connection properties}
	 */
	properties: ConnectionProperties;

	/**
	 * Whether this connection supports compression of packets
	 */
	compress?: boolean;

	/**
	 * Value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list
	 */
	large_threshold?: number;

	/**
	 * Used for {@link https://discord.com/developers/docs/topics/gateway#sharding Guild Sharding}
	 */
	shard?: [number, number];

	/**
	 * Presence structure for initial presence information
	 */
	presence?: UpdateStatus;

	/**
	 * Enables dispatching of guild subscription events (presence and typing events)
	 */
	guild_subscriptions?: boolean;

	/**
	 * The {@link https://discord.com/developers/docs/topics/gateway#gateway-intents Gateway Intents} you wish to receive
	 */
	intents: number;
}

/**
 * Used to request all members for a guild or a list of guilds
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#request-guild-members-guild-request-members-structure Gateway}
 */
export interface RequestMembers extends CommandPayload<OPCodes.RequestGuildMembers, RequestMembers> {
	/**
	 * ID of the guild to get members for
	 */
	guild_id: string;

	/**
	 * String that username starts with, or an empty string to return all members
	 */
	query?: string;

	/**
	 * Maximum number of members to send matching the `query`; a limit of `0` can be used with an empty string `query` to return all members
	 */
	limit: number;

	/**
	 * Used to specify if we want the presences of the matched members
	 */
	presences?: boolean;

	/**
	 * Used to specify which users you wish to fetch
	 */
	user_ids?: string | string[];

	/**
	 * Nonce to identify the {@link https://discord.com/developers/docs/topics/gateway#guild-members-chunk Guild Members Chunk} response
	 */
	nonce?: string;
}

/**
 * Used to replay missed events when a disconnected client resumes
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#resume-resume-structure Gateway}
 */
export interface Resume extends CommandPayload<OPCodes.Resume, Resume> {
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
}

/**
 * Sent by the client to indicate a presence or status update
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#update-status-gateway-status-update-structure Gateway}
 */
export interface UpdateStatus extends CommandPayload<OPCodes.StatusUpdate, UpdateStatus> {
	/**
	 * Unix time (in milliseconds) of when the client went idle, or null if the client is not idle
	 */
	since: Nullable<number>;

	/**
	 * `null`, or the user's activities
	 */
	activities: Nullable<Activity[]>;

	/**
	 * The user's new {@link https://discord.com/developers/docs/topics/gateway#update-status-status-types status}
	 */
	status: StatusType | 'invisible';

	/**
	 * Whether or not the client is AFK
	 */
	afk: boolean;
}

/**
 * Sent when a client wants to join, move, or disconnect from a voice channel
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#update-voice-state-gateway-voice-state-update-structure Gateway}
 */
export interface UpdateVoice extends CommandPayload<OPCodes.VoiceStateUpdate, UpdateVoice> {
	/**
	 * ID of the guild
	 */
	guild_id: string;

	/**
	 * ID of the voice channel client wants to join (`null` if disconnecting)
	 */
	channel_id: Nullable<string>;

	/**
	 * Is the client muted
	 */
	self_mute: boolean;

	/**
	 * Is the clean deafened
	 */
	self_deaf: boolean;
}

/**
 * Used to maintain an active gateway connection. Must be sent every `heartbeat_interval` milliseconds
 * after the {@link https://discord.com/developers/docs/topics/gateway#hello Opcode 10 Hello} payload is received
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#heartbeat Gateway}
 */
export type Heartbeat = CommandPayload<OPCodes.Heartbeat, Nullable<number>>;
