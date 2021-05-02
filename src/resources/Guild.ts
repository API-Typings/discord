import type { Nullable, Range, Tuple } from 'extended-utility-types';
import type {
	Channel,
	ChannelType,
	DiscoveryMetadata,
	Emoji,
	InviteMetadata,
	Message,
	Overwrite,
	PartialChannel,
	PartialInvite,
	PartialUser,
	PresenceUpdate,
	Role,
	Snowflake,
	StatusType,
	ThreadChannel,
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
	 * Guild ID.
	 */
	id: Snowflake;

	/**
	 * Guild name (2-100 characters, excluding trailing and leading whitespace).
	 */
	name: Nullable<string>;

	/**
	 * Splash hash.
	 */
	splash: Nullable<string>;

	/**
	 * Banner hash.
	 */
	banner?: Nullable<string>;

	/**
	 * The description for the guild.
	 */
	description?: Nullable<string>;

	/**
	 * Enabled guild features.
	 */
	features?: `${GuildFeature}`[];

	/**
	 * Verification level required for the guild.
	 */
	verification_level?: VerificationLevel;

	/**
	 * The vanity URL code for the guild.
	 */
	vanity_url_code?: Nullable<string>;

	/**
	 * True if this guild is unavailable due to an outage.
	 */
	unavailable?: boolean;
}

// ANCHOR Guild

/**
 * Represents an isolated collection of users and channels, and are often referred to as "servers"
 * in the UI.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-structure|Guild}
 */
export interface Guild extends PartialGuild {
	/**
	 * Icon hash.
	 */
	icon: string;

	/**
	 * Icon hash, returned when in the template object.
	 */
	icon_hash?: Nullable<string>;

	/**
	 * Discovery splash hash; only present for guilds with the `DISCOVERABLE` feature.
	 */
	discovery_splash: Nullable<string>;

	/**
	 * True if the user is the owner of the guild.
	 *
	 * @remarks
	 * This field is only sent when using the `GET Current User Guilds` endpoint and is
	 * relative to the request user.
	 */
	owner?: boolean;

	/**
	 * ID of owner
	 */
	owner_id: Snowflake;

	/**
	 * Total permissions for the user in the guild (excludes overrides).
	 *
	 * @remarks
	 * This field is only sent when using the `GET Current User Guilds` endpoint and is
	 * relative to the request user.
	 */
	permissions?: string;

	/**
	 * Voice region ID for the guild.
	 */
	region: VoiceRegion;

	/**
	 * ID of AFK channel.
	 */
	afk_channel_id: Nullable<Snowflake>;

	/**
	 * AFK timeout in seconds.
	 */
	afk_timeout: number;

	/**
	 * True if the server widget is enabled.
	 */
	wdiget_enabled?: boolean;

	/**
	 * The channel ID that the widget will generate an invite to, or `null` if set to no invite.
	 */
	widget_channel_id?: Nullable<Snowflake>;

	/**
	 * Verification level required for the guild.
	 */
	verification_level: VerificationLevel;

	/**
	 * Default message notifications level.
	 */
	default_message_notifications: DefaultMessageNotificationLevel;

	/**
	 * Explicit content filter level.
	 */
	explicit_content_filter: ExplicitContentFilterLevel;

	/**
	 * Roles in the guild.
	 */
	roles: Role[];

	/**
	 * Custom guild emojis.
	 */
	emojis: Emoji[];

	/**
	 * Enabled guild features.
	 */
	features: `${GuildFeature}`[];

	/**
	 * Required MFA level for the guild.
	 */
	mfa_level: MFALevel;

	/**
	 * Application ID of the guild creator if it is bot-created.
	 */
	application_id: Nullable<Snowflake>;

	/**
	 * The ID of the channel where guild notices such as welcome messages and boost events are
	 * posted.
	 */
	system_channel_id: Nullable<Snowflake>;

	/**
	 * System channel flags.
	 */
	system_channel_flags: SystemChannelFlags;

	/**
	 * The ID of the channel where Community guilds can display rules and/or guidelines.
	 */
	rules_channel_id: Nullable<Snowflake>;

	/**
	 * When this guild was joined at.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	joined_at?: Nullable<string>;

	/**
	 * True if this is considered a large guild.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	large?: boolean;

	/**
	 * True if this guild is unavailable due to an outage.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	unavailable?: boolean;

	/**
	 * Total number of members in this guild.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	member_count?: number;

	/**
	 * States of members currently in voice channels; lacks the `guild_id` key.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	voice_states?: Omit<VoiceState, 'guild_id'>[];

	/**
	 * Users in the guild.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	members?: GuildMember[];

	/**
	 * Channels in the guild.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	channels?: Channel[];

	/**
	 * All active threads in the guild that you have permission to view.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	threads?: ThreadChannel[];

	/**
	 * Presences of the members in the guild, will only include non-offline members if the size is
	 * greater than `large threshold`.
	 *
	 * @remarks
	 * This field is only sent within the `GUILD_CREATE` event.
	 */
	presences?: Partial<PresenceUpdate['d']>[];

	/**
	 * The maximum number of presences for the guild (the default value, currently 25000, is in
	 * effect when `null` is returned).
	 */
	max_presences?: Nullable<number>;

	/**
	 * The maximum number of members for the guild.
	 */
	max_members?: number;

	/**
	 * The vanity url code for the guild.
	 */
	vanity_url_code: Nullable<string>;

	/**
	 * The description for the guild, if the guild is discoverable.
	 */
	description: Nullable<string>;

	/**
	 * Banner hash.
	 */
	banner?: Nullable<string>;

	/**
	 * Premium tier (server Boost level).
	 */
	premium_tier: PremiumTier;

