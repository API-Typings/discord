import { Nullable } from '..';
import { Channel } from '../Channel';
import { BasePayload, OPCodes } from '.';
import { Guild, UnavailableGuild } from '../Guild';
import { Member, Role, VoiceState } from '../Member';
import { PartialUser, TargetUser, User } from '../User';
import { Emoji, Message, PartialEmoji } from '../Message';
import { Activity, ClientStatus, Presence } from '../Activity';

interface Event<E extends Events, P = unknown> extends BasePayload {
	op: OPCodes.Dispatch;
	t: E;
	d: P;
}

interface GuildPayload {
	guild_id: string;
}

export interface ChannelPinsPayload {
	guild_id?: string;
	channel_id: string;
	last_pin_timestamp?: Nullable<string>;
}

export interface GuildBanPayload extends GuildPayload {
	user: User;
}

export interface EmojisPayload extends GuildPayload {
	emojis: Emoji[];
}

export interface GuildMemberRemovePayload extends GuildPayload {
	user: User;
}

export interface GuildMembersChunkPayload {
	members: Member[];
	chunk_index: number;
	chunk_count: number;
	not_found?: string[];
	presences?: Presence[];
	nonce?: string;
}

export interface GuildMemberUpdatePayload extends GuildPayload {
	roles: string[];
	user: User;
	nick?: Nullable<string>;
	joined_at: string;
	premium_since?: Nullable<string>;
}

export interface GuildRolePayload extends GuildPayload {
	role: Role;
}

export interface GuildRoleDeletePayload extends GuildPayload {
	role_id: string;
}

export interface Hello {
	op: OPCodes.Hello;
	d: HelloPayload;
}

export interface HelloPayload {
	heartbeat_interval: number;
}

export interface HeartbeatAck {
	op: OPCodes.HeartbeatAck;
}

export interface InvalidSession {
	op: OPCodes.InvalidSession;
	d: boolean;
}

