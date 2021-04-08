import type { FixedTuple, Nullable } from 'extended-utility-types';
import type {
	AllowedMentions,
	EditWebhookMessage,
	Embed,
	ExecuteWebhook,
	GuildMember,
	PartialChannel,
	PartialGuildMember,
	Role,
	Snowflake,
	User
} from '../';

// ANCHOR Slash Command Limits

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#a-quick-note-on-limits|Slash Commands}
 */
export enum SlashCommandLimit {
	/**
	 * An app can have up to 100 top-level global commands with unique names.
	 */
	GlobalCommands = 100,

	/**
	 * An app can have up to an additional 100 guild commands per guild.
	 */
	GuildCommands = 100,

	/**
	 * An app can have up to 25 subcommand groups on a top-level command.
	 */
	SubcommandGroups = 25,

	/**
	 * An app can have up to 25 subcommands within a subcommand group.
	 */
	Subcommands = 25,

	/**
	 * Commands can have up to 25 `options`.
	 */
	CommandOptions = 25,

	/**
	 * Options can have up to 25 `choices`.
	 */
	CommandOptionChoices = 25,

	/**
	 * Maximum of 4000 characters for combined name, description, and value properties for each
	 * command and its subcommands and groups.
	 */
	Characters = 4000,

	/**
	 * Global rate limit of 200 application command creates per day per guild.
	 */
	GlobalRateLimit = 200
}

// SECTION Application Command

/**
 * An application command is the base "command" model that belongs to an application. This is what
 * you are creating when you `POST` a new command.
 *
 * @remarks
 * A command, or each individual subcommand, can have a maximum of 25 `options`.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommand|Slash Commands}
 */
export interface ApplicationCommand {
	/**
	 * Unique ID of the command.
	 */
	id: Snowflake;

	/**
	 * Unique ID of the parent application.
	 */
	application_id: Snowflake;

	/**
	 * 1-32 character name matching `^[\w-]{1,32}$`.
	 */
	name: string;

	/**
	 * 1-100 character description.
	 */
	description: string;

	/**
	 * The parameters for the command.
	 */
	options?: Partial<FixedTuple<ApplicationCommandOption, 25>>;

	/**
	 * Whether the command is enabled by default when the app is added to a guild.
	 *
	 * @defaultValue true
	 */
	default_permission?: boolean;
}

/**
 * @remarks
 * You can specify a maximum of 25 `choices` per option.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption|Slash Commands}
 */
export interface ApplicationCommandOption {
	/**
	 * Value of `ApplicationCommandOptionType`.
	 */
	type: ApplicationCommandOptionType;

	/**
	 * 1-32 character name matching `^[\w-]{1,32}$`
	 */
	name: string;

	/**
	 * 1-100 character description.
	 */
	description: string;

	/**
	 * If the parameter is required or optional.
	 *
	 * @defaultValue false
	 */
	required?: boolean;

	/**
	 * Choices for `string` and `number` types for the user to pick from.
	 */
	choices?: Partial<FixedTuple<ApplicationCommandOptionChoice, 25>>;

	/**
	 * If the option is a subcommand or subcommand group type, the nested options will be the
	 * parameters.
	 */
	options?: Partial<FixedTuple<ApplicationCommandOption, 25>>;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype|Application Command}
 */
export enum ApplicationCommandOptionType {
	/**
	 * Organized commands grouped by specifying actions within a command or group.
	 */
	SubCommand = 1,

	/**
	 * Organized subcommands grouped by subcommands with similar actions or resources within a
	 * command.
	 */
	SubCommandGroup,
	String,
	Integer,
	Boolean,
	User,
	Channel,
	Role
}

/**
 * If you specify `choices` for an option, they are the **only** valid values for a user to pick.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice|Slash Commands}
 */
export interface ApplicationCommandOptionChoice {
	/**
	 * 1-100 character choice name.
	 */
	name: string;

	/**
	 * Value of the choice, up to 100 characters if string.
	 */
	value: string | number;
}

// ANCHOR Partial Guild Application Command Permissions