	/**
	 * The number of boosts this guild currently has.
	 */
	premium_subscription_count?: number;

	/**
	 * The preferred locale of a Community guild; used in server discovery and notices from Discord;
	 *
	 * @defaultValue `en-US`
	 */
	preferred_locale: string;

	/**
	 * The ID of the channel where admins and moderators of Community guilds receive notices from
	 * Discord.
	 */
	public_updates_channel_id: Nullable<Snowflake>;

	/**
	 * The maximum amount of users in a video channel.
	 */
	max_video_channel_users?: number;

	/**
	 * Approximate number of members in this guild, returned from the `GET /guilds/{guild.id}`
	 * endpoint when `with_counts` is `true`.
	 */
	approximate_member_count?: number;

	/**
	 * Approximate number of non-offline members in this guild, returned from the
	 * `GET /guilds/{guild.id}` endpoint when `with_counts` is `true`.
	 */
	approximate_presence_count?: number;

	/**
	 * The welcome screen of a Community guild, shown to new members, returned when in the invite
	 * object.
	 */
	welcome_screen?: WelcomeScreen;

	/**
	 * `true` if this guild is designated as NSFW.
	 */
	nsfw: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level|Guild}
 */
export enum DefaultMessageNotificationLevel {
	/**
	 * Members will receive notifications for all messages by default.
	 */
	AllMessages,

	/**
	 * Members will receive notifications only for messages that `@mention` them by default.
	 */
	OnlyMentions
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level|Guild}
 */
export enum ExplicitContentFilterLevel {
	/**
	 * No media content will be scanned.
	 */
	Disabled,

	/**
	 * Media content sent by members without any roles will be scanned.
	 */
	GuildMembersWithoutRoles,

	/**
	 * Media content sent by any member will be scanned.
	 */
	AllGuildMembers
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-mfa-level|Guild}
 */
export enum MFALevel {
	/**
	 * Guild has no MFA/2FA requirement.
	 */
	None,

	/**
	 * Guild has a 2FA requirement for moderation actions.
	 */
	Elevated
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-verification-level|Guild}
 */
export enum VerificationLevel {
	/**
	 * Unrestricted.
	 */
	None,

	/**
	 * Must have verified email on account.
	 */
	Low,

	/**
	 * Must be registered on Discord for longer than 5 minutes.
	 */
	Medium,

	/**
	 * Must be a member of the server for longer than 10 minutes.
	 */
	High,

	/**
	 * Must have a verified phone number.
	 */
	VeryHigh
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-premium-tier|Guild}
 */
export enum PremiumTier {
	/**
	 * Guild has not unlocked any Server Boost perks.
	 */
	None,

	/**
	 * Guild has unlocked Server Boost level 1 perks (2+ boosts).
	 */
	Tier1,

	/**
	 * Guild has unlocked Server Boost level 2 perks (15+ boosts).
	 */
	Tier2,

	/**
	 * Guild has unlocked Server Boost level 3 perks (30+ boosts).
	 */
	Tier3
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags|Guild}
 */
export enum SystemChannelFlags {
	/**
	 * Suppress member join notifications.
	 */
	SuppressJoinNotifications = 1 << 0,

	/**
	 * Suppress server boost notifications.
	 */
	SuppressPremiumSubscriptions = 1 << 1,

	/**
	 * Suppress server setup tips.
	 */
	SuppressGuildReminderNotifications = 1 << 2
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-object-guild-features|Guild}
 */
export enum GuildFeature {
	/**
	 * Guild has access to set an animated guild icon.
	 */
	AnimatedIcon = 'ANIMATED_ICON',

	/**
	 * Guild has access to set a guild banner image.
	 */
	Banner = 'BANNER',

	/**
	 * Guild has access to use commerce features.
	 */
	Commerce = 'COMMERCE',

	/**
	 * Guild can enable welcome screen, Membership Screening, stage channels, and discovery, and
	 * receives community updates.
	 */
	Community = 'COMMUNITY',

	/**
	 * Guild is able to be discovered in the directory.
	 */
	Discoverable = 'DISCOVERABLE',

	/**
	 * Guild cannot be discoverable.
	 */
	DiscoverableDisabled = 'DISCOVERABLE_DISABLED',

	/**
	 * Guild is able to be featured in the directory.
	 */
	Featurable = 'FEATURABLE',

	/**
	 * Guild has access to set an invite splash background.
	 */
	InviteSplash = 'INVITE_SPLASH',

	/**
	 * Guild has enabled Membership Screening.
	 */
	MemberVerificationGateEnabled = 'MEMBER_VERIFICATION_GATE_ENABLED',

	/**
	 * Guild has access to create news channels.
	 */
	News = 'NEWS',

	/**
	 * Guild is partnered.
	 */
	Partnered = 'PARTNERED',

	/**
	 * Guild can be previewed before joining via Membership Screening or the directory.
	 */
	PreviewEnabled = 'PREVIEW_ENABLED',

	/**
	 * Guild has access to set a vanity URL.
	 */
	VanityURL = 'VANITY_URL',

	/**
	 * Guild is verified.
	 */
	Verified = 'VERIFIED',

	/**
	 * Guild has access to set 384kbps bitrate in voice (previously VIP voice servers).
	 */
	VIPRegions = 'VIP_REGIONS',

	/**
	 * Guild has enabled the welcome screen.
	 */
	WelcomeScreenEnabled = 'WELCOME_SCREEN_ENABLED'
}

/**
 * Represents an Offline Guild, or a Guild whose information has not been provided through Guild
 * Create events during the Gateway connect.
 */
