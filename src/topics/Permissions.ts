import type { CamelCase, Delimited } from 'extended-utility-types';
import type { Snowflake } from '../';

// ANCHOR Permission Flags

/**
 * Permissions in Discord are a way to limit and grant certain abilities to users. A set of base
 * permissions can be configured at the guild level for different roles. When these roles are
 * attached to users, they grant or revoke specific privileges within the guild. Along with the
 * guild-level permissions, Discord also supports permission overwrites that can be assigned to
 * individual guild roles or guild members on a per-channel basis.
 *
 * @source {@link https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags|Permissions}
 */
export enum PermissionFlags {
	/**
	 * Allows creation of instant invites.
	 *
	 * @channel Text, Voice
	 */
	CreateInstantInvite = 0x00000001,

	/**
	 * Allows kicking members.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor authentication when used on a
	 * guild that has server-wide 2FA enabled.
	 */
	KickMembers = 0x00000002,

	/**
	 * Allows banning members.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor authentication when used on a
	 * guild that has server-wide 2FA enabled.
	 */
	BanMembers = 0x00000004,

	/**
	 * Allows all permissions and bypasses channel permission overwrites.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor authentication when used on a
	 * guild that has server-wide 2FA enabled.
	 */
	Administrator = 0x00000008,

	/**
	 * Allows management and editing of channels.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor authentication when used on a
	 * guild that has server-wide 2FA enabled.
	 *
	 * @channel Text, Voice
	 */
	ManageChannels = 0x00000010,

	/**
	 * Allows management and editing of the guild.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor authentication when used on a
	 * guild that has server-wide 2FA enabled.
	 */
	ManageGuild = 0x00000020,

	/**
	 * Allows for the addition of reactions to messages.
	 *
	 * @channel Text
	 */
	AddReactions = 0x00000040,

	/**
	 * Allows for viewing of audit logs.
	 */
	ViewAuditLog = 0x00000080,

	/**
	 * Allows for using priority speaker in a voice channel.
	 *
	 * @channel Voice
	 */
	PrioritySpeaker = 0x00000100,

	/**
	 * Allows the user to go live.
	 *
	 * @channel Voice
	 */
	Stream = 0x00000200,

	/**
	 * Allows guild members to view a channel, which includes reading messages in text channels.
	 *
	 * @channel Text, Voice
	 */
	ViewChannel = 0x00000400,

	/**
	 * Allows for sending messages in a channel.
	 *
	 * @channel Text
	 */
	SendMessages = 0x00000800,

	/**
	 * Allows for sending of `/tts` messages.
	 *
	 * @channel Text
	 */
	SendTTSMessages = 0x00001000,

	/**
	 * Allows for deletion of other users messages.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor authentication when used on a
	 * guild that has server-wide 2FA enabled.
	 *
	 * @channel Text
	 */
	ManageMessages = 0x00002000,

	/**
	 * Links sent by users with this permission will be auto-embedded.
	 *
	 * @channel Text
	 */
	EmbedLinks = 0x00004000,

	/**
	 * Allows for uploading images and files.
	 *
	 * @channel Text
	 */
	AttachFiles = 0x00008000,

	/**
	 * Allows for reading of message history.
	 *
	 * @channel Text
	 */
	ReadMessageHistory = 0x00010000,

	/**
	 * Allows for using the `@everyone` tag to notify all users in a channel, and the `@here` tag
	 * to notify all online users in a channel.
	 *
	 * @channel Text
	 */
	MentionEveryone = 0x00020000,

	/**
	 * Allows the usage of custom emojis from other servers.
	 *
	 * @channel Text
	 */
	UseExternalEmojis = 0x00040000,

	/**
	 * Allows for viewing guild insights.
	 */
	ViewGuildInsights = 0x00080000,

	/**
	 * Allows for joining of a voice channel.
	 *
	 * @channel Voice
	 */
	Connect = 0x00100000,

	/**
	 * Allows for speaking in a voice channel.
	 *
	 * @channel Voice
	 */
	Speak = 0x00200000,

	/**
	 * Allows for muting members in a voice channel.
	 *
	 * @channel Voice
	 */
	MuteMembers = 0x00400000,

	/**
	 * Allows for deafening of members in a voice channel.
	 *
	 * @channel Voice
	 */
	DeafenMembers = 0x00800000,

	/**
	 * Allows for moving of members between voice channels.
	 *
	 * @channel Voice
	 */
	MoveMembers = 0x01000000,

	/**
	 * Allows for using voice-activity-detection in a voice channel.
	 *
	 * @channel Voice
	 */
	UseVAD = 0x02000000,

	/**
	 * Allows for modification of own nickname.
	 */
	ChangeNickname = 0x04000000,

	/**
	 * Allows for modification of other users nicknames.
	 */
	ManageNicknames = 0x08000000,

	/**
	 * Allows management and editing of roles.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor authentication when used on a
	 * guild that has server-wide 2FA enabled.
	 *
	 * @channel Text, Voice
	 */
	ManageRoles = 0x10000000,

	/**
	 * Allows management and editing of webhooks.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor authentication when used on a
	 * guild that has server-wide 2FA enabled.
	 *
	 * @channel Text
	 */
	ManageWebhooks = 0x20000000,

	/**
	 * Allows management and editing of emojis.
	 *
	 * @remarks
	 * This permissions requires the owner account to use two-factor authentication when used on a
	 * guild that has server-wide 2FA enabled.
	 */
	ManageEmojis = 0x40000000,

	/**
	 * Allows members to use slash commands in text channels.
	 *
	 * @channel Text
	 */
	UseSlashCommands = 0x80000000
}

export type Permission = Uppercase<Delimited<CamelCase<keyof typeof PermissionFlags>, '_'>>;

// SECTION Roles

// ANCHOR Partial Role

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-example-partial-role-object|Audit Log}
 */
export interface PartialRole {
	/**
	 * Role ID.
	 */
	id: Snowflake;

	/**
	 * Role name.
	 */
	name: string;
}

// ANCHOR Role

/**
 * Roles represent a set of permissions attached to a group of users. Roles have unique names,
 * colors, and can be "pinned" to the side bar, causing their members to be listed separately.
 * Roles are unique per guild, and can have separate permission profiles for the global context
 * (guild) and channel context. The `@everyone` role has the same ID as the guild it belongs to.
 *
 * @remarks
 * Roles without colors (`color == 0`) do not count towards the final computed color in the user
 * list.
 *
 * @source {@link https://discord.com/developers/docs/topics/permissions#role-object-role-structure|Permissions}
 */
export interface Role extends PartialRole {
	/**
	 * Integer representation of hexadecimal color code.
	 */
	color: number;

	/**
	 * If this role is pinned in the user listing.
	 */
	hoist: boolean;

	/**
	 * Position of this role.
	 */
	position: number;

	/**
	 * Permission bit set.
	 */
	permissions: string;

	/**
	 * Whether this role is managed by an integration.
	 */
	managed: boolean;

	/**
	 * Whether this role is mentionable.
	 */
	mentionable: boolean;

	/**
	 * The tags this role has.
	 */
	tags?: RoleTag;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure|Permissions}
 */
export interface RoleTag {
	/**
	 * The ID of the bot this role belongs to.
	 */
	bot_id?: Snowflake;

	/**
	 * The ID of the integration this role belongs to.
	 */
	integration_id?: Snowflake;

	/**
	 * Whether this is the guild's premium subscriber role.
	 */
	premium_subscriber?: null;
}

// !SECTION
