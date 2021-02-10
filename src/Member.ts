import { Nullable, Snowflake } from './';
import { User } from './User';

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure Guild}
 */
export interface Member {
	/**
	 * The user this guild member represents
	 */
	user?: User;

	/**
	 * This users guild nickname
	 */
	nick?: Nullable<string>;

	/**
	 * Array of {@link https://discord.com/developers/docs/topics/permissions#role-object role} object IDs
	 */
	roles: Snowflake[];

	/**
	 * When the user joined the guild
	 */
	joined_at: string;

	/**
	 * When the user started {@link https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting- boosting} the guild
	 */
	premium_since: Nullable<string>;

	/**
	 * Whether the user is deafened in voice channels
	 */
	deaf: boolean;

	/**
	 * Whether the user is muted in voice channels
	 */
	mute: boolean;

	/**
	 * Whether the user has not yet passed the guild's Membership Screening requirements
	 */
	pending?: boolean;

	/**
	 * Total permissions of the member in the channel, including overrides, returned when in the interaction object
	 */
	permissions?: string;
}

/**
 * In guilds with {@link https://support.discord.com/hc/en-us/articles/1500000466882 Membership Screening} enabled, when a member joins,
 * {@link https://discord.com/developers/docs/topics/gateway#guild-member-add Guild Member Add} will be emitted but they will initially be restricted from doing any
 * actions in the guild, and `pending` will be true in the {@link https://discord.com/developers/docs/resources/guild#guild-member-object member object}. When the member
 * completes the screening, {@link https://discord.com/developers/docs/topics/gateway#guild-member-update Guild Member Update} will be emitted and `pending` will be false.
 *
 * Giving the member a role will bypass Membership Screening as well as the guild's verification level, giving the member immediate access to chat.
 * Therefore, instead of giving a role when the member joins, it is recommended to not give the role until the user is no longer `pending`.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object Guild}
 */
export interface MembershipScreening {
	/**
	 * When the fields were last updated
	 */
	version: string;

	/**
	 * The steps in the screening form
	 */
	form_fields: ScreeningField[];

	/**
	 * The server description shown in the screening form
	 */
	description: Nullable<string>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object-membership-screening-field-structure Guild}
 */
export interface ScreeningField {
	/**
	 * The type of field (currently "TERMS" is the only type)
	 */
	field_type: ScreeningFieldType;

	/**
	 * The title of the field
	 */
	label: string;

	/**
	 * The list of rules
	 */
	values?: string[];

	/**
	 * Whether the user has to fill out the field
	 */
	required: boolean;
}

/**
 * Roles represent a set of permissions attached to a group of users. Roles have unique names, colors, and can be "pinned" to the side bar, causing their members to be listed separately.
 * Roles are unique per guild, and can have separate permission profiles for the global context (guild) and channel context. The `@everyone` role has the same ID as the guild it belongs to
 *
 * @source {@link https://discord.com/developers/docs/topics/permissions#role-object-role-structure Permissions}
 */
export interface Role {
	/**
	 * Role ID
	 */
	id: Snowflake;

	/**
	 * Role name
	 */
	name: string;

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

/**
 * @source {@link https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags Permissions}
 */
export enum PermissionFlags {
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

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object-membership-screening-field-types Guild}
 */
export enum ScreeningFieldType {
	Terms = 'Server Rules'
}

export type PartialRole = Pick<Role, 'name' | 'id'>;

export type Permission = keyof typeof PermissionFlags;

// - ENDPOINTS

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#list-guild-members) `/guilds/{guild.id}/members`
 *
 * @returns A list of {@link https://discord.com/developers/docs/resources/guild#guild-member-object guild member} objects that are members of the guild, sorted by their ID in ascending order
 */
export interface ListMembers {
	/**
	 * Max number of members to return (1-1000)
	 */
	limit?: number;

	/**
	 * The highest user ID in the previous page
	 */
	after?: Snowflake;
}

/**
 * Adds a user to the guild, provided you have a valid oauth2 access token for the user with the `guilds.join` scope
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/guild#add-guild-member) `/guilds/{guild.id}/members/{user.id}`
 *
 * @returns
 * - A 201 Created with the {@link https://discord.com/developers/docs/resources/guild#guild-member-object guild member} as the body
 * - A 204 No Content if the user is already a member of the guild
 *
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-member-add Guild Member Add} Gateway event
 */
export interface AddMember {
	/**
	 * An oauth2 access token granted with the `guilds.join` to the bot's application for the user you want to add to the guild
	 */
	access_token: string;

	/**
	 * Value to set users nickname to
	 *
	 * @permission `MANAGE_NICKNAMES`
	 */
	nick?: string;

	/**
	 * Array of role ids the member is assigned
	 *
	 * @permission `MANAGE_ROLES`
	 */
	roles?: Snowflake[];

	/**
	 * Whether the user is muted in voice channels
	 *
	 * @permission `MUTE_MEMBERS`
	 */
	mute?: boolean;

	/**
	 * Whether the user is deafened in voice channels
	 *
	 * @permission `DEAFEN_MEMBERS`
	 */
	deaf?: boolean;
}

/**
 * Modify attributes of a {@link https://discord.com/developers/docs/resources/guild#guild-member-object guild member}
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-member) `/guilds/{guild.id}/members/{user.id}`
 *
 * @returns A 200 OK with the {@link https://discord.com/developers/docs/resources/guild#guild-member-object guild member} as the body
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-member-update Guild Member Update} Gateway event
 */
export interface ModifyMember {
	/**
	 * Value to set users nickname to
	 *
	 * @permission `MANAGE_NICKNAMES`
	 */
	nick?: Nullable<string>;

	/**
	 * Array of role IDs the member is assigned
	 *
	 * @permission `MANAGE_ROLES`
	 */
	roles?: Nullable<Snowflake[]>;

	/**
	 * Whether the user is muted in voice channels
	 *
	 * @permission `MUTE_MEMBERS`
	 */
	mute?: Nullable<boolean>;

	/**
	 * Whether the user is deafened in voice channels
	 *
	 * @permission `DEAFEN_MEMBERS`
	 */
	deaf?: Nullable<boolean>;

	/**
	 * ID of channel to move user to (if they are connected to voice)
	 *
	 * @permission `MOVE_MEMBERS`
	 */
	channel_id?: Nullable<Snowflake>;
}

/**
 * Modify the guild's {@link https://discord.com/developers/docs/resources/guild#membership-screening-object Membership Screening} form
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#membership-screening-object) `/guilds/{guild.id}/member-verification`
 *
 * @returns The updated {@link Membership Screening} object
 */
export interface ModifyMembershipScreening {
	/**
	 * Whether Membership Screening is enabled
	 */
	enabled?: boolean;

	/**
	 * Array of {@link https://discord.com/developers/docs/resources/guild#membership-screening-object-membership-screening-field-structure field} objects serialized in a string
	 */
	form_fields?: string;

	/**
	 * The server description to show in the screening form
	 */
	description?: string;
}

/**
 * @endpoint GET `/guilds/{guild.id}/members/search`
 *
 * @returns A list of {@link https://discord.com/developers/docs/resources/guild#guild-member-object guild member} objects whose username or nickname starts with a provided string
 */
export interface SearchMembers {
	/**
	 * Query string to match username(s) and nickname(s) against
	 */
	query: string;

	/**
	 * Max numbers of members to return (1-1000)
	 */
	limit?: number;
}
