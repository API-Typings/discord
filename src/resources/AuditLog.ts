import type { Nullable, RangeOf } from '@api-typings/core';
import type {
	ChannelType,
	ExplicitFilterLevel,
	IntegrationExpireBehavior,
	MFALevel,
	NotificationLevel,
	Overwrite,
	PartialIntegration,
	PartialRole,
	Snowflake,
	User,
	VerificationLevel,
	Webhook
} from '../';

/**
 * Whenever an admin action is performed on the API, an entry is added to the respective guild's
 * audit log.
 *
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure|Audit Log}
 */
export interface AuditLog {
	/**
	 * List of webhooks found in the audit log.
	 */
	webhooks: Webhook[];

	/**
	 * List of users found in the audit log.
	 */
	users: User[];

	/**
	 * List of audit log entries, sorted by ID in descending order.
	 */
	audit_log_entries: AuditLogEntry[];

	/**
	 * List of partial integration objects.
	 */
	integrations: PartialIntegration[];
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure|Audit Log}
 */
export interface AuditLogEntry {
	/**
	 * ID of the affected entity (webhook, user, role, etc.).
	 */
	target_id: Nullable<Snowflake>;

	/**
	 * Changes made to the `target_id`.
	 */
	changes?: {
		[K in keyof AuditLogChangeKey]: AuditLogChange<K>;
	}[keyof AuditLogChangeKey][];

	/**
	 * The user who made the changes.
	 */
	user_id: Snowflake;

	/**
	 * ID of the entry.
	 */
	id: Snowflake;

	/**
	 * Type of action that occurred.
	 */
	action_type: AuditLogEvent;

	/**
	 * Additional info for certain action types.
	 */
	options?: AuditLogEntryInfo;

	/**
	 * The reason for the change (0-512 characters).
	 */
	reason?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events|Audit Log}
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
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info|Audit Log}
 */
export interface AuditLogEntryInfo {
	/**
	 * Number of days after which inactive members were kicked.
	 *
	 * @action `MEMBER_PRUNE`
	 */
	delete_member_days: string;

	/**
	 * Number of members removed by the prune.
	 *
	 * @action `MEMBER_PRUNE`
	 */
	members_removed: string;

	/**
	 * Channel in which the entities were targeted.
	 *
	 * @action
	 * - `MEMBER_MOVE`
	 * - `MESSAGE_PIN`
	 * - `MESSAGE_UNPIN`
	 * - `MESSAGE_DELETE`
	 */
	channel_id: Snowflake;

	/**
	 * ID of the message that was targeted.
	 *
	 * @action
	 * - `MESSAGE_PIN`
	 * - `MESSAGE_UNPIN`
	 */
	message_id: Snowflake;

	/**
	 * Number of entities that were targeted.
	 *
	 * @action
	 * - `MESSAGE_DELETE`
	 * - `MESSAGE_BULK_DELETE`
	 * - `MEMBER_DISCONNECT`
	 * - `MEMBER_MOVE`
	 */
	count: string;

	/**
	 * ID of the overwritten entity.
	 *
	 * @action
	 * - `CHANNEL_OVERWRITE_CREATE`
	 * - `CHANNEL_OVERWRITE_UPDATE`
	 * - `CHANNEL_OVERWRITE_DELETE`
	 */
	id: Snowflake;

	/**
	 * Type of overwritten entity–`0` for `role` or `1` for `member`.
	 *
	 * @action
	 * - `CHANNEL_OVERWRITE_CREATE`
	 * - `CHANNEL_OVERWRITE_UPDATE`
	 * - `CHANNEL_OVERWRITE_DELETE`
	 */
	type: '0' | '1';

	/**
	 * Name of the role if type is `0` (not present if type is `1`).
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
 * If `new_value` is not present in the change object, while `old_value` is, that means the
 * property that was changed has been reset, or set to `null`.
 *
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure|Audit Log}
 */
export interface AuditLogChange<K extends keyof AuditLogChangeKey> {
	/**
	 * New value of the key.
	 */
	new_value?: AuditLogChangeKey[K];

	/**
	 * Old value of the key.
	 */
	old_value?: AuditLogChangeKey[K];

	/**
	 * Name of audit log change key.
	 */
	key: K;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key|Audit Log}
 */
export interface AuditLogChangeKey {
	name: string;
	guild: string;
	icon_hash: string;
	splash_hash: string;
	discovery_splash_hash: string;
	banner_hash: string;
	owner_id: Snowflake;
	region: string;
	preferred_locale: string;
	afk_channel_id: Snowflake;
	afk_timeout: number;
	rules_channel_id: Snowflake;
	public_updates_channel_id: Snowflake;
	mfa_level: MFALevel;
	verification_level: VerificationLevel;
	explicit_content_filter: ExplicitFilterLevel;
	default_message_notifications: NotificationLevel;
	vanity_url_code: string;
	$add: PartialRole[];
	$remove: PartialRole[];
	prune_delete_days: number;
	widget_enabled: boolean;
	widget_channel_id: Snowflake;
	system_channel_id: Snowflake;
	position: number;
	topic: string;
	bitrate: number;
	permission_overwrites: Overwrite[];
	nsfw: boolean;
	application_id: Snowflake;
	rate_limit_per_user: number;
	permissions: string;
	color: number;
	hoist: boolean;
	mentionalble: boolean;
	allow: string;
	deny: string;
	code: string;
	channel_id: Snowflake;
	inviter_id: Snowflake;
	max_uses: number;
	uses: number;
	temporary: boolean;
	deaf: boolean;
	mute: boolean;
	nick: string;
	avatar_hash: string;
	id: Snowflake;
	type: ChannelType | string;
	enable_emoticons: boolean;
	expire_behavior: IntegrationExpireBehavior;
	expire_grace_period: number;
	user_limit: number;
}

// SECTION Endpoints

/**
 * Requires the `VIEW_AUDIT_LOG` permission.
 *
 * @endpoint [GET] `/guilds/{guild.id}/audit-logs`
 *
 * [GET]: https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log
 */
export interface GetGuildAuditLog {
	query: {
		/**
		 * Filter the log for actions made by a user.
		 */
		user_id?: Snowflake;

		/**
		 * The type of [audit log event][1].
		 *
		 * [1]: https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
		 */
		action_type?: AuditLogEvent;

		/**
		 * Filter the log before a certain entry ID.
		 */
		before?: Snowflake;

		/**
		 * How many entries are returned.
		 *
		 * @defaultValue 50
		 */
		limit?: RangeOf<1, 100>;
	};

	response: AuditLog;
}

// !SECTION
