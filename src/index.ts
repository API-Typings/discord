export * from './Activity';
export * from './AuditLog';
export * from './Channel';
export * from './Command';
export * from './Embed';
export * from './Emoji';
export * from './Gateway';
export * from './Guild';
export * from './Interaction';
export * from './Invite';
export * from './Member';
export * from './Message';
export * from './Template';
export * from './User';
export * from './Voice';
export * from './Webhook';

/**
 * @source
 * {@link https://discord.com/developers/docs/reference#snowflakes Snowflakes}
 */
export const DiscordEpoch = 1420070400000;

export enum BaseURL {
	/**
	 * @source
	 * {@link https://discord.com/developers/docs/reference#api-reference-base-url Base URL}
	 */
	API = 'https://discord.com/api/v8',

	/**
	 * @source
	 * {@link https://discord.com/developers/docs/reference#image-formatting-image-base-url Image Base URL}
	 */
	CDN = 'https://cdn.discordapp.com'
}

export enum HTTPCodes {
	Ok = 200,
	Created,
	NoContent = 204,
	NotModified = 304,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidding = 403,
	NotFound,
	DisallowedMethod,
	RateLimited = 429,
	Unavailable = 502
}

export type Nullable<T> = T | null;

/**
 * @source
 * {@link https://discord.com/developers/docs/topics/gateway#connecting Connecting}
 */
export type EncodingType = 'json' | 'etf';
