import type { Nullable } from '@api-typings/core';
import type { AllowedMentions, Embed, GuildMember, Snowflake, User } from '../';

// SECTION Application Command

/**
 * An application command is the base "command" model that belongs to an application.
 *
 * @info
 * A command, or each individual subcommand, can have a maximum of 10 `options`.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommand Slash Commands}
 */
export interface ApplicationCommand {
	/**
	 * Unique ID of the command
	 */
	id: Snowflake;

	/**
	 * Unique ID of the parent application
	 */
	application_id: Snowflake;

	/**
	 * 1-32 character name matching `^[\w-]{1,32}$`
	 */
	name: string;

	/**
	 * 1-100 character description
	 */
	description: string;

	/**
	 * The parameters for the command
	 */
	options?: ApplicationCommandOption[];
}

/**
 * @info
 * You can specify a maximum of 10 `choices` per option.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoption Slash Commands}
 */
export interface ApplicationCommandOption {
	/**
	 * Value of {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype Slash Commands}
	 */
	type: ApplicationCommandOptionType;

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
	choices?: ApplicationCommandOptionChoice[];

	/**
	 * If the option is a subcommand or subcommand group type, this nested options will be the parameters
	 */
	options?: ApplicationCommandOption[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype Application Command}
 */
export enum ApplicationCommandOptionType {
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

/**
 * If you specify `choices` for an option, they are the only valid values for a user to pick
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice Slash Commands}
 */
export interface ApplicationCommandOptionChoice {
	/**
	 * 1-100 character choice name
	 */
	name: string;

	/**
	 * Value of the choice
	 */
	value: string | number;
}

// !SECTION

// ANCHOR Interaction

/**
 * An interaction is the base "thing" that is sent when a user invokes a command,
 * and is the same for Slash Commands and other future interaction types
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction Slash Commands}
 */
export interface Interaction {
	/**
	 * ID of the interaction
	 */
	id: Snowflake;

	/**
	 * The type of interaction
	 */
	type: InteractionType;

	/**
	 * The command data payload
	 *
	 * @remarks
	 * This is always present on `ApplicationCommand` interaction types. It is optional for future-proofing against new interaction types.
	 */
	data?: ApplicationCommandInteractionData;

	/**
	 * The guild it was sent from
	 */
	guild_id?: Snowflake;

	/**
	 * The channel it was sent from
	 */
	channel_id?: Snowflake;

	/**
	 * Guild member data for the invoking user, including permissions
	 */
	member?: GuildMember;

	/**
	 * User object for the invoking user, if invoked in a DM
	 */
	user?: User;

	/**
	 * A continuation token for responding to the interaction
	 */
	token: string;

	/**
	 * Read-only property, always `1`
	 */
	version: number;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype Slash Commands}
 */
export enum InteractionType {
	Ping = 1,
	ApplicationCommand
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata Slash Commands}
 */
export interface ApplicationCommandInteractionData {
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
	options?: ApplicationCommandInteractionOptionData[];
}

/**
 * All options have names, and an option can either be a parameter and input value–in which case `value` will be set–
 * or it can denote a subcommand or group–in which case it will contain a top-level key and another array of `options`.
 *
 * `value` and `options` are mutually exclusive.
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption Slash Commands}
 */
export interface ApplicationCommandInteractionOptionData {
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
	options?: ApplicationCommandInteractionOptionData[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response Slash Commands}
 */
export interface InteractionResponse {
	/**
	 * The type of response
	 */
	type: InteractionResponseType;

	/**
	 * An optional response message
	 */
	data?: InteractionApplicationCommandCallbackData;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype Slash Commands}
 */
export enum InteractionResponseType {
	/**
	 * ACK a `Ping`
	 */
	Pong = 1,

	/**
	 * ACK a command without sending a message, eating the user's input
	 */
	Acknowledge,

	/**
	 * Respond with a message, eating the user's input
	 */
	ChannelMessage,

	/**
	 * Respond with a message, showing the user's input
	 */
	ChannelMessageSource,

	/**
	 * ACK a command without sending a message, showing the user's input
	 */
	AcknowledgeSource
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata Slash Commands}
 */
export interface InteractionApplicationCommandCallbackData {
	/**
	 * Is the response TTS
	 */
	tts?: boolean;

	/**
	 * Message content
	 */
	content: string;

	/**
	 * Supports up to 10 embeds
	 */
	embeds?: Embed[];

	/**
	 * {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object Allowed mentions} object
	 */
	allowed_mentions?: AllowedMentions;
}

// SECTION Endpoints

// ANCHOR Create

/**
 * Create a new guild/global command.
 * - **Guild:** new guild commands will be available in the guild immediately
 * - **Global:** new global commands will be available in all guilds after 1 hour
 *
 * @danger
 * Creating a command with the same name as an existing command for your application will overwrite the old command.
 *
 * @endpoint POST [[1][P1]] [[2][P2]]
 * - **Guild:** `/applications/{application.id}/guilds/{guild.id}/commands`
 * - **Global:** `/applications/{application.id}/commands`
 *
 * @returns `201` and an [Application Command][1] object
 *
 * [P1]: https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command
 * [P2]: https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command
 * [1]: https://discord.com/developers/docs/interactions/slash-commands#applicationcommand
 */
export interface CreateApplicationCommand {
	/**
	 * 1-32 character name matching `^[\w-]{1,32}$`
	 */
	name: string;

	/**
	 * 1-100 character description
	 */
	description: string;

	/**
	 * The parameters for the command
	 */
	options?: ApplicationCommandOption[];
}

// ANCHOR Edit

/**
 * Edit a guild/global command.
 * - **Guild:** updates for guild commands will be available immediately
 * - **Global:** updates will be available in all guilds after 1 hour
 *
 * @endpoint PATCH [[1][P1]] [[2][P2]]
 * - **Guild:** `/applications/{application.id}/guilds/{guild.id}/commands/{command.id}`
 * - **Global:** `/applications/{application.id}/commands/{command.id}`
 *
 * @returns `200` and an [Application Command][1] object
 *
 * [P1]: https://discord.com/developers/docs/interactions/slash-commands#edit-guild-application-command
 * [P2]: https://discord.com/developers/docs/interactions/slash-commands#edit-global-application-command
 * [1]: https://discord.com/developers/docs/interactions/slash-commands#applicationcommand
 */
export interface EditApplicationCommand {
	/**
	 * 1-32 character name matching `^[\w-]{1,32}$`
	 */
	name?: string;

	/**
	 * 1-100 character description
	 */
	description?: string;

	/**
	 * The parameters for the command
	 */
	options?: Nullable<ApplicationCommandOption[]>;
}

// !SECTION
