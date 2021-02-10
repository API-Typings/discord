import { Nullable, PartialGuild, Snowflake, User } from './';

/**
 * Represents a code that when used, creates a guild based on a snapshot of an existing one
 *
 * @source {@link https://discord.com/developers/docs/resources/template#template-object-template-structure Template}
 */
export interface Template {
	/**
	 * The template code (unique ID)
	 */
	code: string;

	/**
	 * Template name
	 */
	name: string;

	/**
	 * The description for the template
	 */
	description: Nullable<string>;

	/**
	 * Number of times this template has been used
	 */
	usage_count: number;

	/**
	 * The ID of the user who created the template
	 */
	creator_id: Snowflake;

	/**
	 * The user who created the template
	 */
	creator: User;

	/**
	 * When this template was created
	 */
	created_at: string;

	/**
	 * When this template was last synced to the source guild
	 */
	updated_at: string;

	/**
	 * The ID of the guild this template is based on
	 */
	source_guild_id: Snowflake;

	/**
	 * The guild snapshot this template contains
	 */
	serialized_source_guild: PartialGuild;

	/**
	 * Whether the template has unsynced changes
	 */
	is_dirty: Nullable<boolean>;
}

// SECTION Endpoints

/**
 * Create a new guild based on a template
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/template#create-guild-from-template) `/guilds/templates/{template.code}`
 *
 * @returns A {@link https://discord.com/developers/docs/resources/guild#guild-object guild} object on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-create Guild Create} Gateway event
 */
export interface CreateGuildFromTemplate {
	/**
	 * Name of the guild (2-100 characters)
	 */
	name: string;

	/**
	 * Base64 128x128 image for the guild icon
	 */
	icon?: string;
}

/**
 * Creates a template for the guild
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/template#create-guild-template) `/guilds/{guild.id}/templates`
 *
 * @returns The created {@link https://discord.com/developers/docs/resources/template#template-object template} object on success
 */
export interface CreateTemplate {
	/**
	 * Name of the template (1-100 characters)
	 */
	name: string;

	/**
	 * Description for the template (0-120 characters)
	 */
	description?: Nullable<string>;
}

/**
 * Modifies the template's metadata
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/template#modify-guild-template) `/guilds/{guild.id}/templates/{template.code}`
 *
 * @returns The {@link https://discord.com/developers/docs/resources/template#template-object template} object on success
 */
export interface ModifyTemplate {
	/**
	 * Name of the template (1-100 characters)
	 */
	name?: string;

	/**
	 * Description for the template (0-120 characters)
	 */
	description?: Nullable<string>;
}

// !SECTION