export interface UnavailableGuild extends Pick<PartialGuild, 'id'> {
	unavailable: true;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-preview-object-guild-preview-structure|Guild}
 */
export interface GuildPreview {
	/**
	 * Guild ID.
	 */
	id: Snowflake;

	/**
	 * Guild name.
	 */
	name: string;

	/**
	 * Icon hash.
	 */
	icon: Nullable<string>;

	/**
	 * Splash hash.
	 */
	splash: Nullable<string>;

	/**
	 * Discovery splash hash.
	 */
	discovery_splash: Nullable<string>;

	/**
	 * Custom guild emojis.
	 */
	emojis: Emoji[];

	/**
	 * Enabled guild features.
	 */
	features: `${GuildFeature}`[];

	/**
	 * Approximate number of members in this guild.
	 */
	approximate_member_count: number;

	/**
	 * Approximate number of online members in this guild.
	 */
	approximate_presence_count: number;

	/**
	 * The description for the guild, if the guild is discoverable.
	 */
	description: Nullable<string>;
}

// SECTION Guild Widget

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure|Guild}
 */
export interface GuildWidgetSettings {
	/**
	 * Whether the widget is enabled.
	 */
	enabled: boolean;

	/**
	 * The widget channel ID.
	 */
	channel_id: Nullable<Snowflake>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-example-get-guild-widget|Guild}
 */
export interface GuildWidget {
	id: Snowflake;
	name: string;
	instant_invite: string;
	channels: Omit<PartialChannel, 'type'>[];
	members: (PartialUser & {
		status: StatusType;
		avatar_url: string;
	})[];
	presence_count: number;
}

// !SECTION

// ANCHOR Partial Guild Member
export interface PartialGuildMember {
	/**
	 * This users guild nickname.
	 */
	nick?: Nullable<string>;

	/**
	 * Array of role object IDs.
	 */
	roles: Snowflake[];

	/**
	 * When the user joined the guild.
	 */
	joined_at: string;

	/**
	 * When the user started boosting the guild.
	 */
	premium_since?: Nullable<string>;

	/**
	 * Whether the user has not yet passed the guild's Membership Screening requirements.
	 */
	pending?: boolean;

	/**
	 * Total permissions of the member in the channel, including overrides, returned when in the
	 * interaction object.
	 */
	permissions?: string;
}

// ANCHOR Guild Member

/**
 * @remarks
 * - The field `user` won't be included in the member object attached to `MESSAGE_CREATE` and
 * `MESSAGE_UPDATE` gateway events.
 * - In `GUILD_` events, `pending` will always be included as `true` or `false`. In non `GUILD_`
 * events which can only be triggered by non-`pending` users, `pending` will not be included.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure|Guild}
 */
export interface GuildMember extends PartialGuildMember {
	/**
	 * The user this guild member represents.
	 */
	user?: User;

	/**
	 * Whether the user is deafened in voice channels.
	 */
	deaf: boolean;

	/**
	 * Whether the user is muted in voice channels.
	 */
	mute: boolean;
}

// SECTION Integration

// ANCHOR Partial Integration

/**
 * @source {@link https://discord.com/developers/docs/resources/audit-log#audit-log-object-example-partial-integration-object}
 */
export interface PartialIntegration {
	/**
	 * Integration ID.
	 */
	id: Snowflake;

	/**
	 * Integration name.
	 */
	name: string;

	/**
	 * Integration type (Twitch, YouTube, or Discord).
	 */
	type: IntegrationType;

	/**
	 * Integration account information.
	 */
	account: IntegrationAccount;
}

// ANCHOR Integration

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-object-integration-structure|Guild}
 */
export interface Integration extends PartialIntegration {
	/**
	 * Integration ID.
	 */
	id: Snowflake;

	/**
	 * Integration name.
	 */
	name: string;

	/**
	 * Integration type (twitch, youtube, or discord)
	 */
	type: IntegrationType;

	/**
	 * Is this integration enabled.
	 */
	enabled: boolean;

	/**
	 * Is this integration syncing.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	syncing?: boolean;

	/**
	 * ID that this integration uses for "subscribers".
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	role_id?: Snowflake;

	/**
	 * Whether emoticons should be synced for this integration (Twitch only currently).
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	enable_emoticons?: boolean;

	/**
	 * The behavior of expiring subscribers.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	expire_behavior?: IntegrationExpireBehavior;

	/**
	 * The grace period (in days) before expiring subscribers.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	expire_grace_period?: number;

	/**
	 * User for this integration.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	user?: User;

	/**
	 * When this integration was last synced.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	synced_at?: string;

	/**
	 * How many subscribers this integration has.
	 *
	 * @remarks
	 * This field is not provided for discord bot integrations.
	 */
	subscriber_count?: number;

	/**
	 * Has this integration been revoked.
	 */
	revoked?: boolean;

	/**
	 * The bot/OAuth2 application for discord integrations.
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
	 * ID of the account.
	 */
	id: Snowflake;

	/**
	 * Name of the account.
	 */
	name: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure|Guild}
 */
export interface IntegrationApplication {
	/**
	 * The ID of the app.
	 */
	id: Snowflake;

	/**
	 * The name of the app.
	 */
	name: string;

	/**
	 * The Icon hash of the app.
	 */
	icon: Nullable<string>;

	/**
	 * The description of the app.
	 */
	description: string;

	/**
	 * The description of the app.
	 */
	summary: string;

	/**
	 * The bot associated with this application.
	 */
	bot?: User;
}

// !SECTION

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#ban-object-ban-structure|Guild}
 */
export interface GuildBan {
	/**
	 * The reason for the ban.
	 */
	reason: Nullable<string>;

