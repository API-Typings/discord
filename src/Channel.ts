import { Nullable } from '.';
import { User } from './User';

export interface Channel {
	id: string;
	type: ChannelType;
	guild_id: string;
	position: number;
	permission_overwrites: Overwrite[];
	name: string;
	topic: Nullable<string>;
	nsfw: boolean;
	parent_id: Nullable<string>;
}

export interface DMChannel
	extends Pick<Channel, 'id' | 'type'>,
		Pick<TextChannel, 'last_message_id' | 'last_pin_timestamp'> {
	recipients: User[];
	application_id?: string;
}

export interface FollowedChannel {
	channel_id: string;
	webhook_id: string;
}

export interface GroupDMChannel extends DMChannel {
	icon: Nullable<string>;
	owner_id: string;
}

export interface Overwrite {
	id: string;
	type: OverwriteType;
	allow: string;
	deny: string;
}

export interface TextChannel extends Channel {
	last_message_id: Nullable<string>;
	rate_limit_per_user: number;
	last_pin_timestamp: Nullable<string>;
}

export interface VoiceChannel extends Channel {
	bitrate: number;
	user_limit: number;
}

export enum ChannelType {
	GuilText,
	DM,
	GuildVoice,
	GroupDM,
	GuildCategory,
	GuildNews,
	GuildStore
}

export enum OverwriteType {
	Role,
	Member
}

export type Category = Omit<Channel, 'topic'>;

export type NewsChannel = Omit<TextChannel, 'rate_limit_per_user'>;

export type PartialChannel = Pick<Channel, 'id' | 'name' | 'type'>;
