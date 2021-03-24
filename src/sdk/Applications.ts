import type { Discord } from '../';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/applications#data-models-oauth2token-struct|Applications}
 */
export interface OAuth2Token {
	/**
	 * A bearer token for the current user.
	 */
	AccessToken: string;

	/**
	 * A list of oauth2 scopes as a single string, delineated by spaces like
	 * `"identify rpc gdm.join"`
	 */
	Scopes: string;

	/**
	 * The timestamp at which the token expires.
	 */
	Expires: bigint;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/applications#data-models-signedappticket-struct|Applications}
 */
export interface SignedAppTicket {
	/**
	 * The application id for the ticket.
	 */
	application_id: bigint;

	/**
	 * The user for the ticket.
	 */
	user: Discord.User;

	/**
	 * The list of the user's entitlements for this application.
	 */
	entitlements: Pick<Discord.Entitlement, 'SkuId'>[];

	/**
	 * The ISO 8601 timestamp for the ticket.
	 */
	timestamp: string;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/applications|Applications}
 */
export interface ApplicationManager {
	/**
	 * Get's the locale the current user has Discord set to.
	 *
	 * @info
	 * Value from the environment variable `DISCORD_CURRENT_LOCALE`.
	 */
	GetCurrentLocale(): string;

	/**
	 * Get the name of pushed branch on which the game is running. These are branches that you
	 * created and pushed using Dispatch.
	 *
	 * @info
	 * Value from environment variable `DISCORD_CURRENT_BRANCH`.
	 */
	GetCurrentBranch(): string;

	/**
	 * Retrieve an oauth2 bearer token for the current user.
	 *
	 * @remarks
	 * If your game was launched from Discord and you call this function, you will automatically
	 * receive the token. If the game was *not* launched from Discord and this method is called,
	 * Discord will focus itself and prompt the user for authorization.
	 *
	 * @info
	 * Value from the environment variable `DISCORD_ACCESS_TOKEN`.
	 *
	 * @warning
	 * Ensure that you have `http://127.0.0.1` set as a valid redirect URI for your application in
	 * the Developer Portal, or this method will always return an error.
	 */
	GetOAuth2Token(callback: (result: Discord.Result, token: Discord.OAuth2Token) => void): void;

	/**
	 * Checks if the current user has the entitlement to run this game.
	 */
	ValidateOrExit(callback: (result: Discord.Result) => void): void;

	/**
	 * Get the signed app ticket for the current user.
	 *
	 * @remarks
	 * The structure of the ticket is: `version.signature.base64encodedjson`, so you should split
	 * the string by the `.` character. Ensure that the `version` matches the current version (2).
	 * The `signature` is used to verify the ticket using the libsodium library of your choice, and
	 * the `base64encodedjson` is what you can transform after verification. It contains:
	 *
	 * - The application ID tied to the ticket.
	 * - The user's user ID.
	 * - A timestamp for the ticket.
	 * - The list of the user's entitlements for the application ID.
	 *
	 * These values can be accessed by transforming the string into a SignedAppTicket with your
	 * application's private key.
	 */
	GetTicket(callback: (result: Discord.Result, ticket: string) => void): void;
}
