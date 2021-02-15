import type { RangeOf } from '@api-typings/core';
import type { Discord } from '../';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/achievements#data-models-achievement-struct|Achievements}
 */
export interface Achievement {
	/**
	 * The unique ID of the application
	 */
	application_id: bigint;

	/**
	 * The name of the achievement as an [achievement locale][1] object
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/achievements#data-models-achievement-locale-object
	 */
	name: AchievementLocale;

	/**
	 * The user-facing achievement description as an [achievement locale][1] object
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/achievements#data-models-achievement-locale-object
	 */
	description: AchievementLocale;

	/**
	 * If the achievement is secret
	 */
	secret: boolean;

	/**
	 * If the achievement is secure
	 */
	secure: boolean;

	/**
	 * The unique ID of the achievement
	 */
	id: bigint;

	/**
	 * [The hash of the icon][1]
	 *
	 * [1]: https://discord.com/developers/docs/reference#image-formatting
	 */
	icon_hash: string;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/achievements#data-models-achievement-locale-object|Achievements}
 */
export interface AchievementLocale {
	/**
	 * The default locale for the achievement
	 */
	default: string;

	/**
	 * Object of [accepted locales][1] as the key and achievement translations as the value
	 *
	 * [1]: https://discord.com/developers/docs/dispatch/field-values#predefined-field-values-accepted-locales
	 */
	localizations?: Record<string, string>;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/achievements#data-models-user-achievement-struct|Achievements}
 */
export interface UserAchievement {
	/**
	 * The unique ID of the user working on the achievement
	 */
	UserId: bigint;

	/**
	 * The unique id of the achievement
	 */
	AchievementId: bigint;

	/**
	 * How far along the user is to completing the achievement (0-100)
	 */
	PercentComplete: RangeOf<0, 100>;

	/**
	 * The timestamp at which the user completed the achievement (`PercentComplete` was set to 100)
	 */
	UnlockedAt: string;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/achievements|Achievements}
 */
export interface AchievementManager extends NodeJS.EventEmitter {
	/**
	 * Updates the current user's status for a given achievement. If `percentComplete` is set to
	 * `100`, the `UnlockedAt` field will be automatically updated with the current timestamp.
	 *
	 * @param achievementId - The ID of the achievement to update
	 * @param percentComplete - The user's updated percentage progress
	 */
	/* prettier-ignore */
	/* eslint-disable-next-line */
	SetUserAchievement(achievementId: bigint, percentComplete: RangeOf<0, 100>, callback: (result: Discord.Result) => void): void

	/**
	 * Loads a stable list of the current user's achievements to iterate over. If the user has any
	 * achievements, do your iteration within the callback of this function.
	 *
	 * @info
	 * Remember to only iterate when there are results.
	 */
	FetchUserAchievements(callback: (result: Discord.Result) => void): void;

	/**
	 * Counts the list of a user's achievements for iteration.
	 */
	CountUserAchievements(): number;

	/**
	 * Gets the user's achievement at a given index of their list of achievements.
	 *
	 * @param index - The index at which to get the achievement
	 */
	GetUserAchievementAt(index: number): Discord.UserAchievement;

	/**
	 * Gets the user achievement for the given achievement ID.
	 *
	 * @remarks
	 * If you keep a hardcoded mapping of achievement \<–\> ID in your codebase, this will be
	 * better than iterating over each achievement. Make sure to call `FetchUserAchievements()`
	 * first still.
	 *
	 * @param achievementId - The ID of the achievement to get
	 */
	GetUserAchievement(achievementId: bigint): Discord.UserAchievement;

	/**
	 * Fires when an achievement is updated for the currently connected user.
	 *
	 * @param achievement - The achievement that was updated
	 */
	on(event: 'UserAchievementUpdate', listener: (achievement: UserAchievement) => void): this;
}

// SECTION Endpoints

/**
 * Creates a new achievement for your application
 *
 * @remarks
 * Applications can have a maximum of 1000 achievements. This endpoint has a rate limit of 5
 * requests per 5 seconds per application.
 *
 * @endpoint [POST] `/applications/{application.id}/achievements`
 *
 * [POST]: https://discord.com/developers/docs/game-sdk/achievements#create-achievement
 */
export interface CreateAchievement extends Omit<Achievement, 'id' | 'icon_hash' | 'application_id'> {
	/**
	 * The icon for the achievement
	 */
	icon: string;
}

/**
 * Updates the `UserAchievement` record for a given user.
 *
 * @remarks
 * Use this endpoint to update secure achievement progress for users. This endpoint has a rate limit
 * of 5 requests per 5 seconds per application.
 *
 * @endpoint [PUT] `/applications/{application.id}/achievements/{achievement.id}`
 *
 * [PUT]: https://discord.com/developers/docs/game-sdk/achievements#update-user-achievement
 */
export interface UpdateUserAchievement {
	/**
	 * The user's progress towards completing the achievement
	 */
	percent_complete: number;
}

// !SECTION
