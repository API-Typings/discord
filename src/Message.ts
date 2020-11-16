import { User } from './User';
import { Embed } from './Embed';
import { Member } from './Member';
import { Nullable } from '.';
import { ChannelType } from './Channel';

export interface AllowedMentions {
	parse: AllowedMentionsType[];
	roles: string[];
	users: string[];
	replied_user: boolean;
}

export interface Attachment {
	id: string;
	filename: string;
	size: number;
	url: string;
	proxy_url: string;
	height?: Nullable<number>;
	width?: Nullable<number>;
}

export interface CrosspostedMessage extends Message {
	mention_channels?: MentionedChannel[];
	message_reference: MessageReference;
}

export interface Emoji {
	id: Nullable<string>;
	name: Nullable<string>;
	roles?: string[];
	user?: User;
	require_colons?: boolean;
	managed?: boolean;
	animated?: boolean;
	available?: boolean;
}

export interface MentionedChannel {
	id: string;
	guild_id: string;
	type: ChannelType;
	name: string;
}

export interface MentionedUser extends User {
	member?: Partial<Omit<Member, 'user'>>;
}

export interface Message {
	id: string;
	channel_id: string;
	guild_id?: string;
	author: User;
	member?: Member;
	content: string;
	timestamp: string;
	edited_timestamp?: Nullable<string>;
	tts: boolean;
	mention_everyone: boolean;
	mentions: MentionedUser[];
	mention_roles: string[];
	attachments: Attachment[];
	embeds: Embed;
	reactions?: Reaction[];
	nonce?: number | string;
	pinned: boolean;
	webhook_id?: string;
	type: MessageType;
	activity?: MessageActivity;
	application?: MessageApplication;
	referenced_message?: Nullable<Message>;
	flags?: MessageFlags;
	stickers?: Sticker[];
}

export interface MessageActivity {
	type: MessageActivityType;
	party_id?: string;
}

export interface MessageApplication {
	id: string;
	cover_image?: string;
	description: string;
	icon: Nullable<string>;
	name: string;
}

export interface MessageReference {
	message_id?: string;
	channel_id?: string;
	guild_id?: string;
}

export interface Reaction {
	count: number;
	me: boolean;
	emoji: PartialEmoji;
}

export interface Sticker {
	id: string;
	pack_id: string;
	name: string;
	description: string;
	tags?: string;
	asset: string;
	preview_asset: string;
	format_type: StickerFormat;
}

export enum MessageActivityType {
	Join = 1,
	Spectate,
	Listen,
	JoinRequest = 5
}

export enum MessageFlags {
	Crossposted = 1 << 0,
	IsCrosspost = 1 << 1,
	SuppressEmbeds = 1 << 2,
	SourceMessageDeleted = 1 << 3,
	Urgent = 1 << 4
}

export enum MessageType {
	Default,
	RecipientAdd,
	RecipientRemove,
	Call,
	ChannelNameChange,
	ChannelIconChange,
	ChannelPinnedMessage,
	GuildMemberJoin,
	UserPremiumGuildSubscription,
	UserPremiumGuildSubscriptionTier1,
	UserPremiumGuildSubscriptionTier2,
	UserPremiumGuildSubscriptionTier3,
	ChannelFollowAdd,
	GuildDiscoveryDisqualified = 14,
	GuildDiscoveryRequalified,
	InlineReply = 19
}

export enum StickerFormat {
	PNG,
	APNG,
	LOTTIE
}

export type AllowedMentionsType = 'role' | 'user' | 'everyone';

export type PartialEmoji = Pick<Emoji, 'id' | 'name' | 'animated'>;
