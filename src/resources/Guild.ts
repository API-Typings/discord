import type { Nullable, RangeOf } from '@api-typings/core';
import type {
	Activity,
	Channel,
	Emoji,
	Overwrite,
	PartialChannel,
	PresenceUpdate,
	Role,
	Snowflake,
	UpdateStatus,
	User,
	VoiceRegion,
	VoiceState
} from '../';

// ANCHOR Partial Guild

/**
 * @source {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds-example-partial-guild|User}
 */
export interface PartialGuild {
	/**
	 * Guild ID
	 */
	id: Snowflake;

	/**
	 * Guild name (2-100 characters, excluding trailing and leading whitespace)
	 */
	name: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting|Splash hash}
	 */
	splash: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting|Banner hash}
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
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level|Verification level} required for the guild
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

// ANCHOR Guild

/**
 * Represents an isolated collection of users and channels, and are often referred to as "servers" in the UI.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-structure|Guild}
 */
export interface Guild extends PartialGuild {
	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting|Icon hash}
	 */
	icon: string;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting|Icon hash}, returned when in the template object
	 */
	icon_hash?: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting|Discovery splash hash}; only present for guilds with the "DISCOVERABLE" feature
	 */
	discovery_splash: Nullable<string>;

	/**
	 * True if {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds|the user} is the owner of the guild
	 *
	 * @remarks
	 * This field is only sent when using the {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds|GET Current User Guilds}
	 * endpoint and is relative to the request user
	 */
	owner?: boolean;

	/**
	 * ID of owner
	 */
	owner_id: Snowflake;

	/**
	 * Total permissions for {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds|the user} in the guild (excludes overrides)
	 *
	 * @remarks
	 * This field is only sent when using the {@link https://discord.com/developers/docs/resources/user#get-current-user-guilds|GET Current User Guilds}
	 * endpoint and is relative to the request user
	 */
	permissions?: string;

	/**
	 * {@link https://discord.com/developers/docs/resources/voice#voice-region-object|Voice region} ID for the guild
	 */
	region: VoiceRegion;

	/**
	 * ID of AFK channel
	 */
	afk_channel_id: Nullable<Snowflake>;

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
	widget_channel_id?: Nullable<Snowflake>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level|Verification level} required for the guild
	 */
	verification_level: VerificationLevel;

	/**
	 * Default {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level|message notifications level}
	 */
	default_message_notifications: NotificationLevel;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level|Explicit content filter level}
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
	 * Required {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level|MFA level} for the guild
	 */
	mfa_level: MFALevel;

	/**
	 * Application ID of the guild creator if it is bot-created
	 */
	application_id: Nullable<Snowflake>;

	/**
	 * The ID of the channel where guild notices such as welcome messages and boost events are posted
	 */
	system_channel_id: Nullable<Snowflake>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags|System channel flags}
	 */
	system_channel_flags: SystemChannelFlags;

	/**
	 * The ID of the channel where Community guilds can display rules and/or guidelines
	 */
	rules_channel_id: Nullable<Snowflake>;

	/**
	 * When this guild was joined at
	 *
	 * @remarks
	 * This field is only sent within the {@link https://discord.com/developers/docs/topics/gateway#guild-create|`GUILD_CREATE`} event
	 */
	joined_at?: Nullable<string>;

	/**
	 * True if this is considered a large guild
	 *
	 * @remarks
	 * This field is only sent within the {@link https://discord.com/developers/docs/topics/gateway#guild-create|`GUILD_CREATE`} event
	 */
	large?: boolean;

	/**
	 * True if this guild is unavailable due to an outage
	 *
	 * @remarks
	 * This field is only sent within the {@link https://discord.com/developers/docs/topics/gateway#guild-create|`GUILD_CREATE`} event
	 */
	unavailable?: boolean;

	/**
	 * Total number of members in this guild
	 *
	 * @remarks
	 * This field is only sent within the {@link https://discord.com/developers/docs/topics/gateway#guild-create|`GUILD_CREATE`} event
	 */
	member_count?: number;

	/**
	 * States of members currently in voice channels; lacks the `guild_id` key
	 *
	 * @remarks
	 * This field is only sent within the {@link https://discord.com/developers/docs/topics/gateway#guild-create|`GUILD_CREATE`} event
	 */
	voice_states?: Omit<VoiceState, 'guild_id'>[];

	/**
	 * Users in the guild
	 *
	 * @remarks
	 * This field is only sent within the {@link https://discord.com/developers/docs/topics/gateway#guild-create|`GUILD_CREATE`} event
	 */
	members?: GuildMember[];

	/**
	 * Channels in the guild
	 *
	 * @remarks
	 * This field is only sent within the {@link https://discord.com/developers/docs/topics/gateway#guild-create|`GUILD_CREATE`} event
	 */
	channels?: Channel[];

	/**
	 * Presences of the members in the guild, will only include non-offline members if the size is greater than `large threshold`
	 *
	 * @remarks
	 * This field is only sent within the {@link https://discord.com/developers/docs/topics/gateway#guild-create|`GUILD_CREATE`} event
	 */
	presences?: Partial<PresenceUpdate['d']>[];

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
	 * {@link https://discord.com/developers/docs/reference#image-formatting|Banner hash}
	 */
	banner?: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier|Premium tier (server Boost level)}
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
	public_updates_channel_id: Nullable<Snowflake>;

	/**
	 * The maximum amount of users in a video channel
	 */
	max_video_channel_users?: number;

	/**
	 * Approximate number of members in this guild, returned from the `GET /guilds/{guild.id}` endpoint when `with_counts` is `true`
	 */
	approximate_member_count?: number;

	/**
	 * Approximate number of non-offline members in this guild, returned from the `GET /guilds/{guild.id}` endpoint when `with_counts` is `true`
	 */
	approximate_presence_count?: number;

	/**
	 * The welcome screen of a Community guild, shown to new members, returned when in the invite object
	 */
	welcome_screen?: WelcomeScreen;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level|Guild}
 */
