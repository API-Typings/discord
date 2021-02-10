import { Nullable, Snowflake } from './';

export interface DiscoveryCategory {
	/**
	 * Numeric ID of the category
	 */
	id: number;

	/**
	 * The name of this category, in multiple languages
	 */
	name: DiscoveryCategoryName;

	/**
	 * Whether this category can be set as a guild's primary category
	 */
	is_primary: boolean;
}

export interface DiscoveryCategoryName {
	/**
	 * The name in English
	 */
	default: string;

	/**
	 * The name in other languages
	 */
	localizations?: Record<string, string>;
}

/**
 * Used to represent a guild's Discovery settings
 *
 * @source null
 */
export interface DiscoveryMetadata {
	/**
	 * The guild ID
	 */
	guild_id: Snowflake;

	/**
	 * The ID of the primary discovery category
	 */
	primary_category_id: number;

	/**
	 * Up to 10 discovery search keywords set for this guild
	 */
	keywords: Nullable<string[]>;

	/**
	 * Whether guild info is shown when custom emojis from this guild are clicked
	 */
	emoji_discoverability_enabled: boolean;

	/**
	 * When the server's partner application was accepted or denied, for applications via Server Settings
	 */
	partner_actioned_timestamp: Nullable<string>;

	/**
	 * When the server applied for partnership, if it has a pending application
	 */
	partner_application_timestamp: Nullable<string>;

	/**
	 * IDs of up to 5 discovery subcategories set for this guild
	 */
	category_ids: number[];
}

export interface DiscoverySubcategory {
	/**
	 * The guild ID the subcategory was added to
	 */
	guild_id: Snowflake;

	/**
	 * The ID of the subcategory added
	 */
	category_id: number;
}

export interface ValidDiscoverySearchTerm {
	/**
	 * Whether the provided term is valid
	 */
	valid: boolean;
}

// - ENDPOINTS

/**
 * @endpoint GET `/discovery/valid-term`
 */
export interface ValidateDiscoverySearchTerm {
	/**
	 * The search term to check
	 */
	term: string;
}

/**
 * Modify the discovery metadata for the guild
 *
 * @endpoint PATCH `/guilds/{guild.id}/discovery-metadata`
 *
 * @returns The updated discovery metadata object on success
 */
export interface ModifyDiscoveryMetadata {
	/**
	 * The ID of the primary discovery category
	 */
	primary_category_id?: Nullable<number>;

	/**
	 * Up to 10 discovery search keywords
	 */
	keywords?: Nullable<string[]>;

	/**
	 * Whether guild info is shown when custom emojis are clicked
	 */
	emoji_discoverability_enabled?: Nullable<boolean>;
}
