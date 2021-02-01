import { Nullable } from './';
import { Activity, Presence } from './Activity';
import { Channel, PartialChannel, WelcomeScreenChannel } from './Channel';
import { Emoji } from './Emoji';
import { UpdateStatus } from './Gateway';
import { Member, Role } from './Member';
import { User } from './User';
import { VoiceRegion, VoiceState } from './Voice';

/**
 * Represents an isolated collection of users and channels, and are often referred to as "servers" in the UI
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-structure Guild}
 */
export interface Guild extends PartialGuild {
	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting Icon hash}
	 */
	icon: string;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting Icon hash}, returned when in the template object
	 */
	icon_hash?: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting Discovery splash hash}; only present for guilds with the "DISCOVERABLE" feature
	 */
	discovery_splash: Nullable<string>;

	/**
	 * True if {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds the user} is the owner of the guild
	 */
	owner?: boolean;

	/**
	 * ID of owner
	 */
	owner_id: string;

	/**
	 * Total permissions for {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds the user} in the guild (excludes overrides)
	 */
	permissions?: string;

	/**
	 * {@link https://discord.com/developers/docs/resources/voice#voice-region-object Voice region} ID for the guild
	 */
	region: VoiceRegion;

	/**
	 * ID of AFK channel
	 */
	afk_channel_id: Nullable<string>;

	/**
	 * AFK timeout in seconds
	 */
	afk_timeout: number;

	/**
	 * True if the server widget is enabled
	 */
	wdiget_enabled?: boolean;

	/**
	 * The channel id that the widget will generate an invite to, or `null` if set to no invite
	 */
	widget_channel_id?: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level Verification level} required for the guild
	 */
	verification_level: VerificationLevel;

	/**
	 * Default {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level message notifications level}
	 */
	default_message_notifications: NotificationLevel;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level Explicit content filter level}
	 */
	explicit_content_filter: ExplicitFilterLevel;

	/**
	 * Roles in the guild
	 */
	roles: Role[];

	/**
	 * Custom guild emojis
	 */
	emojis: Emoji[];

	/**
	 * Enabled guild features
	 */
	features: GuildFeatures[];

	/**
	 * Required {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level MFA level} for the guild
	 */
	mfa_level: MFALevel;

	/**
	 * Application ID of the guild creator if it is bot-created
	 */
	application_id: Nullable<string>;

	/**
	 * The ID of the channel where guild notices such as welcome messages and boost events are posted
	 */
	system_channel_id: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags System channel flags}
	 */
	system_channel_flags: SystemChannelFlags;

	/**
	 * The ID of the channel where Community guilds can display rules and/or guidelines
	 */
	rules_channel_id: Nullable<string>;

	/**
	 * When this guild was joined at
	 */
	joined_at?: Nullable<string>;

	/**
	 * True if this is considered a large guild
	 */
	large?: boolean;

	/**
	 * True if this guild is unavailable due to an outage
	 */
	unavailable?: boolean;

	/**
	 * Total number of members in this guild
	 */
	member_count?: number;

	/**
	 * States of members currently in voice channels; lacks the `guild_id` key
	 */
	voice_states?: Omit<VoiceState, 'guild_id'>[];

	/**
	 * Users in the guild
	 */
	members?: Member[];

	/**
	 * Channels in the guild
	 */
	channels?: Channel[];

	/**
	 * Presences of the members in the guild, will only include non-offline members if the size is greater than `large threshold`
	 */
	presences?: Partial<Presence>[];

	/**
	 * The maximum number of presences for the guild (the default value, currently 25000, is in effect when `null` is returned)
	 */
	max_presences?: Nullable<number>;

	/**
	 * The maximum number of members for the guild
	 */
	max_members?: number;

	/**
	 * The vanity url code for the guild
	 */
	vanity_url_code: Nullable<string>;

	/**
	 * The description for the guild, if the guild is discoverable
	 */
	description: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting Banner hash}
	 */
	banner?: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier Premium tier (server Boost level)}
	 */
	premium_tier: PremiumTier;

	/**
	 * The number of boosts this guild currently has
	 */
	premium_subscription_count?: number;

	/**
	 * The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US"
	 */
	preferred_locale: string;

	/**
	 * The ID of the channel where admins and moderators of Community guilds receive notices from Discord
	 */
	public_updates_channel_id: Nullable<string>;

	/**
	 * The maximum amount of users in a video channel
	 */
	max_video_channel_users?: number;

	/**
	 * Approximate number of members in this guild, returned from the `GET /guilds/<id>` endpoint when `with_counts` is `true`
	 */
	approximate_member_count?: number;

	/**
	 * Approximate number of non-offline members in this guild, returned from the `GET /guilds/<id>` endpoint when `with_counts` is `true`
	 */
	approximate_presence_count?: number;

	/**
	 * The welcome screen of a Community guild, shown to new members, returned when in the invite object
	 */
	welcome_screen?: WelcomeScreen;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#ban-object-ban-structure Guild}
 */