export interface PartialGuildApplicationCommandPermissions {
	/**
	 * The ID of the command.
	 */
	id: Snowflake;

	/**
	 * The permissions for the command in the guild.
	 */
	permissions: ApplicationCommandPermissions[];
}

/**
 * Returns when fetching the permissions for a command in a guild.
 */
export interface GuildApplicationCommandPermissions extends PartialGuildApplicationCommandPermissions {
	/**
	 * The ID of the application the command belongs to.
	 */
	application_id: Snowflake;

	/**
	 * The ID of the guild.
	 */
	guild_id: Snowflake;
}

/**
 * Application command permissions allow you to enable or disable commands for specific users or
 * roles within a guild.
 */
export interface ApplicationCommandPermissions {
	/**
	 * The ID of the role or user.
	 */
	id: Snowflake;

	/**
	 * Role or user.
	 */
	type: ApplicationCommandPermissionType;

	/**
	 * `true` to allow, `false` to disallow.
	 */
	permission: boolean;
}

export enum ApplicationCommandPermissionType {
	Role = 1,
	User
}

// !SECTION

// ANCHOR Interaction

/**
 * An interaction is the base "thing" that is sent when a user invokes a command, and is the same
 * for Slash Commands and other future interaction types.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction|Slash Commands}
 */
export interface Interaction {
	/**
	 * ID of the interaction.
	 */
	id: Snowflake;

	/**
	 * ID of the application this interaction is for.
	 */
	application_id: Snowflake;

	/**
	 * The type of interaction.
	 */
	type: InteractionType;

	/**
	 * The command data payload. This is always present on `ApplicationCommand` interaction types.
	 */
	data?: ApplicationCommandInteractionData;

	/**
	 * The guild it was sent from.
	 */
	guild_id?: Snowflake;

	/**
	 * The channel it was sent from.
	 */
	channel_id?: Snowflake;

	/**
	 * Guild member data for the invoking user, including permissions.
	 */
	member?: GuildMember;

	/**
	 * User object for the invoking user, if invoked in a DM.
	 */
	user?: User;

	/**
	 * A continuation token for responding to the interaction.
	 */
	token: string;

	/**
	 * Read-only property, always `1`.
	 *
	 * @readonly
	 */
	readonly version: 1;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype|Slash Commands}
 */
export enum InteractionType {
	Ping = 1,
	ApplicationCommand
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata|Slash Commands}
 */
export interface ApplicationCommandInteractionData {
	/**
	 * The ID of the invoked command.
	 */
	id: Snowflake;

	/**
	 * The name of the invoked command.
	 */
	name: string;

	/**
	 * Converted users + roles + channels.
	 */
	resolved?: ApplicationCommandInteractionDataResolved;

	/**
	 * The params + values from the user.
	 */
	options?: ApplicationCommandInteractionOptionData[];
}

export interface ApplicationCommandInteractionDataResolved {
	/**
	 * The IDs and User objects.
	 */
	users?: Record<Snowflake, User>;

	/**
	 * The IDs and partial Member objects.
	 */
	members?: Record<Snowflake, PartialGuildMember>;

	/**
	 * The IDs and Role objects.
	 */
	roles?: Record<Snowflake, Role>;

	/**
	 * The IDs and partial Channel objects.
	 */
	channels?: Record<Snowflake, PartialChannel>;
}

/**
 * All options have names, and an option can either be a parameter and input value–in which case
 * `value` will be set–or it can denote a subcommand or group–in which case it will contain a
 * top-level key and another array of `options`.
 *
 * `value` and `options` are mutually exclusive.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption|Slash Commands}
 */
export interface ApplicationCommandInteractionOptionData {
	/**
	 * The name of the parameter.
	 */
	name: string;

	/**
	 * Value of `ApplicationCommandOptionType`.
	 */
	type: ApplicationCommandOptionType;

	/**
	 * The value of the pair.
	 */
	value?: unknown;

	/**
	 * Present if this option is a group or subcommand.
	 */
	options?: ApplicationCommandInteractionOptionData[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response|Slash Commands}
 */
export interface InteractionResponse {
	/**
	 * The type of response.
	 */
	type: InteractionResponseType;

