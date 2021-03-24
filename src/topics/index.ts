export * from './gateway';
export * from './Codes';
export * from './Devices';
export * from './OAuth2';
export * as RPC from './rpc';
export * from './Permissions';
export * from './Teams';

/**
 * @source {@link https://discord.com/developers/docs/topics/rate-limits#exceeding-a-rate-limit-rate-limit-response-structure|Rate Limits}
 */
export interface RateLimit {
	/**
	 * A message saying you are being rate limited.
	 */
	message: string;

	/**
	 * The number of seconds to wait before submitting another request.
	 */
	retry_after: number;

	/**
	 * A value indicating if you are being globally rate limited or not.
	 */
	global: boolean;
}