export interface InviteCreatePayload {
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

export interface InviteDeletePayload {
	channel_id: string;
	guild_id?: string;
	code: string;
}

export interface MessageBulkDeletePayload extends Omit<MessageDeletePayload, 'id'> {
	ids: string[];
}

export interface MessageDeletePayload {
	id: string;
	channel_id: string;
	guild_id?: string;
}

export interface MessageReactionAddPayload extends MessageReactionPayload {
	user_id: string;
	emoji: PartialEmoji;
}

export interface MessageReactionPayload {
	channel_id: string;
	message_id: string;
	guild_id?: string;
}

export interface MessageReactionRemovePayload extends MessageReactionPayload {
	user_id: string;
	member?: Member;
}

export interface MessageReactionRemoveEmojiPayload extends MessageReactionPayload {
	emoji: PartialEmoji;
}

export interface PresenceUpdatePayload {
	user: User;
	guild_id: string;
	status: string;
	activities: Activity[];
	client_status: ClientStatus;
}

export interface ReadyPayload {
	v: number;
	user_settings: unknown;
	user: PartialUser;
	private_channels: [];
	guilds: UnavailableGuild[];
	session_id: string;
	shard?: [number, number];
}

export interface TypingStartPayload {
	channel_id: string;
	guild_id?: string;
	user_id: string;
	timestamp: number;
	member?: Member;
}

export interface VoiceServerUpdatePayload {
	token: string;
	guild_id: string;
	endpoint: string;
}

export interface WebhooksUpdatePayload {
	guild_id: string;
	channel_id: string;
}

export enum Events {
	Ready = 'READY',
	Resumed = 'RESUMED',
	GuildCreate = 'GUILD_CREATE',
	GuildDelete = 'GUILD_DELETE',
	GuildUpdate = 'GUILD_UPDATE',
	InviteCreate = 'INVITE_CREATE',
	InviteDelete = 'INVITE_DELETE',
	GuildMemberAdd = 'GUILD_MEMBER_ADD',
	GuildMemberRemove = 'GUILD_MEMBER_REMOVE',
	GuildMemberUpdate = 'GUILD_MEMBER_UPDATE',
	GuildMembersChunk = 'GUILD_MEMBERS_CHUNK',
	GuildIntegrationsUpdate = 'GUILD_INTEGRATIONS_UPDATE',
	GuildRoleCreate = 'GUILD_ROLE_CREATE',
	GuildRoleDelete = 'GUILD_ROLE_DELETE',
	GuildRoleUpdate = 'GUILD_ROLE_UPDATE',
	GuildBanAdd = 'GUILD_BAN_ADD',
	GuildBanRemove = 'GUILD_BAN_REMOVE',
	GuildEmojisUpdate = 'GUILD_EMOJIS_UPDATE',
	InteractionCreate = 'INTERACTION_CREATE',
	ChannelCreate = 'CHANNEL_CREATE',
	ChannelDelete = 'CHANNEL_DELETE',
	ChannelUpdate = 'CHANNEL_UPDATE',
	ChannelPinsUpdate = 'CHANNEL_PINS_UPDATE',
	MessageCreate = 'MESSAGE_CREATE',
	MessageDelete = 'MESSAGE_DELETE',
	MessageUpdate = 'MESSAGE_UPDATE',
	MessageDeleteBulk = 'MESSAGE_DELETE_BULK',
	MessageReactionAdd = 'MESSAGE_REACTION_ADD',
	MessageReactionRemove = 'MESSAGE_REACTION_REMOVE',
	MessageReactionRemoveAll = 'MESSAGE_REACTION_REMOVE_ALL',
	MessageReactionRemoveEmoji = 'MESSAGE_REACTION_REMOVE_EMOJI',
	UserUpdate = 'USER_UPDATE',
	PresenceUpdate = 'PRESENCE_UPDATE',
	TypingStart = 'TYPING_START',
	VoiceStateUpdate = 'VOICE_STATE_UPDATE',
	VoiceServerUpdate = 'VOICE_SERVER_UPDATE',
	WebhooksUpdate = 'WEBHOOKS_UPDATE'
}

export type ChannelCreate = Event<Events.ChannelCreate, Channel>;

export type ChannelDelete = Event<Events.ChannelDelete, Channel>;

export type ChannelPinsUpdate = Event<Events.ChannelPinsUpdate, Channel>;

export type ChannelUpdate = Event<Events.ChannelUpdate, Channel>;

export type GuildBanAdd = Event<Events.GuildBanAdd, GuildBanPayload>;

export type GuildBanRemove = Event<Events.GuildBanRemove, GuildBanPayload>;

export type GuildCreate = Event<Events.GuildCreate, Guild>;

export type GuildDelete = Event<Events.GuildDelete, Guild>;

export type GuildEmojisUpdate = Event<Events.GuildEmojisUpdate, EmojisPayload>;

export type GuildIntegrationsPayload = GuildPayload;

export type GuildIntegrationsUpdate = Event<
	Events.GuildIntegrationsUpdate,
	GuildIntegrationsPayload
>;

export type GuildMemberAdd = Event<Events.GuildMemberAdd, GuildMemberPayload>;

export type GuildMemberPayload = GuildPayload;

export type GuildMemberRemove = Event<Events.GuildMemberRemove, GuildMemberRemovePayload>;

export type GuildMemberUpdate = Event<Events.GuildMemberUpdate, GuildMemberUpdatePayload>;

export type GuildRoleCreate = Event<Events.GuildRoleCreate, GuildRolePayload>;

export type GuildRoleDelete = Event<Events.GuildRoleDelete, GuildRoleDeletePayload>;

export type GuildRoleUpdate = Event<Events.GuildRoleUpdate, GuildRolePayload>;

export type GuildUpdate = Event<Events.GuildUpdate, Guild>;

export type InviteCreate = Event<Events.InviteCreate, InviteCreatePayload>;

export type InviteDelete = Event<Events.InviteDelete, InviteDeletePayload>;

export type MessageBulkDelete = Event<Events.MessageDeleteBulk, MessageBulkDeletePayload>;

export type MessageCreate = Event<Events.MessageCreate, Message>;

export type MessageDelete = Event<Events.MessageDelete, Message>;

export type MessageReactionAdd = Event<Events.MessageReactionAdd, MessageReactionAddPayload>;

export type MessageReactionRemoveEmoji = Event<
	Events.MessageReactionRemoveEmoji,
	MessageReactionRemoveEmojiPayload
>;

export type MessageReactionRemove = Event<
	Events.MessageReactionRemove,
	MessageReactionRemovePayload
>;

export type MessageReactionRemoveAll = Event<
	Events.MessageReactionRemoveAll,
	MessageReactionPayload
>;

export type MessageUpdate = Event<Events.MessageUpdate, Message>;

export type PresenceUpdate = Event<Events.PresenceUpdate, PresenceUpdatePayload>;

export type TypingStart = Event<Events.TypingStart, TypingStartPayload>;

export type UserUpdate = Event<Events.UserUpdate, User>;

export type VoiceServerUpdate = Event<Events.VoiceServerUpdate, VoiceServerUpdatePayload>;

export type VoiceStateUpdate = Event<Events.VoiceStateUpdate, VoiceState>;

export type WebhooksUpdate = Event<Events.WebhooksUpdate, WebhooksUpdatePayload>;
