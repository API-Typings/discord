import type { Nullable } from 'extended-utility-types';
import type { ComponentType, InteractionRequestType, Overwrite, PartialEmoji, Snowflake, StickerItem } from '../';
import type { Identifiable } from './';
import type { GuildIdentifiable, WithType } from './common';

export interface BaseButton extends WithType<ComponentType.Button> {
	/**
	 * Text that appears on the button, max `80` characters.
	 */
	label?: string;
	emoji?: PartialEmoji;

	/**
	 * Whether the button is disabled.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;
}

export interface BaseChannel extends Identifiable, GuildIdentifiable {
	/**
	 * Sorting position of the channel.
	 */
	position: number;

	/**
	 * Explicit permission overwrites for members and roles
	 */
	permission_overwrites: Overwrite[];

	/**
	 * The name of the channel (`1-100` characters).
	 */
	name: string;
	nsfw: boolean;

	/**
	 * ID of the parent category for a channel (each parent category can contain up to `50`
	 * channels).
	 */
	parent_id: Snowflake;

	/**
	 * When the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE`
	 * when a message is not pinned.
	 */
	last_pin_timestamp?: Nullable<string>;
}

export interface BaseInteraction extends Identifiable, WithType<InteractionRequestType> {
	/**
	 * ID of the application this interaction is for.
	 */
	application_id: Snowflake;

	/**
	 * A continuation token for responding to the interaction.
	 */
	token: string;
	readonly version: 1;
}

export interface BaseSticker extends StickerItem {
	description: string;
}
