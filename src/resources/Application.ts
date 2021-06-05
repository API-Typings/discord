import type { Nullable } from 'extended-utility-types';
import type { PartialUser, Snowflake, Team, User } from '../';

// ANCHOR Partial Application

export interface PartialApplication {
	id: Snowflake;
	name: string;

	/**
	 * The icon hash of the app.
	 */
	icon: Nullable<string>;
	description: string;
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
	 * If this application is a game sold on Discord, this field will be the summary field for the
	 * store page of its primary SKU.
	 */
	summary: string;

	/**
	 * The hex encoded key for verification in interactions the GameSDK's `GetTicket`.
	 */
	verify_key: string;

	/**
	 * The application's public flags.
	 */
	flags: ApplicationFlags;
}

// ANCHOR Application

/**
 * @source {@link https://discord.com/developers/docs/resources/application#application-object-application-structure|Application}
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
	owner?: PartialUser & Pick<User, 'flags' | 'public_flags'>;

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
	 * If this application is a game sold on Discord, this field will be the ID of the "Game SKU"
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
}

export enum ApplicationFlags {
	GatewayPresence = 1 << 12,
	GatewayPresenceLimited = 1 << 13,
	GatewayGuildMembers = 1 << 14,
	GatewayGuildMembersLimited = 1 << 15,
	VerificationPendingGuildLimit = 1 << 16,
	Embedded = 1 << 17
}

export interface ApplicationAsset {
	id: Snowflake;
	name: string;
	type: number;
}

// SECTION Endpoints

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/application#get-current-bot-application-information) `/oauth2/applications/@me`
 */
export type GetCurrentBotApplicationInformation = { response: Omit<Application, 'flags'> };

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/application#get-application-information) `/applications/{application.id}/rpc`
 */
export type GetApplicationInformation = { response: PartialApplication };

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/application#get-application-assets) `/oauth2/applications/{application.id}/assets`
 */
export type GetApplicationAssets = { response: ApplicationAsset[] };

// !SECTION
