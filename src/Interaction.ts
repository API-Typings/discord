import { CommandData } from './Command';
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
	data?: CommandData;

	/**
	 * The guild it was sent from
	 */
	guild_id: string;

	/**
	 * The channel it was sent from
	 */
	channel_id: string;

	/**
	 * Guild member data for the invoking user, including permissions
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
export interface InteractionCallback {
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
	data?: InteractionCallback;
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
	Command
}
