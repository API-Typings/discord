import type { Nullable } from 'extended-utility-types';
import type { Snowflake, User } from '../';

/**
 * @source {@link https://discord.com/developers/docs/resources/emoji#emoji-object-gateway-reaction-standard-emoji-example|Emoji}
 */
export interface PartialEmoji {
	id: Nullable<Snowflake>;

	/**
	 * Emoji name.
	 */
	name: Nullable<string>;

	/**
	 * Whether this emoji is animated.
	 */
	animated?: boolean;
}

/**
 * @remarks
 * Routes for controlling emojis do not follow the normal rate limit conventions. These routes are
 * specifically limited on a per-guild basis to prevent abuse. This means that the quota returned
 * by the API may be inaccurate, and you may encounter `429`s.
 *
 * @source {@link https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure|Emoji}
 */
export interface Emoji extends PartialEmoji {
	/**
	 * Roles this emoji is whitelisted to.
	 */
	roles?: string[];

	/**
	 * User that created this emoji.
	 */
	user?: User;

	/**
	 * Whether this emoji must be wrapped in colons.
	 */
	require_colons?: boolean;

	/**
	 * Whether this emoji is managed.
	 */
	managed?: boolean;

	/**
	 * Whether this emoji can be used, may be `false` due to loss of Server Boosts.
	 */
	available?: boolean;
}

// SECTION Endpoints

/**
 * Returns a list of emoji objects for the given guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/emoji#list-guild-emojis) `/guilds/{guild.id}/emojis`
 */
export interface ListGuildEmojis {
	response: Emoji[];
}

/**
 * Returns an emoji object for the given guild and emoji IDs.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/emoji#get-guild-emojis) `/guilds/{guild.id}/emojis/{emoji.id}`
 */
export interface GetGuildEmoji {
	response: Emoji;
}

/**
 * Create a new emoji for the guild. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @remarks
 * Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji
 * larger than this limit will fail and return `400 BAD REQUEST` and an error message, but not a
 * JSON status code.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/emoji#create-guild-emoji) `/guilds/{guild.id}/emojis`
 */
export interface CreateGuildEmoji {
	body: {
		/**
		 * Name of the emoji.
		 */
		name: string;

		/**
		 * The `128x128` emoji image.
		 */
		image: string;

		/**
		 * Roles for which this emoji will be whitelisted.
		 */
		roles: Snowflake[];
	};

	/**
	 * The new emoji object.
	 */
	response: Emoji;
}

/**
 * Modify the given emoji. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/emoji#modify-guild-emoji) `/guilds/{guild.id}/emojis/{emoji.id}`
 */
export interface ModifyGuildEmoji {
	body: {
		/**
		 * Name of the emoji.
		 */
		name?: string;

		/**
		 * Roles for which this emoji will be whitelisted.
		 */
		roles?: Nullable<Snowflake[]>;
	};

	/**
	 * The updated emoji object.
	 */
	response: Emoji;
}

/**
 * Delete the given emoji. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/emoji#delete-guild-emoji) `/guilds/{guild.id}/emojis/{emoji.id}`
 */
export interface DeleteGuildEmoji {
	response: never;
}

// !SECTION
