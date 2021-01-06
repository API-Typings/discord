import { Nullable } from '.';
import { User } from './User';

/**
 * Represents a guild or DM channel within Discord
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure Channel}
 */
export interface Channel {
	/**
	 * The ID of this channel
	 */
	id: string;

	/**
	 * The {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types type of channel}
	 */
	type: ChannelType;

	/**
	 * The ID of the guild
	 */
	guild_id: string;

	/**
	 * Sorting position of the channel
	 */
	position: number;

	/**
	 * Explicit permission overwrites for members and roles
	 */
	permission_overwrites: PermissionOverwrite[];

	/**
	 * The name of the channel (2-100 characters)
	 */
	name: string;

	/**
	 * The channel topic (0-1024 characters)
	 */
	topic: Nullable<string>;

	/**
	 * Whether the channel is nsfw
	 */
	nsfw: boolean;

	/**
	 * ID of the parent category for a channel (each parent category can contain up to 50 channels)
	 */
	parent_id: Nullable<string>;
}

/**
 * A direct message between users
 */
export interface DMChannel
	extends Pick<Channel, 'id' | 'type'>,
		Pick<TextChannel, 'last_message_id' | 'last_pin_timestamp'> {
	/**
	 * The recipients of the DM
	 */
	recipients: User[];

	/**
	 * Application ID of the group DM creator if it is bot-created
	 */
	application_id?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure Channel}
 */
export interface FollowedChannel {
	/**
	 * Source channel id
	 */
	channel_id: string;

	/**
	 * Created target webhook id
	 */
	webhook_id: string;
}

/**
 * A direct message between multiple users
 */
export interface GroupDMChannel extends DMChannel {
	/**
	 * Icon hash
	 */
	icon: Nullable<string>;

	/**
	 * ID of the DM creator
	 */
	owner_id: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure Channel}
 */
export interface PermissionOverwrite {
	/**
	 * Role or user ID
	 */
	id: string;

	/**
	 * Either 0 (role) or 1 (member)
	 */
	type: PermissionOverwriteType;

	/**
	 * Permission bit set
	 */
	allow: string;

	/**
	 * Permission bit set
	 */
	deny: string;
}

/**
 * A text channel within a server
 */
export interface TextChannel extends Channel {
	/**
	 * The ID of the last message sent in this channel (may not point to an existing or valid message)
	 */
	last_message_id: Nullable<string>;

	/**
	 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user: number;

	/**
	 * When the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp: Nullable<string>;
}

/**
 * A voice channel within a server
 */
export interface VoiceChannel extends Channel {
	/**
	 * The bitrate (in bits) of the voice channel
	 */
	bitrate: number;

	/**
	 * The user limit of the voice channel
	 */
	user_limit: number;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types Channel}
 */
export enum ChannelType {
	/**
	 * A text channel within a server
	 */
	GuildText,

	/**
	 * A direct message between users
	 */
	DM,

	/**
	 * A voice channel within a server
	 */
	GuildVoice,

	/**
	 * A direct message between multiple users
	 */
	GroupDM,

	/**
	 * An {@link https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101 organizational category} that contains up to 50 channels
	 */
	GuildCategory,

	/**
	 * A channel that {@link https://support.discord.com/hc/en-us/articles/360032008192 users can follow and crosspost into their own server}
	 */
	GuildNews,

	/**
	 * A channel in which game developers can {@link https://discord.com/developers/docs/game-and-server-management/special-channels sell their game on Discord}
	 */
	GuildStore
}

export enum PermissionOverwriteType {
	Role,
	Member
}

/**
 * An {@link https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101 organizational category} that contains up to 50 channels
 */
export type Category = Omit<Channel, 'topic'>;

/**
 * A channel that {@link https://support.discord.com/hc/en-us/articles/360032008192 users can follow and crosspost into their own server}
 */
export type NewsChannel = Omit<TextChannel, 'rate_limit_per_user'>;

/**
 * A channel in which game developers can {@link https://discord.com/developers/docs/game-and-server-management/special-channels sell their game on Discord}
 */
export type StoreChannel = Omit<Channel, 'topic'>;

export type PartialChannel = Pick<Channel, 'id' | 'name' | 'type'>;

// - ENDPOINTS

/**
 * Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/channel#modify-channel) `/channels/{channel.id}`
 *
 * @returns A {@link https://discord.com/developers/docs/resources/channel#channel-object channel} on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#channel-update Channel Update} Gateway event
 */
export interface ModifyChannel {
	/**
	 * 2-100 character channel name
	 *
	 * @channel All
	 */
	name?: string;

	/**
	 * The {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types type of channel};
	 * only conversion between text and news is supported and only in guilds with the "NEWS" feature
	 *
	 * @channel Text, News
	 */
	type?: number;

	/**
	 * The position of the channel in the left-hand listing
	 *
	 * @channel All
	 */
	position?: Nullable<number>;

