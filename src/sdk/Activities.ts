import type { Discord } from '../';
import type { User } from './Users';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/activities#data-models-activity-struct|Activities}
 */
export interface Activity {
	/**
	 * Your application ID.
	 *
	 * @readonly
	 */
	readonly ApplicationId: bigint;

	/**
	 * Name of the application.
	 *
	 * @readonly
	 */
	readonly Name: string;

	/**
	 * The player's current party status.
	 */
	State: string;

	/**
	 * What the player is currently doing.
	 */
	Details: string;

	/**
	 * Helps create elapsed/remaining timestamps on a player's profile.
	 */
	Timestamps: ActivityTimestamps;

	/**
	 * Assets to display on the player's profile.
	 */
	Assets: ActivityAssets;

	/**
	 * Information about the player's party.
	 */
	Party: ActivityParty;

	/**
	 * Secret passwords for joining and spectating the player's game.
	 */
	Secrets: ActivitySecrets;

	/**
	 * Whether this activity is an instanced context, like a match.
	 */
	Instance: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/activities#data-models-activitytimestamps-struct|Activities}
 */
export interface ActivityTimestamps {
	/**
	 * Unix timestamp–send this to have an "elapsed" timer.
	 */
	Start: bigint;

	/**
	 * Unix timestamp–send this to have a "remaining" timer.
	 */
	End: bigint;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/activities#data-models-activityassets-struct|Activities}
 */
export interface ActivityAssets {
	/**
	 * Keyname of an asset to display.
	 */
	LargeImage: string;

	/**
	 * Hover text for the large image.
	 */
	LargeText: string;

	/**
	 * Keyname of an asset to display.
	 */
	SmallImage: string;

	/**
	 * Hover text for the large image.
	 */
	SmallText: string;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/activities#data-models-activityparty-struct|Activities}
 */
export interface ActivityParty {
	/**
	 * A unique identifier for this party.
	 */
	Id: string;

	/**
	 * Info about the size of the party.
	 */
	Size: PartySize;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/activities#data-models-partysize-struct|Activities}
 */
export interface PartySize {
	/**
	 * The current size of the party.
	 */
	CurrentSize: number;

	/**
	 * The max possible size of the party.
	 */
	MaxSize: number;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/activities#data-models-activitysecrets-struct|Activities}
 */
export interface ActivitySecrets {
	/**
	 * Unique hash for the given match context.
	 */
	Match: string;

	/**
	 * Unique hash for chat invites and Ask to Join.
	 */
	Join: string;

	/**
	 * Unique hash for Spectate button.
	 */
	Spectate: string;
}

/**
 * `ActivityType` is strictly for the purpose of handling events that you receive from Discord;
 * though the SDK/our API will not reject a payload with an `ActivityType` sent, it will be
 * discarded and will not change anything in the client.
 *
 * @source {@link https://discord.com/developers/docs/game-sdk/activities#data-models-activitytype-enum|Activities}
 */
export enum ActivityType {
	Playing,
	Streaming,
	Listening,
	Watching,
	Custom,
	Competing
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/activities#data-models-activityjoinrequestreply-enum|Activities}
 */
export enum ActivityJoinRequestReply {
	No,
	Yes,
	Ignore
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/activities#data-models-activityactiontype-enum|Activities}
 */
export enum ActivityActionType {
	Join = 1,
	Spectate
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/activities|Activities}
 */
export interface ActivityManager extends NodeJS.EventEmitter {
	/**
	 * Registers a command by which Discord can launch your game. This might be a custom protocol,
	 * like `my-awesome-game://`, or a path to an executable. It also supports any launch parameters
	 * that may be needed, like `game.exe --full-screen`.
	 *
	 * @remarks
	 * On macOS, due to the way Discord registers executables, your game needs to be bundled for
	 * this command to work. That means it should be a `.app`.
	 *
	 * @param command - The command to register
	 */
	RegisterCommand(command: string): void;

	/**
	 * Used if you are distributing this SDK on Steam. Registers your game's Steam app ID for the
	 * protocol `steam://run-game-id/<id>`.
	 *
	 * @param steamId - Your game's Steam app ID
	 */
	RegisterSteam(steamId: number): void;

	/**
	 * Sets a user's presence in Discord to a new activity. This has a rate limit of 5 updates per
	 * 20 seconds.
	 *
	 * @remarks
	 * It is possible for users to hide their presence on Discord (User Settings -\> Game Activity).
	 * Presence set through this SDK may not be visible when this setting is toggled off.
	 *
	 * @param activity - The new activity for the user
	 */
	UpdateActivity(activity: Activity, callback: (result: Discord.Result) => void): void;

	/**
	 * Clear's a user's presence in Discord to make it show nothing.
	 */
	ClearActivity(callback: (result: Discord.Result) => void): void;

	/**
	 * Sends a reply to an Ask to Join request.
	 *
	 * @param userId - The user ID of the person who asked to join
	 * @param reply - No, Yes, or Ignore
	 */
	SendRequestReply(userId: bigint, reply: ActivityJoinRequestReply, callback: (result: Discord.Result) => void): void;

	/**
	 * Sends a game invite to a given user.
	 *
	 * @remarks
	 * If you do not have a valid activity with all the required fields, this call will error. See
	 * Activity Action Field Requirements for the fields required to have join and spectate
	 * invites function properly.
	 *
	 * @param userId - The ID of the user to invite
	 * @param type - Marks the invite as an invitation to join or spectate
	 * @param content - A message to send along with the invite
	 */
	/* prettier-ignore */
	/* eslint-disable-next-line */
	SendInvite(userId: bigint, type: ActivityActionType, content: string, callback: (result: Discord.Result) => void): void

	/**
	 * Accepts a game invitation from a given `userId`.
	 *
	 * @param userId - The ID of the user who invited you
	 */
	AcceptInvite(userId: bigint, callback: (result: Discord.Result) => void): void;

	/**
	 * Fires when a user accepts a game chat invite or receives confirmation from Asking to Join.
	 *
	 * @param joinSecret - The secret to join the user's game
	 */
	on(event: 'ActivityJoin', listener: (joinSecret: string) => void): this;

	/**
	 * Fires when a user accepts a spectate chat invite or clicks the Spectate button on a user's
	 * profile.
	 *
	 * @param spectateSecret - The secret to join the user's game as a spectator
	 */
	on(event: 'ActivitySpectate', listener: (spectateSecret: string) => void): this;

	/**
	 * Fires when a user asks to join the current user's game.
	 *
	 * @param user - The user asking to join
	 */
	on(event: 'ActivityJoinRequest', listener: (user: User) => void): this;

	/**
	 * Fires when the user receives a join or spectate invite.
	 *
	 * @param type - Whether this invite is to join or spectate
	 * @param user - The user sending the invite
	 * @param activity - The inviting user's current activity
	 */
	on(event: 'ActivityInvite', listener: (type: ActivityActionType, user: User, activity: Activity) => void): this;
}