export enum NotificationLevel {
	AllMessages,
	OnlyMentions
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level|Guild}
 */
export enum ExplicitFilterLevel {
	Disabled,
	GuildMembersWithoutRoles,
	AllGuildMembers
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level|Guild}
 */
export enum MFALevel {
	None,
	Elevated
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level|Guild}
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
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier|Guild}
 */
export enum PremiumTier {
	None,
	Tier1,
	Tier2,
	Tier3
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags|Guild}
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
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-features|Guild}
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

/**
 * Represents an Offline Guild, or a Guild whose information has not been provided through [Guild Create][1] events during the Gateway connect.
 *
 * [1]: https://discord.com/developers/docs/topics/gateway#guild-create
 */
export interface UnavailableGuild extends Pick<PartialGuild, 'id'> {
	unavailable: true;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-preview-object-guild-preview-structure|Guild}
 */
export interface GuildPreview {
	/**
	 * Guild ID
	 */
	id: Snowflake;

	/**
	 * Guild name
	 */
	name: string;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting|Icon hash}
	 */
	icon: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting|Splash hash}
	 */
	splash: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/reference#image-formatting|Discovery splash hash}
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
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure|Guild}
 */
export interface GuildWidgetSettings {
	/**
	 * Whether the widget is enabled
	 */
	enabled: boolean;

	/**
	 * The widget channel ID
	 */
	channel_id?: Snowflake;
}

// SECTION Guild Widget

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-example-get-guild-widget|Guild}
 */
export interface GuildWidget {
	id: Snowflake;
	name: string;
	instant_invite: string;
	channels: GuildWidgetChannel[];
	members: GuildWidgetMember[];
	presence_count: number;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-example-get-guild-widget|Guild}
 */
export interface GuildWidgetChannel {
	id: Snowflake;
	name: string;
	position: number;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-example-get-guild-widget|Guild}
 */
