import type { Snowflake } from '../';

// ANCHOR Permission Flags

/**
 * Permissions in Discord are a way to limit and grant certain abilities to users. A set of base permissions can be configured at the guild level for
 * different roles. When these roles are attached to users, they grant or revoke specific privileges within the guild. Along with the guild-level
 * permissions, Discord also supports permission overwrites that can be assigned to individual guild roles or guild members on a per-channel basis.
 *
 * @source {@link https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags Permissions}
 */
export enum PermissionFlags {
	/**
	 * Allows creation of instant invites
	 *
	 * @channel Text, Voice
	 */
	CREATE_INSTANT_INVITE = 0x00000001,

	/**
	 * Allows kicking members
	 *
	 * @remarks
	 * This permissions requires the owner account to use {@link https://discord.com/developers/docs/topics/oauth2#twofactor-authentication-requirement two-factor authentication}
	 * when used on a guild that has server-wide 2FA enabled.
	 */
	KICK_MEMBERS = 0x00000002,

	/**
	 * Allows banning members
	 *
	 * @remarks
	 * This permissions requires the owner account to use {@link https://discord.com/developers/docs/topics/oauth2#twofactor-authentication-requirement two-factor authentication}
	 * when used on a guild that has server-wide 2FA enabled.
	 */
	BAN_MEMBERS = 0x00000004,

	/**
	 * Allows all permissions and bypasses channel permission overwrites
	 *
	 * @remarks
	 * This permissions requires the owner account to use {@link https://discord.com/developers/docs/topics/oauth2#twofactor-authentication-requirement two-factor authentication}
	 * when used on a guild that has server-wide 2FA enabled.
	 */
	ADMINISTRATOR = 0x00000008,

	/**
	 * Allows management and editing of channels
	 *
	 * @remarks
	 * This permissions requires the owner account to use {@link https://discord.com/developers/docs/topics/oauth2#twofactor-authentication-requirement two-factor authentication}
	 * when used on a guild that has server-wide 2FA enabled.
	 *
	 * @channel Text, Voice
	 */
	MANAGE_CHANNELS = 0x00000010,

	/**
	 * Allows management and editing of the guild
	 *
	 * @remarks
	 * This permissions requires the owner account to use {@link https://discord.com/developers/docs/topics/oauth2#twofactor-authentication-requirement two-factor authentication}
	 * when used on a guild that has server-wide 2FA enabled.
	 */
	MANAGE_GUILD = 0x00000020,

	/**
	 * Allows for the addition of reactions to messages
	 *
	 * @channel Text
	 */
	ADD_REACTIONS = 0x00000040,

	/**
	 * Allows for viewing of audit logs
	 */
	VIEW_AUDIT_LOG = 0x00000080,

	/**
	 * Allows for using priority speaker in a voice channel
	 *
	 * @channel Voice
	 */
	PRIORITY_SPEAKER = 0x00000100,

	/**
	 * Allows the user to go live
	 *
	 * @channel Voice
	 */
	STREAM = 0x00000200,

	/**
	 * Allows guild members to view a channel, which includes reading messages in text channels
	 *
	 * @channel Text, Voice
	 */
	VIEW_CHANNEL = 0x00000400,

	/**
	 * Allows for sending messages in a channel
	 *
	 * @channel Text
	 */
	SEND_MESSAGES = 0x00000800,

	/**
	 * Allows for sending of `/tts` messages
	 *
	 * @channel Text
	 */
	SEND_TTS_MESSAGES = 0x00001000,

	/**
	 * Allows for deletion of other users messages
	 *
	 * @remarks
	 * This permissions requires the owner account to use {@link https://discord.com/developers/docs/topics/oauth2#twofactor-authentication-requirement two-factor authentication}
	 * when used on a guild that has server-wide 2FA enabled.
	 *
	 * @channel Text
	 */
	MANAGE_MESSAGES = 0x00002000,

	/**
	 * Links sent by users with this permission will be auto-embedded
	 *
	 * @channel Text
	 */
	EMBED_LINKS = 0x00004000,

	/**
	 * Allows for uploading images and files
	 *
	 * @channel Text
	 */
	ATTACH_FILES = 0x00008000,

	/**
	 * Allows for reading of message history
	 *
	 * @channel Text
	 */
	READ_MESSAGE_HISTORY = 0x00010000,

	/**
	 * Allows for using the `@everyone` tag to notify all users in a channel, and the `@here` tag to notify all online users in a channel
	 *
	 * @channel Text
	 */
	MENTION_EVERYONE = 0x00020000,

