import { Nullable } from '.';
import { User } from './User';

export interface Member {
	user?: User;
	nick?: Nullable<string>;
	roles: string[];
	joined_at: string;
	premium_since?: Nullable<string>;
	deaf: boolean;
	mute: boolean;
}

export interface Role {
	id: string;
	name: string;
	color: number;
	hoist: boolean;
	position: number;
	permissions: string;
	managed: boolean;
	mentionable: boolean;
	tags?: RoleTag;
}

export interface RoleTag {
	bot_id?: string;
	integration_id?: string;
	premium_subscriber?: null;
}

export interface VoiceRegion {
	id: string;
	name: string;
	vip: boolean;
	optimal: boolean;
	deprecated: boolean;
	custom: boolean;
}

export interface VoiceState {
	guild_id?: string;
	channel_id: Nullable<string>;
	user_id: string;
	member?: Member;
	session_id: string;
	deaf: boolean;
	mute: boolean;
	self_deaf: boolean;
	self_mute: boolean;
	self_stream?: boolean;
	self_video: boolean;
	suppress: boolean;
}

export enum BitwisePermission {
	CREATE_INSTANT_INVITE = 0x00000001,
	KICK_MEMBERS = 0x00000002,
	BAN_MEMBERS = 0x00000004,
	ADMINISTRATOR = 0x00000008,
	MANAGE_CHANNELS = 0x00000010,
	MANAGE_GUILD = 0x00000020,
	ADD_REACTIONS = 0x00000040,
	VIEW_AUDIT_LOG = 0x00000080,
	PRIORITY_SPEAKER = 0x00000100,
	STREAM = 0x00000200,
	VIEW_CHANNEL = 0x00000400,
	SEND_MESSAGES = 0x00000800,
	SEND_TTS_MESSAGES = 0x00001000,
	MANAGE_MESSAGES = 0x00002000,
	EMBED_LINKS = 0x00004000,
	ATTACH_FILES = 0x00008000,
	READ_MESSAGE_HISTORY = 0x00010000,
	MENTION_EVERYONE = 0x00020000,
	USE_EXTERNAL_EMOJIS = 0x00040000,
	VIEW_GUILD_INSIGHTS = 0x00080000,
	CONNECT = 0x00100000,
	SPEAK = 0x00200000,
	MUTE_MEMBERS = 0x00400000,
	DEAFEN_MEMBERS = 0x00800000,
	MOVE_MEMBERS = 0x01000000,
	USE_VAD = 0x02000000,
	CHANGE_NICKNAME = 0x04000000,
	MANAGE_NICKNAMES = 0x08000000,
	MANAGE_ROLES = 0x10000000,
	MANAGE_WEBHOOKS = 0x20000000,
	MANAGE_EMOJIS = 0x40000000
}

export type PartialRole = Pick<Role, 'name' | 'id'>;

export type Permission = keyof typeof BitwisePermission;

// - ========= - //
// - ENDPOINTS - //
// - ========= - //

export interface GetListMembers {
	limit?: number;
	after?: string;
}

export interface PutAddMember {
	access_token: string;
	nick?: string;
	roles?: string[];
	mute?: boolean;
	deaf?: boolean;
}

export interface PatchModifyMember {
	nick?: Nullable<string>;
	roles?: Nullable<string[]>;
	mute?: Nullable<boolean>;
	deaf?: Nullable<boolean>;
	channel_id?: Nullable<string>;
}
