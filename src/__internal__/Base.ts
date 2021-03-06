import type { Nullable } from 'extended-utility-types';
import type {
	ComponentType,
	InteractionRequestType,
	Overwrite,
	PartialEmoji,
	Snowflake,
	StickerItem,
	User,
	WebhookURL
} from '../';
import type { GuildIdentifiable, Identifiable, WithType } from './';

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

export interface BaseWebhook extends Identifiable {
	/**
	 * The user this webhook was created by (not returned when getting a webhook with its token).
	 */
	user?: User;

	/**
	 * The default name of the webhook.
	 */
	name: Nullable<string>;

	/**
	 * The default user avatar hash of the webhook.
	 */
	avatar: Nullable<string>;

	/**
	 * The URL used for executing the webhook (returned by the webhooks OAuth2 flow).
	 */
	url?: WebhookURL;
}
