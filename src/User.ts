import { Nullable } from '.';
import { PartialIntegration } from './Guild';

export interface Connection {
	id: string;
	name: string;
	type: string;
	revoked?: boolean;
	integrations?: PartialIntegration[];
	verified: boolean;
	friend_sync: boolean;
	show_activity: boolean;
	visibility: VisibilityType;
}

export interface User {
	id: string;
	username: string;
	discriminator: string;
	avatar: string | null;
	bot?: boolean;
	system?: boolean;
	mfa_enabled?: boolean;
	locale?: string;
	verified?: boolean;
	email?: string | null;
	flags?: UserFlags;
	premium_type?: PremiumType;
	public_flags?: UserFlags;
}

export enum PremiumType {
	None,
	NitroClassic,
	Nitro
}

export enum TargetUser {
	Stream
}

export enum UserFlags {
	None,
	DiscordEmployee = 1 << 0,
	PartneredServerOwner = 1 << 1,
	HypesquadEvents = 1 << 2,
	BugHunterLevel1 = 1 << 3,
	HouseBravery = 1 << 6,
	HouseBrilliance = 1 << 7,
	HouseBalance = 1 << 8,
	EarlySupporter = 1 << 9,
	TeamUser = 1 << 10,
	System = 1 << 12,
	BugHunterLevel2 = 1 << 14,
	VerifiedBot = 1 << 16,
	EarlyVerifiedBotDeveloper = 1 << 17
}

export enum VisibilityType {
	None,
	Everyone
}

export type PartialUser = Pick<User, 'id' | 'username' | 'avatar' | 'discriminator'>;

// - ========= - //
// - ENDPOINTS - //
// - ========= - //

export interface PatchModifyCurrentUser {
	username?: string;
	avatar?: Nullable<string>;
}

export interface GetCurrentUserGuilds {
	before?: string;
	after?: string;
	limit?: number;
}

export interface PostCreateDM {
	recipient_id: string;
}

export interface PostCreateGroupDM {
	access_tokens: string[];
	nicks: { [id: string]: string };
}
