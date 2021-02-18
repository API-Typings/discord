import type { Discord } from '../';
import type { Activity, User } from './';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/relationships#data-models-relationship-struct|Relationships}
 */
export interface Relationship {
	/**
	 * What kind of relationship it is.
	 */
	Type: RelationshipType;

	/**
	 * The user the relationship is for.
	 */
	User: User;

	/**
	 * That user's current presence.
	 */
	Presence: Presence;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/relationships#data-models-relationshiptype-enum|Relationships}
 */
export enum RelationshipType {
	/**
	 * User has no intrinsic relationship.
	 */
	None,

	/**
	 * User is a friend.
	 */
	Friend,

	/**
	 * User is blocked.
	 */
	Blocked,

	/**
	 * User has a pending incoming friend request to connected user.
	 */
	PendingIncoming,

	/**
	 * Current user has a pending outgoing friend request to user.
	 */
	PendingOutgoing,

	/**
	 * User is not friends, but interacts with current user often (frequency + recency).
	 */
	Implicit
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/relationships#data-models-presence-struct|Relationships}
 */
export interface Presence {
	/**
	 * The user's current online status.
	 */
	Status: Status;

	/**
	 * The user's current activity.
	 */
	Activity: Activity;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/relationships#data-models-status-enum|Relationships}
 */
export enum Status {
	Offline,
	Online,
	Idle,
	DoNotDisturb
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/relationships|Relationships}
 */
export interface RelationshipManager extends NodeJS.EventEmitter {
	/**
	 * Filters a user's relationship list by a boolean condition.
	 */
	Filter(callback: (relationship: Discord.Relationship) => boolean): void;

	/**
	 * Get the relationship between the current user and a given user by id.
	 *
	 * @param userId - The ID of the user to fetch
	 */
	Get(userId: bigint): Discord.Relationship;

	/**
	 * Get the relationship at a given index when iterating over a list of relationships.
	 *
	 * @param index - Index in the list
	 */
	GetAt(index: number): Discord.Relationship;

	/**
	 * Get the number of relationships that match your `Filter()`.
	 */
	Count(): number;

	/**
	 * Fires at initialization when Discord has cached a snapshot of the current status of all your
	 * relationships. Wait for this to fire before calling `Filter` within its callback.
	 */
	on(event: 'Refresh', listener: () => void): this;

	/**
	 * Fires when a relationship in the filtered list changes, like an updated presence or user
	 * attribute.
	 *
	 * @param relationship - The relationship that changed
	 */
	on(event: 'RelationshipUpdate', listener: (relationship: Discord.Relationship) => void): this;
}
