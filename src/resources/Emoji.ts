import type { Nullable } from '@api-typings/core';
import type { Snowflake, User } from '../';

// ANCHOR Partial Emoji

/**
 * @source {@link https://discord.com/developers/docs/resources/emoji#emoji-object-gateway-reaction-standard-emoji-example|Emoji}
 */
export interface PartialEmoji {
	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting|Emoji ID}
	 */
	id: Nullable<Snowflake>;

	/**
	 * Emoji name
	 */
	name: Nullable<string>;

	/**
	 * Whether this emoji is animated
	 */
	animated?: boolean;
}

// ANCHOR Emoji

/**
 * @warning
 * Routes for controlling emojis do not follow the normal rate limit conventions. These
 * routes are specifically limited on a per-guild basis to prevent abuse. This means that
 * the quota returned by the API may be inaccurate, and you may encounter `429`s.
 *
 * @source {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure|Emoji}
 */
export interface Emoji extends PartialEmoji {
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
	 * Whether this emoji can be used, may be false due to loss of Server Boosts
	 */
	available?: boolean;
}

// SECTION Endpoints

/**
 * Create a new emoji for the guild. Requires the `MANAGE_EMOJIS` permission.
 *
 * @warning
 * Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than
 * this limit will fail and return `400 BAD REQUEST` and an error message, but not a JSON status code.
 *
 * @endpoint [POST] `/guilds/{guild.id}/emojis`
 *
 * @returns The new [emoji][1] object on success.
 * @fires A [Guild Emojis Update][2] Gateway event.
 *
 * [POST]: https://discord.com/developers/docs/resources/emoji#create-guild-emoji
 * [1]: https://discord.com/developers/docs/resources/emoji#emoji-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-emojis-update
 */
export interface CreateEmoji {
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
 * Modify the given emoji. Requires the `MANAGE_EMOJIS` permission.
 *
 * @endpoint [PATCH] `/guilds/{guild.id}/emojis/{emoji.id}`
 *
 * @returns The updated [emoji][1] object on success.
 * @fires A [Guild Emojis Update][2] Gateway event.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/emoji#modify-guild-emoji
 * [1]: https://discord.com/developers/docs/resources/emoji#emoji-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-emojis-update
 */
export interface ModifyEmoji {
	/**
	 * Name of the emoji
	 */
	name?: string;

	/**
	 * Roles for which this emoji will be whitelisted
	 */
	roles?: Nullable<Snowflake[]>;
}

// !SECTION
