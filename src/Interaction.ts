import { Embed } from './Embed';
import { Member } from './Member';
import { AllowedMentions } from './Message';

/**
 * An interaction is the base "thing" that is sent when a user invokes a command, and is the same for Slash Commands and other future interaction types
 *
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction Interaction}
 */
export interface Interaction {
	/**
	 * ID of the interaction
	 */
	id: string;

	/**
	 * The type of interaction
	 */
	type: InteractionType;

	/**
	 * The command data payload
	 */
	data?: InteractionData;

	/**
	 * The guild it was sent from
	 */
	guild_id: string;

	/**
	 * The channel it was sent from
	 */
	channel_id: string;

	/**
	 * Guild member data for the invoking user
	 */
	member: Member;

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
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionapplicationcommandcallbackdata Interaction}
 */
export interface InteractionCommandCallbackData {
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

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondata Interaction}
 */
export interface InteractionData {
	/**
	 * The ID of the invoked command
	 */
	id: string;

	/**
	 * The name of the invoked command
	 */
	name: string;

	/**
	 * The params + values from the user
	 */
	options: InteractionDataOption[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-applicationcommandinteractiondataoption Interaction}
 */
export interface InteractionDataOption {
	/**
	 * The name of the parameter
	 */
	name: string;

	/**
	 * The value of the pair
	 */
	value?: any

	/**
	 * Present if this option is a group or subcommand
	 */
	options?: InteractionDataOption[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response Interaction}
 */
export interface InteractionResponse {
	/**
	 * The type of response
	 */
	type: InteractionResponseType;

	/**
	 * An optional response message
	 */
	data?: InteractionCommandCallbackData;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype Interaction}
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
	Message,

	/**
	 * Respond with a message, showing the user's input
	 */
	SourcedMessage,

	/**
	 * ACK a command without sending a message, showing the user's input
	 */
	SourcedAcknowledge
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype Interaction}
 */
export enum InteractionType {
	Ping = 1,
	ApplicationCommand
}