	/**
	 * The banned user.
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
	 * The server description shown in the welcome screen.
	 */
	description: Nullable<string>;

	/**
	 * The channels shown in the welcome screen, up to 5.
	 */
	welcome_channels: WelcomeScreenChannel[];
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure|Guild}
 */
export interface WelcomeScreenChannel {
	/**
	 * The channel's ID.
	 */
	channel_id: Snowflake;

	/**
	 * The description shown for the channel.
	 */
	description: string;

	/**
	 * The emoji ID, if the emoji is custom.
	 */
	emoji_id: Nullable<Snowflake>;

	/**
	 * The emoji name if custom, the unicode character if standard, or `null` if no emoji is set.
	 */
	emoji_name: Nullable<string>;
}

// !SECTION

// SECTION Membership Screening

/**
 * In guilds with Membership Screening enabled, when a member joins, Guild Member Add will
 * be emitted but they will initially be restricted from doing any actions in the guild, and
 * `pending`will be true in the member object. When the member completes the screening, Guild
 * Member Update will be emitted and `pending` will be false.
 *
 * Giving the member a role will bypass Membership Screening as well as the guild's verification
 * level, giving the member immediate access to chat.
 *
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object|Guild}
 */
export interface MembershipScreening {
	/**
	 * When the fields were last updated.
	 */
	version: string;

	/**
	 * The steps in the screening form.
	 */
	form_fields: ScreeningField[];

	/**
	 * The server description shown in the screening form.
	 */
	description: Nullable<string>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#membership-screening-object-membership-screening-field-structure|Guild}
 */
export interface ScreeningField {
	/**
	 * The type of field (currently `TERMS` is the only type).
	 */
	field_type: ScreeningFieldType;

	/**
	 * The title of the field.
	 */
	label: string;

	/**
	 * The list of rules.
	 */
	values?: string[];

	/**
	 * Whether the user has to fill out the field.
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

// ANCHOR Create Guild

/**
 * Create a new guild. This endpoint can be used only by bots in less than 10 guilds.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#create-guild) `/guilds`
 */
export interface CreateGuild {
	body: {
		/**
		 * Name of the guild (2-100 characters).
		 */
		name: string;

		/**
		 * Voice region ID.
		 */
		region?: string;

		/**
		 * Base64 128x128 image for the guild icon.
		 */
		icon?: string;

		/**
		 * Verification level.
		 */
		verification_level?: VerificationLevel;

		/**
		 * Default message notifications level.
		 */
		default_message_notifications?: DefaultMessageNotificationLevel;

		/**
		 * Explicit content filter level.
		 */
		explicit_content_filter?: ExplicitContentFilterLevel;

		/**
		 * New guild roles.
		 *
		 * @remarks
		 * When using the `roles` parameter:
		 * - The first member of the array is used to change properties of the guild's `@everyone`
		 * role. If you are trying to bootstrap a guild with additional roles, keep this in mind.
		 * - The required `id` field within each role object is an integer placeholder, and will be
		 * replaced by the API upon consumption. Its purpose is to allow you to overwrite a role's
		 * permissions in a channel when also passing in channels with the channels array.
		 */
		roles?: Role[];

		/**
		 * New guild's channels.
		 *
		 * @remarks
		 * When using the `channels` parameter:
		 * - The `position` field is ignored, and none of the default channels are created.
		 * - The `id` field within each channel object may be set to an integer placeholder, and
		 * will be replaced by the API upon consumption. Its purpose is to allow you to create
		 * `GUILD_CATEGORY` channels by setting the `parent_id` field on any children to the
		 * category's `id` field. Category channels must be listed before any children.
		 */
		channels?: PartialChannel;

		/**
		 * ID for AFK channel.
		 */
		afk_channel_id?: Snowflake;

		/**
		 * AFK timeout in seconds.
		 */
		afk_timeout?: number;

		/**
		 * The ID of the channel where guild notices such as welcome messages and boost events are
		 * posted.
		 */
		system_channel_id?: Snowflake;

		/**
		 * System channel flags.
		 */
		system_channel_flags?: SystemChannelFlags;
	};

	response: Guild;
}

/**
 * Returns the guild object for the given ID.
 *
 * If `with_counts` is set to `true`, this endpoint will also return `approximate_member_count` and
 * `approximate_presence_count` for the guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild) `/guilds/{guild.id}`
 */
export interface GetGuild {
	query: {
		/**
		 * When `true`, will return approximate member and presence counts for the guild.
		 *
		 * @defaultValue `false`
		 */
		with_counts?: boolean;
	};

