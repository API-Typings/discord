import type { Nullable } from '@api-typings/core';
import type {
	Guild,
	PartialUser,
	Snowflake,
	Team,
	User,
	Webhook
} from '../';

/**
 * @warning
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
	 * {@link https://tools.ietf.org/html/rfc7009|Token Revocation} URL.
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
	 * Allows [/users/\@me/connections][1] to return linked third-party accounts.
	 *
	 * [1]: https://discord.com/developers/docs/resources/user#get-user-connections
	 */
	Connections = 'connections',

	/**
	 * Enables [/users/\@me][1] to return an `email`.
	 *
	 * [1]: https://discord.com/developers/docs/resources/user#get-current-user
	 */
	Email = 'email',

	/**
	 * Allows [/users/\@me][1] without `email`.
	 *
	 * [1]: https://discord.com/developers/docs/resources/user#get-current-user
	 */
	Identify = 'identify',

	/**
	 * Allows [/users/\@me/guilds][1] to return basic information about all of a user's guilds.
	 *
	 * [1]: https://discord.com/developers/docs/resources/user#get-current-user-guilds
	 */
	Guilds = 'guilds',

	/**
	 * Allows [/guilds/\{guild.id\}/members/\{user.id\}][1] to be used for joining users to a guild.
	 *
	 * @remarks
	 * This scope requires you to have a bot account linked to your application. Also, in order to
	 * add a user to a guild, your bot has to already belong to that guild.
	 *
	 * [1]: https://discord.com/developers/docs/resources/guild#add-guild-member
	 */
	GuildsJoin = 'guilds.join',

	/**
	 * Allows your app to [join users to a group dm][1].
	 *
	 * [1]: https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
	 */
	GroupDMJoin = 'gdm.join',

	/**
	 * For local RPC server API access, this allows you to read messages from all client channels
	 * (otherwise restricted to channels/guilds your app creates).
	 */
	MessagesRead = 'messages.read',

	/**
	 * For local RPC server access, this allows you to control a user's local Discord client.
	 *
	 * @whitelist
	 */
	RPC = 'rpc',

	/**
	 * For local RPC server API access, this allows you to access the API as the local user.
	 *
	 * @whitelist
	 */
	RPCAPI = 'rpc.api',

	/**
	 * For local RPC server API access, this allows you to receive notifications pushed out to the
	 * user.
	 *
	 * @whitelist
	 */
	RPCNotificationsRead = 'rpc.notifications.read',

	/**
	 * This generates a webhook that is returned in the oauth token response for authorization code
	 * grants.
	 */
	WebhookIncoming = 'webhook.incoming',

	/**
	 * Allows your app to upload/update builds for a user's applications.
	 *
	 * @whitelist
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
	 * Allows your app to know a user's friends and implicit relationships.
	 *
	 * @whitelist
	 */
	RelationshipsRead = 'relationships.read',

	/**
	 * Allows your app to fetch data from a user's "Now Playing/Recently Played" list.
	 *
	 * @whitelist
	 */
	ActivitiesRead = 'activities.read',

	/**
	 * Allows your app to update a user's activity.
	 *
	 * @remarks
	 * Whitelist is NOT required for {@link https://discord.com/developers/docs/game-sdk/activities|GameSDK Activity Manager}
	 *
	 * @whitelist
	 */
	ActivitiesWrite = 'activities.write',

	/**
	 * Allows your app to use [Slash Commands][1] in a guild.
	 *
	 * [1]: https://discord.com/developers/docs/interactions/slash-commands
	 */
	ApplicationsCommands = 'applications.commands',

	/**
	 * Allows your app to update [Slash Commands][1] via bearer token.
	 *
	 * [1]: https://discord.com/developers/docs/interactions/slash-commands
	 */
	ApplicationsCommandsUpdate = 'applications.commands.update'
}

// SECTION Authorization Flows

// ANCHOR Authorization Code

/**
 * The authorization code grant is what most developers will recognize as "standard OAuth2" and
 * involves retrieving an access code and exchanging it for a user's access token. It allows the
 * authorization server to act as an intermediary between the client and the resource owner, so the
 * resource owner's credentials are never shared directly with the client.
 *
 * @source {@link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant|OAuth2}
 */
export interface AuthorizationCodeGrant extends Omit<ImplicitGrant, 'response_type'> {
	response_type: 'code';

	/**
	 * A list of [OAuth2 scopes][1] separated by URL encoded spaces (`%20`).
	 *
	 * [1]: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
	 */
	scope: string;

	/**
	 * The URL you registered when creating your application, url-encoded.
	 */
	redirect_uri: string;

	/**
	 * Controls how the authorization flow handles existing authorizations.
	 *
	 * @remarks
	 * - `consent` - Request to reapprove a user's authorization if they previously authorized your
	 * application with the requested scopes,
	 * - `none` - Skip the authorization screen and redirect them back to your redirect URI without
	 * requesting their authorization.
	 *
	 * For passthrough scopes, like `bot` and `webhook.incoming`, authorization is always required.
	 */
	prompt: 'consent' | 'none';
}

