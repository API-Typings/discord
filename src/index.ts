export * from './interactions';
export * from './resources';
export * from './topics';

/**
 * Milliseconds since Discord Epoch, the first second of 2015 or `1420070400000`
 *
 * @source {@link https://discord.com/developers/docs/reference#snowflakes Reference}
 */
export const DiscordEpoch: number = 1420070400000;

export enum BaseURL {
	/**
	 * @source {@link https://discord.com/developers/docs/reference#api-reference-base-url Reference}
	 */
	API = 'https://discord.com/api/v8',

	/**
	 * @source {@link https://discord.com/developers/docs/reference#image-formatting-image-base-url Reference}
	 */
	CDN = 'https://cdn.discordapp.com'
}

/**
 * @source {@link https://discord.com/developers/docs/reference#snowflakes Reference}
 */
export type Snowflake = `${bigint}`;

export type Nullable<T> = T | null;