	response: Guild;
}

/**
 * Returns the guild preview object for the given ID.
 *
 * If the user is not in the guild, then the guild must be Discoverable.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-preview) `/guilds/{guild.id}/preview`
 */
export type GetGuildPreview = { response: GuildPreview };

/**
 * Modify a guild's settings. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild) `/guilds/{guild.id}`
 */
export interface ModifyGuild {
	body: {
		/**
		 * Guild name.
		 */
		name?: string;

		/**
		 * Guild voice region ID.
		 */
		region?: Nullable<string>;

		/**
		 * Verification level.
		 */
		verification_level?: Nullable<VerificationLevel>;

		/**
		 * Default message notifications level.
		 */
		default_message_notifications?: Nullable<DefaultMessageNotificationLevel>;

		/**
		 * Explicit content filter level.
		 */
		explicit_content_filter?: Nullable<ExplicitContentFilterLevel>;

		/**
		 * ID for AFK channel.
		 */
		afk_channel_id?: Nullable<Snowflake>;

		/**
		 * AFK timeout in seconds.
		 */
		afk_timeout?: Nullable<number>;

		/**
		 * Base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the
		 * server has `ANIMATED_ICON` feature).
		 */
		icon?: Nullable<string>;

		/**
		 * User ID to transfer guild ownership to (must be owner).
		 */
		owner_id?: Snowflake;

		/**
		 * Base64 16:9 png/jpeg image for the guild splash (when the server has `INVITE_SPLASH`
		 * feature).
		 */
		splash?: Nullable<string>;

		/**
		 * Base64 16:9 png/jpeg image for the guild banner (when the server has `BANNER` feature).
		 */
		banner?: Nullable<string>;

		/**
		 * The ID of the channel where guild notices such as welcome messages and boost events are
		 * posted.
		 */
		system_channel_id?: Nullable<Snowflake>;

		/**
		 * System channel flags.
		 */
		system_channel_flags?: SystemChannelFlags;

		/**
		 * The ID of the channel where Community guilds display rules and/or guidelines.
		 */
		rules_channel_id?: Nullable<Snowflake>;

		/**
		 * The ID of the channel where admins and moderators of Community guilds receive notices
		 * from Discord.
		 */
		public_updates_channel_id?: Nullable<Snowflake>;

		/**
		 * The preferred locale of a Community guild used in server discovery and notices from
		 * Discord
		 *
		 * @defaultValue `en-US`
		 */
		preferred_locale?: Nullable<string>;

		/**
		 * Enabled guild features.
		 */
		features?: `${GuildFeature}`[];

		/**
		 * The description for the guild, if the guild is discoverable.
		 */
		description: Nullable<string>;
	};

	/**
	 * The updated guild object.
	 */
	response: Guild;
}

/**
 * Delete a guild permanently. User must be owner.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild#delete-guild) `/guilds/{guild.id}`
 */
export type DeleteGuild = { response: never };

/**
 * Returns a list of guild channel objects.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-channels) `/guilds/{guild.id}/channels`
 */
export type GetGuildChannels = { response: Channel[] };

/**
 * Create a new channel object for the guild. Requires the `MANAGE_CHANNELS` permission.
 *
 * If setting permission overwrites, only permissions your bot has in the guild can be allowed/
 * denied. Setting `MANAGE_ROLES` permission in channels is only possible for guild administrators.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#create-guild-channel) `/guilds/{guild.id}/channels`
 */
export interface CreateGuildChannel {
	body: {
		/**
		 * Channel name (2-100 characters).
		 */
		name: string;

		/**
		 * The type of channel.
		 */
		type?: ChannelType;

		/**
		 * Channel topic (0-1024 characters).
		 */
		topic?: string;

		/**
		 * The bitrate (in bits) of the voice channel (voice only).
		 */
		bitrate?: number;

		/**
		 * The user limit of the voice channel (voice only).
		 */
		user_limit?: number;

		/**
		 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as
		 * well as users with the permission `manage_messages` or `manage_channel`, are unaffected.
		 */
		rate_limit_per_user?: number;

		/**
		 * Sorting position of the channel.
		 */
		position?: number;

		/**
		 * The channel's permission overwrites.
		 */
		permission_overwrites?: Overwrite[];

		/**
		 * ID of the parent category for a channel.
		 */
		parent_id?: Snowflake;

		/**
		 * Whether the channel is NSFW.
		 */
		nsfw?: boolean;
	};

	/**
	 * The new channel object.
	 */
	response: Channel;
}

/**
 * Modify the positions of a set of channel objects for the guild. Requires `MANAGE_CHANNELS`
 * permission.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions) `/guilds/{guild.id}/channels`
 */
export interface ModifyGuildChannelPositions {
	body: {
		/**
		 * Channel ID.
		 */
		id: Snowflake;

		/**
		 * Sorting position of the channel.
		 */
		position: Nullable<number>;

		/**
		 * Syncs the permission overwrites with the new parent, if moving to a new category.
		 */
		lock_permissions: Nullable<boolean>;

		/**
		 * The new parent ID for the channel that is moved.
		 */
		parent_id: Nullable<Snowflake>;
	};

	response: never;
}

/**
 * @endpoint GET `/guilds/{guild.id}/messages`
 */
export interface SearchGuildMessages {
	query: {
		content: string;
		author_id?: Snowflake;
		mentions?: Snowflake;
		has?: 'link' | 'embed' | 'video' | 'image' | 'file' | 'sound';
		max_id?: Snowflake;
		min_id?: Snowflake;
		channel_id?: Snowflake;
		sort_by?: 'timestamp' | 'relevance';
		sort_order?: 'asc' | 'desc';
	};

	response: {
		messages: [Message & { hit: boolean }][];
		total_results: number;
	};
}

/**
 * Returns a guild member object for the specified user.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-member) `/guilds/{guild.id}/members/{user.id}`
 */
export type GetGuildMember = { response: GuildMember };

/**
 * Returns a list of guild member objects that are members of the guild.
 *
 * @remarks
 * This endpoint is restricted according to whether the `GUILD_MEMBERS` Privileged Intent is
 * enabled for your appliation.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#list-guild-members) `/guilds/{guild.id}/members`
 */
export interface ListGuildMembers {
	query: {
		/**
		 * Max number of members to return (1-1000).
		 *
		 * @defaultValue `1`
		 */
		limit?: Range<1, 1000>;

		/**
		 * The highest user ID in the previous page.
		 *
		 * @defaultValue `0`
		 */
		after?: Snowflake;
	};

	/**
	 * An array of guild members, sorted by their ID in ascending order.
	 */
	response: GuildMember[];
}

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#search-guild-members) `/guilds/{guild.id}/members/search`
 */
export interface SearchGuildMembers {
	query: {
		/**
		 * Query string to match username(s) and nickname(s) against.
		 */
		query: string;

		/**
		 * Max numbers of members to return (1-1000).
		 *
		 * @defaultValue `1`
		 */
		limit?: Range<1, 1000>;
	};