	/**
	 * An optional response message.
	 */
	data?: InteractionApplicationCommandCallbackData;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype|Slash Commands}
 */
export enum InteractionResponseType {
	/**
	 * ACK a `Ping`.
	 */
	Pong = 1,

	/**
	 * Respond to an interaction with a message.
	 */
	ChannelMessageSource = 4,

	/**
	 * ACK an interaction and send a response later, the user sees a loading state.
	 */
	DeferredChannelMessageSource
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata|Slash Commands}
 */
export interface InteractionApplicationCommandCallbackData {
	/**
	 * Is the response TTS.
	 */
	tts?: boolean;

	/**
	 * Message content.
	 */
	content?: string;

	/**
	 * Supports up to 10 embeds.
	 */
	embeds?: Partial<FixedTuple<Embed, 10>>;

	/**
	 * Allowed mentions object.
	 */
	allowed_mentions?: AllowedMentions;

	/**
	 * Set to `64` to make your response ephemeral.
	 */
	flags?: number;
}

// ANCHOR Message Interaction

/**
 * This is sent on the message object when the message is a response to an Interaction.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#messageinteraction|Slash Commands}
 */
export interface MessageInteraction {
	/**
	 * ID of the interaction.
	 */
	id: Snowflake;

	/**
	 * The type of interaction.
	 */
	type: InteractionType;

	/**
	 * The name of the `ApplicationCommand`.
	 */
	name: string;

	/**
	 * The user who invoked the interaction.
	 */
	user: User;
}

// SECTION Endpoints

/**
 * Fetch all of the global commands for your application.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-global-application-commands) `/applications/{application.id}/commands`
 */
export type GetGlobalApplicationCommands = { response: ApplicationCommand[] };

/**
 * Creates a new global command. New global commands will be available in all guilds after 1 hour.
 *
 * @remarks
 * Creating a command with the same name as an existing command for your application will overwrite
 * the old command.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command) `/applications/{application.id}/commands`
 */
export interface CreateGlobalApplicationCommand {
	body: {
		/**
		 * 1-32 character name matching `^[\w-]{1,32}$`.
		 */
		name: string;

		/**
		 * 1-100 character description.
		 */
		description: string;

		/**
		 * The parameters for the command.
		 */
		options?: ApplicationCommandOption[];

		/**
		 * Whether the command is enabled by default when the app is added to a guild.
		 *
		 * @defaultValue true
		 */
		default_permission?: boolean;
	};

	response: ApplicationCommand;
}

/**
 * Fetch a global command for your application.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-global-application-command) `/applications/{application.id}/commands/{command.id}`
 */
export type GetGlobalApplicationCommand = { response: ApplicationCommand };

/**
 * Edit a global command. Updates will be available in all guilds after 1 hour.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/slash-commands#edit-guild-application-command) `/applications/{application.id}/commands/{command.id}`
 */
export interface EditGlobalApplicationCommand {
	body: {
		/**
		 * 1-32 character name matching `^[\w-]{1,32}$`.
		 */
		name?: string;

		/**
		 * 1-100 character description.
		 */
		description?: string;

		/**
		 * The parameters for the command.
		 */
		options?: Nullable<ApplicationCommandOption>[];

		/**
		 * Whether the command is enabled by default when the app is added to a guild.
		 *
		 * @defaultValue true
		 */
		default_permission?: boolean;
	};

