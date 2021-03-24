import type { Nullable } from 'extended-utility-types';
import type { PartialUser, Snowflake } from '../';

/**
 * @source {@link https://discord.com/developers/docs/topics/teams#data-models-team-object|Teams}
 */
export interface Team {
	/**
	 * A hash of the image of the team's icon.
	 */
	icon: Nullable<string>;

	/**
	 * The unique ID of the team.
	 */
	id: Snowflake;

	/**
	 * The unique id of the team.
	 */
	member: TeamMember[];

	/**
	 * The user ID of the current team owner.
	 */
	owner_user_id: Snowflake;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/teams#data-models-team-members-object|Teams}
 */
export interface TeamMember {
	/**
	 * The user's membership state on the team.
	 */
	membership_state: MembershipState;

	/**
	 * Will always be `["*"]`.
	 */
	permissions: ['*'];

	/**
	 * The ID of the parent team of which they are a member.
	 */
	team_id: Snowflake;

	/**
	 * The avatar, discriminator, ID, and username of the user.
	 */
	user: PartialUser;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum|Teams}
 */
export enum MembershipState {
	Invited = 1,
	Accepted
}