export interface GuildWidgetMember {
	id: Snowflake;
	username: string;
	discriminator: string;
	avatar: Nullable<string>;
	status: UpdateStatus;
	activity?: Pick<Activity, 'name'>;
	avatar_url: string;
}

// !SECTION

// ANCHOR Guild Member

/**
 * @info
 * - The field `user` won't be included in the member object attached to `MESSAGE_CREATE` and `MESSAGE_UPDATE` gateway events
 * - In `GUILD_` events, `pending` will always be included as `true` or `false`. In non `GUILD_` events which can only be
 * 	 triggered by non-`pending` users, `pending` will not be included
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure|Guild}
 */
export interface GuildMember {
	/**
	 * The user this guild member represents
	 */
	user?: User;

	/**
	 * This users guild nickname
	 */
	nick?: Nullable<string>;

	/**
	 * Array of {@link https://discord.com/developers/docs/topics/permissions#role-object|role} object IDs
	 */
	roles: Snowflake[];

	/**
	 * When the user joined the guild
	 */
	joined_at: string;

	/**
	 * When the user started {@link https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-|boosting} the guild
	 */
	premium_since?: Nullable<string>;

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

// SECTION Integration

// ANCHOR Partial Integration

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-object-example-partial-integration-object}
 */
export interface PartialIntegration {
	/**
	 * Integration ID
	 */
	id: Snowflake;

	/**
	 * Integration name
	 */
	name: string;

	/**
	 * Integration type (Twitch, YouTube, or Discord)
	 */
	type: IntegrationType;

	/**
	 * Integration account information
	 */
	account: IntegrationAccount;
}

// ANCHOR Integration

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-structure|Guild}
 */
export interface Integration extends PartialIntegration {
	/**
	 * Integration ID
	 */
	id: Snowflake;

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
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations
	 */
	syncing?: boolean;

	/**
	 * ID that this integration uses for "subscribers"
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations
	 */
	role_id?: Snowflake;

	/**
	 * Whether emoticons should be synced for this integration (Twitch only currently)
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations
	 */
	enable_emoticons?: boolean;

	/**
	 * The behavior of expiring subscribers
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations
	 */
	expire_behavior?: IntegrationExpireBehavior;

	/**
	 * The grace period (in days) before expiring subscribers
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations
	 */
	expire_grace_period?: number;

	/**
	 * User for this integration
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations
	 */
	user?: User;

	/**
	 * When this integration was last synced
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations
	 */
	synced_at?: string;

	/**
	 * How many subscribers this integration has
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations
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

export type IntegrationType = 'twitch' | 'youtube' | 'discord';

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors|Guild}
 */
export enum IntegrationExpireBehavior {
	RemoveRole,
	Kick
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-account-object-integration-account-structure|Guild}
 */
export interface IntegrationAccount {
	/**
	 * ID of the account
	 */
	id: Snowflake;

	/**
	 * Name of the account
	 */
	name: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure|Guild}
 */
export interface IntegrationApplication {
	/**
	 * The ID of the app
	 */
	id: Snowflake;

	/**
	 * The name of the app
	 */
	name: string;

	/**
	 * The {@link https://discord.com/developers/docs/reference#image-formatting|Icon hash} of the app
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

// !SECTION

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#ban-object-ban-structure|Guild}
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

export interface Prune {
	pruned: number;
}

// SECTION Welcome Screen

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure|Guild}
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

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure|Guild}
 */
export interface WelcomeScreenChannel {
	/**
	 * The channel's ID
	 */
	channel_id: Snowflake;

	/**
	 * The description shown for the channel
	 */
	description: string;

	/**
	 * The {@link https://discord.com/developers/docs/reference#image-formatting|emoji ID}, if the emoji is custom
	 */
	emoji_id: Nullable<Snowflake>;

