import { User, Nullable, Embed, AllowedMentions } from '.';

export interface Webhook {
	id: string;
	type: WebhookType;
	guild_id?: string;
	channel_id: string;
	user?: User;
	name: Nullable<string>;
	avatar: Nullable<string>;
	token?: string;
	application_id: Nullable<string>;
}

export enum WebhookType {
	Incoming = 1,
	ChannelFollower
}

// - ========= - //
// - ENDPOINTS - //
// - ========= - //

export interface PostCreateWebhook {
	name: string;
	avatar: Nullable<string>;
}

export interface PatchModifyWebhook {
	name?: string;
	avatar?: Nullable<string>;
	channel_id?: Nullable<string>;
}

export type PatchModifyWebhookWithToken = Omit<PatchModifyWebhook, 'channel_id'>;

export interface PostExecuteWebhook {
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

export type PostExecuteSlackWebhook = Pick<PostExecuteWebhook, 'wait'>;

export type PostExecuteGitHubWebhook = Pick<PostExecuteWebhook, 'wait'>;

export interface PatchEditWebhookMessage {
	content?: Nullable<string>;
	embeds?: Nullable<Embed[]>;
	allowed_mentions?: Nullable<AllowedMentions>;
}
