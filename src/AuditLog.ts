import { Nullable, Snowflake } from './';
import { PartialIntegration } from './Guild';
import { PartialRole } from './Member';
import { User } from './User';
import { Webhook } from './Webhook';

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure Audit Log}
 */
interface AuditLogChangeType<K extends string, T = string> {
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
 * Whenever an admin action is performed on the API, an entry is added to the respective guild's audit log
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
	changes?: AuditLogChange[];

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
	 * Type of overwritten entity - "0" for "role" or "1" for "member"
	 *
	 * @action
	 * - `CHANNEL_OVERWRITE_CREATE`
	 * - `CHANNEL_OVERWRITE_UPDATE`
	 * - `CHANNEL_OVERWRITE_DELETE`
	 */
	type: OverwriteType;

	/**
	 * Name of the role if type is "0" (not present if type is "1")
	 *
	 * @action
	 * - `CHANNEL_OVERWRITE_CREATE`
	 * - `CHANNEL_OVERWRITE_UPDATE`
	 * - `CHANNEL_OVERWRITE_DELETE`
	 */
	role_name: string;
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

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key Audit Log}
 */
export type AuditLogChange =
	| AuditLogChangeType<'name'>
	| AuditLogChangeType<'guild'>
	| AuditLogChangeType<'icon_hash'>
	| AuditLogChangeType<'splash_hash'>
	| AuditLogChangeType<'discovery_splash_hash'>
	| AuditLogChangeType<'banner_hash'>
	| AuditLogChangeType<'owner_id', Snowflake>
	| AuditLogChangeType<'region'>
	| AuditLogChangeType<'preferred_locale'>
	| AuditLogChangeType<'afk_channel_id', Snowflake>
	| AuditLogChangeType<'afk_timeout', number>
	| AuditLogChangeType<'rules_channel_id', Snowflake>
	| AuditLogChangeType<'public_updates_channel_id', Snowflake>
	| AuditLogChangeType<'mfa_level', number>
	| AuditLogChangeType<'verification_level', number>
	| AuditLogChangeType<'explicit_content_filter', number>
	| AuditLogChangeType<'default_message_notifications', number>
	| AuditLogChangeType<'vanity_url_code'>
	| AuditLogChangeType<'$add', PartialRole[]>
	| AuditLogChangeType<'$remove', PartialRole[]>
	| AuditLogChangeType<'prune_delete_days', number>
	| AuditLogChangeType<'widget_enabled', boolean>
	| AuditLogChangeType<'widget_channel_id', Snowflake>
	| AuditLogChangeType<'system_channel_id', Snowflake>
	| AuditLogChangeType<'position', number>
	| AuditLogChangeType<'topic'>
	| AuditLogChangeType<'bitrate', number>
	| AuditLogChangeType<'permission_overwrites', any>
	| AuditLogChangeType<'nsfw', boolean>
	| AuditLogChangeType<'application_id', Snowflake>
	| AuditLogChangeType<'rate_limit_per_user', number>
	| AuditLogChangeType<'permissions'>
	| AuditLogChangeType<'color', number>
	| AuditLogChangeType<'hoist', boolean>
	| AuditLogChangeType<'mentionalble', boolean>
	| AuditLogChangeType<'allow'>
	| AuditLogChangeType<'deny'>
	| AuditLogChangeType<'code'>
	| AuditLogChangeType<'channel_id', Snowflake>
	| AuditLogChangeType<'inviter_id', Snowflake>
	| AuditLogChangeType<'max_uses', number>
	| AuditLogChangeType<'uses', number>
	| AuditLogChangeType<'temporary', boolean>
	| AuditLogChangeType<'deaf', boolean>
	| AuditLogChangeType<'mute', boolean>
	| AuditLogChangeType<'nick', Snowflake>
	| AuditLogChangeType<'avatar_hash', Snowflake>
	| AuditLogChangeType<'id', string>
	| AuditLogChangeType<'type', any>
	| AuditLogChangeType<'enable_emoticons', boolean>
	| AuditLogChangeType<'expire_behavior', number>
	| AuditLogChangeType<'expire_grace_period', number>
	| AuditLogChangeType<'user_limit', number>;

/**
 * Type of overwritten entity - "0" for "role" or "1" for "member"
 */
export type OverwriteType = '0' | '1';

// SECTION Endpoints

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log) `/guilds/{guild.id}/audit-logs`
 *
 * @returns An {@link https://discord.com/developers/docs/resources/audit-log#audit-log-object audit log} object for the guild
 */
export interface GetAuditLog {
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
	 * How many entries are returned (default 50, minimum 1, maximum 100)
	 */
	limit?: number;
}

// !SECTION
