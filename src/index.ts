export * from './Activity';
export * from './AuditLog';
export * from './Channel';
export * from './Command';
export * from './Embed';
export * from './Gateway';
export * from './Guild';
export * from './Interaction';
export * from './Member';
export * from './Message';
export * from './User';
export * from './Webhook';

export const DiscordEpoch = 1420070400000;

export enum BaseURL {
	API = 'https://discord.com/api/v8',
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

export type EncodingType = 'json' | 'etf';