	/**
	 * The emoji name if custom, the unicode character if standard, or `null` if no emoji is set
	 */
	emoji_name: Nullable<string>;
}

// !SECTION

// SECTION Membership Screening

/**
 * In guilds with [Membership Screening][1] enabled, when a member joins, [Guild Member Add][2] will be emitted but they
 * will initially be restricted from doing any actions in the guild, and `pending` will be true in the [member object][3].
 * When the member completes the screening, [Guild Member Update][4] will be emitted and `pending` will be false.
 *
 * Giving the member a role will bypass Membership Screening as well as the guild's verification level, giving the member immediate access to chat.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object|Guild}
 *
 * [1]: https://support.discord.com/hc/en-us/articles/1500000466882
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-member-add
 * [3]: https://discord.com/developers/docs/resources/guild#guild-member-object
 * [4]: https://discord.com/developers/docs/topics/gateway#guild-member-update
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
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object-membership-screening-field-structure|Guild}
 */
export interface ScreeningField {
	/**
	 * The type of field (currently `TERMS` is the only type)
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
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object-membership-screening-field-types|Guild}
 */
export enum ScreeningFieldType {
	Terms = 'Server Rules'
}

// !SECTION

// SECTION Endpoints

/**
 * Create a new guild.
 *
 * @warning
 * This endpoint can be used only by bots in less than 10 guilds.
 *
 * @endpoint [POST] `/guilds`
 *
 * @returns A [guild][1] object on success
 * @fires A [Guild Create][2] Gateway event
 *
 * [POST]: https://discord.com/developers/docs/resources/guild#create-guild
 * [1]: https://discord.com/developers/docs/resources/guild#guild-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-create
 */
export interface CreateGuild {
	/**
	 * Name of the guild (2-100 characters)
	 */
	name: string;

	/**
	 * {@link https://discord.com/developers/docs/resources/voice#voice-region-object|Voice region} ID
	 */
	region?: string;

	/**
	 * Base64 128x128 image for the guild icon
	 */
	icon?: string;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level|Verification level}
	 */
	verification_level?: number;

	/**
	 * Default {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level|message notifications level}
	 */
	default_message_notifications?: number;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level|Explicit content filter level}
	 */
	explicit_content_filter?: number;

	/**
	 * New guild roles
	 *
	 * @remarks
	 * When using the `roles` parameter:
	 * - The first member of the array is used to change properties of the guild's `@everyone` role.
	 *   If you are trying to bootstrap a guild with additional roles, keep this in mind.
	 * - The required `id` field within each role object is an integer placeholder, and will be replaced by the API upon consumption. Its
	 * 	 purpose is to allow you to overwrite a role's permissions in a channel when also passing in channels with the channels array.
	 */
	roles?: Role[];

	/**
	 * New guild's channels
	 *
	 * @remarks
	 * When using the `channels` parameter:
	 * - The `position` field is ignored, and none of the default channels are created.
	 * - The `id` field within each channel object may be set to an integer placeholder, and will be replaced by the API
	 *   upon consumption. Its purpose is to allow you to create `GUILD_CATEGORY` channels by setting the `parent_id` field
	 *   on any children to the category's `id` field. Category channels must be listed before any children.
	 */
	channels?: PartialChannel;

	/**
	 * ID for AFK channel
	 */
	afk_channel_id?: Snowflake;

	/**
	 * AFK timeout in seconds
	 */
	afk_timeout?: number;

	/**
	 * The ID of the channel where guild notices such as welcome messages and boost events are posted
	 */
	system_channel_id?: Snowflake;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags|System channel flags}
	 */
	system_channel_flags?: SystemChannelFlags;
}

/**
 * @remarks
 * If `with_counts` is set to true, this endpoint will also return `approximate_member_count` and `approximate_presence_count` for the guild.
 *
 * @endpoint [GET] `/guilds/{guild.id}`
 *
 * @returns The [guild][1] object for the given ID.
 *
 * [GET]: https://discord.com/developers/docs/resources/guild#create-guild
 * [1]: https://discord.com/developers/docs/resources/guild#guild-object
 */
export interface GetGuild {
	/**
	 * When `true`, will return approximate member and presence counts for the guild
	 *
	 * @default false
	 */
	with_counts?: boolean;
}

