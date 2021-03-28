import type { Discord } from '../';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/users#data-models-user-struct|Users}
 */
export interface User {
	/**
	 * The user's ID.
	 */
	Id: bigint;

	/**
	 * Their name.
	 */
	Username: string;

	/**
	 * The user's unique discrim.
	 */
	Discriminator: string;

	/**
	 * The hash of the user's avatar.
	 */
	Avatar: string;

	/**
	 * If the user is a bot user.
	 */
	Bot: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/users#data-models-userflag-enum|Users}
 */
export enum UserFlag {
	/**
	 * Discord Partner.
	 */
	Partner = 2,

	/**
	 * HypeSquad Events participant.
	 */
	HypeSquadEvents = 4,

	/**
	 * House Bravey.
	 */
	HypeSquadHouse1 = 64,

	/**
	 * House Brilliance.
	 */
	HypeSquadHouse2 = 128,

	/**
	 * House Balance.
	 */
	HypeSquadHouse3 = 256
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/users#data-models-premiumtype-enum|Users}
 */
export enum PremiumType {
	/**
	 * Not a Nitro subscriber.
	 */
	None,

	/**
	 * Nitro Classic subscriber.
	 */
	Tier1,

	/**
	 * Nitro subscriber.
	 */
	Tier2
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/users|Users}
 */
export interface UserManager extends NodeJS.EventEmitter {
	/**
	 * Fetch information about the currently connected user account.
	 *
	 * @remarks
	 * Before calling this function, you'll need to wait for the `CurrentUserUpdate` callback to
	 * fire after instantiating the User manager.
	 */
	GetCurrentUser(): Discord.User;

	/**
	 * Get user information for a given ID.
	 *
	 * @param userId - The ID of the user to fetch
	 */
	GetUser(userId: bigint, callback: (result: Discord.Result, user: Discord.User) => void): void;

	/**
	 * Get the PremiumType for the currently connected user.
	 */
	GetCurrentUserPremiumType(): Discord.PremiumType;

	/**
	 * See whether or not the current user has a certain UserFlag on their account.
	 *
	 * @param flag - The flag to check on the user's account
	 */
	CurrentUserHasFlag(flag: UserFlag): boolean;

	/**
	 * Fires when the `User` struct of the currently connected user changes. They may have changed
	 * their avatar, username, or something else.
	 *
	 * @param user - A new User struct for the current user
	 */
	on(event: 'CurrentUserUpdate', listener: (user: Discord.User) => void): this;
}
