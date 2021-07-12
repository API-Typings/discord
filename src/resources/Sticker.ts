import type { Nullable } from 'extended-utility-types';
import type { Identifiable, Snowflake, User } from '../';

/**
 * Represents a sticker that can be sent in messages.
 */
export type Sticker = GuildSticker | StandardSticker;

export interface BaseSticker extends StickerItem {
	description: string;
}

export interface GuildSticker extends BaseSticker {
	readonly type: StickerType.Guild;

	/**
	 * The Discord name of a unicode emoji representing the sticker's expression.
	 */
	tags: string;

	/**
	 * Whether this guild sticker can be used; may be `false` due to loss of Server boosts.
	 */
	available: boolean;
	guild_id: Snowflake;

	/**
	 * The user that uploaded the guild sticker.
	 */
	user?: User;
}

export interface StandardSticker extends BaseSticker {
	readonly type: StickerType.Standard;
	pack_id: Snowflake;

	/**
	 * A comma-separated list of related expressions.
	 */
	tags: string;

	/**
	 * The standard sticker's sort order within its pack.
	 */
	sort_value: number;
}

export enum StickerType {
	/**
	 * An official sticker in a pack, part of Nitro, or in a removed purchaseable pack.
	 */
	Standard = 1,

	/**
	 * A sticker uploaded to a Boosted guild for the guild's members.
	 */
	Guild
}

export enum StickerFormatType {
	PNG = 1,
	APNG,
	Lottie
}

/**
 * The smallest amount of data required to render a sticker; a partial sticker object.
 */
export interface StickerItem extends Identifiable {
	name: string;
	format_type: StickerFormatType;
}

/**
 * Represents a pack of standard stickers.
 */
export interface StickerPack extends Identifiable {
	/**
	 * The stickers in the pack.
	 */
	stickers: StandardSticker[];
	name: string;
	sku_id: Snowflake;

	/**
	 * ID of a sticker in the pack which is shown as the pack's icon.
	 */
	cover_sticker_id?: Snowflake;
	description: string;

	/**
	 * ID of the sticker's pack banner image.
	 */
	banner_asset_id: Snowflake;
}

// SECTION Endpoints

/**
 * Returns a sticker object for the given sticker ID.
 *
 * @endpoint GET `/stickers/{sticker.id}`
 */
export interface GetSticker {
	response: StandardSticker;
}

/**
 * Returns the list of sticker packs available to Nitro subscribers.
 *
 * @endpoint GET `/sticker-packs`
 */
export interface ListNitroStickerPacks {
	response: {
		sticker_packs: StickerPack[];
	};
}

/**
 * Returns a sticker object for the given guild and sticker IDs. Includes the `user` field if the
 * bot has the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @endpoint GET `/guilds/{guild.id}/stickers`
 */
export interface ListGuildStickers {
	response: GuildSticker[];
}

/**
 * Create a new sticker for the guild. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @remarks
 * Send a `multipart/form-data` body.
 *
 * @endpoint GET `/guilds/{guild.id}/stickers/{sticker.id}`
 */
export interface GetGuildSticker {
	response: GuildSticker;
}

/**
 * Modify the given sticker. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @endpoint POST `/guilds/{guild.id}/stickers`
 */
export interface CreateGuildSticker {
	body: {
		/**
		 * Name of the sticker (`2-30` characters).
		 */
		name: string;

		/**
		 * Description of the sticker (empty or `2-100` characters).
		 */
		description: string;

		/**
		 * The discord name of a unicode emoji representing the sticker's expression (`2-100`
		 * characters).
		 */
		tags: string;

		/**
		 * The sticker file to upload; must be a `PNG`, `APNG`, or Lottie `JSON` file (max
		 * `500 kb`).
		 */
		file: unknown;
	};

	response: Sticker;
}

/**
 * Delete the given sticker. Requires the `MANAGE_EMOJIS_AND_STICKERS` permission.
 *
 * @endpoint PATCH `/guilds/{guild.id}/stickers/{sticker.id}`
 */
export interface ModifyGuildSticker {
	body: Partial<
		Pick<CreateGuildSticker['body'], 'name' | 'tags'> & Nullable<Pick<CreateGuildSticker['body'], 'description'>>
	>;

	response: Sticker;
}

/**
 * @endpoint DELETE `/guilds/{guild.id}/stickers/{sticker.id}`
 */
export interface DeleteGuildSticker {
	response: never;
}

// !SECTION