/**
 * Modify a guild's settings. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [PATCH] `/guilds/{guild.id}`
 *
 * @returns The updated [guild][1] object on success.
 * @fires A [Guild Update][2] Gateway event.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/guild#modify-guild
 * [1]: https://discord.com/developers/docs/resources/guild#guild-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-update
 */
export interface ModifyGuild {
	/**
	 * Guild name
	 */
	name?: string;

	/**
	 * Guild {@link https://discord.com/developers/docs/resources/voice#voice-region-object|voice region} id
	 */
	region?: Nullable<string>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level|Verification level}
	 */
	verification_level?: Nullable<number>;

	/**
	 * Default {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level|message notifications level}
	 */
	default_message_notifications?: Nullable<number>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level|Explicit content filter level}
	 */
	explicit_content_filter?: Nullable<number>;

	/**
	 * ID for AFK channel
	 */
	afk_channel_id?: Nullable<Snowflake>;

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
	owner_id?: Snowflake;

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
	system_channel_id?: Nullable<Snowflake>;

	/**
	 * {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags|System channel flags}
	 */
	system_channel_flags?: SystemChannelFlags;

	/**
	 * The ID of the channel where Community guilds display rules and/or guidelines
	 */
	rules_channel_id?: Nullable<Snowflake>;

	/**
	 * The ID of the channel where admins and moderators of Community guilds receive notices from Discord
	 */
	public_updates_channel_id?: Nullable<Snowflake>;

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
 * Create a new [channel][1] object for the guild. Requires the `MANAGE_CHANNELS` permission.
 *
 * @remarks
 * If setting permission overwrites, only permissions your bot has in the guild can be allowed/denied.
 * Setting `MANAGE_ROLES` permission in channels is only possible for guild administrators.
 *
 * @endpoint [POST] `/guilds/{guild.id}/channels`
 *
 * @returns The new [channel][1] object on success.
 * @fires A [Channel Create][2] Gateway event.
 *
 * [POST]: https://discord.com/developers/docs/resources/guild#create-guild-channel
 * [1]: https://discord.com/developers/docs/resources/channel#channel-object
 * [2]: https://discord.com/developers/docs/topics/gateway#channel-create
 */
export interface CreateGuildChannel {
	/**
	 * Channel name (2-100 characters)
	 */
	name: string;

	/**
	 * The {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types|type of channel}
	 */
	type?: number;

	/**
	 * Channel topic (0-1024 characters)
	 */
	topic?: string;

	/**
	 * The bitrate (in bits) of the voice channel (voice only)
	 */
	bitrate?: number;

	/**
	 * The user limit of the voice channel (voice only)
	 */
	user_limit?: number;

	/**
	 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as
	 * well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user?: number;

	/**
	 * Sorting position of the channel
	 */
	position?: number;

	/**
	 * The channel's permission overwrites
	 */
	permission_overwrites?: Overwrite[];

	/**
	 * ID of the parent category for a channel
	 */
	parent_id?: Snowflake;

	/**
	 * Whether the channel is nsfw
	 */
	nsfw?: boolean;
}

/**
 * Modify the positions of a set of [channel][1] objects for the guild. Requires `MANAGE_CHANNELS` permission.
 *
 * @endpoint [PATCH] `/guilds/{guild.id}/channels`
 *
 * @returns A `204` empty response on success.
 * @fires Multiple [Channel Update] Gateway events.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions
 * [1]: https://discord.com/developers/docs/resources/channel#channel-object
 * [2]: https://discord.com/developers/docs/topics/gateway#channel-update
 */
export interface ModifyGuildChannelPositions {
	/**
	 * Channel ID
	 */
	id: Snowflake;

	/**
	 * Sorting position of the channel
	 */
	position: Nullable<number>;

	/**
	 * Syncs the permission overwrites with the new parent, if moving to a new category
	 */
	lock_permissions: Nullable<boolean>;

	/**
	 * The new parent ID for the channel that is moved
	 */
	parent_id: Snowflake;
}

