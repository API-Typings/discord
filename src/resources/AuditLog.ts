import type { Nullable, RangeOf } from '@api-typings/core';
import type { PartialIntegration, PartialRole, Snowflake, User, Webhook } from '../';

/**
 * Whenever an admin action is performed on the API, an entry is added to the respective guild's audit log.
 *
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure Audit Log}
 */
export interface AuditLog {
	/**
	 * List of webhooks found in the audit log
	 */
	webhooks: Webhook[];

	/**
	 * List of users found in the audit log
	 */
	users: User[];

	/**
	 * List of audit log entries, sorted by id in descending order
	 */
	audit_log_entries: AuditLogEntry[];

	/**
	 * List of partial integration objects
	 */
	integrations: PartialIntegration[];
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure Audit Log}
 */
export interface AuditLogEntry {
	/**
	 * ID of the affected entity (webhook, user, role, etc.)
	 */
	target_id: Nullable<string>;

	/**
	 * Changes made to the `target_id`
	 */
	changes?: AuditLogChangeType[];

	/**
	 * The user who made the changes
	 */
	user_id: Snowflake;

	/**
	 * ID of the entry
	 */
	id: Snowflake;

	/**
	 * Type of action that occurred
	 */
	action_type: AuditLogEvent;

	/**
	 * Additional info for certain action types
	 */
	options?: AuditLogEntryInfo;

	/**
	 * The reason for the change (0-512 characters)
	 */
	reason?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events Audit Log}
 */
export enum AuditLogEvent {
	GuildUpdate = 1,
	ChannelCreate = 10,
	ChannelUpdate,
	ChannelDelete,
	ChannelOverwriteCreate,
	ChannelOverwriteUpdate,
	ChannelOverwriteDelete,
	GuildMemberKick = 20,
	GuildMemberPrune,
	GuildMemberBanAdd,
	GuildMemberBanRemove,
	GuildMemberUpdate,
	GuildMemberRoleUpdate,
	GuildMemberMove,
	GuildMemberDisconnect,
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

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info Audit Log}
 */
export interface AuditLogEntryInfo {
	/**
	 * Number of days after which inactive members were kicked
	 *
	 * @action
	 * `MEMBER_PRUNE`
	 */
	delete_member_days: string;

	/**
	 * Number of members removed by the prune
	 *
	 * @action
	 * `MEMBER_PRUNE`
	 */
	members_removed: string;

	/**
	 * Channel in which the entities were targeted
	 *
	 * @action
	 * - `MEMBER_MOVE`
	 * - `MESSAGE_PIN`
	 * - `MESSAGE_UNPIN`
	 * - `MESSAGE_DELETE`
	 */
	channel_id: Snowflake;

	/**
	 * ID of the message that was targeted
	 *
	 * @action
	 * - `MESSAGE_PIN`
	 * - `MESSAGE_UNPIN`
	 */
	message_id: Snowflake;

	/**
	 * Number of entities that were targeted
	 *
	 * @action
	 * - `MESSAGE_DELETE`
	 * - `MESSAGE_BULK_DELETE`
	 * - `MEMBER_DISCONNECT`
	 * - `MEMBER_MOVE`
	 */
	count: string;

	/**
	 * ID of the overwritten entity
	 *
	 * @action
	 * - `CHANNEL_OVERWRITE_CREATE`
	 * - `CHANNEL_OVERWRITE_UPDATE`
	 * - `CHANNEL_OVERWRITE_DELETE`
	 */
	id: Snowflake;

	/**
	 * Type of overwritten entity - `0` for `role` or `1` for `member`
	 *
	 * @action
	 * - `CHANNEL_OVERWRITE_CREATE`
	 * - `CHANNEL_OVERWRITE_UPDATE`
	 * - `CHANNEL_OVERWRITE_DELETE`
	 */
	type: '0' | '1';

	/**
	 * Name of the role if type is `0` (not present if type is `1`)
	 *
	 * @action
	 * - `CHANNEL_OVERWRITE_CREATE`
	 * - `CHANNEL_OVERWRITE_UPDATE`
	 * - `CHANNEL_OVERWRITE_DELETE`
	 */
	role_name: string;
}

