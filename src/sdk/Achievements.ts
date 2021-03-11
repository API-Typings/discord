import type { RangeOf } from '@api-typings/core';
import type { Discord } from '../';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/achievements#data-models-achievement-struct|Achievements}
 */
export interface Achievement {
	/**
	 * The unique ID of the application.
	 */
	application_id: bigint;

	/**
	 * The name of the achievement as an [achievement locale][1] object.
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/achievements#data-models-achievement-locale-object
	 */
	name: AchievementLocale;

	/**
	 * The user-facing achievement description as an [achievement locale][1] object.
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/achievements#data-models-achievement-locale-object
	 */
	description: AchievementLocale;

	/**
	 * If the achievement is secret.
	 */
	secret: boolean;

	/**
	 * If the achievement is secure.
	 */
	secure: boolean;

	/**
	 * The unique ID of the achievement.
	 */
	id: bigint;

	/**
	 * [The hash of the icon][1].
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
	 * The default locale for the achievement.
	 */
	default: string;

	/**
	 * Object of [accepted locales][1] as the key and achievement translations as the value.
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
	 * The unique ID of the user working on the achievement.
	 */
	UserId: bigint;

	/**
	 * The unique id of the achievement.
	 */
	AchievementId: bigint;

	/**
	 * How far along the user is to completing the achievement (0-100).
	 */
	PercentComplete: RangeOf<0, 100>;

	/**
	 * The timestamp at which the user completed the achievement (`PercentComplete` was set to 100).
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
 * Returns all achievements for the given application. This endpoint has a rate limit of 5
 * requests per 5 seconds per application.
 *
 * @endpoint [GET](https://discord.com/developers/docs/game-sdk/achievements#get-achievements) `/applications/{application.id}/achievements`
 */
export type GetAchievements = { response: Achievement[] };

/**
 * Returns the given achievement for the given application. This endpoint has a rate limit of 5
 * requests per 5 seconds per application.
 *
 * @endpoint [GET](https://discord.com/developers/docs/game-sdk/achievements#get-achievement) `/applications/{application.id}/achievements`
 */
export type GetAchievement = { response: Achievement };

/**
 * Creates a new achievement for your application. Applications can have a maximum of 1000
 * achievements. This endpoint has a rate limit of 5 requests per 5 seconds per application.
 *
 * @endpoint [POST](https://discord.com/developers/docs/game-sdk/achievements#create-achievement) `/applications/{application.id}/achievements`
 */
export interface CreateAchievement {
	body: Omit<Achievement, 'id' | 'icon_hash' | 'application_id'> & {
		/**
		 * The icon for the achievement.
		 */
		icon: string;
	};

	response: Achievement;
}

/**
 * Updates the achievement for **ALL USERS**. This is **NOT** to update a single user's achievement
 * progress; this is to edit the UserAchievement itself. This endpoint has a rate limit of 5
 * requests per 5 seconds per application.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/game-sdk/achievements#update-achievement) `/applications/{application.id}/achievements/{achievement.id}`
 */
export type UpdateAchievement = CreateAchievement;

/**
 * Deletes the given achievement from your application. This endpoint has a rate limit of 5
 * requests per 5 seconds per application.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/game-sdk/achievements#delete-achievement) `/applications/{application.id}/achievements/{achievement.id}`
 */
export type DeleteAchievement = { response: never };

/**
 * Updates the `UserAchievement` record for a given user. Use this endpoint to update secure
 * achievement progress for users. This endpoint has a rate limit of 5 requests per 5 seconds per
 * application.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/game-sdk/achievements#update-user-achievement) `/applications/{application.id}/achievements/{achievement.id}`
 */
export interface UpdateUserAchievement {
	body: {
		/**
		 * The user's progress towards completing the achievement.
		 */
		percent_complete: number;
	};

	response: never;
}

/**
 * Returns a list of achievements for the user whose token you're making the request with. This
 * endpoint has a rate limit of 2 requests per 5 seconds per application per user.
 *
 * @endpoint [GET](https://discord.com/developers/docs/game-sdk/achievements#get-user-achievements) `/applications/{application.id}/achievements`
 */
export type GetUserAchievements = { response: Achievement[] };

// !SECTION
