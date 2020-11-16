import { Nullable } from '..';
import { Channel } from '../Channel';
import { BasePayload, Events, OPCodes } from '.';
import { Guild, UnavailableGuild } from '../Guild';
import { Member, Role, VoiceState } from '../Member';
import { PartialUser, TargetUser, User } from '../User';
import { Emoji, Message, PartialEmoji } from '../Message';
import { Activity, ClientStatus, Presence } from '../Activity';

interface Event<E extends Events, D = unknown> extends BasePayload {
	op: OPCodes.Dispatch;
	t: E;
	d: D;
}

interface GuildData {
	guild_id: string;
}

export interface ChannelPinsData {
	guild_id?: string;
	channel_id: string;
	last_pin_timestamp?: Nullable<string>;
}

export interface GuildBanData extends GuildData {
	user: User;
}

export interface GuildEmojisData extends GuildData {
	emojis: Emoji[];
}

export interface GuildMemberRemoveData extends GuildData {
	user: User;
}

export interface GuildMembersChunkData {
	members: Member[];
	chunk_index: number;
	chunk_count: number;
	not_found?: string[];
	presences?: Presence[];
	nonce?: string;
}

export interface GuildMemberUpdateData extends GuildData {
	roles: string[];
	user: User;
	nick?: Nullable<string>;
	joined_at: string;
	premium_since?: Nullable<string>;
}

export interface GuildRoleData extends GuildData {
	role: Role;
}

export interface GuildRoleDeleteData extends GuildData {
	role_id: string;
}

export interface Hello {
	op: OPCodes.Hello;
	d: HelloData;
}

export interface HelloData {
	heartbeat_interval: number;
}

export interface HeartbeatAck {
	op: OPCodes.HeartbeatAck;
}

export interface InvalidSession {
	op: OPCodes.InvalidSession;
	d: boolean;
}

export interface InviteCreateData {
	channel_id: string;
	code: string;
	created_at: string;
	guild_id?: string;
	inviter?: User;
	max_age: number;
	max_uses: number;
	target_user?: PartialUser;
	target_user_type?: TargetUser;
	temporary: boolean;
	uses: number;
}

export interface InviteDeleteData {
	channel_id: string;
	guild_id?: string;
	code: string;
}

export interface MessageBulkDeleteData extends Omit<MessageDeleteData, 'id'> {
	ids: string[];
}

export interface MessageDeleteData {
	id: string;
	channel_id: string;
	guild_id?: string;
}

export interface MessageReactionAddData extends MessageReactionData {
	user_id: string;
	emoji: PartialEmoji;
}

export interface MessageReactionData {
	channel_id: string;
	message_id: string;
	guild_id?: string;
}

export interface MessageReactionRemoveData extends MessageReactionData {
	user_id: string;
	member?: Member;
}

export interface MessageReactionRemoveEmojiData extends MessageReactionData {
	emoji: PartialEmoji;
}

export interface PresenceUpdateData {
	user: User;
	guild_id: string;
	status: string;
	activities: Activity[];
	client_status: ClientStatus;
}

export interface ReadyData {
	v: number;
	user_settings: unknown;
	user: PartialUser;
	private_channels: [];
	guilds: UnavailableGuild[];
	session_id: string;
	shard?: [number, number];
}

export interface TypingStartData {
	channel_id: string;
	guild_id?: string;
	user_id: string;
	timestamp: number;
	member?: Member;
}

export interface VoiceServerUpdateData {
	token: string;
	guild_id: string;
	endpoint: string;
}

export interface WebhooksUpdateData {
	guild_id: string;
	channel_id: string;
}

export type ChannelCreate = Event<Events.ChannelCreate, Channel>;

export type ChannelDelete = Event<Events.ChannelDelete, Channel>;

export type ChannelPinsUpdate = Event<Events.ChannelPinsUpdate, Channel>;

export type ChannelUpdate = Event<Events.ChannelUpdate, Channel>;

export type GuildBanAdd = Event<Events.GuildBanAdd, GuildBanData>;

export type GuildBanRemove = Event<Events.GuildBanRemove, GuildBanData>;

export type GuildCreate = Event<Events.GuildCreate, Guild>;

export type GuildDelete = Event<Events.GuildDelete, Guild>;

export type GuildEmojisUpdate = Event<Events.GuildEmojisUpdate, GuildEmojisData>;

export type GuildIntegrationsData = GuildData;

export type GuildIntegrationsUpdate = Event<Events.GuildIntegrationsUpdate, GuildIntegrationsData>;

export type GuildMemberAdd = Event<Events.GuildMemberAdd, GuildMemberData>;

export type GuildMemberData = GuildData;

export type GuildMemberRemove = Event<Events.GuildMemberRemove, GuildMemberRemoveData>;

export type GuildMemberUpdate = Event<Events.GuildMemberUpdate, GuildMemberUpdateData>;

export type GuildRoleCreate = Event<Events.GuildRoleCreate, GuildRoleData>;

export type GuildRoleDelete = Event<Events.GuildRoleDelete, GuildRoleDeleteData>;

export type GuildRoleUpdate = Event<Events.GuildRoleUpdate, GuildRoleData>;

export type GuildUpdate = Event<Events.GuildUpdate, Guild>;

export type InviteCreate = Event<Events.InviteCreate, InviteCreateData>;

export type InviteDelete = Event<Events.InviteDelete, InviteDeleteData>;

export type MessageBulkDelete = Event<Events.MessageDeleteBulk, MessageBulkDeleteData>;

export type MessageCreate = Event<Events.MessageCreate, Message>;

export type MessageDelete = Event<Events.MessageDelete, Message>;

export type MessageReactionAdd = Event<Events.MessageReactionAdd, MessageReactionAddData>;

export type MessageReactionRemoveEmoji = Event<
	Events.MessageReactionRemoveEmoji,
	MessageReactionRemoveEmojiData
>;

export type MessageReactionRemove = Event<Events.MessageReactionRemove, MessageReactionRemoveData>;

export type MessageReactionRemoveAll = Event<Events.MessageReactionRemoveAll, MessageReactionData>;

export type MessageUpdate = Event<Events.MessageUpdate, Message>;

export type PresenceUpdate = Event<Events.PresenceUpdate, PresenceUpdateData>;

export type TypingStart = Event<Events.TypingStart, TypingStartData>;

export type UserUpdate = Event<Events.UserUpdate, User>;

export type VoiceServerUpdate = Event<Events.VoiceServerUpdate, VoiceServerUpdateData>;

export type VoiceStateUpdate = Event<Events.VoiceStateUpdate, VoiceState>;

export type WebhooksUpdate = Event<Events.WebhooksUpdate, WebhooksUpdateData>;
