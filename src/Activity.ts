import { Nullable } from '.';
import { User } from './User';

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-structure Gateway}
 */
export interface Activity {
	id?: string;

	/**
	 * The activity's name
	 */
	name: string;

	/**
	 * {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-types Activity type}
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
	timestamps?: ActivityTimestamp;
	sync_id?: string;
	platform?: string;

	/**
	 * Application ID for the game
	 */
	application_id?: string;

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
	 * {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags Activity flags} `OR`d together, describes what the payload includes
	 */
	flags?: ActivityFlags;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-assets Gateway}
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
 * @source {@link Gateway https://discord.com/developers/docs/topics/gateway#activity-object-activity-emoji}
 */
export interface ActivityEmoji {
	/**
	 * The name of the emoji
	 */
	name: string;

	/**
	 * The ID of the emoji
	 */
	id?: string;

	/**
	 * Whether this emojis is animated
	 */
	animated?: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-party Gateway}
 */
export interface ActivityParty {
	/**
	 * The id of the party
	 */
	id?: string;

	/**
	 * Used to show the party's current and maximum size
	 */
	size?: [number, number];
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-secrets Gateway}
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
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-timestamps Gateway}
 */
export interface ActivityTimestamp {
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
 * Active sessions are indicated with an "online", "idle", or "dnd" string per platform. If a user is offline or invisible, the corresponding field is not present
 *
 * @source {@link https://discord.com/developers/docs/topics/gateway#client-status-object Gateway}
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

/**
 * A user's presence is their current state on a guild
 */
export interface Presence {
	user: User;

	/**
	 * ID of the guild
	 */
	guild_id: string;

	/**
	 * Either "idle", "dnd", "online", or "offline"
	 */
	status: StatusType;

	/**
	 * User's current activities
	 */
	activities: Activity[];

	/**
	 * User's platform-dependent status
	 */
	client_status: ClientStatus;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags Gateway}
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
 * @source {@link https://discord.com/developers/docs/topics/gateway#activity-object-activity-types Gateway}
 */
export enum ActivityType {
	/**
	 * @format Playing {name}
	 */
	Game,

	/**
	 * @format Streaming {details}
	 */
	Streaming,

	/**
	 * @format Listening to {name}
	 */
	Listening,

	/**
	 * @format {emoji} {name}
	 */
	Custom,

	/**
	 * @format Competing in {name}
	 */
	Competing
}

export type ClientStatusType = Omit<StatusType, 'offline'>;

/**
 * @source {@link https://discord.com/developers/docs/topics/gateway#update-status-status-types Gateway}
 */
export type StatusType = 'idle' | 'dnd' | 'online' | 'offline';
