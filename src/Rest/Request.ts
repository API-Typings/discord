import { Embed } from '../Embed';
import { Role } from '../Member';
import { Nullable, WidgetStyle } from '..';
import { AuditLogEvent } from '../AuditLog';
import { AllowedMentions } from '../Message';
import { Overwrite, PartialChannel } from '../Channel';

export interface AddGroupDMRecipientReq {
	access_token: string;
	nick: string;
}

export interface AddMemberReq {
	access_token: string;
	nick?: string;
	roles?: string[];
	mute?: boolean;
	deaf?: boolean;
}

export interface BulkDeleteMessagesReq {
	messages: string[];
}

export interface CreateBanReq {
	delete_messages_days?: number;
	reason?: string;
}

export interface CreateChannelInviteReq {
	max_age: number;
	max_uses: number;
	temporary: boolean;
	unique: boolean;
	target_user?: string;
	target_user_type?: number;
}

export interface CreateChannelReq {
	name: string;
	type?: number;
	topic?: string;
	bitrate?: number;
	user_limit?: number;
	rate_limit_per_user?: number;
	position?: number;
	permission_overwrites?: Overwrite[];
	parent_id?: string;
	nsfw?: boolean;
}

export interface CreateDMReq {
	recipient_id: string;
}

export interface CreateEmojiReq {
	name: string;
	image: string;
	roles: string[];
}

export interface CreateGuildReq {
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

export interface CreateIntegrationReq {
	type: string;
	id: string;
}

export interface CreateMessageReq {
	content?: string;
	nonce?: number | string;
	tts?: boolean;
	file?: unknown;
	embed?: Embed;
	payload_json?: string;
	allowed_mentions?: AllowedMentions;
}

export interface CreateRoleReq {
	name?: string;
	permissions?: string;
	color?: number;
	hoist?: boolean;
	mentionable?: boolean;
}

export interface CreateTemplateReq {
	name: string;
	description?: Nullable<string>;
}

export interface CreateTemplatedGuildReq {
	name: string;
	icon?: string;
}

export interface CreateWebhookReq {
	name: string;
	avatar: Nullable<string>;
}

export interface EditChannelPermissionsReq {
	allow?: string;
	deny?: string;
	type?: number;
}

export interface EditChannelPositionsReq {
	id: string;
	position: Nullable<number>;
}

export interface EditChannelReq {
	name?: string;
	type?: number;
	position?: Nullable<number>;
	topic?: Nullable<string>;
	nsfw?: Nullable<boolean>;
	rate_limit_per_user?: Nullable<number>;
	bitrate?: Nullable<number>;
	user_limit?: Nullable<number>;
	permission_overwrites?: Nullable<Overwrite[]>;
	parent_id?: Nullable<string>;
}

export interface EditCurrentUserNickReq {
	nick?: Nullable<string>;
}

export interface EditCurrentUserReq {
	username?: string;
	avatar?: Nullable<string>;
}

export interface EditEmojiReq {
	name: string;
	roles: Nullable<string[]>;
}

export interface EditGuildReq {
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

export interface EditIntegrationReq {
	expire_behavior?: number;
	expire_grace_period?: number;
	enable_emoticons?: boolean;
}

export interface EditMemberReq {
	nick?: Nullable<string>;
	roles?: Nullable<string[]>;
	mute?: Nullable<boolean>;
	deaf?: Nullable<boolean>;
	channel_id?: Nullable<string>;
}

export interface EditMessageReq {
	content?: string;
	embed?: Embed;
	flags?: number;
}

export interface EditRolePositionsReq {
	id: string;
	position?: Nullable<number>;
}

export interface EditTemplateReq {
	name?: string;
	description?: Nullable<string>;
}

export interface EditWebhookReq {
	name?: string;
	avatar?: Nullable<string>;
	channel_id?: Nullable<string>;
}

export interface ExecuteWebhookReq {
	wait?: boolean;
	content: string;
	username?: string;
	avatar_url?: string;
	tts?: boolean;
	file: unknown;
	embeds: Embed[];
	payload_json?: string;
	allowed_mentions?: AllowedMentions;
}

export interface FollowNewsChannelReq {
	webhook_channel_id: string;
}

export interface GetAuditLogReq {
	user_id?: string;
	action_type?: AuditLogEvent;
	before?: string;
	limit?: number;
}

export interface GetCurrentUserGuildsReq {
	before?: string;
	after?: string;
	limit?: number;
}

export interface GetGuildReq {
	with_counts?: boolean;
}

export interface GetIntegrationsReq {
	include_applications?: boolean;
}

export interface GetInviteReq {
	with_counts?: boolean;
}

export interface GetMembersReq {
	limit?: number;
	after?: string;
}

export interface GetMessagesReq {
	around?: string;
	before?: string;
	after?: string;
	limit?: number;
}

export interface GetPruneCountReq {
	days: number;
	include_roles?: string[];
}

export interface GetReactionsReq {
	before?: string;
	after?: string;
	limit?: number;
}

export interface GetWidgetImageReq {
	style?: WidgetStyle;
}

export interface GuildPruneReq {
	days: number;
	compute_prune_count: boolean;
	include_roles?: string[];
}

export type EditRoleReq = CreateRoleReq;

export type EditTokenatedWebhookReq = Omit<EditWebhookReq, 'channel_id'>;

export type ExecuteGithubWebhookReq = Pick<ExecuteWebhookReq, 'wait'>;

export type ExecuteSlackWebhookReq = Pick<ExecuteWebhookReq, 'wait'>;
