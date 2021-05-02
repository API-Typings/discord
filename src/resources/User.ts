import type { Nullable, Range } from 'extended-utility-types';
import type { DMChannel, PartialGuild, PartialIntegration, Snowflake } from '../';

// ANCHOR Partial User

export interface PartialUser {
	/**
	 * The user's ID. Requires the `identify` OAuth2 scope.
	 */
	id: Snowflake;

	/**
	 * The user's username, not unique across the platform. Requires the `identify` OAuth2 scope.
	 */
	username: string;

	/**
	 * The user's 4-digit discord-tag. Requires the `identify` OAuth2 scope.
	 */
	discriminator: string;

	/**
	 * The user's avatar hash. Requires the `identify` OAuth2 scope.
	 */
	avatar: Nullable<string>;
}

// ANCHOR User

/**
 * Represents a base entity that can spawn across the entire platform, be members of guilds,
 * participate in text and voice chat, and much more. Users are separated by a distinction of "bot"
 * vs "normal." Although they are similar, bot users are automated users that are "owned" by another
 * user. Unlike normal users, bot users do not have a limitation on the number of Guilds they can be
 * a part of.
 *
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-user-structure|User}
 */
export interface User extends PartialUser {
	/**
	 * Whether the user belongs to an OAuth2 application. Requires the `identify` OAuth2 scope.
	 */
	bot?: boolean;

	/**
	 * Whether the user is an Official Discord System user (part of the urgent message system).
	 * Requires the `identify` OAuth2 scope.
	 */
	system?: boolean;

	/**
	 * Whether the user has two factor enabled on their account. Requires the `identify` OAuth2
	 * scope.
	 */
	mfa_enabled?: boolean;

	/**
	 * The user's chosen language option. Requires the `identify` OAuth2 scope.
	 */
	locale?: string;

	/**
	 * Whether the email on this account has been verified. Requires the `email` OAuth2 scope.
	 */
	verified?: boolean;

	/**
	 * The user's email. Requires the `email` OAuth2 scope.
	 */
	email?: Nullable<string>;

	/**
	 * The flags on a user's account. Requires the `identify` OAuth2 scope.
	 */
	flags?: UserFlags;

	/**
	 * The type of Nitro subscription on a user's account. Requires the `identify` OAuth2
	 * scope.
	 */
	premium_type?: PremiumType;

	/**
	 * The public flags on a user's account. Requires the `identify` OAuth2 scope.
	 */
	public_flags?: UserFlags;
}

// ANCHOR User Flags

/**
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-user-flags|User}
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
	BugHunterLevel2 = 1 << 14,
	VerifiedBot = 1 << 16,
	EarlyVerifiedBotDeveloper = 1 << 17
}

/**
 * Premium types denote the level of premium a user has.
 *
 * @source {@link https://discord.com/developers/docs/resources/user#user-object-premium-types|User}
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
 * @source {@link https://discord.com/developers/docs/resources/user#connection-object-connection-structure|User}
 */
export interface Connection {
	/**
	 * ID of the connection account.
	 */
	id: Snowflake;

	/**
	 * The username of the connection account.
	 */
	name: string;

	/**
	 * The service of the connection.
	 */
	type: ConnectionService;

	/**
	 * Whether the connection is revoked.
	 */
	revoked?: boolean;

	/**
	 * An array of partial server integrations.
	 */
	integrations?: PartialIntegration[];

	/**
	 * Whether the connection is verified.
	 */
	verified: boolean;

	/**
	 * Whether friend sync is enabled for this connection.
	 */
	friend_sync: boolean;

	/**
	 * Whether activities related to this connection will be shown in presence updates.
	 */
	show_activity: boolean;

	/**
	 * Visibility of this connection.
	 */
	visibility: VisibilityType;
}

export type ConnectionService =
	| 'battlenet'
	| 'facebook'
	| 'github'
	| 'leagueoflegends'
	| 'reddit'
	| 'spotify'
	| 'steam'
	| 'twitch'
	| 'twitter'
	| 'xbox'
	| 'youtube';

/**
 * @source {@link https://discord.com/developers/docs/resources/user#connection-object-visibility-types|User}
 */
export enum VisibilityType {
	/**
	 * Invisible to everyone except the user themselves.
	 */
	None,

	/**
	 * Visible to everyone.
	 */
	Everyone
}

// SECTION Endpoints

/**
 * Returns the user object of the requester's account.
 *
 * @remarks
 * For OAuth2, this requires the `identify` scope, which will return the object *without* an email,
 * and optionally the `email` scope, which returns the object *with* an email.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/user#get-current-user) `/users/@me`
 */
export type GetCurrentUser = { response: User };

/**
 * Returns a user object for a given user ID.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/user#get-user) `/users/{user.id}`
 */
export type GetUser = { response: User };

/**
 * Modify the requester's user account settings.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/user#modify-current-user) `/users/@me`
 */
export interface ModifyCurrentUser {
	body: {
		/**
		 * User's username, if changed may cause the user's discriminator to be randomized.
		 */
		username?: string;

		/**
		 * If passed, modifies the user's avatar.
		 */
		avatar?: Nullable<string>;
	};

	response: User;
}

/**
 * Returns a list of partial guild objects the current user is a member of. Requires the `guilds`
 * OAuth2 scope.
 *
 * @remarks
 * This endpoint returns 100 guilds by default, which is the maximum number of guilds a non-bot user
 * can join. Therefore, pagination is **not needed** for integrations that need to get a list of the
 * users' guilds.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/user#get-current-user-guilds) `/users/@me/guilds`
 */
export interface GetCurrentUserGuilds {
	query: {
		/**
		 * Get guilds before this guild ID.
		 */
		before?: Snowflake;

		/**
		 * Get guilds after this guild ID.
		 */
		after?: Snowflake;

		/**
		 * Max number of guilds to return (1-100).
		 *
		 * @defaultValue `100`
		 */
		limit?: Range<1, 100>;
	};

	response: PartialGuild[];
}

/**
 * Leave a guild.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/user#leave-guild) `/users/@me/guilds/{guild.id}`
 */
export type LeaveGuild = { response: never };

/**
 * Create a new DM channel with a user.
 *
 * @remarks
 * You should not use this endpoint to DM everyone in a server about something. DMs should generally
 * be initiated by a user action. If you open a significant amount of DMs too quickly, your bot may
 * be rate limited or blocked from opening new ones.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/user#create-dm) `/users/@me/channels`
 */
export interface CreateDM {
	body: {
		/**
		 * The recipient to open a DM channel with.
		 */
		recipient_id: Snowflake;
	};

	response: DMChannel;
}

/**
 * Create a new group DM channel with multiple users. This endpoint is limited to 10 active group
 * DMs.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/user#create-dm) `/users/@me/channels`
 */
export interface CreateGroupDM {
	body: {
		/**
		 * Access tokens of users that have granted your app the `gdm.join` scope.
		 */
		access_tokens: string[];

		/**
		 * A dictionary of user IDs to their respective nicknames.
		 */
		nicks: Record<Snowflake, string>;
	};

	response: DMChannel;
}

/**
 * Returns a list of connection objects. Requires the `connections` OAuth2 scope.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/user#get-user-connections) `/users/@me/connections`
 */
export type GetUserConnections = { response: Connection[] };

// !SECTION
