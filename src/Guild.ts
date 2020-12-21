import { Emoji } from './Message';
import { Presence } from './Activity';
import { Activity, Nullable } from '.';
import { UpdateStatusPayload } from './Gateway';
import { PartialUser, TargetUser, User } from './User';
import { Channel, PermissionOverwrite, PartialChannel } from './Channel';
import { VoiceRegion, Role, VoiceState, BitwisePermission, Member } from './Member';

export interface Guild extends PartialGuild {
	icon: string;
	icon_hash?: Nullable<string>;
	discovery_splash: Nullable<string>;
	owner?: boolean;
	owner_id: string;
	permissions?: string;
	region: VoiceRegion;
	afk_channel_id: Nullable<string>;
	afk_timeout: number;
	wdiget_enabled?: boolean;
	widget_channel_id?: Nullable<string>;
	verification_level: VerificationLevel;
	default_message_notifications: MessageNotificationLevel;
	explicit_content_filter: ExplicitContentFilterLevel;
	roles: Role[];
	emojis: Emoji[];
	features: Features[];
	mfa_level: MFALevel;
	application_id: Nullable<string>;
	system_channel_id: Nullable<string>;
	system_channel_flags: SystemChannelFlags;
	rules_channel_id: Nullable<string>;
	joined_at?: Nullable<string>;
	large?: boolean;
	unavailable?: boolean;
	member_count?: number;
	voice_states?: Omit<VoiceState, 'guild_id'>[];
	members?: Member[];
	channels?: Channel[];
	presences?: Partial<Presence>[];
	max_presences?: Nullable<number>;
	max_members?: number;
	vanity_url_code: Nullable<string>;
	description: Nullable<string>;
	banner?: Nullable<string>;
	premium_tier: PremiumTier;
	premium_subscription_count?: number;
	preferred_locale: string;
	public_updates_channel_id: Nullable<string>;
	max_video_channel_users?: number;
	approximate_member_count?: number;
	approximate_presence_count?: number;
}

export interface GuildBan {
	reason: Nullable<string>;
	user: User;
}

export interface GuildPreview {
	id: string;
	name: string;
	icon: Nullable<string>;
	splash: Nullable<string>;
	discovery_splash: Nullable<string>;
	emojis: Emoji[];
	features: Features[];
	approximate_member_count: number;
	approximate_presence_count: number;
	description: Nullable<string>;
}

export interface Integration {
	id: string;
	name: string;
	type: string;
	enabled: boolean;
	syncing: boolean;
	role_id: string;
	enable_emoticons?: boolean;
	expire_behavior: IntegrationExpireBehavior;
	expire_grace_period: number;
	user?: User;
	account: IntegrationAccount;
	synced_at: string;
	subscriber_count: number;
	revoked: boolean;
	application?: IntegrationApplication;
}

export interface IntegrationAccount {
	id: string;
	name: string;
}

export interface IntegrationApplication {
	id: string;
	name: string;
	icon: Nullable<string>;
	description: string;
	summary: string;
	bot?: User;
}

export interface Invite {
	code: string;
	guild?: PartialGuild;
	channel: PartialChannel;
	inviter?: User;
	target_user?: PartialUser;
	target_user_type?: TargetUser;
	approximate_presence_count?: number;
	approximate_member_count?: number;
}

export interface InviteMetadata extends Invite {
	uses: number;
	max_uses: number;
	max_age: number;
	temporary: boolean;
	created_at: string;
}

export interface PartialGuild {
	id: string;
	name: Nullable<string>;
	splash: Nullable<string>;
	banner?: Nullable<string>;
	description?: Nullable<string>;
	features?: Features[];
	verification_level?: VerificationLevel;
	vanity_url_code?: Nullable<string>;
	unavailable?: boolean;
}

export interface Prune {
	pruned: number;
}

export interface Template {
	code: string;
	name: string;
	description: Nullable<string>;
	usage_count: number;
	creator_id: string;
	creator: User;
	created_at: string;
	updated_at: string;
	source_guild_id: string;
	serialized_source_guild: PartialGuild;
	is_dirty: Nullable<boolean>;
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
	status: UpdateStatusPayload;
	activity?: Pick<Activity, 'name'>;
	avatar_url: string;
}

export interface WidgetSettings {
	enabled: boolean;
	channel_id?: string;
}

export enum ExplicitContentFilterLevel {
	Disabled,
	MembersWithoutRoles,
	AllMembers
}

