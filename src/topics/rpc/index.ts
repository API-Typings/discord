import type { Command, Event } from './';

export * from './Commands';
export * from './Events';

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#payloads-payload-structure|RPC}
 */
export interface Payload {
	/**
	 * Payload command; present always
	 */
	cmd: Command;

	/**
	 * Unique string used once for replies from the server; present in responses to commands (not
	 * subscribed events)
	 */
	nonce?: string;

	/**
	 * Subscription event; present in subscribed events, errors, and (un)subscribing events
	 */
	evt?: Event;

	/**
	 * Event data; present in responses from the server
	 */
	data?: unknown;

	/**
	 * Command arguments; present in commands sent to the server
	 */
	args?: unknown;
}
