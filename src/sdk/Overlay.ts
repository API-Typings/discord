import type { Discord } from '../';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/overlay|Overlay}
 */
export interface OverlayManager extends NodeJS.EventEmitter {
	/**
	 * Check whether the user has the overlay enabled or disabled.
	 *
	 * @remarks
	 * If the overlay is disabled, all the functionality in this manager will still work. The calls
	 * will instead focus the Discord client and show the modal there instead.
	 */
	IsEnabled(): boolean;

	/**
	 * Check if the overlay is currently locked or unlocked.
	 */
	IsLocked(): boolean;

	/**
	 * Locks or unlocks input in the overlay. Calling `SetLocked(true);` will also close any modals
	 * in the overlay or in-app from things like IAP purchase flows and disallow input.
	 *
	 * @param locked - Lock or unlock the overlay
	 */
	SetLocked(locked: boolean, callback: (result: Discord.Result) => void): void;

	/**
	 * Opens the overlay modal for sending game invitations to users, channels, and servers.
	 *
	 * @remarks
	 * If you do not have a valid activity with all the required fields, this call will error. See
	 * [Activity Action Field Requirements][1] for the fields required to have join and spectate
	 * invites function properly.
	 *
	 * @param type - What type of invite to send
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/activities#activity-action-field-requirements
	 */
	OpenActivityInvite(type: Discord.ActivityActionType, callback: (result: Discord.Result) => void): void;

	/**
	 * Opens the overlay modal for joining a Discord guild, given its invite code.
	 *
	 * @remarks
	 * An invite code for a server may look something like `minecraft` for a verified server—the
	 * full invite being `discord.gg/minecraft`—or something like `rjEeUJq` for a non-verified
	 * server, the full invite being `discord.gg/rjEeUJq`.
	 *
	 * @param code - An invite code for a guild
	 */
	OpenGuildInvite(code: string, callback: (result: Discord.Result) => void): void;

	/**
	 * Opens the overlay widget for voice settings for the currently connected application.
	 *
	 * @remarks
	 * These settings are unique to each user within the context of your application. That means
	 * that a user can have different favorite voice settings for each of their games.
	 *
	 * Also, when connected to a lobby's voice channel, the overlay will show a widget that allows
	 * users to locally mute, deafen, and adjust the volume of others.
	 */
	OpenVoiceSettings(callback: (result: Discord.Result) => void): void;

	/**
	 * Fires when the overlay is locked or unlocked (a.k.a. opened or closed)
	 *
	 * @param locked - Is the overlay now locked or unlocked
	 */
	on(event: 'Toggle', listener: (locked: boolean) => void): this;
}
