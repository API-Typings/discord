import { Nullable, Snowflake } from './';
import { PartialIntegration } from './Guild';

/**
 * The connection object that the user has attached
 *
 * @source {@link https://discord.com/developers/docs/resources/user#connection-object-connection-structure User}
 */
export interface Connection {
	/**
	 * ID of the connection account
	 */
	id: Snowflake;

	/**
	 * The username of the connection account
	 */
	name: string;

	/**
	 * The service of the connection (twitch, youtube)
	 */
	type: string;

	/**
	 * Whether the connection is revoked
	 */
	revoked?: boolean;

	/**
	 * An array of partial {@link https://discord.com/developers/docs/resources/guild#integration-object server integrations}
	 */
	integrations?: PartialIntegration[];

	/**
	 * Whether the connection is verified
	 */
	verified: boolean;

	/**
	 * Whether friend sync is enabled for this connection
	 */
	friend_sync: boolean;

	/**
	 * Whether activities related to this connection will be shown in presence updates
	 */
	show_activity: boolean;

	/**
	 * {@link https://discord.com/developers/docs/resources/user#user-object-visibility-types Visibility} of this connection
	 */
	visibility: VisibilityType;
}

/**
 * Represents a base entity that can spawn across the entire platform, be members of guilds, participate in text and voice chat, and much more
 *
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-user-structure User}
 */
export interface User {
	/**
	 * The user's ID
	 */
	id: Snowflake;

	/**
	 * The user's username, not unique across the platform
	 */
	username: string;

	/**
	 * The user's 4-digit discord-tag
	 */
	discriminator: string;

	/**
	 * The user's {@link https://discord.com/developers/docs/reference#image-formatting avatar hash}
	 */
	avatar: Nullable<string>;

	/**
	 * Whether the user belongs to an OAuth2 application
	 */
	bot?: boolean;

	/**
	 * Whether the user is an Official Discord System user (part of the urgent message system)
	 */
	system?: boolean;

	/**
	 * Whether the user has two factor enabled on their account
	 */
	mfa_enabled?: boolean;

	/**
	 * The user's chosen language option
	 */
	locale?: string;

	/**
	 * Whether the email on this account has been verified
	 */
	verified?: boolean;

	/**
	 * The user's email
	 */
	email?: Nullable<string>;

	/**
	 * The {@link https://discord.com/developers/docs/resources/user#user-object-user-flags flags} on a user's account
	 */
	flags?: UserFlags;

	/**
	 * The {@link https://discord.com/developers/docs/resources/user#user-object-premium-types type of Nitro subscription} on a user's account
	 */
	premium_type?: PremiumType;

	/**
	 * The public {@link https://discord.com/developers/docs/resources/user#user-object-user-flags flags} on a user's account
	 */
	public_flags?: UserFlags;
}

/**
 * Premium types denote the level of premium a user has
 *
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-premium-types User}
 */
export enum PremiumType {
	None,
	NitroClassic,
	Nitro
}

/**
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-user-flags User}
 */
export enum UserFlags {
	None,
	DiscordEmployee = 1 << 0,
	PartneredServerOwner = 1 << 1,
	HypesquadEvents = 1 << 2,
	BugHunterLevel1 = 1 << 3,
	HouseBravery = 1 << 6,
	HouseBrilliance = 1 << 7,
	HouseBalance = 1 << 8,
	EarlySupporter = 1 << 9,
	TeamUser = 1 << 10,
	System = 1 << 12,
	BugHunterLevel2 = 1 << 14,
	VerifiedBot = 1 << 16,
	EarlyVerifiedBotDeveloper = 1 << 17
}

/**
 * @source {@link https://discord.com/developers/docs/resources/user#connection-object-visibility-types User}
 */
export enum VisibilityType {
	/**
	 * Invisible to everyone except the user themselves
	 */
	None,

	/**
	 * Visible to everyone
	 */
	Everyone
}

export type PartialUser = Pick<User, 'id' | 'username' | 'avatar' | 'discriminator'>;

// SECTION Endpoints

/**
 * Modify the requester's user account settings
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/user#modify-current-user) `/users/@me`
 *
 * @returns A {@link https://discord.com/developers/docs/resources/user#user-object user] object on success
 */
export interface ModifyCurrentUser {
	/**
	 * User's username, if changed may cause the user's discriminator to be randomized
	 */
	username?: string;

	/**
	 * If passed, modifies the user's avatar
	 */
	avatar?: Nullable<string>;
}

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/user#get-current-user-guilds) `/users/@me/guilds`
 *
 * @returns A list of partial {@link https://discord.com/developers/docs/resources/guild#guild-object guild} objects the current user is a member of
 */
export interface GetCurrentUserGuilds {
	/**
	 * Get guilds before this guild ID
	 */
	before?: Snowflake;

	/**
	 * Get guilds after this guild ID
	 */
	after?: Snowflake;

	/**
	 * Max number of guilds to return (1-100)
	 */
	limit?: number;
}

/**
 * Create a new DM channel with a user
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/user#create-dm) `/users/@me/channels`
 *
 * @returns A {@link https://discord.com/developers/docs/resources/channel#channel-object DM channel} object
 */
export interface CreateDM {
	/**
	 * The recipient to open a DM channel with
	 */
	recipient_id: Snowflake;
}

/**
 * Create a new group DM channel with multiple users
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/user#create-dm) `/users/@me/channels`
 *
 * @returns A {@link https://discord.com/developers/docs/resources/channel#channel-object DM channel} object
 */
export interface CreateGroupDM {
	/**
	 * Access tokens of users that have granted your app the `gdm.join` scope
	 */
	access_tokens: string[];

	/**
	 * A dictionary of user IDs to their respective nicknames
	 */
	nicks: Record<Snowflake, string>;
}

// !SECTION