	/**
	 * Allows the usage of custom emojis from other servers
	 *
	 * @channel Text
	 */
	USE_EXTERNAL_EMOJIS = 0x00040000,

	/**
	 * Allows for viewing guild insights
	 */
	VIEW_GUILD_INSIGHTS = 0x00080000,

	/**
	 * Allows for joining of a voice channel
	 *
	 * @channel Voice
	 */
	CONNECT = 0x00100000,

	/**
	 * Allows for speaking in a voice channel
	 *
	 * @channel Voice
	 */
	SPEAK = 0x00200000,

	/**
	 * Allows for muting members in a voice channel
	 *
	 * @channel Voice
	 */
	MUTE_MEMBERS = 0x00400000,

	/**
	 * Allows for deafening of members in a voice channel
	 *
	 * @channel Voice
	 */
	DEAFEN_MEMBERS = 0x00800000,

	/**
	 * Allows for moving of members between voice channels
	 *
	 * @channel Voice
	 */
	MOVE_MEMBERS = 0x01000000,

	/**
	 * Allows for using voice-activity-detection in a voice channel
	 *
	 * @channel Voice
	 */
	USE_VAD = 0x02000000,

	/**
	 * Allows for modification of own nickname
	 */
	CHANGE_NICKNAME = 0x04000000,

	/**
	 * Allows for modification of other users nicknames
	 */
	MANAGE_NICKNAMES = 0x08000000,

	/**
	 * Allows management and editing of roles
	 *
	 * @remarks
	 * This permissions requires the owner account to use {@link https://discord.com/developers/docs/topics/oauth2#twofactor-authentication-requirement two-factor authentication}
	 * when used on a guild that has server-wide 2FA enabled.
	 *
	 * @channel Text, Voice
	 */
	MANAGE_ROLES = 0x10000000,

	/**
	 * Allows management and editing of webhooks
	 *
	 * @remarks
	 * This permissions requires the owner account to use {@link https://discord.com/developers/docs/topics/oauth2#twofactor-authentication-requirement two-factor authentication}
	 * when used on a guild that has server-wide 2FA enabled.
	 *
	 * @channel Text, Voice
	 */
	MANAGE_WEBHOOKS = 0x20000000,

	/**
	 * Allows management and editing of emojis
	 *
	 * @remarks
	 * This permissions requires the owner account to use {@link https://discord.com/developers/docs/topics/oauth2#twofactor-authentication-requirement two-factor authentication}
	 * when used on a guild that has server-wide 2FA enabled.
	 */
	MANAGE_EMOJIS = 0x40000000
}

export type Permission = keyof typeof PermissionFlags;

// SECTION Roles

// ANCHOR Partial Role

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-example-partial-role-object Audit Log}
 */
export interface PartialRole {
	/**
	 * Role ID
	 */
	id: Snowflake;

	/**
	 * Role name
	 */
	name: string;
}

// ANCHOR Role

/**
 * Roles represent a set of permissions attached to a group of users. Roles have unique names, colors, and can be "pinned" to the
 * side bar, causing their members to be listed separately. Roles are unique per guild, and can have separate permission profiles
 * for the global context (guild) and channel context. The `@everyone` role has the same ID as the guild it belongs to.
 *
 * @remarks
 * Roles without colors (`color == 0`) do not count towards the final computed color in the user list.
 *
 * @source {@link https://discord.com/developers/docs/topics/permissions#role-object-role-structure Permissions}
 */
export interface Role extends PartialRole {
	/**
	 * Integer representation of hexadecimal color code
	 */
	color: number;

	/**
	 * If this role is pinned in the user listing
	 */
	hoist: boolean;

	/**
	 * Position of this role
	 */
	position: number;

	/**
	 * Permission bit set
	 */
	permissions: string;

	/**
	 * Whether this role is managed by an integration
	 */
	managed: boolean;

	/**
	 * Whether this role is mentionable
	 */
	mentionable: boolean;

	/**
	 * The tags this role has
	 */
	tags?: RoleTag;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure Permissions}
 */
export interface RoleTag {
	/**
	 * The ID of the bot this role belongs to
	 */
	bot_id?: Snowflake;

	/**
	 * The ID of the integration this role belongs to
	 */
	integration_id?: Snowflake;

	/**
	 * Whether this is the guild's premium subscriber role
	 */
	premium_subscriber?: null;
}

// !SECTION