export interface GuildBan {
	/**
	 * The reason for the ban
	 */
	reason: Nullable<string>;

	/**
	 * The banned user
	 */
	user: User;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-preview-object-guild-preview-structure Guild}
 */
export interface GuildPreview {
	/**
	 * Guild ID
	 */
	id: string;

	/**
	 * Guild name
	 */
	name: string;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting Icon hash}
	 */
	icon: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting Splash hash}
	 */
	splash: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting Discovery splash hash}
	 */
	discovery_splash: Nullable<string>;

	/**
	 * Custom guild emojis
	 */
	emojis: Emoji[];

	/**
	 * Enabled guild features
	 */
	features: GuildFeatures[];

	/**
	 * Approximate number of members in this guild
	 */
	approximate_member_count: number;

	/**
	 * Approximate number of online members in this guild
	 */
	approximate_presence_count: number;

	/**
	 * The description for the guild, if the guild is discoverable
	 */
	description: Nullable<string>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-structure Guild}
 */
export interface Integration {
	/**
	 * Integration ID
	 */
	id: string;

	/**
	 * Integration name
	 */
	name: string;

	/**
	 * Integration type (twitch, youtube, or discord)
	 */
	type: IntegrationType;

	/**
	 * Is this integration enabled
	 */
	enabled: boolean;

	/**
	 * Is this integration syncing
	 */
	syncing?: boolean;

	/**
	 * ID that this integration uses for "subscribers"
	 */
	role_id?: string;

	/**
	 * Whether emoticons should be synced for this integration (twitch only currently)
	 */
	enable_emoticons?: boolean;

	/**
	 * The behavior of expiring subscribers
	 */
	expire_behavior?: IntegrationExpireBehavior;

	/**
	 * The grace period (in days) before expiring subscribers
	 */
	expire_grace_period?: number;

	/**
	 * User for this integration
	 */
	user?: User;

	/**
	 * Integration account information
	 */
	account: IntegrationAccount;

	/**
	 * When this integration was last synced
	 */
	synced_at?: string;

	/**
	 * How many subscribers this integration has
	 */
	subscriber_count?: number;

	/**
	 * Has this integration been revoked
	 */
	revoked?: boolean;

	/**
	 * The bot/OAuth2 application for discord integrations
	 */
	application?: IntegrationApplication;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-account-object Guild}
 */
export interface IntegrationAccount {
	/**
	 * ID of the account
	 */
	id: string;

	/**
	 * Name of the account
	 */
	name: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure Guild}
 */
export interface IntegrationApplication {
	/**
	 * The ID of the app
	 */
	id: string;

	/**
	 * The name of the app
	 */
	name: string;

	/**
	 * The {@link https://discord.com/developers/docs/reference#image-formatting icon hash} of the app
	 */
	icon: Nullable<string>;

	/**
	 * The description of the app
	 */
	description: string;

	/**
	 * The description of the app
	 */
	summary: string;

	/**
	 * If this application is a game sold on Discord, this field will be the hash of the image on store embeds
	 */
	cover_image?: string;

	/**
	 * The bot associated with this application
	 */
	bot?: User;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds-example-partial-guild User}
 */
export interface PartialGuild {
	/**
	 * Guild ID
	 */
	id: string;

	/**
	 * Guild name (2-100 characters, excluding trailing and leading whitespace)
	 */
	name: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting Splash hash}
	 */
	splash: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting Banner hash}
	 */
	banner?: Nullable<string>;

	/**
	 * The description for the guild
	 */
	description?: Nullable<string>;

	/**
	 * Enabled guild features
	 */
	features?: GuildFeatures[];

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level Verification level} required for the guild
	 */
	verification_level?: VerificationLevel;

	/**
	 * The vanity url code for the guild
	 */
	vanity_url_code?: Nullable<string>;

	/**
	 * True if this guild is unavailable due to an outage
	 */
	unavailable?: boolean;
}

export interface Prune {
	pruned: number;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure Guild}
 */