/**
 * @endpoint [GET] `/guilds/{guild.id}/members`
 *
 * @returns A list of [guild member][1] objects that are members of the guild, sorted by their ID in ascending order.
 *
 * [GET]: https://discord.com/developers/docs/resources/guild#list-guild-members
 * [1]: https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure
 */
export interface ListGuildMembers {
	/**
	 * Max number of members to return (1-1000)
	 *
	 * @default 1
	 */
	limit?: RangeOf<1, 1000>;

	/**
	 * The highest user ID in the previous page
	 *
	 * @default 0
	 */
	after?: Snowflake;
}

/**
 * @endpoint GET `/guilds/{guild.id}/members/search`
 *
 * @returns A list of [guild member][1] objects whose username or nickname starts with a provided string.
 *
 * [1]: https://discord.com/developers/docs/resources/guild#guild-member-object
 */
export interface SearchGuildMembers {
	/**
	 * Query string to match username(s) and nickname(s) against
	 */
	query: string;

	/**
	 * Max numbers of members to return (1-1000)
	 *
	 * @default 1
	 */
	limit?: RangeOf<1, 1000>;
}

/**
 * Adds a user to the guild, provided you have a valid OAuth2 access token for the user with the `guilds.join` scope.
 *
 * @info
 * The Authorization header must be a Bot token (belonging to the same application used for authorization),
 * and the bot must be a member of the guild with `CREATE_INSTANT_INVITE` permission.
 *
 * @endpoint [PUT] `/guilds/{guild.id}/members/{user.id}`
 *
 * @returns A `201 CREATED` with the [guild member][1] as the body, or `204 NO CONTENT` if the user is already a member of the guild
 *
 * @fires A [Guild Member Add][2] Gateway event.
 *
 * [PUT]: https://discord.com/developers/docs/resources/guild#add-guild-member
 * [1]: https://discord.com/developers/docs/resources/guild#guild-member-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-member-add
 */
export interface AddGuildMember {
	/**
	 * An OAuth2 access token granted with the `guilds.join` to the bot's application for the user you want to add to the guild
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
 * Modify attributes of a [guild member][1].
 *
 * @remarks
 * If the `channel_id` is set to `null`, this will force the target user to be disconnected from voice.
 *
 * @info
 * When moving members to channels, the API user *must* have permissions to both connect to the channel and have the `MOVE_MEMBERS` permission.
 *
 * @endpoint [PATCH] `/guilds/{guild.id}/members/{user.id}`
 *
 * @returns A `200 OK` with the [guild member][1] as the body.
 * @fires A [Guild Member Update][2] Gateway event.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/guild#modify-guild-member
 * [1]: https://discord.com/developers/docs/resources/guild#guild-member-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-member-update
 */
export interface ModifyGuildMember {
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
 * Modifies the nickname of the current user in a guild.
 *
 * @endpoint [PATCH]() `/guilds/{guild.id}/members/@me`
 *
 * @returns A `200` with the nickname on success.
 * @fires A [Guild Member Update][1] Gateway event.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/guild#modify-current-user-nick
 * [1]: https://discord.com/developers/docs/topics/gateway#guild-member-update
 */
export interface ModifyCurrentUserNick {
	/**
	 * Value to set users nickname to
	 *
	 * @permission `CHANGE_NICKNAME`
	 */
	nick?: Nullable<string>;
}

/**
 * Create a guild ban, and optionally delete previous messages sent by the banned user. Requires the `BAN_MEMBERS` permission.
 *
 * @endpoint [PUT] `/guilds/{guild.id}/bans/{user.id}`
 *
 * @returns A `204` empty response on success.
 * @fires A [Guild Ban Add][1] Gateway event.
 *
 * [PUT]: https://discord.com/developers/docs/resources/guild#create-guild-ban
 * [1]: https://discord.com/developers/docs/topics/gateway#guild-ban-add
 */
export interface CreateGuildBan {
	/**
	 * Number of days to delete messages for (0-7)
	 */
	delete_messages_days?: RangeOf<0, 7>;

