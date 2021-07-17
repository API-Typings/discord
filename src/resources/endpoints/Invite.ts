import type { Invite } from '../../';

/**
 * Returns an invite object for the given code.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/invite#invite-object) `/invites/{invite.code}`
 */
export interface GetInvite {
	query: {
		/**
		 * Whether the invite should contain approximate member counts.
		 */
		with_counts?: boolean;

		/**
		 * Whether the invite should contain the expiration date.
		 */
		with_expiration?: boolean;
	};

	response: Invite;
}

/**
 * Delete an invite. Returns an invite object on success. Fires a Invite Delete Gateway event.
 *
 * Requires the `MANAGE_CHANNELS` permission on the channel this invite belongs to, or
 * `MANAGE_GUILD` to remove any invite across the guild.
 *
 * @remarks
 * This endpoint supports the `X-Audit-Log-Reason` header.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/invite#delete-invite) `/invites/{invite.code}`
 */
export interface DeleteInvite {
	response: Invite;
}
