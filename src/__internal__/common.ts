import type { Tuple } from 'extended-utility-types';
import type { Snowflake } from '../';
import { GatewayEvent, GatewayOPCode } from '../topics';

export type PartialTuple<T, N extends number, R extends number = 1> = [
	...Tuple<T, R>,
	...(Partial<Tuple<T, N>> extends infer A ? (A extends unknown[] ? A : never[]) : never[])
];

export interface GuildIdentifiable {
	/**
	 * The ID of the guild.
	 */
	guild_id: Snowflake;
}

export interface Identifiable {
	/**
	 * The ID of the object.
	 */
	readonly id: Snowflake;
}

export interface WithType<T> {
	/**
	 * The type of the object.
	 */
	readonly type: T;
}

export interface CommandPayload<O extends GatewayOPCode> {
	/**
	 * Opcode for the payload.
	 */
	readonly op: O;
	readonly s: null;
	readonly t: null;
}

export interface EventPayload<T extends GatewayEvent> {
	readonly op: GatewayOPCode.Dispatch;

	/**
	 * Sequence number used for resuming sessions and hearbeats.
	 */
	readonly s: number;

	/**
	 * The event name for this payload.
	 */
	readonly t: T;
}
