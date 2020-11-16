import { Nullable } from '..';
import { BasePayload, OPCodes } from '.';
import { Activity, StatusType } from '../Activity';

interface Command<O extends OPCodes, D = unknown> extends Omit<BasePayload, 't' | 's'> {
	op: O;
	d: D;
}

export interface ConnectionProperties {
	$os: string;
	$browser: string;
	$device: string;
}

export interface IdentifyData {
	token: string;
	properties: ConnectionProperties;
	compress?: boolean;
	large_threshold?: number;
	shard?: [number, number];
	presence?: UpdateStatusData;
	intents: number;
}

export interface RequestMembersData {
	guild_id: string | string[];
	query?: string;
	limit: number;
	presences?: boolean;
	user_ids?: string | string[];
	nonce?: string;
}

export interface ResumeData {
	token: string;
	session_id: string;
	seq: number;
}

export interface UpdateStatusData {
	since: Nullable<number>;
	activities: Nullable<Activity[]>;
	status: StatusType | 'invisible';
	afk: boolean;
}

export interface UpdateVoiceData {
	guild_id: string;
	channel_id: Nullable<string>;
	self_mute: boolean;
	self_deaf: boolean;
}

export type Heartbeat = Command<OPCodes.Heartbeat, Nullable<number>>;

export type Identify = Command<OPCodes.Identify, IdentifyData>;

export type RequestMembers = Command<OPCodes.RequestGuildMembers, RequestMembersData>;

export type Resume = Command<OPCodes.Resume, ResumeData>;

export type UpdateStatus = Command<OPCodes.StatusUpdate, UpdateStatusData>;

export type UpdateVoice = Command<OPCodes.VoiceStateUpdate, UpdateVoiceData>;
