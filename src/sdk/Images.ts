import type { Discord } from '../';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/images#data-models-imagedimensions-struct|Images}
 */
export interface ImageDimensions {
	/**
	 * The width of the image
	 */
	Width: number;

	/**
	 * The height of the image
	 */
	Height: number;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/images#data-models-imagetype-enum|Images}
 */
export enum ImageType {
	/**
	 * Image is a user's avatar
	 */
	User
}

export interface ImageHandle {
	/**
	 * The source of the image
	 */
	Type: ImageType;

	/**
	 * The ID of the user whose avatar you want to get
	 */
	Id: bigint;

	/**
	 * The resolution at which you want the image
	 */
	Size: number;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/images|Images}
 */
export interface ImageManager {
	/**
	 * Prepares an image to later retrieve data about it.
	 *
	 * @param handle - Contains the desired `userId` and `size` for the returned image
	 * @param refresh - Whether to use cached data for fetch anew
	 */
	/* prettier-ignore */
	/* eslint-disable-next-line */
	Fetch(handle: ImageHandle, refresh: boolean, callback: (result: Discord.Result, imageHandle: Discord.ImageHandle) => void): void

	/**
	 * Get's the dimensions for the given user's avatar's source image.
	 *
	 * @param handle - Contains the desired `userId` and `size` for the returned image
	 */
	GetDimensions(handle: ImageHandle): Discord.ImageDimensions;

	/**
	 * Gets the image data for a given user's avatar.
	 *
	 * @param handle - The image handle from the `Fetch()` callback
	 */
	GetData(handle: ImageHandle): number;
}
