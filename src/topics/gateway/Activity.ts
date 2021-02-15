import type { Nullable } from '@api-typings/core';
import type { Snowflake, StatusType } from '../../';

// ANCHOR Client Status

/**
 * Active sessions are indicated with an `online`, `idle`, or `dnd` string per platform. If a user
 * is offline or invisible, the corresponding field is not present.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#client-status-object|Gateway}
 */
export interface ClientStatus {
	/**
	 * The user's status set for an active desktop (Windows, Linux, Mac) application session
	 */
	desktop?: ClientStatusType;

	/**
	 * The user's status set for an active mobile (iOS, Android) application session
	 */
	mobile?: ClientStatusType;

	/**
	 * The user's status set for an active web (browser, bot account) application session
	 */
	web?: ClientStatusType;
}

export type ClientStatusType = Omit<StatusType, 'offline' | 'invisible'>;

// SECTION Activity

/**
 * @info
 * Bots are only able to send `name`, `type`, and optionally `url`.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-structure|Gateway}
 */
export interface Activity {
	/**
	 * The activity's ID
	 */
	id?: string;

	/**
	 * The activity's name
	 */
	name: string;

	/**
	 * {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-types|Activity type}
	 */
	type: ActivityType;

	/**
	 * Stream url, is validated when type is 1
	 */
	url?: Nullable<string>;

	/**
	 * Unix timestamp of when the activity was added to the user's session
	 */
	created_at: number;

	/**
	 * Unix timestamps for start and/or end of the game
	 */
	timestamps?: ActivityTimestamps;

	/**
	 * The ID of the song on Spotify
	 */
	sync_id?: string;

	/**
	 * The platform the game is being played on (`desktop`, `samsung`, or `xbox`)
	 */
	platform?: ActivityPlatform;

	/**
	 * Application ID for the game
	 */
	application_id?: Snowflake;

	/**
	 * What the player is currently doing
	 */
	details?: Nullable<string>;

	/**
	 * The user's current party status
	 */
	state?: Nullable<string>;

	/**
	 * The emoji used for a custom status
	 */
	emoji?: Nullable<ActivityEmoji>;

	/**
	 * The ID of the game or Spotify session
	 */
	session_id?: string;

	/**
	 * Information for the current party of the player
	 */
	party?: ActivityParty;

	/**
	 * Images for the presence and their hover texts
	 */
	assets?: ActivityAssets;

	/**
	 * Secrets for Rich Presence joining and spectating
	 */
	secrets?: ActivitySecrets;

	/**
	 * Whether or not the activity is an instanced game session
	 */
	instance?: boolean;

	/**
	 * {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags|Activity flags} `OR`d together, describes what the payload includes
	 */
	flags?: ActivityFlags;

	/**
	 * The custom buttons shown in the Rich Presence (max 2)
	 */
	buttons?: ActivityButton[];
}

export type ActivityPlatform = 'desktop' | 'samsung' | 'xbox';

/**
 * @info
 * The streaming type currently only supports Twitch and YouTube. Only `https://twitch.tv/` and `https://youtube.com/` urls will work.
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-types|Gateway}
 */
export enum ActivityType {
	/**
	 * @format Playing \{name\}
	 */
	Game,

	/**
	 * @format Streaming \{details\}
	 */
	Streaming,

	/**
	 * @format Listening to \{name\}
	 */
	Listening,

	/**
	 * @format \{emoji\} \{name\}
	 */
	Custom,

	/**
	 * @format Competing in \{name\}
	 */
	Competing
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps|Gateway}
 */
export interface ActivityTimestamps {
	/**
	 * Unix time (in milliseconds) of when the activity started
	 */
	start?: number;

	/**
	 * Unix time (in milliseconds) of when the activity ends
	 */
	end?: number;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji|Gateway}
 */
export interface ActivityEmoji {
	/**
	 * The name of the emoji
	 */
	name: string;

	/**
	 * The ID of the emoji
	 */
	id?: Snowflake;

	/**
	 * Whether this emojis is animated
	 */
	animated?: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-party|Gateway}
 */
export interface ActivityParty {
	/**
	 * The ID of the party
	 */
	id?: string;

	/**
	 * Used to show the party's current and maximum size
	 */
	size?: [number, number];
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets|Gateway}
 */
export interface ActivityAssets {
	/**
	 * The ID for a large asset of the activity, usually a snowflake
	 */
	large_image?: string;

	/**
	 * Text displayed when hovering over the large image of the activity
	 */
	large_text?: string;

	/**
	 * The ID for a small asset of the activity, usually a snowflake
	 */
	small_image?: string;

	/**
	 * Text displayed when hovering over the small image of the activity
	 */
	small_text?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets|Gateway}
 */
export interface ActivitySecrets {
	/**
	 * The secret for joining a party
	 */
	join?: string;

	/**
	 * The secret for spectating a game
	 */
	spectate?: string;

	/**
	 * The secret for a specific instanced match
	 */
	match?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags|Gateway}
 */
export enum ActivityFlags {
	Instance = 1 << 0,
	Join = 1 << 1,
	Spectate = 1 << 2,
	JoinRequest = 1 << 3,
	Sync = 1 << 4,
	Play = 1 << 5
}

/**
 * When received over the gateway, the `buttons` field is an array of strings, which are the button
 * labels. Bots cannot access a user's activity button URLs. When sending, the `buttons` field must
 * be an array.
 */
export interface ActivityButton {
	/**
	 * The text shown on the button (1-32 characters)
	 */
	label: string;

	/**
	 * The url opened when clicking the button (1-512 characters)
	 */
	url: string;
}

// !SECTION