export interface WelcomeScreen {
	/**
	 * The server description shown in the welcome screen
	 */
	description: Nullable<string>;

	/**
	 * The channels shown in the welcome screen, up to 5
	 */
	welcome_channels: WelcomeScreenChannel[];
}

export interface Widget {
	id: string;
	name: string;
	instant_invite: string;
	channels: WidgetChannel[];
	members: WidgetMember[];
	presence_count: number;
}

export interface WidgetChannel {
	id: string;
	name: string;
	position: number;
}

export interface WidgetMember {
	id: string;
	username: string;
	discriminator: string;
	avatar: Nullable<string>;
	status: UpdateStatus;
	activity?: Pick<Activity, 'name'>;
	avatar_url: string;
}

export interface WidgetSettings {
	/**
	 * Whether the widget is enabled
	 */
	enabled: boolean;

	/**
	 * The widget channel ID
	 */
	channel_id?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level Guild}
 */
export enum ExplicitFilterLevel {
	Disabled,
	MembersWithoutRoles,
	AllMembers
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors Guild}
 */
export enum IntegrationExpireBehavior {
	RemoveRole,
	Kick
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level Guild}
 */
export enum NotificationLevel {
	AllMessages,
	OnlyMentions
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level Guild}
 */
export enum MFALevel {
	None,
	Elevated
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier Guild}
 */
export enum PremiumTier {
	None,
	Tier1,
	Tier2,
	Tier3
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags Guild}
 */
export enum SystemChannelFlags {
	/**
	 * Suppress member join notifications
	 */
	SuppressJoinNotifications = 1 << 0,

	/**
	 * Suppress server boost notifications
	 */
	SuppressPremiumSubscriptions = 1 << 1
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level Guild}
 */
export enum VerificationLevel {
	/**
	 * Unrestricted
	 */
	None,

	/**
	 * Must have verified email on account
	 */
	Low,

	/**
	 * Must be registered on Discord for longer than 5 minutes
	 */
	Medium,

	/**
	 * Must be a member of the server for longer than 10 minutes
	 */
	High,

	/**
	 * Must have a verified phone number
	 */
	VeryHigh
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-features Guild}
 */
export type GuildFeatures =
	| 'INVITE_SPLASH'
	| 'VIP_REGIONS'
	| 'VANITY_URL'
	| 'VERIFIED'
	| 'PARTNERED'
	| 'COMMUNITY'
	| 'COMMERCE'
	| 'NEWS'
	| 'DISCOVERABLE'
	| 'DISCOVERABLE_DISABLED'
	| 'FEATURABLE'
	| 'ANIMATED_ICON'
	| 'BANNER'
	| 'WELCOME_SCREEN_ENABLED'
	| 'MEMBER_VERIFICATION_GATE_ENABLED'
	| 'PREVIEW_ENABLED';

export type IntegrationType = 'twitch' | 'youtube' | 'discord';

export type PartialIntegration = Pick<Integration, 'id' | 'name' | 'type' | 'account'>;

/**
 * Represents an Offline Guild, or a Guild whose information has not been provided through
 * {@link https://discord.com/developers/docs/topics/gateway#guild-create Guild Create} events during the Gateway connect
 */
export type UnavailableGuild = { [K in keyof Pick<Guild, 'id' | 'unavailable'>]-?: Guild[K] };

export type WidgetStyle = 'shield' | 'banner1' | 'banner2' | 'banner3' | 'banner4';

// - ENDPOINTS

/**
 * Create a new guild.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#create-guild) `/guilds`
 *
 * @returns A {@link https://discord.com/developers/docs/resources/guild#guild-object guild} object on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-create Guild Create} Gateway event
 */
export interface CreateGuild {
	/**
	 * Name of the guild (2-100 characters)
	 */
	name: string;

	/**
	 * {@link https://discord.com/developers/docs/resources/voice#voice-region-object Voice region} ID
	 */
	region?: string;

