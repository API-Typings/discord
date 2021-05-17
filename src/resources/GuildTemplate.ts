import type { Nullable } from 'extended-utility-types';
import type { Guild, PartialGuild, Snowflake, User } from '../';

/**
 * Represents a code that when used, creates a guild based on a snapshot of an existing guild.
 *
 * @source {@link https://discord.com/developers/docs/resources/template#template-object-template-structure|Guild Template}
 */
export interface GuildTemplate {
	/**
	 * The template code (unique ID).
	 */
	code: string;

	/**
	 * Template name.
	 */
	name: string;

	/**
	 * The description for the template.
	 */
	description: Nullable<string>;

	/**
	 * Number of times this template has been used.
	 */
	usage_count: number;

	/**
	 * The ID of the user who created the template.
	 */
	creator_id: Snowflake;

	/**
	 * The user who created the template.
	 */
	creator: User;

	/**
	 * When this template was created.
	 */
	created_at: string;

	/**
	 * When this template was last synced to the source guild.
	 */
	updated_at: string;

	/**
	 * The ID of the guild this template is based on.
	 */
	source_guild_id: Snowflake;

	/**
	 * The guild snapshot this template contains.
	 */
	serialized_source_guild: PartialGuild;

	/**
	 * Whether the template has unsynced changes.
	 */
	is_dirty: Nullable<boolean>;
}

// SECTION Endpoints

/**
 * Returns a guild template object for the given code.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild-template#get-guild-template) `/guilds/template/{template.code}`
 */
export type GetGuildTemplate = { response: GuildTemplate };

/**
 * Create a new guild based on a template. This endpoint can be used only by bots in less than 10
 * guilds.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template) `/guilds/templates/{template.code}`
 */
export interface CreateGuildFromGuildTemplate {
	body: {
		/**
		 * Name of the guild (`2-100` characters).
		 */
		name: string;

		/**
		 * Base64 `128x128` image for the guild icon.
		 */
		icon?: string;
	};

	response: Guild;
}

/**
 * Returns an array of guild template objects. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild-template#get-guild-templates) `/guilds/{guild.id}/templates`
 */
export type GetGuildTemplates = { response: GuildTemplate[] };

/**
 * Creates a template for the guild. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild-template#create-guild-template) `/guilds/{guild.id}/templates`
 */
export interface CreateGuildTemplate {
	body: {
		/**
		 * Name of the template (`1-100` characters).
		 */
		name: string;

		/**
		 * Description for the template (`0-120` characters).
		 */
		description?: Nullable<string>;
	};

	/**
	 * The created guild template object.
	 */
	response: GuildTemplate;
}

/**
 * Syncs the template to the guild's current state. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/guild-template#get-guild-templates) `/guilds/{guild.id}/templates/{template.code}`
 */
export type SyncGuildTemplate = { response: GuildTemplate };

/**
 * Modifies the template's metadata. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild-template#modify-guild-template) `/guilds/{guild.id}/templates/{template.code}`
 */
export interface ModifyGuildTemplate {
	body: Partial<CreateGuildTemplate['body']>;
	response: GuildTemplate;
}

/**
 * Deletes the template. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild-template#delete-guild-template) `/guilds/{guild.id}/templates/{template.code}`
 */
export type DeleteGuildTemplate = {
	/**
	 * The deleted guild template object.
	 */
	response: GuildTemplate;
};

// !SECTION
