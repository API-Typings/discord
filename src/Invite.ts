import { PartialChannel, PartialGuild, PartialUser, User } from './';

/**
 * Represents a code that when used, adds a user to a guild or group DM channel
 *
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-structure Invite}
 */
export interface Invite {
	/**
	 * The invite code (unique ID)
	 */
	code: string;

	/**
	 * The guild this invite is for
	 */
	guild?: PartialGuild;

	/**
	 * The channel this invite is for
	 */
	channel: PartialChannel;

	/**
	 * The user who created the invite
	 */
	inviter?: User;

	/**
	 * The target user for this invite
	 */
	target_user?: PartialUser;

	/**
	 * The {@link https://discord.com/developers/docs/resources/invite#invite-object-target-user-types type of user target} for this invite
	 */
	target_user_type?: TargetUser;

	/**
	 * Approximate count of online members (only present when `target_user` is set)
	 */
	approximate_presence_count?: number;

	/**
	 * Approximate count of total members
	 */
	approximate_member_count?: number;
}

/**
 * Extra information about an invite
 *
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-metadata-object-invite-metadata-structure Invite}
 */
export interface InviteMetadata extends Invite {
	/**
	 * Number of times this invite has been used
	 */
	uses: number;

	/**
	 * Max number of times this invite can be used
	 */
	max_uses: number;

	/**
	 * Duration (in seconds) after which the invite expires
	 */
	max_age: number;

	/**
	 * Whether this invite only grants temporary membership
	 */
	temporary: boolean;

	/**
	 * When this invite was created
	 */
	created_at: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-object-target-user-types Invite}
 */
export enum TargetUser {
	Stream = 1
}

export type PartialInvite = Pick<InviteMetadata, 'code' | 'uses'>;

// SECTION Endpoints

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/invite#get-invite) `/invites/{invite.code}`
 *
 * @returns An {@link https://discord.com/developers/docs/resources/invite#invite-object invite} object for the given code
 */
export interface GetInvite {
	/**
	 * Whether the invite should contain approximate member counts
	 */
	with_counts?: boolean;
}

// !SECTION
