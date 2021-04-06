import type { Nullable } from 'extended-utility-types';
import type { GatewayEvent, GatewayOPCode } from '../../';

export * from './Activity';
export * from './Commands';
export * from './Events';

// ANCHOR Gateway Payload

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#payloads-gateway-payload-structure|Gateway}
 */
export interface GatewayPayload {
	/**
	 * OPCode for the payload.
	 */
	op: GatewayOPCode;

	/**
	 * Event data.
	 */
	d: Nullable<unknown>;

	/**
	 * Sequence number, used for resuming sessions and heartbeats.
	 *
	 * @remarks
	 * `s` and `t` are `null` when `op` is not `0` (Gateway Dispatch Opcode).
	 */
	s: Nullable<number>;

	/**
	 * The event name for this payload.
	 *
	 * @remarks
	 * `s` and `t` are `null` when `op` is not `0` (Gateway Dispatch Opcode).
	 */
	t: Nullable<GatewayEvent>;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#connecting-gateway-url-params|Gateway}
 */
export interface GatewayURL {
	/**
	 * Gateway Version to use.
	 */
	v: 8;

	/**
	 * The encoding of received gateway packets.
	 */
	encoding: EncodingType;

	/**
	 * The (optional) compression of gateway packets.
	 */
	compress?: 'zlib-stream';
}

/**
 * @remarks
 * While using ETF there are some additional constraints to note:
 * - Snowflake IDs are transmitted as 64-bit integers over ETF.
 * - The client must not send compressed messages to the server.
 * - Payloads must use string keys, atom keys will lead to a 4002 decode error.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#etfjson|Gateway}
 */
export type EncodingType = 'json' | 'etf';

/**
 * @endpoint [GET](https://discord.com/developers/docs/topics/gateway#get-gateway-bot) `/gateway/bot`
 *
 * @remarks
 * - Unlike the Get Gateway, this route should not be cached for extended periods of time as the
 * value is not guaranteed to be the same per-call, and changes as the bot joins/leaves guilds.
 * - This endpoint requires authentication using a valid bot token.
 */
export interface GetGatewayBot {
	/**
	 * An object based on the information in Get Gateway, plus additional metadata that can help
	 * during the operation of large or sharded bots.
	 */
	response: {
		/**
		 * The WSS URL that can be used for connecting to the gateway.
		 */
		url: string;

		/**
		 * The recommended number of shards to use when connecting.
		 */
		shards: number;

		/**
		 * Information on the current session start limit.
		 */
		session_start_limit: SessionStartLimit;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#session-start-limit-object-session-start-limit-structure|Gateway}
 */
export interface SessionStartLimit {
	/**
	 * The total number of session starts the current user is allowed.
	 */
	total: number;

	/**
	 * The remaining number of session starts the current user is allowed.
	 */
	remaining: number;

	/**
	 * The number of milliseconds after which the limit resets.
	 */
	reset_after: number;

	/**
	 * The number of identify requests allowed per 5 seconds.
	 */
	max_concurrency: number;
}

// ANCHOR Gateway Intents

/**
 * When identifying to the gateway, you can specify an `intents` parameter which allows you to
 * conditionally subscribe to pre-defined "intents", groups of events defined by Discord. If you do
 * not specify a certain intent, you will not receive any of the gateway events that are batched
 * into that group.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#list-of-intents|Gateway}
 */
export enum Intents {
	/**
	 * GUILDS (1 \<\< 0)
	 *
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
	 * GUILD_MEMBERS (1 \<\< 1)
	 *
	 * - `GUILD_MEMBER_ADD`
	 * - `GUILD_MEMBER_UPDATE`
	 * - `GUILD_MEMBER_REMOVE`
	 */
	GuildMembers = 1 << 1,

	/**
	 * GUILD_BANS (1 \<\< 2)
	 *
	 * - `GUILD_BAN_ADD`
	 * - `GUILD_BAN_REMOVE`
	 */
	GuildBans = 1 << 2,

	/**
	 * GUILD_EMOJIS (1 \<\< 3)
	 *
	 * - `GUILD_EMOJIS_UPDATE`
	 */
	GuildEmojis = 1 << 3,

	/**
	 * GUILD_INTEGRATIONS (1 \<\< 4)
	 *
	 * - `GUILD_INTEGRATIONS_UPDATE`
	 * - `INTEGRATION_CREATE`
	 * - `INTEGRATION_UPDATE`
	 * - `INTEGRATION_DELETE`
	 */
	GuildIntegrations = 1 << 4,

	/**
	 * GUILD_WEBHOOKS (1 \<\< 5)
	 *
	 * - `WEBHOOKS_UPDATE`
	 */
	GuildWebhooks = 1 << 5,

	/**
	 * GUILD_INVITES (1 \<\< 6)
	 *
	 * - `INVITE_CREATE`
	 * - `INVITE_DELETE`
	 */
	GuildInvites = 1 << 6,

	/**
	 * GUILD_VOICE_STATES (1 \<\< 7)
	 *
	 * - `VOICE_STATE_UPDATE`
	 */
	GuildVoiceStates = 1 << 7,

	/**
	 * GUILD_PRESENCES (1 \<\< 8)
	 *
	 * - `PRESENCE_UPDATE`
	 */
	GuildPresences = 1 << 8,

	/**
	 * GUILD_MESSAGES (1 \<\< 9)
	 *
	 * - `MESSAGE_CREATE`
	 * - `MESSAGE_UPDATE`
	 * - `MESSAGE_DELETE`
	 * - `MESSAGE_DELETE_BULK`
	 */
	GuildMessages = 1 << 9,

	/**
	 * GUILD_MESSAGE_REACTIONS (1 \<\< 10)
	 *
	 * - `MESSAGE_REACTION_REMOVE`
	 * - `MESSAGE_REACTION_ADD`
	 * - `MESSAGE_REACTION_REMOVE_ALL`
	 * - `MESSAGE_REACTION_REMOVE_EMOJI`
	 */
	GuildMessageReactions = 1 << 10,

	/**
	 * GUILD_MESSAGE_TYPING (1 \<\< 11)
	 *
	 * - `TYPING_START`
	 */
	GuildMessageTyping = 1 << 11,

	/**
	 * DIRECT_MESSAGES (1 \<\< 12)
	 *
	 * - `MESSAGE_CREATE`
	 * - `MESSAGE_UPDATE`
	 * - `MESSAGE_DELETE`
	 * - `CHANNEL_PINS_UPDATE`
	 */
	DirectMessages = 1 << 12,

	/**
	 * DIRECT_MESSAGE_REACTIONS (1 \<\< 13)
	 *
	 * - `MESSAGE_REACTION_ADD`
	 * - `MESSAGE_REACTION_REMOVE`
	 * - `MESSAGE_REACTION_REMOVE_ALL`
	 * - `MESSAGE_REACTION_REMOVE_EMOJI`
	 */
	DirectMessageReactions = 1 << 13,

	/**
	 * DIRECT_MESSAGE_TYPING (1 \<\< 14)
	 *
	 * - `TYPING_START`
	 */
	DirectMessageTyping = 1 << 14,
	All = (1 << 15) - 1
}