/**
 * @info
 * If `new_value` is not present in the change object, while `old_value` is, that means the property that was changed has been reset, or set to `null`.
 *
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure Audit Log}
 */
export interface AuditLogChange<K extends string, T = string> {
	/**
	 * New value of the key
	 */
	new_value?: T;

	/**
	 * Old value of the key
	 */
	old_value?: T;

	/**
	 * Name of audit log change key
	 */
	key: K;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key Audit Log}
 */
export type AuditLogChangeType =
	| AuditLogChange<'name'>
	| AuditLogChange<'guild'>
	| AuditLogChange<'icon_hash'>
	| AuditLogChange<'splash_hash'>
	| AuditLogChange<'discovery_splash_hash'>
	| AuditLogChange<'banner_hash'>
	| AuditLogChange<'owner_id', Snowflake>
	| AuditLogChange<'region'>
	| AuditLogChange<'preferred_locale'>
	| AuditLogChange<'afk_channel_id', Snowflake>
	| AuditLogChange<'afk_timeout', number>
	| AuditLogChange<'rules_channel_id', Snowflake>
	| AuditLogChange<'public_updates_channel_id', Snowflake>
	| AuditLogChange<'mfa_level', number>
	| AuditLogChange<'verification_level', number>
	| AuditLogChange<'explicit_content_filter', number>
	| AuditLogChange<'default_message_notifications', number>
	| AuditLogChange<'vanity_url_code'>
	| AuditLogChange<'$add', PartialRole[]>
	| AuditLogChange<'$remove', PartialRole[]>
	| AuditLogChange<'prune_delete_days', number>
	| AuditLogChange<'widget_enabled', boolean>
	| AuditLogChange<'widget_channel_id', Snowflake>
	| AuditLogChange<'system_channel_id', Snowflake>
	| AuditLogChange<'position', number>
	| AuditLogChange<'topic'>
	| AuditLogChange<'bitrate', number>
	| AuditLogChange<'permission_overwrites', any>
	| AuditLogChange<'nsfw', boolean>
	| AuditLogChange<'application_id', Snowflake>
	| AuditLogChange<'rate_limit_per_user', number>
	| AuditLogChange<'permissions'>
	| AuditLogChange<'color', number>
	| AuditLogChange<'hoist', boolean>
	| AuditLogChange<'mentionalble', boolean>
	| AuditLogChange<'allow'>
	| AuditLogChange<'deny'>
	| AuditLogChange<'code'>
	| AuditLogChange<'channel_id', Snowflake>
	| AuditLogChange<'inviter_id', Snowflake>
	| AuditLogChange<'max_uses', number>
	| AuditLogChange<'uses', number>
	| AuditLogChange<'temporary', boolean>
	| AuditLogChange<'deaf', boolean>
	| AuditLogChange<'mute', boolean>
	| AuditLogChange<'nick', Snowflake>
	| AuditLogChange<'avatar_hash', Snowflake>
	| AuditLogChange<'id', string>
	| AuditLogChange<'type', any>
	| AuditLogChange<'enable_emoticons', boolean>
	| AuditLogChange<'expire_behavior', number>
	| AuditLogChange<'expire_grace_period', number>
	| AuditLogChange<'user_limit', number>;

// SECTION Endpoints

/**
 * Requires the `VIEW_AUDIT_LOG` permission.
 *
 * @endpoint [GET] `/guilds/{guild.id}/audit-logs`
 *
 * @returns An [audit log][1] object for the guild.
 *
 * [GET]: https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log
 * [1]: https://discord.com/developers/docs/resources/audit-log#audit-log-object
 */
export interface GetGuildAuditLog {
	/**
	 * Filter the log for actions made by a user
	 */
	user_id?: Snowflake;

	/**
	 * The type of {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events audit log event}
	 */
	action_type?: AuditLogEvent;

	/**
	 * Filter the log before a certain entry ID
	 */
	before?: Snowflake;

	/**
	 * How many entries are returned
	 *
	 * @default 50
	 */
	limit?: RangeOf<1, 100>;
}

// !SECTION
