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
