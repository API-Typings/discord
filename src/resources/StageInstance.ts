import type { Snowflake } from '../';
import type { GuildIdentifiable, Identifiable } from '../__internal__';

/**
 * A Stage Instance holds information about a live stage. When a Stage channel has no speakers for
 * a certain period of time (on the order of minutes) it will be automatically deleted.
 *
 * @source {@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-structure|Channel}
 */
export interface StageInstance extends Identifiable, GuildIdentifiable {
	/**
	 * The ID of the associated Stage channel.
	 */
	channel_id: Snowflake;

	/**
	 * The topic of the Stage instance (`1-120` characters).
	 */
	topic: string;

	/**
	 * The privacy level of the Stage instance.
	 */
	privacy_level: PrivacyLevel;

	/**
	 * Whether or not Stage discovery is disabled.
	 */
	discoverable_disabled: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level|Stage Instance}
 */
export enum PrivacyLevel {
	/**
	 * The Stage instance is visible publicly.
	 */
	Public,

	/**
	 * The Stage instance is visible to only guild members.
	 */
	GuildOnly
}