	/**
	 * An array of guild member objects whose username or nickname starts with a provided string.
	 */
	response: GuildMember[];
}

/**
 * Adds a user to the guild, provided you have a valid OAuth2 access token for the user with the
 * `guilds.join` scope.
 *
 * @remarks
 * - For guilds with Membership Screening enabled, this endpoint will default to adding new members
 * as `pending` in the guild member object. Members that are `pending` will have to complete
 * membership screening before they become full members that can talk.
 * - The Authorization header must be a Bot token (belonging to the same application used for
 * authorization), and the bot must be a member of the guild with `CREATE_INSTANT_INVITE`
 * permission.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/guild#add-guild-member) `/guilds/{guild.id}/members/{user.id}`
 */
export interface AddGuildMember {
	body: {
		/**
		 * An OAuth2 access token granted with the `guilds.join` to the bot's application for the
		 * user you want to add to the guild.
		 */
		access_token: string;

		/**
		 * Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission.
		 */
		nick?: string;

		/**
		 * Array of role ids the member is assigned. Requires the `MANAGE_ROLES` permission.
		 */
		roles?: Snowflake[];

		/**
		 * Whether the user is muted in voice channels. Requires the `MUTE_MEMBERS` permission.
		 */
		mute?: boolean;

		/**
		 * Whether the user is deafened in voice channels. Requires the `DEAFEN_MEMBERS` permission.
		 */
		deaf?: boolean;
	};

	response: GuildMember | never;
}

/**
 * Modify attributes of a guild member.
 *
 * @remarks
 * - If the `channel_id` is set to `null`, this will force the target user to be disconnected from
 * voice.
 * - When moving members to channels, the API user *must* have permissions to both connect to the
 * channel and have the `MOVE_MEMBERS` permission.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-member) `/guilds/{guild.id}/members/{user.id}`
 */
export interface ModifyGuildMember {
	body: {
		/**
		 * Value to set users nickname to. Requires the `MANAGE_NICKNAMES` permission.
		 */
		nick?: Nullable<string>;

		/**
		 * Array of role IDs the member is assigned. Requires the `MANAGE_ROLES` permission.
		 */
		roles?: Nullable<Snowflake[]>;

		/**
		 * Whether the user is muted in voice channels. Requires the `MUTE_MEMBERS` permission.
		 */
		mute?: Nullable<boolean>;

		/**
		 * Whether the user is deafened in voice channels. Requires the `DEAFEN_MEMBERS` permission.
		 */
		deaf?: Nullable<boolean>;

		/**
		 * ID of channel to move user to (if they are connected to voice). Requires the
		 * `MOVE_MEMBERS` permission.
		 */
		channel_id?: Nullable<Snowflake>;
	};

	response: GuildMember;
}

/**
 * Modifies the nickname of the current user in a guild.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-current-user-nick) `/guilds/{guild.id}/members/@me`
 */
export interface ModifyCurrentUserNick {
	body: {
		/**
		 * Value to set users nickname to. Requires the `CHANGE_NICKNAME` permission.
		 */
		nick?: Nullable<string>;
	};

	/**
	 * The nickname.
	 */
	response: string;
}

/**
 * Adds a role to a guild member. Requires the `MANAGE_ROLES` permission.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/guild#add-guild-member-role) `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
 */
export type AddGuildMemberRole = { response: never };

/**
 * Removes a role from a guild member. Requires the `MANAGE_ROLES` permission.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild#remove-guild-member-role) `/guilds/{guild.id}/members/{user.id}/roles/{role.id}`
 */
export type RemoveGuildMemberRole = { response: never };

/**
 * Remove a member from a guild. Requires `KICK_MEMBERS` permission.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild#remove-guild-member) `/guilds/{guild.id}/members/{user.id}`
 */
export type RemoveGuildMember = { response: never };

/**
 * Returns a list of ban objects for the users banned from this guild. Requires the `BAN_MEMBERS`
 * permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-bans) `/guilds/{guild.id}/bans`
 */
export type GetGuildBans = GuildBan[];

/**
 * Returns a ban object for the given user or a `404 NOT FOUND` if the ban cannot be found. Requires
 * the `BAN_MEMBERS` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-ban) `/guilds/{guild.id}/bans/{user.id}`
 */
export type GetGuildBan = GuildBan | never;

/**
 * Create a guild ban, and optionally delete previous messages sent by the banned user. Requires
 * the `BAN_MEMBERS` permission.
 *
 * @remarks
 * Supplying a reason in the body will override `X-Audit-Log-Reason` header if both are provided.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/guild#create-guild-ban) `/guilds/{guild.id}/bans/{user.id}`
 */
export interface CreateGuildBan {
	body: {
		/**
		 * Number of days to delete messages for (0-7).
		 */
		delete_messages_days?: Range<0, 7>;

		/**
		 * Reason for the ban.
		 */
		reason?: string;
	};

