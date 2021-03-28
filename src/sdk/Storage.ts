import type { Discord } from '../';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/storage#data-models-filestat-struct|Storage}
 */
export interface FileStat {
	/**
	 * The name of the file.
	 */
	Filename: string;

	/**
	 * The size of the file.
	 */
	Size: bigint;

	/**
	 * Timestamp of when the file was last modified.
	 */
	LastModified: bigint;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/storage|Storage}
 */
export interface StorageManager {
	/**
	 * Returns the filepath to which Discord saves files if you were to use the SDK's storage
	 * manager (value from environment variable `DISCORD_STORAGE_PATH`).
	 *
	 * @remarks
	 * Discord has branch-specific, user-specific saves, so you will never overwrite others' save
	 * files. If your game already has save file writing logic, you can use this method to get that
	 * user-specific path and help users protect their save files.
	 */
	GetPath(): string;

	/**
	 * Reads data synchronously from the game's allocated save file into a buffer. The file is
	 * mapped by key value pairs, and this function will read data that exists for the given key
	 * name.
	 *
	 * @param name - The key name to read from the file
	 * @param data - The buffer to read into
	 */
	Read(name: string, data: number): number;

	/**
	 * Reads data asynchronously from the game's allocated save file into a buffer.
	 *
	 * @param name - The key name to read from the file
	 */
	ReadAsync(name: string, callback: (result: Discord.Result, data: number) => void): void;

	/**
	 * Reads data asynchronously from the game's allocated save file into a buffer, starting at a
	 * given offset and up to a given length.
	 *
	 * @param name - The key name to read from the file
	 * @param offset - The offset at which to start reading
	 * @param length - The length to read
	 */
	/* prettier-ignore */
	/* eslint-disable-next-line */
	ReadAsyncPartial(name: string, offset: bigint, length: bigint, callback: (result: Discord.Result, data: number) => void): void

	/**
	 * Writes data synchronously to disk, under the given key name.
	 *
	 * @param name - The key name to write under
	 * @param data - The data to write
	 */
	Write(name: string, data: number): void;

	/**
	 * Writes data asynchronously to disk, under the given key name.
	 *
	 * @param name - The key name to write under
	 * @param data - The data to write
	 */
	WriteAsync(name: string, data: number, callback: (result: Discord.Result) => void): void;

	/**
	 * Delets written data for the given key name.
	 *
	 * @param name - The key name to delete
	 */
	Delete(name: string): void;

	/**
	 * Checks if data exists for a given key name.
	 *
	 * @param name - The key name to check
	 */
	Exists(name: string): boolean;

	/**
	 * Returns file info for the given key name.
	 *
	 * @param name - The key name to get file data for
	 */
	Stat(name: string): FileStat;

	/**
	 * Returns the count of files, for iteration.
	 */
	Count(): number;

	/**
	 * Returns file info for the given index when iterating over files.
	 *
	 * @param index - The index to get file data for
	 */
	StatAt(index: number): Discord.FileStat;
}
