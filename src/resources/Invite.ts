import type { Nullable } from 'extended-utility-types';
import type { PartialApplication, PartialChannel, PartialGuild, User } from '../';

// ANCHOR Partial Invite

/**
 * @source {@link https://discord.com/developers/docs/resources/guild#get-guild-vanity-url-example-partial-invite-object|Guild}
 */
export interface PartialInvite {
	/**
	 * The invite code (unique ID).
	 */
	code: string;

	/**
	 * Number of times this invite has been used.
	 */
	uses: number;
}

// ANCHOR Invite

/**
 * Represents a code that when used, adds a user to a guild or group DM channel.
 *
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-structure|Invite}
 */
export interface Invite extends Pick<PartialInvite, 'code'> {
	/**
	 * The guild this invite is for.
	 */
	guild?: PartialGuild;

	/**
	 * The channel this invite is for.
	 */
	channel: PartialChannel;

	/**
	 * The user who created the invite.
	 */
	inviter?: User;

	/**
	 * The type of target for this voice channel invite.
	 */
	target_type?: InviteTargetType;

	/**
	 * The user whose stream to display for this voice channel stream invite.
	 */
	target_user?: User;

	/**
	 * The embedded application to open for this voice channel embedded application invite.
	 */
	target_application?: PartialApplication;

	/**
	 * Approximate count of online members, returned from the `GET /invites/<code>` endpoint when
	 * `with_counts` is `true`
	 */
	approximate_presence_count?: number;

	/**
	 * Approximate count of total members, returned from the `GET /invites/<code>` endpoint when
	 * `with_counts` is `true`.
	 */
	approximate_member_count?: number;

	/**
	 * The expiration date of this invite, returned from the `GET /invites/<code>` endpoint when
	 * `with_expiration` is `true`.
	 */
	expires_at?: Nullable<string>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-object-invite-target-typs|Invite}
 */
export enum InviteTargetType {
	Stream = 1,
	EmbeddedApplication
}

/**
 * Extra information about an invite.
 *
 * @source {@link https://discord.com/developers/docs/resources/invite#invite-metadata-object-invite-metadata-structure|Invite}
 */
export interface InviteMetadata extends Invite, Pick<PartialInvite, 'uses'> {
	/**
	 * Max number of times this invite can be used.
	 */
	max_uses: number;

	/**
	 * Duration (in seconds) after which the invite expires.
	 */
	max_age: number;

	/**
	 * Whether this invite only grants temporary membership.
	 */
	temporary: boolean;

	/**
	 * When this invite was created.
	 */
	created_at: string;
}

// SECTION Endpoints

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
 * Delete an invite. Requires the `MANAGE_CHANNELS` permission on the channel this invite belongs
 * to, or `MANAGE_GUILD` to remove any invite across the guild.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/invite#delete-invite) `/invites/{invite.code}`
 */
export type DeleteInvite = { response: Invite };

// !SECTION
