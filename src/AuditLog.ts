import { User } from './User';
import { PartialRole } from './Member';
import { PartialIntegration, Webhook } from './Guild';

interface AuditLogChangeType<K extends AuditLogChangeKey, T> {
	new_value?: T;
	old_value?: T;
	key: K;
}

export interface AuditLog {
	webhooks: Webhook[];
	users: User[];
	audit_log_entries: AuditLogEntry[];
	integrations: PartialIntegration[];
}

export interface AuditLogEntry {
	target_id: string;
	changes?: AuditLogChange[];
	user_id: string;
	id: string;
	action_type: AuditLogEvent;
	options?: AuditLogEntryOptions;
	reason?: string;
}

export interface AuditLogEntryOptions {
	delete_member_days: string;
	members_removed: string;
	channel_id: string;
	message_id: string;
	count: string;
	id: string;
	type: string;
	role_name: string;
}

export enum AuditLogEvent {
	GuildUpdate = 1,
	ChannelCreate = 10,
	ChannelUpdate,
	ChannelDelete,
	ChannelOverwriteCreate,
	ChannelOverwriteUpdate,
	ChannelOverwriteDelete,
	MemberKick = 20,
	MemberPrune,
	MemberBanAdd,
	MemberBanRemove,
	MemberUpdate,
	MemberRoleUpdate,
	MemberMove,
	MemberDisconnect,
	BotAdd,
	RoleCreate = 30,
	RoleUpdate,
	RoleDelete,
	InviteCreate = 40,
	InviteUpdate,
	InviteDelete,
	WebhookCreate = 50,
	WebhookUpdate,
	WebhookDelete,
	EmojiCreate = 60,
	EmojiUpdate,
	EmojiDelete,
	MessageDelete = 72,
	MessageBulkDelete,
	MessagePin,
	MessageUnpin,
	IntegrationCreate = 80,
	IntegrationUpdate,
	IntegrationDelete
}

export type AuditLogChange =
	| AuditLogChangeType<'name', string>
	| AuditLogChangeType<'icon_hash', string>
	| AuditLogChangeType<'splash_hash', string>
	| AuditLogChangeType<'owner_id', string>
	| AuditLogChangeType<'region', string>
	| AuditLogChangeType<'afk_channel_id', string>
	| AuditLogChangeType<'afk_timeout', number>
	| AuditLogChangeType<'mfa_level', number>
	| AuditLogChangeType<'verification_level', number>
	| AuditLogChangeType<'explicit_content_filter', number>
	| AuditLogChangeType<'default_message_notifications', number>
	| AuditLogChangeType<'vanity_url_code', string>
	| AuditLogChangeType<'$add', PartialRole[]>
	| AuditLogChangeType<'$remove', PartialRole[]>
	| AuditLogChangeType<'prune_delete_days', number>
	| AuditLogChangeType<'widget_enabled', boolean>
	| AuditLogChangeType<'widget_channel_id', string>
	| AuditLogChangeType<'system_channel_id', string>
	| AuditLogChangeType<'position', number>
	| AuditLogChangeType<'topic', string>
	| AuditLogChangeType<'bitrate', number>
	| AuditLogChangeType<'permission_overwrites', any>
	| AuditLogChangeType<'nsfw', boolean>
	| AuditLogChangeType<'application_id', string>
	| AuditLogChangeType<'rate_limit_per_user', number>
	| AuditLogChangeType<'permissions', string>
	| AuditLogChangeType<'color', number>
	| AuditLogChangeType<'hoist', boolean>
	| AuditLogChangeType<'mentionalble', boolean>
	| AuditLogChangeType<'allow', string>
	| AuditLogChangeType<'deny', string>
	| AuditLogChangeType<'code', string>
	| AuditLogChangeType<'channel_id', string>
	| AuditLogChangeType<'inviter_id', string>
	| AuditLogChangeType<'max_uses', number>
	| AuditLogChangeType<'uses', number>
	| AuditLogChangeType<'temporary', boolean>
	| AuditLogChangeType<'deaf', boolean>
	| AuditLogChangeType<'mute', boolean>
	| AuditLogChangeType<'nick', string>
	| AuditLogChangeType<'avatar_hash', string>
	| AuditLogChangeType<'id', string>
	| AuditLogChangeType<'type', any>
	| AuditLogChangeType<'enable_emoticons', boolean>
	| AuditLogChangeType<'expire_behavior', number>
	| AuditLogChangeType<'expire_grace_period', number>;

export type AuditLogChangeKey =
	| 'name'
	| 'icon_hash'
	| 'splash_hash'
	| 'owner_id'
	| 'region'
	| 'afk_channel_id'
	| 'afk_timeout'
	| 'mfa_level'
	| 'verification_level'
	| 'explicit_content_filter'
	| 'default_message_notifications'
	| 'vanity_url_code'
	| '$add'
	| '$remove'
	| 'prune_delete_days'
	| 'widget_enabled'
	| 'widget_channel_id'
	| 'system_channel_id'
	| 'position'
	| 'topic'
	| 'bitrate'
	| 'permission_overwrites'
	| 'nsfw'
	| 'application_id'
	| 'rate_limit_per_user'
	| 'permissions'
	| 'color'
	| 'hoist'
	| 'mentionalble'
	| 'allow'
	| 'deny'
	| 'code'
	| 'channel_id'
	| 'inviter_id'
	| 'max_uses'
	| 'uses'
	| 'temporary'
	| 'deaf'
	| 'mute'
	| 'nick'
	| 'avatar_hash'
	| 'id'
	| 'type'
	| 'enable_emoticons'
	| 'expire_behavior'
	| 'expire_grace_period';