	response: ApplicationCommand;
}

/**
 * Deletes a global command.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/slash-commands#delete-global-application-command) `/applications/{application.id}/commands/{command.id}`
 */
export type DeleteGlobalApplicationCommand = { response: never };

/**
 * Fetch all of the guild commands for your application for a specific guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-commands) `/applications/{application.id}/guilds/{guild.id}/commands`
 */
export type GetGuildApplicationCommands = { response: ApplicationCommand[] };

/**
 * Takes a list of application commands, overwriting existing commands that are registered globally
 * for this application. Updates will be available in all guilds after 1 hour.
 *
 * Commands that do not already exist will count toward your daily application command create limit.
 *
 * @endpoint PUT `/applications/{application.id}/commands`
 */
export interface BulkOverwriteGlobalApplicationCommands {
	body: ApplicationCommand[];
	response: ApplicationCommand[];
}

/**
 * Create a new guild command. New guild commands will be available in the guild immediately.
 *
 * @remarks
 * - If the command did not already exist, it will count toward your daily application command
 * create limit.
 * - Creating a command with the same name as an existing command for your application will
 * overwrite the old command.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command) `/applications/{application.id}/guilds/{guild.id}/commands`
 */
export interface CreateGuildApplicationCommand {
	body: CreateGlobalApplicationCommand['body'];
	response: ApplicationCommand;
}

/**
 * Fetch a guild command for your application.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-command) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 */
export type GetGuildApplicationCommand = { response: ApplicationCommand };

/**
 * Edit a guild command. Updates for guild commands will be available immediately.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/slash-commands#edit-global-application-command) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 */
export interface EditGuildApplicationCommand {
	body: EditGlobalApplicationCommand['body'];
	response: ApplicationCommand;
}

/**
 * Delete a guild command.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/slash-commands#delete-guild-application-command) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 */
export type DeleteGuildApplicationCommand = { response: never };

/**
 * Takes a list of application commands, overwriting existing commands for the guild.
 *
 * @endpoint PUT `/applications/{application.id}/guilds/{guild.id}/commands`
 */
export type BulkOverwriteGuildApplicationCommands = BulkOverwriteGlobalApplicationCommands;

/**
 * Create a response to an Interaction from the gateway.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/slash-commands#create-interaction-response) `/interactions/{interaction.id}/{interaction.token}/callback`
 */
export interface CreateInteractionResponse {
	body: InteractionResponse;
	response: never;
}

/**
 * Edits the initial Interaction response.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/slash-commands#edit-original-interaction-response) `/webhooks/{application.id}/{interaction.token}/messages/@original`
 */
export type EditOriginalInteractionResponse = EditWebhookMessage;

/**
 * Deletes the initial Interaction response.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/slash-commands#delete-original-interaction-response) `/webhooks/{application.id}/{interaction.token}/messages/@original`
 */
export type DeleteOriginalInteractionResponse = { response: never };

/**
 * Create a followup message for an Interaction.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/slash-commands#create-followup-message) `/webhooks/{application.id}/{interaction.token}`
 */
export type CreateFollowupMessage = ExecuteWebhook['body'];

/**
 * Edits a followup message for an Interaction.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/slash-commands#edit-followup-message) `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
 */
export type EditFollowupMessage = EditWebhookMessage;

/**
 * Deletes a followup message for an Interaction.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/slash-commands#delete-followup-message) `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
 */
export type DeleteFollowupMessage = { response: never };

/**
 * Fetches command permissions for all commands for your application in a guild.
 *
 * @endpoint GET `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
 */
export type GetGuildApplicationCommandPermissions = { response: GuildApplicationCommandPermissions[] };

/* eslint-disable max-len */
/**
 * Fetches command permissions for a specific command for your application in a guild.
 *
 * @endpoint GET `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
 */
export type GetApplicationCommandPermissions = { response: ApplicationCommandPermissions[] };

/**
 * Edits command permissions for a specific command for your application in a guild.
 *
 * @remarks
 * - This endpoint will overwrite existing permissions for the command in that guild.
 * - Deleting or renaming a command will permanently delete all permissions for that command.
 *
 * @endpoint PUT `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
 */
/* eslint-enable max-len */
export interface EditApplicationCommandPermissions {
	body: {
		permissions: ApplicationCommandPermissions[];
	};

	response: GuildApplicationCommandPermissions;
}

/**
 * Batch edits permissions for all commands in a guild.
 *
 * @remarks
 * This endpoint will overwrite existing permissions for the command in that guild.
 *
 * @endpoint PUT `/applications/{application.id}/guilds/{guild.id}/permissions`
 */
export interface BatchEditApplicationCommandPermissions {
	body: PartialGuildApplicationCommandPermissions[];
}

// !SECTION
