import { Nullable, Snowflake } from './';

/**
 * An application command is the base "command" model that belongs to an application. This is what you are creating when you POST a new command
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommand Application Command}
 */
export interface Command {
	/**
	 * Unique ID of the command
	 */
	id: Snowflake;

	/**
	 * Unique ID of the parent application
	 */
	application_id: Snowflake;

	/**
	 * 3-32 character name matching `^[\w-]{3,32}$`
	 */
	name: string;

	/**
	 * 1-100 character description
	 */
	description: string;

	/**
	 * The parameters for the command
	 */
	options?: CommandOption[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata Interaction}
 */
export interface CommandData {
	/**
	 * The ID of the invoked command
	 */
	id: Snowflake;

	/**
	 * The name of the invoked command
	 */
	name: string;

	/**
	 * The params + values from the user
	 */
	options?: CommandOptionData[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption Application Command}
 */
export interface CommandOption {
	/**
	 * Value of {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype Application Command}
	 */
	type: CommandOptionType;

	/**
	 * 1-32 character name matching ^[\w-]{1,32}$
	 */
	name: string;

	/**
	 * 1-100 character description
	 */
	description: string;

	/**
	 * If the parameter is required or optional--default `false`
	 */
	required?: boolean;

	/**
	 * Choices for `string` and `int` types for the user to pick from
	 */
	choices?: CommandOptionChoice[];

	/**
	 * If the option is a subcommand or subcommand group type, this nested options will be the parameters
	 */
	options?: CommandOption[];
}

/**
 * If you specify `choices` for an option, they are the only valid values for a user to pick
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice Application Command}
 */
export interface CommandOptionChoice {
	/**
	 * 1-100 character choice name
	 */
	name: string;

	/**
	 * Value of the choice
	 */
	value: string | number;
}

/**
 * All options have names, and an option can either be a parameter and input value--in which case value will be set--
 * or it can denote a subcommand or group--in which case it will contain a top-level key and another array of options
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption Interaction}
 */
export interface CommandOptionData {
	/**
	 * The name of the parameter
	 */
	name: string;

	/**
	 * The value of the pair
	 */
	value?: any;

	/**
	 * Present if this option is a group or subcommand
	 */
	options?: CommandOptionData[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype Application Command}
 */
export enum CommandOptionType {
	/**
	 * Organized commands grouped by specifying actions within a command or group
	 */
	SubCommand = 1,

	/**
	 * Organized subcommands grouped by subcommands with similar actions or resources within a command
	 */
	SubCommandGroup,
	String,
	Integer,
	Boolean,
	User,
	Channel,
	Role
}

// - ENDPOINTS

/**
 * 1. Create a new global/guild command
 * 2. Edit a global/guild command
 *
 * @endpoint
 * 1. [POST](https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command)
 * - `/applications/{application.id}/commands`
 * - `/applications/{application.id}/guilds/{guild.id}/commands`
 *
 * 2. [PATCH](https://discord.com/developers/docs/interactions/slash-commands#edit-global-application-command)
 * - `/applications/{application.id}/commands/{command.id}`
 * - `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 *
 * @returns
 * 1. `201` and an {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommand Application Command} object
 * 2. `200` and an {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommand Application Command} object
 */
export interface CommandRequest {
	/**
	 * 3-32 character command name
	 */
	name?: string;

	/**
	 * 1-100 character description
	 */
	description?: string;

	/**
	 * The parameters for the command
	 */
	options?: Nullable<CommandOption[]>;
}
