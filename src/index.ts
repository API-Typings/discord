import type { DeepReadonly } from 'extended-utility-types';
import type { JSONErrorCode } from './';

export * from './interactions';
export * from './resources';
export * from './topics';
export * as Discord from './sdk';

/**
 * Milliseconds since Discord Epoch, the first second of `2015` or `1420070400000`.
 *
 * @source {@link https://discord.com/developers/docs/reference#snowflakes|Reference}
 */
export const DiscordEpoch = 1420070400000;

export enum BaseURL {
	/**
	 * @source {@link https://discord.com/developers/docs/reference#api-reference-base-url|Reference}
	 */
	API = 'https://discord.com/api/v9',

	/**
	 * @source {@link https://discord.com/developers/docs/reference#image-formatting-image-base-url|Reference}
	 */
	CDN = 'https://cdn.discordapp.com'
}

/**
 * Error responses will specify which JSON key contains the error, the error code, and a human
 * readable error message.
 *
 * @source {@link https://discord.com/developers/docs/reference#error-messages|Reference}
 */
export interface ErrorResponse {
	readonly code: JSONErrorCode;
	readonly errors?: ArrayError | ObjectError;
	readonly message: string;
}

/**
 * @source {@link https://discord.com/developers/docs/reference#error-messages-array-error|Reference}
 */
export type ArrayError = { readonly [index: string]: ObjectError };

/**
 * @source {@link https://discord.com/developers/docs/reference#error-messages-object-error|Reference}
 */
export type ObjectError = DeepReadonly<{
	[field: string]: { _errors: { code: string; message: string }[] };
}>;

export enum ClientReleaseChannel {
	Stable = 'stable',
	Beta = 'ptb',
	Alpha = 'canary'
}

/**
 * @source {@link https://discord.com/developers/docs/reference#snowflakes|Reference}
 */
export type Snowflake = `${bigint}`;

export type UserFormat = `<@${bigint}>`;

export type UserNicknameFormat = `<@!${bigint}>`;

export type ChannelFormat = `<#${bigint}>`;

export type RoleFormat = `<@&${bigint}>`;

export type CustomEmojiFormat = `<:${string}:${bigint}>`;

export type CustomEmojiAnimatedFormat = `<a:${string}:${bigint}>`;