	/**
	 * 0-1024 character channel topic
	 *
	 * @channel Text, News
	 */
	topic?: Nullable<string>;

	/**
	 * Whether the channel is nsfw
	 *
	 * @channel Text, News, Store
	 */
	nsfw?: Nullable<boolean>;

	/**
	 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 *
	 * @channel Tet
	 */
	rate_limit_per_user?: Nullable<number>;

	/**
	 * The bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers)
	 *
	 * @channel Voice
	 */
	bitrate?: Nullable<number>;

	/**
	 * The user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user limit
	 *
	 * @channel Voice
	 */
	user_limit?: Nullable<number>;

	/**
	 * Channel or category-specific permissions
	 *
	 * @channel All
	 */
	permission_overwrites?: Nullable<PermissionOverwrite[]>;

	/**
	 * ID of the new parent category for a channel
	 *
	 * @channel Text, News, Store, Voice
	 */
	parent_id?: Nullable<string>;
}

/**
 * Edit the channel permission overwrites for a user or role in a channel
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#edit-channel-permissions) `/channels/{channel.id}/permissions/{overwrite.id}`
 *
 * @returns A 204 empty response on success
 */
export interface EditChannelPermissions {
	/**
	 * The bitwise value of all allowed permissions
	 */
	allow?: string;

	/**
	 * The bitwise value of all disallowed permissions
	 */
	deny?: string;

	/**
	 * 0 for a role or 1 for a member
	 */
	type?: number;
}

/**
 * Create a new {@link https://discord.com/developers/docs/resources/invite#invite-object invite} object for the channel
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#create-channel-invite) `/channels/{channel.id}/invites`
 *
 * @returns An {@link https://discord.com/developers/docs/resources/invite#invite-object invite} object
 * @fires An {@link https://discord.com/developers/docs/topics/gateway#invite-create Invite Create} Gateway event
 */
export interface CreateChannelInvite {
	/**
	 * Duration of invite in seconds before expiry, or 0 for never
	 */
	max_age: number;

	/**
	 * Max number of uses or 0 for unlimited
	 */
	max_uses: number;

	/**
	 * Whether this invite only grants temporary membership
	 */
	temporary: boolean;

	/**
	 * If true, don't try to reuse a similar invite (useful for creating many unique one time use invites)
	 */
	unique: boolean;

	/**
	 * The target user id for this invite
	 */
	target_user?: string;

	/**
	 * The type of target user for this invite
	 */
	target_user_type?: number;
}

/**
 * Follow a News Channel to send messages to a target channel
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#follow-news-channel) `/channels/{channel.id}/followers`
 *
 * @returns A {@link https://discord.com/developers/docs/resources/channel#followed-channel-object followed channel} object
 */
export interface FollowNewsChannel {
	/**
	 * ID of target channel
	 */
	webhook_channel_id: string;
}

/**
 * Adds a recipient to a Group DM using their access token
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient) `/channels/{channel.id}/recipients/{user.id}`
 */
export interface GroupDMAddRecipient {
	/**
	 * Access token of a user that has granted your app the `gdm.join` scope
	 */
	access_token: string;

	/**
	 * Nickname of the user being added
	 */
	nick: string;
}

/**
 * Create a new {@link https://discord.com/developers/docs/resources/channel#channel-object channel} object for the guild
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/guild#create-guild-channel) `/guilds/{guild.id}/channels`
 *
 * @returns The new {@link https://discord.com/developers/docs/resources/channel#channel-object channel} object on success
 * @fires A {@link https://discord.com/developers/docs/topics/gateway#channel-create Channel Create} Gateway event
 */
export interface PostCreateChannel {
	/**
	 * Channel name (2-100 characters)
	 */
	name: string;

	/**
	 * The {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types type of channel}
	 */
	type?: number;

	/**
	 * Channel topic (0-1024 characters)
	 */
	topic?: string;

	/**
	 * The bitrate (in bits) of the voice channel (voice only)
	 */
	bitrate?: number;

	/**
	 * The user limit of the voice channel (voice only)
	 */
	user_limit?: number;

	/**
	 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user?: number;

	/**
	 * Sorting position of the channel
	 */
	position?: number;

	/**
	 * The channel's permission overwrites
	 */
	permission_overwrites?: PermissionOverwrite[];

	/**
	 * ID of the parent category for a channel
	 */
	parent_id?: string;

	/**
	 * Whether the channel is nsfw
	 */
	nsfw?: boolean;
}

/**
 * Modify the positions of a set of {@link https://discord.com/developers/docs/resources/channel#channel-object|channel} objects for the guild
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions) `/guilds/{guild.id}/channels`
 *
 * @returns A 204 empty response on success
 * @fires Multiple {@link https://discord.com/developers/docs/topics/gateway#channel-update Channel Update} Gateway events
 */
export interface ModifyChannelPositions {
	/**
	 * Channel ID
	 */
	id: string;

	/**
	 * Sorting position of the channel
	 */
	position: Nullable<number>;
}
