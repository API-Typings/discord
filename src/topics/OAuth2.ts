import type { Nullable } from 'extended-utility-types';
import type { PartialUser, Snowflake, Team, User } from '../';

/**
 * @remarks
 * In accordance with the relevant RFCs, the token and token revocation URLs will only accept a
 * content type of `x-www-form-urlencoded`. JSON content is not permitted and will return an error.
 *
 * @source {@link https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-urls|OAuth2}
 */
export enum OAuth2URL {
	/**
	 * Base authorization URL.
	 */
	Base = 'https://discord.com/api/oauth2/authorize',

	/**
	 * Token URL.
	 */
	Token = 'https://discord.com/api/oauth2/token',

	/**
	 * Token Revocation URL.
	 */
	TokenRevocation = 'https://discord.com/api/oauth2/token/revoke'
}

/**
 * Scopes that are behind a whitelist cannot be requested unless your application is on said
 * whitelist, and may cause undocumented/error behavior in the OAuth2 flow if you request them from
 * a user.
 *
 * @source {@link https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes|OAuth2}
 */
export enum OAuth2Scope {
	/**
	 * For OAuth2 bots, this puts the bot in the user's selected guild by default.
	 *
	 * @remarks
	 * This scope requires you to have a bot account linked to your application.
	 */
	Bot = 'bot',

	/**
	 * Allows `/users/@me/connections` to return linked third-party accounts.
	 */
	Connections = 'connections',

	/**
	 * Enables `/users/@me` to return an `email`.
	 */
	Email = 'email',

	/**
	 * Allows `/users/@me` without `email`.
	 */
	Identify = 'identify',

	/**
	 * Allows `/users/@me/guilds` to return basic information about all of a user's guilds.
	 */
	Guilds = 'guilds',

	/**
	 * Allows `/guilds/{guild.id}/members/{user.id}` to be used for joining users to a guild.
	 *
	 * @remarks
	 * This scope requires you to have a bot account linked to your application. Also, in order to
	 * add a user to a guild, your bot has to already belong to that guild.
	 */
	GuildsJoin = 'guilds.join',

	/**
	 * Allows your app to join users to a group dm.
	 */
	GroupDMJoin = 'gdm.join',

	/**
	 * For local RPC server API access, this allows you to read messages from all client channels
	 * (otherwise restricted to channels/guilds your app creates).
	 */
	MessagesRead = 'messages.read',

	/**
	 * For local RPC server access, this allows you to control a user's local Discord client.
	 * Whitelist only.
	 */
	RPC = 'rpc',

	/**
	 * For local RPC server API access, this allows you to receive notifications pushed out to the
	 * user. Whitelist only.
	 */
	RPCNotificationsRead = 'rpc.notifications.read',

	/**
	 * This generates a webhook that is returned in the oauth token response for authorization code
	 * grants.
	 */
	WebhookIncoming = 'webhook.incoming',

	/**
	 * Allows your app to upload/update builds for a user's applications. Whitelist only.
	 */
	ApplicationsBuildsUpload = 'applications.builds.upload',

	/**
	 * Allows your app to read build data for a user's applications.
	 */
	ApplicationsBuildsRead = 'applications.builds.read',

	/**
	 * Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for
	 * a user's applications.
	 */
	ApplicationsStoreUpdate = 'applications.store.update',

	/**
	 * Allows your app to read entitlements for a user's applications.
	 */
	ApplicationsEntitlements = 'applications.entitlements',

	/**
	 * Allows your app to know a user's friends and implicit relationships. Whitelist only.
	 */
	RelationshipsRead = 'relationships.read',

	/**
	 * Allows your app to fetch data from a user's "Now Playing/Recently Played" list. Whitelist
	 * only.
	 */
	ActivitiesRead = 'activities.read',

	/**
	 * Allows your app to update a user's activity. Whitelist only.
	 *
	 * @remarks
	 * Whitelist is NOT required for the GameSDK Activity Manager.
	 */
	ActivitiesWrite = 'activities.write',

