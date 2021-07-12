import type { Tuple } from 'extended-utility-types';
import type { Snowflake } from '../';

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