/**
 * @remarks
 * You can also pass your `client_id` and `client_secret` as basic authentication with `client_id`
 * as the username and `client_secret` as the password.
 *
 * @source {@link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant|OAuth2}
 */
// eslint-disable-next-line
export interface AuthorizationCodeAccessTokenURL
	extends Omit<AuthorizationCodeAccessTokenRefreshURL, 'grant_type' | 'refresh_token'> {
	/**
	 * Must be set to `authorization_code`.
	 */
	grant_type: 'authorization_code';

	/**
	 * The code from the querystring.
	 */
	code: string;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/oauth2#authorization-code-grant|OAuth2}
 */
export interface AuthorizationCodeAccessToken extends ClientCredentialsAccessToken {
	/**
	 * The user's refresh token.
	 */
	refresh_token: string;
}

export interface AuthorizationCodeAccessTokenRefreshURL {
	/**
	 * Your application's client ID.
	 */
	client_id: Snowflake;

	/**
	 * Your application's client secret.
	 */
	client_secret: string;

	/**
	 * Must be set to `refresh_token`.
	 */
	grant_type: 'refresh_token';

	/**
	 * The user's refresh token.
	 */
	refresh_token: string;

	/**
	 * Your `redirect_uri`.
	 */
	redirect_uri: string;

	/**
	 * The scopes requested in your authorization URL, space-delimited.
	 */
	scope: string;
}

// ANCHOR Implicit

/**
 * @source {@link https://discord.com/developers/docs/topics/oauth2#implicit-grant|OAuth2}
 */
export interface ImplicitGrant {
	response_type: 'token';

	/**
	 * Your application's `client_id`.
	 */
	client_id: Snowflake;

	/**
	 * Sent in the authorization request and returned back in the response and should be a value
	 * that binds the user's request to their authenticated state.
	 */
	state?: string;

	/**
	 * A list of [OAuth2 scopes][1] separated by URL encoded spaces (`%20`).
	 *
	 * [1]: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
	 */
	scope: string;
}

// ANCHOR Client Credentials

/**
 * @source {@link https://discord.com/developers/docs/topics/oauth2#client-credentials-grant|OAuth}
 */
export interface ClientCredentialsGrant {
	grant_type: 'client_credentials';

	/**
	 * A list of [OAuth2 scopes][1] separated by URL encoded spaces (`%20`).
	 *
	 * [1]: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
	 */
	scope: string;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/oauth2#client-credentials-grant|OAuth}
 */
export interface ClientCredentialsAccessToken {
	/**
	 * Allows your application to make certain requests to the API on their behalf, restricted to
	 * whatever scopes were requested.
	 */
	access_token: string;
	token_type: string;

	/**
	 * How long, in seconds, until the returned access token expires.
	 */
	expires_in: number;

	/**
	 * The scopes requested in your authorization URL, space-delimited.
	 */
	scope: string;
}

// ANCHOR Bot Authorization

/**
 * Bot authorization is a special server-less and callback-less OAuth2 flow that makes it easy for
 * users to add bots to guilds.
 *
 * @source {@link https://discord.com/developers/docs/topics/oauth2#bot-authorization-flow-bot-auth-parameters}
 */
export interface BotAuthorization {
	/**
	 * Your app's client ID.
	 */
	client_id: Snowflake;

	/**
	 * Needs to include `bot` for the bot flow.
	 */
	scope: string;

	/**
	 * The [permisssions][1] you're requesting.
	 *
	 * [1]: https://discord.com/developers/docs/topics/permissions
	 */
	permissions: number;

	/**
	 * Pre-fills the dropdown picker with a guild for the user.
	 */
	guild_id?: Snowflake;

	/**
	 * `true` or `false`–disallows the user from changing the guild dropdown.
	 */
	disable_guild_select?: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/oauth2#advanced-bot-authorization|OAuth2}
 */
export interface BotAuthorizationAccessToken extends AuthorizationCodeAccessToken {
	guild: Guild;
}

// ANCHOR Webhook

/**
 * Discord's webhook flow is a specialized version of an [authorization code][1] implementation.
 * In this case, the `scope` querystring parameter needs to be set to `webhook.incoming`.
 *
 * @source {@link https://discord.com/developers/docs/topics/oauth2#webhooks|OAuth2}
 *
 * [1]: https://discord.com/developers/docs/topics/oauth2#authorization-code-grant
 */
export interface WebhookAccessToken extends AuthorizationCodeAccessToken {
	webhook: Webhook;
}

// !SECTION

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
	 * The base64 encoded key for the GameSDK's [GetTicket][1].
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/applications#get-ticket
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
	flags: number;
}

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
