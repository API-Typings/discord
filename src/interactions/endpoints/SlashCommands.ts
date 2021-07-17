import type { Nullable, Tuple } from 'extended-utility-types';
import type {
	ApplicationCommand,
	ApplicationCommandOption,
	ApplicationCommandPermissions,
	EditWebhookMessage,
	ExecuteWebhook,
	GetWebhookMessage,
	GuildApplicationCommandPermissions,
	InteractionResponse,
	PartialGuildApplicationCommandPermissions
} from '../../';

/**
 * Fetch all of the global commands for your application. Returns an array of application command
 * objects.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-global-application-commands) `/applications/{application.id}/commands`
 */
export interface GetGlobalApplicationCommands {
	response: ApplicationCommand[];
}

/**
 * Creates a new global command. Returns `201` and an application command object.
 *
 * New global commands will be available in all guilds after 1 hour.
 *
 * @remarks
 * Creating a command with the same name as an existing command for your application will overwrite
 * the old command.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command) `/applications/{application.id}/commands`
 */
export interface CreateGlobalApplicationCommand {
	body: Omit<ApplicationCommand, 'id' | 'application_id'>;
	response: ApplicationCommand;
}

/**
 * Fetch a global command for your application. Returns an application command object.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-global-application-command) `/applications/{application.id}/commands/{command.id}`
 */
export interface GetGlobalApplicationCommand {
	response: ApplicationCommand;
}

/**
 * Edit a global command. Returns `200` and an application command object.
 *
 * Updates will be available in all guilds after `1` hour.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/slash-commands#edit-guild-application-command) `/applications/{application.id}/commands/{command.id}`
 */
export interface EditGlobalApplicationCommand {
	body: Partial<Omit<CreateGlobalApplicationCommand, 'options'>> & {
		/**
		 * The parameters for the command.
		 */
		options?: Nullable<ApplicationCommandOption>[];
	};

	response: ApplicationCommand;
}

/**
 * Deletes a global command. Returns `204`
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/slash-commands#delete-global-application-command) `/applications/{application.id}/commands/{command.id}`
 */
export interface DeleteGlobalApplicationCommand {
	response: never;
}

/**
 * Fetch all of the guild commands for your application for a specific guild. Returns an array of
 * application command objects.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-commands) `/applications/{application.id}/guilds/{guild.id}/commands`
 */
export interface GetGuildApplicationCommands {
	response: ApplicationCommand[];
}

/**
 * Takes a list of application commands, overwriting existing commands that are registered globally
 * for this application. Returns `200` and a list of application command objects.
 *
 * Updates will be available in all guilds after `1` hour. Commands that do not already exist will
 * count toward the daily application command create limit.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/interactions/slash-commands#bulk-overwrite-global-application-commands) `/applications/{application.id}/commands`
 */
export interface BulkOverwriteGlobalApplicationCommands {
	body: ApplicationCommand[];
	response: ApplicationCommand[];
}

/**
 * Create a new guild command. Returns `201` and an application command object.
 *
 * New guild commands will be available in the guild immediately. If the command did not already
 * exist, it will count toward the daily application command create limit.
 *
 * @remarks
 * Creating a command with the same name as an existing command for your application will
 * overwrite the old command.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command) `/applications/{application.id}/guilds/{guild.id}/commands`
 */
export interface CreateGuildApplicationCommand {
	body: CreateGlobalApplicationCommand['body'];
	response: ApplicationCommand;
}

/**
 * Fetch a guild command for your application. Returns an application command object.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-command) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 */
export interface GetGuildApplicationCommand {
	response: ApplicationCommand;
}

/**
 * Edit a guild command. Returns `200` and an application command object.
 *
 * Updates for guild commands will be available immediately.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/slash-commands#edit-global-application-command) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 */
export interface EditGuildApplicationCommand {
	body: EditGlobalApplicationCommand['body'];
	response: ApplicationCommand;
}

/**
 * Delete a guild command. Returns `204` on success.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/slash-commands#delete-guild-application-command) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 */
export interface DeleteGuildApplicationCommand {
	response: never;
}

/**
 * Takes a list of application commands, overwriting existing commands for the guild. Returns `200`
 * and a list of application command objects.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/interactions/slash-commands#bulk-overwrite-guild-application-commands) `/applications/{application.id}/guilds/{guild.id}/commands`
 */