	/**
	 * Allows your app to use Slash Commands in a guild.
	 */
	ApplicationsCommands = 'applications.commands',

	/**
	 * Allows your app to update Slash Commands via bearer token.
	 */
	ApplicationsCommandsUpdate = 'applications.commands.update'
}

// ANCHOR Get Current Bot Application Information

/**
 * @endpoint [GET](https://discord.com/developers/docs/topics/oauth2#get-current-application-information) `/oauth2/applications/@me`
 */
export type GetCurrentBotApplicationInformation = { response: Omit<Application, 'flags'> };

// ANCHOR Partial Application

/**
 * @source {@link https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information-example-authorization-information|OAuth2}
 */
export interface PartialApplication {
	/**
	 * The ID of the app.
	 */
	id: Snowflake;

	/**
	 * The name of the app.
	 */
	name: string;

	/**
	 * The icon hash of the app.
	 */
	icon: Nullable<string>;

	/**
	 * The description of the app.
	 */
	description: string;

	/**
	 * If this application is a game sold on Discord, this field will be the summary field for the
	 * store page of its primary SKU.
	 */
	summary: string;
	hook: boolean;

	/**
	 * When `false`, only the app owner can join the app's bot to guilds.
	 */
	bot_public: boolean;

	/**
	 * When `true`, the app's bot will only join upon completion of the full OAuth2 code grant flow.
	 */
	bot_require_code_grant: boolean;

	/**
	 * The hex encoded key for verification in interactions the GameSDK's `GetTicket`.
	 */
	verify_key: string;
}

// ANCHOR Application

/**
 * @source {@link https://discord.com/developers/docs/topics/oauth2#application-object|OAuth2}
 */
export interface Application extends Omit<PartialApplication, 'hook'> {
	/**
	 * An array of RPC origin URLs, if RPC is enabled.
	 */
	rpc_origins?: string[];

	/**
	 * The URL of the app's Terms of Service.
	 */
	terms_of_service_url?: string;

	/**
	 * The URL of the app's Privacy Policy.
	 */
	privacy_policy_url?: string;

	/**
	 * Partial user object containing info on the owner of the application.
	 */
	owner: PartialUser & Pick<User, 'flags'>;

	/**
	 * If the application belongs to a team, this will be a list of the members of that team.
	 */
	team: Nullable<Team>;

	/**
	 * If this application is a game sold on Discord, this field will be the guild to which it has
	 * been linked.
	 */
	guild_id?: Snowflake;

	/**
	 * If this application is a game sold on Discord, this field will be the id of the "Game SKU"
	 * that is created, if exists.
	 */
	primary_sku_id?: Snowflake;

	/**
	 * If this application is a game sold on Discord, this field will be the URL slug that links to
	 * the store page.
	 */
	slug?: string;

	/**
	 * If this application is a game sold on Discord, this field will be the hash of the image on
	 * store embeds.
	 */
	cover_image?: string;

	/**
	 * The application's public flags.
	 */
	flags: ApplicationFlags;
}

export enum ApplicationFlags {
	GatewayPresence = 1 << 12,
	GatewayPresenceLimited = 1 << 13,
	GatewayGuildMembers = 1 << 14,
	GatewayGuildMembersLimited = 1 << 15,
	VerificationPendingGuildLimit = 1 << 16,
	Embedded = 1 << 17
}

// ANCHOR Get Current Authorization Information

/**
 * Returns info about the current authorization. Requires authentication with a bearer token.
 *
 * @endpoint [GET](https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information) `/oauth2/@me`
 */
export type GetCurrentAuthorizationInformation = { response: AuthorizationInformation };

/**
 * @source {@link https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information-response-structure|OAuth2}
 */
export interface AuthorizationInformation {
	/**
	 * The current application.
	 */
	application: PartialApplication;

	/**
	 * The scopes the user has authorized the application for.
	 */
	scopes: `${OAuth2Scope}`[];

	/**
	 * When the access token expires.
	 */
	expires: string;

	/**
	 * The user who has authorized, if the user has authorized with the `identify` scope.
	 */
	user?: User;
}
