import { Nullable, Snowflake, User } from './';

/**
 * @source {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure Emoji}
 */
export interface Emoji {
	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting Emoji ID}
	 */
	id: Nullable<Snowflake>;

	/**
	 * Emoji name
	 */
	name: Nullable<string>;

	/**
	 * Roles this emoji is whitelisted to
	 */
	roles?: string[];

	/**
	 * User that created this emoji
	 */
	user?: User;

	/**
	 * Whether this emoji must be wrapped in colons
	 */
	require_colons?: boolean;

	/**
	 * Whether this emoji is managed
	 */
	managed?: boolean;

	/**
	 * Whether this emoji is animated
	 */
	animated?: boolean;

	/**
	 * Whether this emoji can be used, may be false due to loss of Server Boosts
	 */
	available?: boolean;
}

export type PartialEmoji = Pick<Emoji, 'id' | 'name' | 'animated'>;

// SECTION Endpoints

/**
 * Create a new emoji for the guild
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/emoji#create-guild-emoji) `/guilds/{guild.id}/emojis`
 *
 * @returns The new {@link https://discord.com/developers/docs/resources/emoji#emoji-object emoji} object on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-emojis-update Guild Emojis Update} Gateway event
 */
export interface PostCreateEmoji {
	/**
	 * Name of the emoji
	 */
	name: string;

	/**
	 * The 128x128 emoji image
	 */
	image: string;

	/**
	 * Roles for which this emoji will be whitelisted
	 */
	roles: Snowflake[];
}

/**
 * Modify the given emoji
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/emoji#modify-guild-emoji) `/guilds/{guild.id}/emojis/{emoji.id}`
 *
 * @returns The updated {@link https://discord.com/developers/docs/resources/emoji#emoji-object emoji} object on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-emojis-update Guild Emojis Update} Gateway event
 */
export interface PatchModifyEmoji {
	/**
	 * Name of the emoji
	 */
	name: string;

	/**
	 * Roles for which this emoji will be whitelisted
	 */
	roles: Nullable<Snowflake[]>;
}

// !SECTION
