import { Nullable } from '.';
import { User } from './User';

export interface Activity {
	id?: string;
	name: string;
	type: ActivityType;
	url?: Nullable<string>;
	created_at: number;
	timestamps?: ActivityTimestamp;
	sync_id?: string;
	platform?: string;
	application_id?: string;
	details?: Nullable<string>;
	state?: Nullable<string>;
	emoji?: Nullable<ActivityEmoji>;
	session_id?: string;
	party?: ActivityParty;
	assets?: ActivityAssets;
	secrets?: ActivitySecrets;
	instance?: boolean;
	flags?: ActivityFlags;
}

export interface ActivityAssets {
	large_image?: string;
	large_text?: string;
	small_image?: string;
	small_text?: string;
}

export interface ActivityEmoji {
	name: string;
	id?: string;
	animated?: boolean;
}

export interface ActivityParty {
	id?: string;
	size?: [number, number];
}

export interface ActivitySecrets {
	join?: string;
	spectate?: string;
	match?: string;
}

export interface ActivityTimestamp {
	start?: number;
	end?: number;
}

export interface ClientStatus {
	desktop?: ClientStatusType;
	mobile?: ClientStatusType;
	web?: ClientStatusType;
}

export interface Presence {
	user: User;
	guild_id: string;
	status: StatusType;
	activities: Activity[];
	client_status: ClientStatus;
}

export enum ActivityFlags {
	Instance = 1 << 0,
	Join = 1 << 1,
	Spectate = 1 << 2,
	JoinRequest = 1 << 3,
	Sync = 1 << 4,
	Play = 1 << 5
}

export enum ActivityType {
	Game,
	Streaming,
	Listening,
	Custom,
	Competing
}

export type ClientStatusType = Omit<StatusType, 'offline'>;

export type StatusType = 'idle' | 'dnd' | 'online' | 'offline';