export enum IntegrationExpireBehavior {
	RemoveRole,
	Kick
}

export enum MessageNotificationLevel {
	AllMessages,
	OnlyMentions
}

export enum MFALevel {
	None,
	Elevated
}

export enum PremiumTier {
	None,
	Tier1,
	Tier2,
	Tier3
}

export enum SystemChannelFlags {
	SuppressJoinNotifications = 1 << 0,
	SuppressPremiumSubscriptions = 1 << 1
}

export enum VerificationLevel {
	None,
	Low,
	Medium,
	High,
	VeryHigh
}

export type Features =
	| 'INVITE_SPLASH'
	| 'VIP_REGIONS'
	| 'VANITY_URL'
	| 'VERIFIED'
	| 'PARTNERED'
	| 'COMMUNITY'
	| 'COMMERCE'
	| 'NEWS'
	| 'DISCOVERABLE'
	| 'FEATURABLE'
	| 'ANIMATED_ICON'
	| 'BANNER'
	| 'WELCOME_SCREEN_ENABLED';

export type Permission = keyof typeof BitwisePermission;

export type PartialIntegration = Pick<Integration, 'id' | 'name' | 'type' | 'account'>;

export type PartialInvite = Pick<InviteMetadata, 'code' | 'uses'>;

export type PartialRole = Pick<Role, 'name' | 'id'>;

export type UnavailableGuild = Pick<Guild, 'id' | 'unavailable'>;

export type WidgetStyle = 'shield' | 'banner1' | 'banner2' | 'banner3' | 'banner4';

// - ========= - //
// - ENDPOINTS - //
// - ========= - //

export interface PostCreateGuild {
	name: string;
	region?: string;
	icon?: string;
	verification_level?: number;
	default_message_notifications?: number;
	explicit_content_filter?: number;
	roles?: Role[];
	channels?: PartialChannel;
	afk_channel_id?: string;
	afk_timeout?: number;
	system_channel_id?: string;
}

export interface GetGuild {
	with_counts?: boolean;
}

export interface PatchModifyGuild {
	name: string;
	region: Nullable<string>;
	verification_level: Nullable<number>;
	default_message_notifications: Nullable<number>;
	explicit_content_filter: Nullable<number>;
	icon: Nullable<string>;
	owner_id: string;
	splash: Nullable<string>;
	banner: Nullable<string>;
	system_channel_id: Nullable<string>;
	rules_channel_id: Nullable<string>;
	public_updates_channel_id: Nullable<string>;
	preferred_locale: Nullable<string>;
}

export interface PostCreateChannel {
	name: string;
	type?: number;
	topic?: string;
	bitrate?: number;
	user_limit?: number;
	rate_limit_per_user?: number;
	position?: number;
	permission_overwrites?: PermissionOverwrite[];
	parent_id?: string;
	nsfw?: boolean;
}

export interface PatchModifyChannelPositions {
	id: string;
	position: Nullable<number>;
}

export interface PatchModifyCurrentUserNick {
	nick?: Nullable<string>;
}

export interface PostCreateBan {
	delete_messages_days?: number;
	reason?: string;
}

export interface PostCreateRole {
	name?: string;
	permissions?: string;
	color?: number;
	hoist?: boolean;
	mentionable?: boolean;
}

export interface PatchModifyRolePositions {
	id: string;
	position?: Nullable<number>;
}

export interface PatchModifyRole {
	name?: Nullable<string>;
	permissions?: Nullable<string>;
	color?: Nullable<number>;
	hoist?: Nullable<boolean>;
	mentionable?: Nullable<boolean>;
}

export interface GetPruneCount {
	days: number;
	include_roles?: string[];
}

export interface PostBeginPrune {
	days: number;
	compute_prune_count: boolean;
	include_roles?: string[];
}

export interface PostCreateIntegration {
	type: string;
	id: string;
}

export interface PatchEditIntegration {
	expire_behavior?: number;
	expire_grace_period?: number;
	enable_emoticons?: boolean;
}

export interface GetWidgetImage {
	style?: WidgetStyle;
}

export interface GetGuildInvite {
	with_counts?: boolean;
}

export interface PostCreateGuildFromTemplate {
	name: string;
	icon?: string;
}

export interface PostCreateTemplate {
	name: string;
	description?: Nullable<string>;
}

export interface PatchModifyTemplate {
	name?: string;
	description?: Nullable<string>;
}