	response: never;
}

/**
 * Remove the ban for a user. Requires the `BAN_MEMBERS` permissions.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild#remove-guild-ban) `/guilds/{guild.id}/bans/{user.id}`
 */
export type RemoveGuildBan = { response: never };

/**
 * Returns a list of role objects for the guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-roles) `/guilds/{guild.id}/roles`
 */
export type GetGuildRoles = { response: Role[] };

/**
 * Create a new role for the guild. Requires the `MANAGE_ROLES` permission.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#create-guild-role) `/guilds/{guild.id}/roles`
 */
export interface CreateGuildRole {
	body: {
		/**
		 * Name of the role.
		 *
		 * @defaultValue `new role`
		 */
		name?: string;

		/**
		 * Bitwise value of the enabled/disabled permissions.
		 *
		 * @defaultValue `@everyone` permissions in guild
		 */
		permissions?: string;

		/**
		 * RGB color value.
		 *
		 * @defaultValue `0`
		 */
		color?: number;

		/**
		 * Whether the role should be displayed separately in the sidebar.
		 *
		 * @defaultValue `false`
		 */
		hoist?: boolean;

		/**
		 * Whether the role should be mentionable.
		 *
		 * @defaultValue `false`
		 */
		mentionable?: boolean;
	};

	/**
	 * The new role.
	 */
	response: Role;
}

/**
 * Modify the positions of a set of role objects for the guild. Requires the `MANAGE_ROLES`
 * permission.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-role-positions) `/guilds/{guild.id}/roles`
 */
export interface ModifyGuildRolePositions {
	body: {
		/**
		 * Role.
		 */
		id: Snowflake;

		/**
		 * Sorting position of the role.
		 */
		position?: Nullable<number>;
	}[];

	/**
	 * A list of all of the guild's role objects on success, sorted by their ID in ascending order.
	 */
	response: Role[];
}

/**
 * Modify a guild role. Requires the `MANAGE_ROLES` permission.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-role) `/guilds/{guild.id}/roles/{role.id}`
 */
export interface ModifyGuildRole {
	body: {
		/**
		 * Name of the role.
		 */
		name?: Nullable<string>;

		/**
		 * Bitwise value of the enabled/disabled permissions.
		 */
		permissions?: Nullable<string>;

		/**
		 * RGB color value.
		 */
		color?: Nullable<number>;

		/**
		 * Whether the role should be displayed separately in the sidebar.
		 */
		hoist?: Nullable<boolean>;

		/**
		 * Whether the role should be mentionable.
		 */
		mentionable?: Nullable<boolean>;
	};

	/**
	 * The updated role.
	 */
	response: Role;
}

/**
 * Delete a guild role. Requires the `MANAGE_ROLES` permission.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/guild#delete-guild-role) `/guilds/{guild.id}/roles/{role.id}`
 */
export type DeleteGuildRole = { response: never };

/**
 * Requires the `KICK_MEMBERS` permission.
 *
 * @remarks
 * By default, prune will not remove users with roles. You can optionally include specific roles in
 * your prune by providing the `include_roles` parameter. Any inactive user that has a subset of the
 * provided role(s) will be counted in the prune and users with additional roles will not.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-prune-count) `/guilds/{guild.id}/prune`
 */
export interface GetGuildPruneCount {
	query: {
		/**
		 * Number of days to count prune for (1-30).
		 *
		 * @defaultValue `7`
		 */
		days?: Range<1, 30>;

		/**
		 * Role(s) to include.
		 */
		include_roles?: Snowflake[];
	};

	response: {
		/**
		 * The number of members that would be removed in a prune operation.
		 */
		pruned: number;
	};
}

/**
 * Begin a prune operation. Requires the `KICK_MEMBERS` permission.
 *
 * @remarks
 * For large guilds it's recommended to set the `compute_prune_count` option to `false`, forcing
 * `pruned` to `null`.
 *
 * By default, prune will not remove users with roles. You can optionally include specific roles in
 * your prune by providing the `include_roles` parameter. Any inactive user that has a subset of
 * the provided role(s) will be counted in the prune and users with additional roles will not.
 *
 * Supplying a reason in the body will override `X-Audit-Log-Reason` header if both are provided.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#begin-guild-prune)`/guilds/{guild.id}/prune`
 */
export interface BeginGuildPrune {
	body: {
		/**
		 * Number of days to prune (1-30).
		 *
		 * @defaultValue `7`
		 */
		days?: Range<1, 30>;

		/**
		 * Whether `pruned` is returned, discouraged for large guilds.
		 *
		 * @defaultValue `true`
		 */
		compute_prune_count?: boolean;

		/**
		 * Role(s) to include.
		 */
		include_roles?: Snowflake[];

		/**
		 * Reason for the prune.
		 */
		reason?: string;
	};

	response: GetGuildPruneCount['response'];
}

/**
 * Returns a list of voice region objects for the guild.
 *
 * Unlike the similar `/voice` route, this returns VIP servers when the guild is VIP-enabled.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-voice-regions) `/guilds/{guild.id}/regions`
 */
export type GetGuildVoiceRegions = { response: VoiceRegion[] };

/**
 * Returns a list of invite objects (with invite metadata) for the guild. Requires the
 * `MANAGE_GUILD` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-invites) `/guilds/{guild.id}/invites`
 */
export type GetGuildInvites = { response: InviteMetadata[] };

/**
 * Returns a list of integration objects for the guild. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-integrations) `/guilds/{guild.id}/integrations`
 */
export type GetGuildIntegrations = { response: Integration[] };

/**
 * Sync an integration. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#sync-guild-integration) `/guilds/{guild.id}/integrations/{integration.id}/sync`
 */
export type SyncGuildIntegration = { response: never };

/**
 * Returns a guild widget object.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-widget-settings) `/guilds/{guild.id}/widget`
 */
export type GetGuildWidgetSettings = GuildWidget;

/**
 * Modify a guild widget object for the guild. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-widget) `/guilds/{guild.id}/widget`
 */
export interface ModifyGuildWidget {
	body: Partial<GuildWidget>;