	/**
	 * Base64 128x128 image for the guild icon
	 */
	icon?: string;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level Verification level}
	 */
	verification_level?: number;

	/**
	 * Default {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level message notifications level}
	 */
	default_message_notifications?: number;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level Explicit content filter level}
	 */
	explicit_content_filter?: number;

	/**
	 * New guild roles
	 */
	roles?: Role[];

	/**
	 * New guild's channels
	 */
	channels?: PartialChannel;

	/**
	 * ID for AFK channel
	 */
	afk_channel_id?: string;

	/**
	 * AFK timeout in seconds
	 */
	afk_timeout?: number;

	/**
	 * The ID of the channel where guild notices such as welcome messages and boost events are posted
	 */
	system_channel_id?: string;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags System channel flags}
	 */
	system_channel_flags?: SystemChannelFlags;
}

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#create-guild) `/guilds/{guild.id}`
 *
 * @returns The {@link https://discord.com/developers/docs/resources/guild#guild-object guild} object for the given ID
 */
export interface GetGuild {
	/**
	 * When `true`, will return approximate member and presence counts for the guild
	 */
	with_counts?: boolean;
}

/**
 * Modify a guild's settings
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#create-guild) `/guilds/{guild.id}
 *
 * @returns The updated {@link https://discord.com/developers/docs/resources/guild#guild-object guild} object on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-update Guild Update} Gateway event
 */
export interface ModifyGuild {
	/**
	 * Guild name
	 */
	name?: string;

	/**
	 * Guild {@link https://discord.com/developers/docs/resources/voice#voice-region-object voice region} id
	 */
	region?: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level Verification level}
	 */
	verification_level?: Nullable<number>;

	/**
	 * Default {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level message notifications level}
	 */
	default_message_notifications?: Nullable<number>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level Explicit content filter level}
	 */
	explicit_content_filter?: Nullable<number>;

	/**
	 * ID for AFK channel
	 */
	afk_channel_id?: Nullable<string>;

	/**
	 * AFK timeout in seconds
	 */
	afk_timeout?: Nullable<number>;

	/**
	 * Base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has `ANIMATED_ICON` feature)
	 */
	icon?: Nullable<string>;

	/**
	 * User ID to transfer guild ownership to (must be owner)
	 */
	owner_id?: string;

	/**
	 * Base64 16:9 png/jpeg image for the guild splash (when the server has `INVITE_SPLASH` feature)
	 */
	splash?: Nullable<string>;

	/**
	 * Base64 16:9 png/jpeg image for the guild banner (when the server has `BANNER` feature)
	 */
	banner?: Nullable<string>;

	/**
	 * The ID of the channel where guild notices such as welcome messages and boost events are posted
	 */
	system_channel_id?: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags System channel flags}
	 */
	system_channel_flags?: SystemChannelFlags;

	/**
	 * The ID of the channel where Community guilds display rules and/or guidelines
	 */
	rules_channel_id?: Nullable<string>;

	/**
	 * The ID of the channel where admins and moderators of Community guilds receive notices from Discord
	 */
	public_updates_channel_id?: Nullable<string>;

	/**
	 * The preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US"
	 */
	preferred_locale?: Nullable<string>;

	/**
	 * Enabled guild features
	 */
	features?: GuildFeatures[];

	/**
	 * The description for the guild, if the guild is discoverable
	 */
	description: string;
}

/**
 * Modifies the nickname of the current user in a guild
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-current-user-nick) `/guilds/{guild.id}/members/@me`
 *
 * @returns A 200 with the nickname on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-member-update Guild Member Update} Gateway event
 */
export interface ModifyCurrentNickname {
	/**
	 * Value to set users nickname to
	 */
	nick?: Nullable<string>;
}

/**
 * Create a guild ban, and optionally delete previous messages sent by the banned user
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/guild#create-guild-ban) `/guilds/{guild.id}/bans/{user.id}`
 *
 * @returns A 204 empty response on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-ban-add Guild Ban Add} Gateway event
 */
export interface CreateBan {
	/**
	 * Number of days to delete messages for (0-7)
	 */
	delete_messages_days?: number;

	/**
	 * Reason for the ban
	 */
	reason?: string;
}

/**
 * Create a new {@link https://discord.com/developers/docs/topics/permissions#role-object role} for the guild
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#create-guild-role) `/guilds/{guild.id}/roles`
 *
 * @returns The new {@link https://discord.com/developers/docs/topics/permissions#role-object role} object on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-role-create Guild Role Create} Gateway event
 */
export interface CreateRole {
	/**
	 * Name of the role
	 */
	name?: string;

	/**
	 * Bitwise value of the enabled/disabled permissions
	 */
	permissions?: string;

	/**
	 * RGB color value
	 */
	color?: number;

	/**
	 * Whether the role should be displayed separately in the sidebar
	 */
	hoist?: boolean;

	/**
	 * Whether the role should be mentionable
	 */
	mentionable?: boolean;
}

