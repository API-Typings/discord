export * from './Codes';
export * from './Commands';
export * from './Events';

import { EncodingType, JSONErrorCodes, Nullable, OPCodes, Event } from '..';

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure Gateway}
 */
export interface BasePayload {
	/**
	 * {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-opcodes OPCode} for the payload
	 */
	op: OPCodes;

	/**
	 * Event data
	 */
	d: Nullable<any>;

	/**
	 * Sequence number, used for resuming sessions and heartbeats
	 */
	s: Nullable<number>;

	/**
	 * The event name for this payload
	 */
	t: Nullable<Event>;
}

export interface BotGateway {
	/**
	 * The WSS URL that can be used for connecting to the gateway
	 */
	url: string;

	/**
	 * The recommended number of shards to use when connecting
	 */
	shards: number;

	/**
	 * Information on the current session start limit
	 */
	session_start_limit: SessionStartLimit;
}

/**
 * @endpoint [GET](https://discord.com/developers/docs/topics/gateway#get-gateway-bot) `/gateway/bot`
 *
 * @returns An object based on the information in {@link https://discord.com/developers/docs/topics/gateway#get-gateway Get Gateway}
 */
export interface GetBotGateway {
	v: number;
	encoding: EncodingType;
	compress?: 'zlib-stream';
}

export interface JSONError {
	message: string;
	code: JSONErrorCodes;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#session-start-limit-object-session-start-limit-structure Gateway}
 */
export interface SessionStartLimit {
	/**
	 * The total number of session starts the current user is allowed
	 */
	total: number;

	/**
	 * The remaining number of session starts the current user is allowed
	 */
	remaining: number;

	/**
	 * The number of milliseconds after which the limit resets
	 */
	reset_after: number;

	/**
	 * The number of identify requests allowed per 5 seconds
	 */
	max_concurrency: number;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#list-of-intents Gateway}
 */
export enum Intents {
	/**
	 * - `GUILD_CREATE`
	 * - `GUILD_UPDATE`
	 * - `GUILD_DELETE`
	 * - `GUILD_ROLE_CREATE`
	 * - `GUILD_ROLE_UPDATE`
	 * - `GUILD_ROLE_DELETE`
	 * - `CHANNEL_CREATE`
	 * - `CHANNEL_UPDATE`
	 * - `CHANNEL_DELETE`
	 * - `CHANNEL_PINS_UPDATE`
	 */
	Guilds = 1 << 0,

	/**
	 * - `GUILD_MEMBER_ADD`
	 * - `GUILD_MEMBER_UPDATE`
	 * - `GUILD_MEMBER_REMOVE`
	 */
	Members = 1 << 1,

	/**
	 * - `GUILD_BAN_ADD`
	 * - `GUILD_BAN_REMOVE`
	 */
	GuildBans = 1 << 2,

	/**
	 * - `GUILD_EMOJIS_UPDATE`
	 */
	Emojis = 1 << 3,

	/**
	 * - `GUILD_INTEGRATIONS_UPDATE`
	 */
	Integrations = 1 << 4,

	/**
	 * - `WEBHOOKS_UPDATE`
	 */
	Webhooks = 1 << 5,

	/**
	 * - `INVITE_CREATE`
	 * - `INVITE_DELETE`
	 */
	Invites = 1 << 6,

	/**
	 * - `VOICE_STATE_UPDATE`
	 */
	VoiceStates = 1 << 7,

	/**
	 * - `PRESENCE_UPDATE`
	 */
	Presences = 1 << 8,

	/**
	 * - `MESSAGE_CREATE`
	 * - `MESSAGE_UPDATE`
	 * - `MESSAGE_DELETE`
	 * - `MESSAGE_DELETE_BULK`
	 */
	Messages = 1 << 9,

	/**
	 * - `MESSAGE_REACTION_REMOVE`
	 * - `MESSAGE_REACTION_ADD`
	 * - `MESSAGE_REACTION_REMOVE_ALL`
	 * - `MESSAGE_REACTION_REMOVE_EMOJI`
	 */
	MessageReactions = 1 << 10,

	/**
	 * - `TYPING_START`
	 */
	MessageTyping = 1 << 11,

	/**
	 * - `MESSAGE_CREATE`
	 * - `MESSAGE_UPDATE`
	 * - `MESSAGE_DELETE`
	 * - `CHANNEL_PINS_UPDATE`
	 */
	DirectMessages = 1 << 12,
	/**
	 * - `MESSAGE_REACTION_ADD`
	 * - `MESSAGE_REACTION_REMOVE`
	 * - `MESSAGE_REACTION_REMOVE_ALL`
	 * - `MESSAGE_REACTION_REMOVE_EMOJI`
	 */
	DirectMessageReactions = 1 << 13,

	/**
	 * - `TYPING_START`
	 */
	DirectMessageTyping = 1 << 14,
	All = (1 << 15) - 1
}
