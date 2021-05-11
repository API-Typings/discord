import type { Nullable } from 'extended-utility-types';
import type { Snowflake } from '../';

/**
 * A *Stage Instance* holds information about a live stage. When a Stage channel has no speakers for
 * a certain period of time (on the order of minutes) it will be automatically deleted.
 *
 * @source {@link https://discord.com/developers/docs/resources/stage-instance#stage-instance-structure|Channel}
 */
export interface StageInstance {
	/**
	 * The ID of this Stage instance.
	 */
	id: Snowflake;

	/**
	 * The guild ID of the associated Stage channel.
	 */
	guild_id: Snowflake;

	/**
	 * The ID of the associated Stage channel.
	 */
	channel_id: Snowflake;

	/**
	 * The topic of the Stage instance (1-120 characters).
	 */
	topic: string;
}

// SECTION Endpoints

/**
 * Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator
 * of the Stage channel.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/stage-instance#create-stage-instance) `/stage-instances`
 */
export interface CreateStageInstance {
	body: Pick<StageInstance, 'channel_id' | 'topic'>;
	response: StageInstance & {
		privacy_level: number;
		discoverable_disabled: boolean;
		guild_scheduled_event_id: Nullable<Snowflake>;
	};
}

/**
 * Gets the stage instance associated with the Stage channel, if it exists.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/stage-instance#get-stage-instance) `/stage-instances/{channel.id}`
 */
export type GetStageInstance = { response: StageInstance };

/**
 * Creates a new Stage instance associated to a Stage channel. Requires the user to be a moderator
 * of the Stage channel.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/stage-instance#update-stage-instance) `/stage-instances/{channel.id}`
 */
export interface UpdateStageInstance {
	body: Pick<StageInstance, 'topic'>;
	response: CreateStageInstance['response'];
}

/**
 * Deletes the Stage instance. Requires the user to be a moderator of the Stage channel.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance) `/stage-instances/{channel.id}`
 */
export type DeleteStageInstance = { response: never };

// !SECTION
