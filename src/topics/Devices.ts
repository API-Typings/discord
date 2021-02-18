/**
 * @source {@link https://discord.com/developers/docs/topics/certified-devices#models-device-object|Certified Devices}
 */
export interface Device {
	/**
	 * The type of device.
	 */
	type: DeviceType;

	/**
	 * The device's Windows UUID.
	 */
	id: string;

	/**
	 * The hardware vendor.
	 */
	vendor: Vendor;

	/**
	 * The model of the product.
	 */
	model: Model;

	/**
	 * UUIDs of related devices.
	 */
	related: string[];

	/**
	 * If the device's native echo cancellation is enabled. This field is only applicable for
	 * `AUDIO_INPUT` device types.
	 */
	echo_cancellation?: boolean;

	/**
	 * If the device's native noise supression is enabled. This field is only applicable for
	 * `AUDIO_INPUT` device types.
	 */
	noise_supression?: boolean;

	/**
	 * If the device's native automatic gain control is enabled. This field is only applicable for
	 * `AUDIO_INPUT` device types.
	 */
	automatic_gain_control?: boolean;

	/**
	 * If the device is hardware muted. This field is only applicable for `AUDIO_INPUT` device
	 * types.
	 */
	hardware_mute?: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/certified-devices#models-vendor-object|Certified Devices}
 */
export interface Vendor {
	/**
	 * Name of the vendor.
	 */
	name: string;

	/**
	 * URL for the vendor.
	 */
	url: string;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/certified-devices#models-model-object|Certified Devices}
 */
export interface Model {
	/**
	 * Name of the model.
	 */
	name: string;

	/**
	 * URL for the model.
	 */
	url: string;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/certified-devices#models-device-types|Certified Devices}
 */
export enum DeviceType {
	AudioInput = 'audioinput',
	AudioOutput = 'audiooutput',
	VideoInput = 'videoinput'
}