/**
 * Modify the positions of a set of {@link https://discord.com/developers/docs/topics/permissions#role-object role} objects for the guild
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-role-positions) `/guilds/{guild.id}/roles`
 *
 * @returns A list of all of the guild's {@link https://discord.com/developers/docs/topics/permissions#role-object role} objects on success, sorted by their ID in ascending order
 * @fires Multiple {@link https://discord.com/developers/docs/topics/gateway#guild-role-update Guild Role Update} Gateway events
 */
export interface ModifyRolePositions {
	/**
	 * Role
	 */
	id: string;

	/**
	 * Sorting position of the role
	 */
	position?: Nullable<number>;
}

/**
 * Modify a guild role
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-role) `/guilds/{guild.id}/roles/{role.id}`
 *
 * @returns The updated {@link https://discord.com/developers/docs/topics/permissions#role-object role} on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-role-update Guild Role Update} Gateway event
 */
export interface ModifyRole {
	/**
	 * Name of the role
	 */
	name?: Nullable<string>;

	/**
	 * Bitwise value of the enabled/disabled permissions
	 */
	permissions?: Nullable<string>;

	/**
	 * RGB color value
	 */
	color?: Nullable<number>;

	/**
	 * Whether the role should be displayed separately in the sidebar
	 */
	hoist?: Nullable<boolean>;

	/**
	 * Whether the role should be mentionable
	 */
	mentionable?: Nullable<boolean>;
}

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-prune-count) `/guilds/{guild.id}/prune`
 *
 * @returns An object with one 'pruned' key indicating the number of members that would be removed in a prune operation
 */
export interface GetPruneCount {
	/**
	 * Number of days to count prune for (1-30)
	 */
	days: number;

	/**
	 * Role(s) to include
	 */
	include_roles?: string[];
}

/**
 * Begin a prune operation
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#begin-guild-prune) `/guilds/{guild.id}/prune`
 *
 * @returns An object with one 'pruned' key indicating the number of members that were removed in the prune operation
 * @fires Multiple {@link https://discord.com/developers/docs/topics/gateway#guild-member-remove Guild Member Remove} Gateway events
 */
export interface BeginPrune {
	/**
	 * Number of days to prune (1-30)
	 */
	days: number;

	/**
	 * Whether 'pruned' is returned, discouraged for large guilds
	 */
	compute_prune_count: boolean;

	/**
	 * Role(s) to include
	 */
	include_roles?: string[];
}

/**
 * Attach an {@link https://discord.com/developers/docs/resources/guild#integration-object integration} object from the current user to the guild
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#create-guild-integration) `/guilds/{guild.id}/integrations`
 *
 * @returns A 204 empty response on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-integrations-update Guild Integrations Update} Gateway event
 */
export interface CreateIntegration {
	/**
	 * 	The integration type
	 */
	type: IntegrationType;

	/**
	 * The integration ID
	 */
	id: string;
}

/**
 * Modify the behavior and settings of an {@link https://discord.com/developers/docs/resources/guild#integration-object integration} object for the guild
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-integration) `/guilds/{guild.id}/integrations/{integration.id}`
 *
 * @returns A 204 empty response on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#guild-integrations-update Guild Integrations Update} Gateway event
 */
export interface EditIntegration {
	/**
	 * The behavior when an integration subscription lapses
	 * (see the {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors integration expire behaviors} documentation)
	 */
	expire_behavior?: Nullable<number>;

	/**
	 * Period (in days) where the integration will ignore lapsed subscriptions
	 */
	expire_grace_period?: Nullable<number>;

	/**
	 * Whether emoticons should be synced for this integration (twitch only currently)
	 */
	enable_emoticons?: Nullable<boolean>;
}

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-widget-image) `/guilds/{guild.id}/widget.png`
 *
 * @returns A PNG image widget for the guild
 */
export interface GetWidgetImage {
	/**
	 * Style of the widget image returned
	 */
	style?: WidgetStyle;
}

/**
 * Modify the guild's {@link https://discord.com/developers/docs/resources/guild#welcome-screen-object Welcome Screen}
 *
 * @endpoint PATCH `/guilds/{guild.id}/welcome-screen`
 *
 * @returns The updated {@link https://discord.com/developers/docs/resources/guild#welcome-screen-object Welcome Screen} object
 */
export interface ModifyWelcomeScreen {
	/**
	 * Whether the welcome screen is enabled
	 */
	enabled: boolean;

	/**
	 * Channels linked in the welcome screen and their display options
	 */
	welcome_channels: WelcomeScreenChannel[];

	/**
	 * The server description to show in the welcome screen
	 */
	description: string;
}
