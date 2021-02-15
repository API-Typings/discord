import type { RangeOf } from '@api-typings/core';
import type { Discord } from '../';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/discord-voice#data-models-inputmodetype-enum|Discord Voice}
 */
export enum InputModeType {
	VoiceActivity,
	PushToTalk
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/discord-voice#data-models-inputmode-struct|Discord Voice}
 */
export interface InputMode {
	/**
	 * Set either VAD or PTT as the voice input mode
	 */
	Type: InputModeType;

	/**
	 * The PTT hotkey for the user
	 */
	Shortcut: string;
}

/**
 * Keys can be mapped as a combination by adding a "+" between values, such as `"shift + 4"` or
 * `"ctrl + v"`.
 *
 * @source {@link https://discord.com/developers/docs/game-sdk/discord-voice#data-models-shortcut-keys|Discord Voice}
 */
export enum ShortcutKey {
	Enter = 'enter',
	Tab = 'tab',
	Spacebar = 'space',
	Backspace = 'backspace',
	Escape = 'esc',
	Meta = 'meta',
	Shift = 'shift',
	CapsLock = 'caps lock',
	Alt = 'alt',
	Control = 'ctrl',
	RightShift = 'right shift',
	RightAlt = 'right alt',
	RightControl = 'right ctrl',
	RightMeta = 'right meta',
	PageUp = 'page up',
	PageDown = 'page down',
	ScrollLock = 'scroll lock',
	PrintScreen = 'print screen',
	Rewind = 'rewind',
	Play = 'play',
	FastForward = 'fast forward',
	Delete = 'del',
	End = 'end',
	Insert = 'insert',
	Break = 'break',
	Home = 'home',
	UpArrow = 'up',
	DownArrow = 'down',
	LeftArrow = 'left',
	RightArrow = 'right'
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/discord-voice|Discord Voice}
 */
export interface VoiceManager {
	/**
	 * Get the current voice input mode for the user.
	 */
	GetInputMode(): Discord.InputMode;

	/**
	 * Sets a new voice input for the user.
	 *
	 * @param inputMode - The new input mode for the user
	 */
	SetInputMode(inputMode: InputMode, callback: (result: Discord.Result) => void): void;

	/**
	 * Whether the connected user is currently muted.
	 */
	IsSelfMute(): boolean;

	/**
	 * Mutes or unmutes the currently connected user.
	 *
	 * @param mute - `true` for mute, `false` for unmute
	 */
	SetSelfMute(mute: boolean): void;

	/**
	 * Whether the connected user is currently deafened.
	 */
	IsSelfDeaf(): boolean;

	/**
	 * Deafens or undefeans the currently connected user.
	 *
	 * @param deaf - `true` for deafen, `false` for undeafen
	 */
	SetSelfDeaf(deaf: boolean): void;

	/**
	 * Whether the given user is currently muted by the connected user.
	 *
	 * @param userId - The ID of the user to check
	 */
	IsLocalMute(userId: bigint): boolean;

	/**
	 * Mutes or unmutes the given user for the currently connected user.
	 *
	 * @param userId - The ID of the user to mute
	 * @param mute - `true` for mute, `false` for unmute
	 */
	SetLocalMute(userId: bigint, mute: boolean): void;

	/**
	 * Gets the local volume for a given user. This is the volume level at which the currently
	 * connected users hears the given user speak.
	 *
	 * @param userId - The ID of the user to check
	 */
	GetLocalVolume(userId: bigint): number;

	/**
	 * Sets the local volume for a given user. This is the volume level at which the currently
	 * connected users hears the given user speak.
	 *
	 * @remarks
	 * Valid volume values are from `0` to `200`, with `100` being the default. Lower than `100`
	 * will be a reduced volume level from default, whereas over `100` will be a boosted volume
	 * level from default.
	 *
	 * @param userId - The ID of the user to change
	 * @param volume - The volume at which to set the user, `0` to `200`
	 */
	SetLocalVolume(userId: bigint, volume: RangeOf<0, 200>): void;
}