	/**
	 * Reason for the ban
	 */
	reason?: string;
}

/**
 * Create a new [role][1] for the guild. Requires the `MANAGE_ROLES` permission.
 *
 * @endpoint [POST] `/guilds/{guild.id}/roles`
 *
 * @returns The new [role][1] object on success.
 * @fires A [Guild Role Create][2] Gateway event.
 *
 * [POST]: https://discord.com/developers/docs/resources/guild#create-guild-role
 * [1]: https://discord.com/developers/docs/topics/permissions#role-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-role-create
 */
export interface CreateGuildRole {
	/**
	 * Name of the role
	 *
	 * @default 'new role'
	 */
	name?: string;

	/**
	 * Bitwise value of the enabled/disabled permissions
	 *
	 * @default `@everyone` permissions in guild
	 */
	permissions?: string;

	/**
	 * RGB color value
	 *
	 * @default 0
	 */
	color?: number;

	/**
	 * Whether the role should be displayed separately in the sidebar
	 *
	 * @default false
	 */
	hoist?: boolean;

	/**
	 * Whether the role should be mentionable
	 *
	 * @default false
	 */
	mentionable?: boolean;
}

/**
 * Modify the positions of a set of [role][1] objects for the guild. Requires the `MANAGE_ROLES` permission.
 *
 * @endpoint [PATCH] `/guilds/{guild.id}/roles`
 *
 * @returns A list of all of the guild's [role][1] objects on success, sorted by their ID in ascending order.
 * @fires Multiple [Guild Role Update][2] Gateway events.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
 * [1]: https://discord.com/developers/docs/topics/permissions#role-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-role-update
 */
export interface ModifyGuildRolePositions {
	/**
	 * Role
	 */
	id: Snowflake;

	/**
	 * Sorting position of the role
	 */
	position?: Nullable<number>;
}

/**
 * Modify a guild role. Requires the `MANAGE_ROLES` permission.
 *
 * @endpoint [PATCH] `/guilds/{guild.id}/roles/{role.id}`
 *
 * @returns The updated [role][1] on success.
 * @fires A [Guild Role Update][2] Gateway event.
 *
 * [PATCh]: https://discord.com/developers/docs/resources/guild#modify-guild-role
 * [1]: https://discord.com/developers/docs/topics/permissions#role-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-role-update
 */
export interface ModifyGuildRole {
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
 * Requires the `KICK_MEMBERS` permission.
 *
 * @remarks
 * By default, prune will not remove users with roles. You can optionally include specific roles in your prune by providing the `include_roles`
 * parameter. Any inactive user that has a subset of the provided role(s) will be counted in the prune and users with additional roles will not.
 *
 * @endpoint [GET] `/guilds/{guild.id}/prune`
 *
 * @returns An object with one `pruned` key indicating the number of members that would be removed in a prune operation.
 *
 * [GET]: https://discord.com/developers/docs/resources/guild#get-guild-prune-count
 */
export interface GetGuildPruneCount {
	/**
	 * Number of days to count prune for (1-30)
	 *
	 * @default 7
	 */
	days?: RangeOf<1, 30>;

	/**
	 * Role(s) to include
	 */
	include_roles?: Snowflake[];
}

/**
 * Begin a prune operation. Requires the `KICK_MEMBERS` permission.
 *
 * @remarks
 * For large guilds it's recommended to set the `compute_prune_count` option to `false`, forcing `pruned` to `null`.
 *
 * By default, prune will not remove users with roles. You can optionally include specific roles in your prune by providing the `include_roles`
 * parameter. Any inactive user that has a subset of the provided role(s) will be counted in the prune and users with additional roles will not.
 *
 * @endpoint [POST] `/guilds/{guild.id}/prune`
 *
 * @returns An object with one `pruned` key indicating the number of members that were removed in the prune operation.
 * @fires Multiple [Guild Member Remove][1] Gateway events.
 *
 * [POST]: https://discord.com/developers/docs/resources/guild#begin-guild-prune
 * [1]: https://discord.com/developers/docs/topics/gateway#guild-member-remove
 */
export interface BeginGuildPrune {
	/**
	 * Number of days to prune (1-30)
	 *
	 * @default 7
	 */
	days?: RangeOf<1, 30>;

