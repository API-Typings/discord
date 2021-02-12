import type { Nullable, Snowflake, PartialIntegration } from '..';

// ANCHOR Partial User

export interface PartialUser {
	/**
	 * The user's ID
	 *
	 * @scope `identify`
	 */
	id: Snowflake;

	/**
	 * The user's username, not unique across the platform
	 *
	 * @scope `identify`
	 */
	username: string;

	/**
	 * The user's 4-digit discord-tag
	 *
	 * @scope `identify`
	 */
	discriminator: string;

	/**
	 * The user's {@link https://discord.com/developers/docs/reference#image-formatting avatar hash}
	 *
	 * @scope `identify`
	 */
	avatar: Nullable<string>;
}

// ANCHOR User

/**
 * Represents a base entity that can spawn across the entire platform, be members of guilds, participate in text and voice chat, and
 * much more. Users are separated by a distinction of "bot" vs "normal." Although they are similar, bot users are automated users that
 * are "owned" by another user. Unlike normal users, bot users do not have a limitation on the number of Guilds they can be a part of.
 *
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-user-structure User}
 */
export interface User extends PartialUser {
	/**
	 * Whether the user belongs to an OAuth2 application
	 *
	 * @scope `identify`
	 */
	bot?: boolean;

	/**
	 * Whether the user is an Official Discord System user (part of the urgent message system)
	 *
	 * @scope `identify`
	 */
	system?: boolean;

	/**
	 * Whether the user has two factor enabled on their account
	 *
	 * @scope `identify`
	 */
	mfa_enabled?: boolean;

	/**
	 * The user's chosen language option
	 *
	 * @scope `identify`
	 */
	locale?: string;

	/**
	 * Whether the email on this account has been verified
	 *
	 * @scope `email`
	 */
	verified?: boolean;

	/**
	 * The user's email
	 *
	 * @scope `email`
	 */
	email?: Nullable<string>;

	/**
	 * The {@link https://discord.com/developers/docs/resources/user#user-object-user-flags flags} on a user's account
	 *
	 * @scope `identify`
	 */
	flags?: UserFlags;

	/**
	 * The {@link https://discord.com/developers/docs/resources/user#user-object-premium-types type of Nitro subscription} on a user's account
	 *
	 * @scope `identify`
	 */
	premium_type?: PremiumType;

	/**
	 * The public {@link https://discord.com/developers/docs/resources/user#user-object-user-flags flags} on a user's account
	 *
	 * @scope `identify`
	 */
	public_flags?: UserFlags;
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
 * Premium types denote the level of premium a user has.
 *
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-premium-types User}
 */
export enum PremiumType {
	None,
	NitroClassic,
	Nitro
}

// ANCHOR Connection

/**
 * The connection object that the user has attached.
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

// SECTION Endpoints

/**
 * Modify the requester's user account settings.
 *
 * @endpoint [PATCH] `/users/@me`
 *
 * @returns A [user][1] object on success.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/user#modify-current-user
 * [1]: https://discord.com/developers/docs/resources/user#user-object
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
 * Requires the `guilds` OAuth2 scope.
 *
 * @info
 * This endpoint returns 100 guilds by default, which is the maximum number of guilds a non-bot user can join.
 * Therefore, pagination is **not needed** for integrations that need to get a list of the users' guilds.
 *
 * @endpoint [GET] `/users/@me/guilds`
 *
 * @returns A list of partial [guild][1] objects the current user is a member of.
 *
 * [GET]: https://discord.com/developers/docs/resources/user#get-current-user-guilds
 * [1]: https://discord.com/developers/docs/resources/guild#guild-object
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
	 *
	 * @default 100
	 */
	limit?: number;
}

/**
 * Create a new DM channel with a user.
 *
 * @warning
 * You should not use this endpoint to DM everyone in a server about something. DMs should generally be initiated by a user action.
 * If you open a significant amount of DMs too quickly, your bot may be rate limited or blocked from opening new ones.
 *
 * @endpoint [POST] `/users/@me/channels`
 *
 * @returns A [DM channel][1] object.
 *
 * [POST]: https://discord.com/developers/docs/resources/user#create-dm
 * [1]: https://discord.com/developers/docs/resources/channel#channel-object
 */
export interface CreateDM {
	/**
	 * The recipient to open a DM channel with
	 */
	recipient_id: Snowflake;
}

/**
 * Create a new group DM channel with multiple users.
 *
 * @warning
 * This endpoint is limited to 10 active group DMs.
 *
 * @endpoint [POST] `/users/@me/channels`
 *
 * @returns A [DM channel][1] object.
 *
 * [POST]: https://discord.com/developers/docs/resources/user#create-dm
 * [1]: https://discord.com/developers/docs/resources/channel#channel-object
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
