import { Nullable } from '..';
import { BasePayload, OPCodes } from '.';
import { Activity, StatusType } from '../Activity';

interface Command<O extends OPCodes, P = unknown> extends Omit<BasePayload, 't' | 's'> {
	op: O;
	d: P;
}

export interface ConnectionProperties {
	$os: string;
	$browser: string;
	$device: string;
}

export interface IdentifyPayload {
	token: string;
	properties: ConnectionProperties;
	compress?: boolean;
	large_threshold?: number;
	shard?: [number, number];
	presence?: UpdateStatusPayload;
	intents: number;
}

export interface RequestMembersPayload {
	guild_id: string | string[];
	query?: string;
	limit: number;
	presences?: boolean;
	user_ids?: string | string[];
	nonce?: string;
}

export interface ResumePayload {
	token: string;
	session_id: string;
	seq: number;
}

export interface UpdateStatusPayload {
	since: Nullable<number>;
	activities: Nullable<Activity[]>;
	status: StatusType | 'invisible';
	afk: boolean;
}

export interface UpdateVoicePayload {
	guild_id: string;
	channel_id: Nullable<string>;
	self_mute: boolean;
	self_deaf: boolean;
}

export type Heartbeat = Command<OPCodes.Heartbeat, Nullable<number>>;

export type Identify = Command<OPCodes.Identify, IdentifyPayload>;

export type RequestMembers = Command<OPCodes.RequestGuildMembers, RequestMembersPayload>;

export type Resume = Command<OPCodes.Resume, ResumePayload>;

export type UpdateStatus = Command<OPCodes.StatusUpdate, UpdateStatusPayload>;

export type UpdateVoice = Command<OPCodes.VoiceStateUpdate, UpdateVoicePayload>;