	/**
	 * Whether 'pruned' is returned, discouraged for large guilds
	 *
	 * @default true
	 */
	compute_prune_count?: boolean;

	/**
	 * Role(s) to include
	 */
	include_roles?: Snowflake[];
}

/**
 * Attach an [integration][1] object from the current user to the guild. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [POST] `/guilds/{guild.id}/integrations`
 *
 * @returns A `204` empty response on success.
 * @fires A [Guild Integrations Update][2] Gateway event.
 *
 * [POST]: https://discord.com/developers/docs/resources/guild#create-guild-integration
 * [1]: https://discord.com/developers/docs/resources/guild#integration-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-integrations-update
 */
export interface CreateGuildIntegration {
	/**
	 * 	The integration type
	 */
	type: IntegrationType;

	/**
	 * The integration ID
	 */
	id: Snowflake;
}

/**
 * Modify the behavior and settings of an [integration][1] object for the guild. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [PATCH] `/guilds/{guild.id}/integrations/{integration.id}`
 *
 * @returns A `204` empty response on success.
 * @fires A [Guild Integrations Update][2] Gateway event.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/guild#modify-guild-integration
 * [1]: https://discord.com/developers/docs/resources/guild#integration-object
 * [2]: https://discord.com/developers/docs/topics/gateway#guild-integrations-update
 */
export interface EditIntegration {
	/**
	 * The behavior when an integration subscription lapses (see the
	 * {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors|integration expire behaviors} documentation)
	 */
	expire_behavior?: Nullable<number>;

	/**
	 * Period (in days) where the integration will ignore lapsed subscriptions
	 */
	expire_grace_period?: Nullable<number>;

	/**
	 * Whether emoticons should be synced for this integration (Twitch only currently)
	 */
	enable_emoticons?: Nullable<boolean>;
}

/**
 * @endpoint [GET] `/guilds/{guild.id}/widget.png`
 *
 * @returns A PNG image widget for the guild
 *
 * [GET]: https://discord.com/developers/docs/resources/guild#get-guild-widget-image
 */
export interface GetWidgetImage {
	/**
	 * Style of the widget image returned
	 *
	 * @default `shield`
	 */
	style?: WidgetStyle;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options|Guild}
 */
export type WidgetStyle = 'shield' | 'banner1' | 'banner2' | 'banner3' | 'banner4';

/**
 * Modify the discovery metadata for the guild. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint PATCH `/guilds/{guild.id}/discovery-metadata`
 *
 * @returns The updated discovery metadata object on success.
 */
export interface ModifyDiscoveryMetadata {
	/**
	 * The ID of the primary discovery category
	 */
	primary_category_id?: Nullable<number>;

	/**
	 * Up to 10 discovery search keywords
	 */
	keywords?: Nullable<string[]>;

	/**
	 * Whether guild info is shown when custom emojis are clicked
	 */
	emoji_discoverability_enabled?: Nullable<boolean>;
}

/**
 * Modify the guild's [Welcome Screen][1]. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint PATCH `/guilds/{guild.id}/welcome-screen`
 *
 * @returns The updated [Welcome Screen][1] object.
 *
 * [1]: https://discord.com/developers/docs/resources/guild#welcome-screen-object
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

/**
 * Modify the guild's [Membership Screening][1] form. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint PATCH `/guilds/{guild.id}/member-verification`
 *
 * @returns The updated [Membership Screening][1] object.
 *
 * [1]: https://discord.com/developers/docs/resources/guild#membership-screening-object
 */
export interface ModifyMembershipScreening {
	/**
	 * Whether Membership Screening is enabled
	 */
	enabled?: boolean;

	/**
	 * Array of {@link https://discord.com/developers/docs/resources/guild#membership-screening-object-membership-screening-field-structure|field} objects serialized in a string
	 */
	form_fields?: string;

	/**
	 * The server description to show in the screening form
	 */
	description?: string;
}

// !SECTION
