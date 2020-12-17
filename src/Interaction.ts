import { Embed } from './Embed';
import { Member } from './Member';
import { AllowedMentions } from './Message';

export interface Interaction {
	id: string;
	type: InteractionType;
	data?: InteractionData;
	guild_id: string;
	channel_id: string;
	member: Member;
	token: string;
	version: number;
}

export interface InteractionCommandCallbackData {
	tts?: boolean;
	content: string;
	embeds?: Embed[];
	allowed_mentions?: AllowedMentions;
}

export interface InteractionData {
	id: string;
	name: string;
	options: InteractionDataOption[];
}

export interface InteractionDataOption {
	name: string;
	value?: any;
	options?: InteractionDataOption[];
}

export interface InteractionResponse {
	type: InteractionResponseType;
	data?: InteractionCommandCallbackData;
}

export enum InteractionResponseType {
	Pong = 1,
	Acknowledge,
	ChannelMessage,
	SourcedChannelMessage,
	SourcedAcknowledgment
}

export enum InteractionType {
	Ping = 1,
	ApplicationCommand = 2
}
