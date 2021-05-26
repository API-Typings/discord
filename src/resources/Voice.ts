import type { Nullable } from 'extended-utility-types';
import type { GuildMember, Snowflake } from '../';

/**
 * Represents a user's voice connection status.
 *
 * @source {@link https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure|Voice}
 */
export interface VoiceState {
	/**
	 * The guild ID this voice state is for.
	 */
	guild_id?: Snowflake;

	/**
	 * The channel ID this user is connected to.
	 */
	channel_id: Nullable<Snowflake>;

	/**
	 * The user ID this voice state is for.
	 */
	user_id: Snowflake;

	/**
	 * The guild member this voice state is for, or `null` if the user is in a live stage but not
	 * in the guild.
	 */
	member?: Nullable<GuildMember>;

	/**
	 * The session ID for this voice state.
	 */
	session_id: string;

	/**
	 * Whether this user is deafened by the server.
	 */
	deaf: boolean;

	/**
	 * Whether this user is muted by the server.
	 */
	mute: boolean;

	/**
	 * Whether this user is locally deafened.
	 */
	self_deaf: boolean;

	/**
	 * Whether this user is locally muted.
	 */
	self_mute: boolean;

	/**
	 * Whether this user is streaming using "Go Live".
	 */
	self_stream?: boolean;

	/**
	 * Whether this user's camera is enabled.
	 */
	self_video: boolean;

	/**
	 * Whether this user is muted by the current user.
	 */
	suppress: boolean;

	/**
	 * The time at which the user requested to speak.
	 */
	request_to_speak_timestamp: Nullable<string>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure|Voice}
 */
export interface VoiceRegion {
	/**
	 * Unique ID for the region.
	 */
	id: Snowflake;

	/**
	 * Name of the region.
	 */
	name: string;

	/**
	 * True if this is a VIP-only server.
	 */
	vip: boolean;

	/**
	 * True for a single server that is closest to the current user's client.
	 */
	optimal: boolean;

	/**
	 * Whether this is a deprecated voice region (avoid switching to these).
	 */
	deprecated: boolean;

	/**
	 * Whether this is a custom voice region (used for events/etc.).
	 */
	custom: boolean;
}

// SECTION Endpoints

/**
 * Returns an array of voice region objects that can be used when creating servers.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/voice#list-voice-regions) `/voice/regions`
 */
export type ListVoiceRegions = { response: VoiceRegion[] };

// !SECTION
