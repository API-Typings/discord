import type { Snowflake, User } from '../';
import type { BaseSticker, GuildIdentifiable, Identifiable, WithType } from '../__internal__';

/**
 * Represents a sticker that can be sent in messages.
 */
export type Sticker = GuildSticker | StandardSticker;

export interface GuildSticker extends BaseSticker, GuildIdentifiable, WithType<StickerType.Guild> {
	/**
	 * The Discord name of a unicode emoji representing the sticker's expression.
	 */
	tags: string;

	/**
	 * Whether this guild sticker can be used; may be `false` due to loss of Server boosts.
	 */
	available: boolean;

	/**
	 * The user that uploaded the guild sticker.
	 */
	user?: User;
}

export interface StandardSticker extends BaseSticker, WithType<StickerType.Standard> {
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
