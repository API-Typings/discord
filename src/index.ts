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
export type Snowflake = `${bigint}`

export type CDNAchievementIcon = CDNEndpoint<'app-assets', `/achievements/${Snowflake}/icons/${string}.${ImageExtension}`>

export type CDNApplicationAsset = CDNEndpoint<'app-assets', `/${string}.${ImageExtension}`>

export type CDNApplicationIcon = CDNEndpoint<'app-icons', `${string}.${ImageExtension}`>

export type CDNCustomEmoji = CDNEndpoint<'emojis', '.png' | '.gif'>

export type CDNDefaultUserAvatar = `${BaseURL.CDN}/embed/avatars/${0 | 1 | 2 | 3 | 4}.png`

export type CDNDiscoverySplash = CDNEndpoint<'discovery-splashes', `/${string}.${ImageExtension}`>

export type CDNGuildBanner = CDNEndpoint<'banners', `/${string}.${ImageExtension}`>

export type CDNGuildIcon = CDNEndpoint<'icons', `/${string}.${ImageExtension | 'gif'}`>

export type CDNGuildSplash = CDNEndpoint<'splashes', `/${string}.${ImageExtension}`>

export type CDNTeamIcon = CDNEndpoint<'team-icons', `/${string}.${ImageExtension}`>

export type CDNUserAvatar = CDNEndpoint<'avatars', `/${string}.${ImageExtension | 'gif'}`>

export type Nullable<T> = T | null;

type CDNEndpoint<T extends string, R extends string> = `${BaseURL.CDN}/${T}/${Snowflake}${R}`

type ImageExtension = 'jpg' | 'jpeg' | 'png' | 'webp'