	/**
	 * The updated guild widget object.
	 */
	response: GuildWidget;
}

/**
 * Returns the widget for the guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-widget) `/guilds/{guild.id}/widget.json`
 */
export type GetGuildWidget = { response: GuildWidget };

/**
 * Returns a partial invite object for guilds with that feature enabled. Requires the
 * `MANAGE_GUILD` permission.
 *
 * `code` will be null if a vanity url for the guild is not set.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-vanity-url) `/guilds/{guild.id}/vanity-url`
 */
export type GetGuildVanityURL = { response: PartialInvite };

/**
 * Returns a PNG image widget for the guild. Requires no permissions or authentication.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-widget-image) `/guilds/{guild.id}/widget.png`
 */
export interface GetWidgetImage {
	query: {
		/**
		 * Style of the widget image returned.
		 *
		 * @defaultValue `shield`
		 */
		style?: WidgetStyle;
	};

	response: unknown;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-widget-image-widget-style-options|Guild}
 */
export type WidgetStyle = 'shield' | 'banner1' | 'banner2' | 'banner3' | 'banner4';

/**
 * Returns the Welcome Screen object for the guild.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen) `/guilds/{guild.id}/welcome-screen`
 */
export type GetGuildWelcomeScreen = { response: WelcomeScreen };

/**
 * Modify the guild's Welcome Screen. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen) `/guilds/{guild.id}/welcome-screen`
 */
export interface ModifyGuildWelcomeScreen {
	body: {
		/**
		 * Whether the welcome screen is enabled.
		 */
		enabled?: Nullable<boolean>;

		/**
		 * Channels linked in the welcome screen and their display options.
		 */
		welcome_channels?: Nullable<WelcomeScreenChannel[]>;

		/**
		 * The server description to show in the welcome screen.
		 */
		description?: Nullable<string>;
	};

	/**
	 * The updated Welcome Screen object.
	 */
	response: WelcomeScreen;
}

/**
 * Updates the current user's voice state.
 *
 * @remarks
 * - `channel_id` must currently point to a stage channel.
 * - The current user must already have joined `channel_id`.
 * - You must have the `MUTE_MEMBERS` permission to unsuppress yourself. You can always suppress
 * yourself.
 * - You must have the `REQUEST_TO_SPEAK` permission to request to speak. You can always clear your
 * own request to speak.
 * - You are able to set `request_to_speak_timestamp` to any present or future time.
 *
 * @endpoint PATCH `/guilds/{guild.id}/voice-states/@me`
 */
export interface UpdateCurrentUserVoiceState {
	body: {
		/**
		 * The ID of the channel the user is currently in.
		 */
		channel_id: Snowflake;

		/**
		 * Toggles the user's suppress state.
		 */
		suppress?: boolean;

		/**
		 * Sets the user's request to speak.
		 */
		request_to_speak_timestamp?: Nullable<string>;
	};
}

/**
 * Updates another user's voice state.
 *
 * @remarks
 * - `channel_id` must currently point to a stage channel.
 * - User must already have joined `channel_id`.
 * - You must have the `MUTE_MEMBERS` permission (since suppression is the only thing that is
 * available currently).
 * - When unsuppressed, non-bot users will have their `request_to_speak_timestamp` set to the
 * current time. Bot users will not.
 * - When suppressed, the user will have their `request_to_speak_timestamp` removed.
 *
 * @endpoint PATCH `/guilds/{guild.id}/voice-states/{user.id}`
 */
export type UpdateUserVoiceState = { body: Omit<UpdateCurrentUserVoiceState['body'], 'request_to_speak_timestamp'> };

/**
 * Returns the discovery metadata object for the guild. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint GET `/guilds/{guild.id}/discovery-metadata`
 */
export type GetGuildDiscoveryMetadata = { response: DiscoveryMetadata };

/**
 * Modify the discovery metadata for the guild. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint PATCH `/guilds/{guild.id}/discovery-metadata`
 */
export interface ModifyGuildDiscoveryMetadata {
	body: {
		/**
		 * The ID of the primary discovery category.
		 *
		 * @defaultValue `0`
		 */
		primary_category_id?: Nullable<number>;

		/**
		 * Up to 10 discovery search keywords.
		 *
		 * @defaultValue `null`
		 */
		keywords?: Nullable<Partial<Tuple<string, 10>>>;

		/**
		 * Whether guild info is shown when custom emojis are clicked.
		 *
		 * @defaultValue `true`
		 */
		emoji_discoverability_enabled?: Nullable<boolean>;
	};

	/**
	 * The updated discovery metadata object.
	 */
	response: DiscoveryMetadata;
}

/**
 * Add a discovery subcategory to the guild. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint POST `/guilds/{guild.id}/discovery-categories/{category.id}`
 */
export interface AddGuildDiscoverySubcategory {
	response: {
		/**
		 * The guild ID the subcategory was added to.
		 */
		guild_id: Snowflake;

		/**
		 * The ID of the subcategory added.
		 */
		category_id: number;
	};
}

/**
 * Removes a discovery subcategory from the guild. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint DELETE `/guilds/{guild.id}/discovery-categories/{category.id}`
 */
export type RemoveGuildDiscoverySubcategory = { response: never };

/**
 * Modify the guild's Membership Screening form. Requires the `MANAGE_GUILD` permission.
 *
 * @endpoint PATCH `/guilds/{guild.id}/member-verification`
 */
export interface ModifyMembershipScreening {
	body: {
		/**
		 * Whether Membership Screening is enabled.
		 */
		enabled?: boolean;

		/**
		 * Array of field objects serialized in a string.
		 */
		form_fields?: string;

		/**
		 * The server description to show in the screening form.
		 */
		description?: string;
	};

	/**
	 * The updated Membership Screening object.
	 */
	response: MembershipScreening;
}

// !SECTION
