import type { Nullable, TupleOf } from 'extended-utility-types';
import type { Snowflake } from '../';

/**
 * Used to represent a guild's Discovery settings.
 */
export interface DiscoveryMetadata {
	/**
	 * The guild ID.
	 */
	guild_id: Snowflake;

	/**
	 * The ID of the primary discovery category.
	 */
	primary_category_id: number;

	/**
	 * Up to 10 discovery search keywords set for this guild.
	 */
	keywords: Nullable<string[]>;

	/**
	 * Whether guild info is shown when custom emojis from this guild are clicked.
	 */
	emoji_discoverability_enabled: boolean;

	/**
	 * When the server's partner application was accepted or denied, for applications via Server
	 * Settings.
	 */
	partner_actioned_timestamp: Nullable<string>;

	/**
	 * When the server applied for partnership, if it has a pending application.
	 */
	partner_application_timestamp: Nullable<string>;

	/**
	 * IDs of up to 5 discovery subcategories set for this guild.
	 */
	category_ids: Partial<TupleOf<number, 5>>;
}

export interface DiscoveryCategory {
	/**
	 * Numeric ID of the category.
	 */
	id: number;

	/**
	 * The name of this category, in multiple languages.
	 */
	name: DiscoveryCategoryName;

	/**
	 * Whether this category can be set as a guild's primary category.
	 */
	is_primary: boolean;
}

export interface DiscoveryCategoryName {
	/**
	 * The name in English.
	 */
	default: string;

	/**
	 * The name in other languages.
	 */
	localizations?: Record<string, string>;
}

export interface DiscoverySubcategory {
	/**
	 * The guild ID the subcategory was added to.
	 */
	guild_id: Snowflake;

	/**
	 * The ID of the subcategory added.
	 */
	category_id: number;
}

// SECTION Endpoints

/**
 * @endpoint GET `/discovery/valid-term`
 */
export interface ValidateDiscoverySearchTerm {
	body: {
		/**
		 * The search term to check.
		 */
		term: string;
	};

	response: {
		/**
		 * Whether the provided term is valid.
		 */
		valid: boolean;
	};
}

// !SECTION