export type BulkOverwriteGuildApplicationCommands = BulkOverwriteGlobalApplicationCommands;

/**
 * Create a response to an Interaction from the gateway.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/slash-commands#create-interaction-response) `/interactions/{interaction.id}/{interaction.token}/callback`
 */
export interface CreateInteractionResponse {
	body: InteractionResponse;
	response: InteractionResponse;
}

/**
 * Returns the initial Interaction response.
 *
 * Functions the same as Get Webhook Message.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-original-interaction-response) `/webhooks/{application.id}/{interaction.token}/messages/@original`
 */
export type GetOriginalInteractionResponse = GetWebhookMessage;

/**
 * Edits the initial Interaction response.
 *
 * Functions the same as Edit Webhook Message.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/slash-commands#edit-original-interaction-response) `/webhooks/{application.id}/{interaction.token}/messages/@original`
 */
export type EditOriginalInteractionResponse = EditWebhookMessage;

/**
 * Deletes the initial Interaction response. Returns `204` on success.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/slash-commands#delete-original-interaction-response) `/webhooks/{application.id}/{interaction.token}/messages/@original`
 */
export interface DeleteOriginalInteractionResponse {
	response: never;
}

/**
 * Create a followup message for an Interaction.
 *
 * Functions the same as Execute Webhook, but `wait` is always true, and `flags` can be set to `64`
 * in the body to send an ephemeral message. The `thread_id` query parameter is not required (and
 * is furthermore ignored) when using this endpoint for interaction followups.
 *
 * @endpoint [POST](https://discord.com/developers/docs/interactions/slash-commands#create-followup-message) `/webhooks/{application.id}/{interaction.token}`
 */
export type CreateFollowupMessage = ExecuteWebhook['body'];

/**
 * Edits a followup message for an Interaction.
 *
 * Functions the same as Edit Webhook Message.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/interactions/slash-commands#edit-followup-message) `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
 */
export type EditFollowupMessage = EditWebhookMessage;

/**
 * Deletes a followup message for an Interaction. Returns `204` on success.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/interactions/slash-commands#delete-followup-message) `/webhooks/{application.id}/{interaction.token}/messages/{message.id}`
 */
export interface DeleteFollowupMessage {
	response: never;
}

/**
 * Fetches command permissions for all commands for your application in a guild. Returns an array of
 * guild application command permissions objects.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-command-permissions) `/applications/{application.id}/guilds/{guild.id}/commands/permissions`
 */
export interface GetGuildApplicationCommandPermissions {
	response: GuildApplicationCommandPermissions[];
}

/* eslint-disable max-len */
/**
 * Fetches command permissions for a specific command for your application in a guild. Returns an
 * array of guild application command permissions objects.
 *
 * @endpoint [GET](https://discord.com/developers/docs/interactions/slash-commands#get-application-command-permissions) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
 */
export interface GetApplicationCommandPermissions {
	response: ApplicationCommandPermissions[];
}

/**
 * Edits command permissions for a specific command for your application in a guild. Returns a
 * GuildApplicationCommandPermissions object.
 *
 * Only up to `10` permission overwrites can be added to a command.
 *
 * @remarks
 * - This endpoint will overwrite existing permissions for the command in that guild.
 * - Deleting or renaming a command will permanently delete all permissions for that command.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/interactions/slash-commands#edit-application-command-permissions) `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions`
 */
/* eslint-enable max-len */
export interface EditApplicationCommandPermissions {
	body: {
		/**
		 * The permissions for the command in the guild.
		 */
		permissions: Partial<Tuple<ApplicationCommandPermissions, 10>>;
	};

	response: GuildApplicationCommandPermissions;
}

/**
 * Batch edits permissions for all commands in a guild. Returns an array of
 * GuildApplicationCommandPermissions objects.
 *
 * Only up to `10` permission overwrites can be added to a command.
 *
 * @remarks
 * This endpoint will overwrite existing permissions for the command in that guild.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/interactions/slash-commands#batch-edit-application-command-permissions) `/applications/{application.id}/guilds/{guild.id}/permissions`
 */
export interface BatchEditApplicationCommandPermissions {
	body: Partial<Tuple<PartialGuildApplicationCommandPermissions, 10>>;
	response: GuildApplicationCommandPermissions[];
}
