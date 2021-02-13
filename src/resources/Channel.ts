import type { GuildMember, Nullable, PartialEmoji, Snowflake, User } from '../';

// SECTION Channel Types

// ANCHOR Partial Channel

export interface PartialChannel {
	/**
	 * The ID of this channel
	 */
	id: Snowflake;

	/**
	 * The {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types type of channel}
	 */
	type: ChannelType;

	/**
	 * The name of the channel (2-100 characters)
	 */
	name: string;
}

/**
 * Represents a guild or DM channel within Discord.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure Channel}
 */
export interface Channel extends PartialChannel {
	/**
	 * The ID of the guild
	 */
	guild_id: Snowflake;

	/**
	 * Sorting position of the channel
	 */
	position: number;

	/**
	 * Explicit permission overwrites for members and roles
	 */
	permission_overwrites: Overwrite[];

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

// ANCHOR Channel Type Enum

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

// ANCHOR Text Channel

/**
 * A text channel within a server.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-channel}
 */
export interface TextChannel extends Channel {
	/**
	 * The ID of the last message sent in this channel (may not point to an existing or valid message)
	 */
	last_message_id: Nullable<Snowflake>;

	/**
	 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 */
	rate_limit_per_user: number;

	/**
	 * When the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned.
	 */
	last_pin_timestamp: Nullable<string>;
}

// ANCHOR News Channel

/**
 * A channel that [users can follow and crosspost into their own server][1].
 *
 * @remarks
 * Bots can post or publish messages in this type of channel if they have the proper permissions.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-news-channel Channel}
 *
 * [1]: https://support.discord.com/hc/en-us/articles/360032008192
 */
export type NewsChannel = Omit<TextChannel, 'rate_limit_per_user'>;

// ANCHOR Voice Channel

/**
 * A voice channel within a server.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-voice-channel Channel}
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

// ANCHOR DM Channel

/**
 * A direct message between users
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-dm-channel Channel}
 */
// prettier-ignore
export interface DMChannel extends Pick<Channel, 'id' | 'type'>, Pick<TextChannel, 'last_message_id' | 'last_pin_timestamp'> {
	/**
	 * The recipients of the DM
	 */
	recipients: User[];

	/**
	 * Application ID of the group DM creator if it is bot-created
	 */
	application_id?: Snowflake;
}

// ANCHOR Group DM Channel

/**
 * A direct message between multiple users.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-group-dm-channel Channel}
 */
export interface GroupDMChannel extends DMChannel, Nullable<Pick<Channel, 'name'>> {
	/**
	 * The nicknames that are set for a group DM channel's recipients
	 */
	nicks: ChannelNickname[];

	/**
	 * Icon hash
	 */
	icon: Nullable<string>;

	/**
	 * ID of the DM creator
	 */
	owner_id: Snowflake;
}

// ANCHOR Channel Category

/**
 * An [organizational category] that contains up to 50 channels.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-channel-category Channel}
 *
 * [1]: https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101
 */
export type ChannelCategory = Omit<Channel, 'topic'>;

// ANCHOR Store Channel

/**
 * A channel in which game developers can [sell their game on Discord][1].
 *
 * @remarks
 * Bots can neither send or read messages from this channel type (as it is a store page).
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-store-channel Channel}
 *
 * [1]: https://discord.com/developers/docs/game-and-server-management/special-channels
 */
export type StoreChannel = Omit<Channel, 'topic'>;

// !SECTION

// SECTION Message

/**
 * Represents a message sent in a channel within Discord
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-structure Channel}
 */
export interface Message {
	/**
	 * ID of the message
	 */
	id: Snowflake;

	/**
	 * ID of the channel the message was sent in
	 */
	channel_id: Snowflake;

	/**
	 * ID of the guild the message was sent in
	 */
	guild_id?: Snowflake;

	/**
	 * The author of this message (not guaranteed to be a valid user)
	 *
	 * @remarks
	 * The author object follows the structure of the user object, but is only a valid user in the case where the message is generated by a
	 * user or bot user. If the message is generated by a webhook, the author object corresponds to the webhook's ID, username, and avatar.
	 * You can tell if a message is generated by a webhook by checking for the `webhook_id` on the message object.
	 */
	author: User;

	/**
	 * Member properties for this message's author
	 *
	 * @remarks
	 * The member object exists in [MESSAGE_CREATE][1] and [MESSAGE_UPDATE][2] events from text-based guild channels.
	 * This allows bots to obtain real-time member data without requiring bots to store member state in memory.
	 *
	 * [1]: https://discord.com/developers/docs/topics/gateway#message-create
	 * [2]: https://discord.com/developers/docs/topics/gateway#message-update
	 */
	member?: GuildMember;

	/**
	 * Contents of the message
	 */
	content: string;

	/**
	 * When this message was sent
	 */
	timestamp: string;

	/**
	 * When this message was edited (or null if never)
	 */
	edited_timestamp?: Nullable<string>;

	/**
	 * Whether this was a TTS message
	 */
	tts: boolean;

	/**
	 * Whether this message mentions everyone
	 */
	mention_everyone: boolean;

	/**
	 * Users specifically mentioned in the message
	 *
	 * @remarks
	 * The user objects in the mentions array will only have the partial `member` field present in
	 * [MESSAGE_CREATE][1] and [MESSAGE_UPDATE][2] events from text-based guild channels.
	 *
	 * [1]: https://discord.com/developers/docs/topics/gateway#message-create
	 * [2]: https://discord.com/developers/docs/topics/gateway#message-update
	 */
	mentions: UserMention[];

	/**
	 * Roles specifically mentioned in this message
	 */
	mention_roles: Snowflake[];

	/**
	 * Any attached files
	 */
	attachments: Attachment[];

	/**
	 * Any embedded content
	 */
	embeds: Embed;

	/**
	 * Reactions to the message
	 */
	reactions?: Reaction[];

	/**
	 * Used for validating a message was sent
	 */
	nonce?: number | string;

	/**
	 * Whether this message is pinned
	 */
	pinned: boolean;

	/**
	 * If the message is generated by a webhook, this is the webhook's ID
	 */
	webhook_id?: Snowflake;

	/**
	 * {@link https://discord.com/developers/docs/resources/channel#message-object-message-types Type of message}
	 */
	type: MessageType;

	/**
	 * Sent with Rich Presence-related chat embeds
	 */
	activity?: MessageActivity;

	/**
	 * Sent with Rich Presence-related chat embeds
	 */
	application?: MessageApplication;

	/**
	 * {@link https://discord.com/developers/docs/resources/channel#message-object-message-flags Message flags} combined as a {@link https://en.wikipedia.org/wiki/Bit_field bitfield}
	 */
	flags?: MessageFlags;

	/**
	 * The stickers sent with the message (bots currently can only receive messages with stickers, not send)
	 */
	stickers?: Sticker[];

	/**
	 * The message associated with the `message_reference`
	 *
	 * @remarks
	 * This field is only returned for messages with a `type` of `19` (`REPLY`). If the message is a reply but the
	 * `referenced_message` field is not present, the backend did not attempt to fetch the message that was being
	 * replied to, so its state is unknown. If the field exists but is null, the referenced message was deleted.
	 */
	referenced_message?: Nullable<Message>;
}

export interface UserMention extends User {
	member?: Partial<Omit<GuildMember, 'user'>>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-types Channel}
 */
export enum MessageType {
	Default,
	RecipientAdd,
	RecipientRemove,
	Call,
	ChannelNameChange,
	ChannelIconChange,
	ChannelPinnedMessage,
	GuildMemberJoin,
	UserPremiumGuildSubscription,
	UserPremiumGuildSubscriptionTier1,
	UserPremiumGuildSubscriptionTier2,
	UserPremiumGuildSubscriptionTier3,
	ChannelFollowAdd,
	GuildDiscoveryDisqualified = 14,
	GuildDiscoveryRequalified,
	GuildDiscoveryGracePeriodInitialWarning,
	GuildDiscoveryGracePeriodFinalWarning,
	Reply = 19,
	ApplicationCommand
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure Channel}
 */
export interface MessageActivity {
	/**
	 * {@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-types Type of message activity}
	 */
	type: MessageActivityType;

	/**
	 * `party_id` from a {@link https://discord.com/developers/docs/rich-presence/how-to#updating-presence-update-presence-payload-fields Rich Presence event}
	 */
	party_id?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-application-structure Channel}
 */
export interface MessageApplication {
	/**
	 * ID of the application
	 */
	id: Snowflake;

	/**
	 * ID of the embed's image asset
	 */
	cover_image?: string;

	/**
	 * Application's description
	 */
	description: string;

	/**
	 * ID of the application's icon
	 */
	icon: Nullable<string>;

	/**
	 * Name of the application
	 */
	name: string;
}

/**
 * There are four situations in which a message has a `message_reference` object:
 *
 * **Crosspost Messages** – messages that originated from another channel (`IS_CROSSPOST` flag)
 * - These messages have all three fields, with data of the original message that was crossposted
 *
 * **Channel Follow Add Messages** – automatic messages sent when a channel is followed into the current channel (Type `12`)
 * - These messages have the `channel_id` and `guild_id` fields, with data of the followed announcement channel
 *
 * **Pin Messages** – automatic messages sent when a message is pinned (Type `6`)
 * - These messages have `message_id` and `channel_id`, and `guild_id` if it is in a guild, with data of the message that was pinned
 *
 * **Replies** – messages replying to a previous message (Type `19`)
 * - These messages have `message_id` and `channel_id`, and `guild_id` if it is in a guild, with data of the message
 *   that was replied to. The `channel_id` and `guild_id` will be the same as the reply. Replies are created by including
 *   a `message_reference` when sending a message. When sending, only `message_id` is required.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure Channel}
 */
export interface MessageReference {
	/**
	 * ID of the originating message
	 */
	message_id?: Snowflake;

	/**
	 * ID of the originating message's channel
	 *
	 * @remarks
	 * `channel_id` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.
	 */
	channel_id?: Snowflake;

	/**
	 * ID of the originating message's guild
	 */
	guild_id?: Snowflake;

	/**
	 * When sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message
	 *
	 * @default true
	 */
	fail_if_not_exists?: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-types Channel}
 */
export enum MessageActivityType {
	Join = 1,
	Spectate,
	Listen,
	JoinRequest = 5
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-flags Channel}
 */
export enum MessageFlags {
	/**
	 * This message has been published to subscribed channels (via Channel Following)
	 */
	Crossposted = 1 << 0,

	/**
	 * This message originated from a message in another channel (via Channel Following)
	 */
	IsCrosspost = 1 << 1,

	/**
	 * Do not include any embeds when serializing this message
	 */
	SuppressEmbeds = 1 << 2,

	/**
	 * The source message for this crosspost has been deleted (via Channel Following)
	 */
	SourceDeleted = 1 << 3,

	/**
	 * This message came from the urgent message system
	 */
	Urgent = 1 << 4,
	Ephemeral = 1 << 6
}

// ANCHOR Sticker

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-sticker-structure Channel}
 */
export interface Sticker {
	/**
	 * ID of the sticker
	 */
	id: Snowflake;

	/**
	 * ID of the pack the sticker is from
	 */
	pack_id: Snowflake;

	/**
	 * Name of the sticker
	 */
	name: string;

	/**
	 * Description of the sticker
	 */
	description: string;

	/**
	 * A comma-separated list of tags for the sticker
	 */
	tags?: string;

	/**
	 * Sticker asset hash
	 */
	asset: string;

	/**
	 * Sticker preview asset hash
	 */
	preview_asset: string;

	/**
	 * {@link https://discord.com/developers/docs/resources/channel#message-object-message-sticker-format-types Type of sticker format}
	 */
	format_type: StickerFormat;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-sticker-format-types Channel}
 */
export enum StickerFormat {
	PNG = 1,
	APNG,
	LOTTIE
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-example-crossposted-message Channel}
 */
export interface CrosspostedMessage extends Message {
	/**
	 * Channels specifically mentioned in this message
	 */
	mention_channels?: ChannelMention[];

	/**
	 * Data showing the source of a crosspost, channel follow add, pin, or reply message
	 */
	message_reference: MessageReference;
}

// !SECTION

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure Channel}
 */
export interface FollowedChannel {
	/**
	 * Source channel ID
	 */
	channel_id: Snowflake;

	/**
	 * Created target webhook ID
	 */
	webhook_id: Snowflake;
}

// ANCHOR Reaction

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure Channel}
 */
export interface Reaction {
	/**
	 * Times this emoji has been used to react
	 */
	count: number;

	/**
	 * Whether the current user reacted using this emoji
	 */
	me: boolean;

	/**
	 * Emoji information
	 */
	emoji: PartialEmoji;
}

// ANCHOR Overwrite

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure Channel}
 */
export interface Overwrite {
	/**
	 * Role or user ID
	 */
	id: Snowflake;

	/**
	 * Either 0 (role) or 1 (member)
	 */
	type: OverwriteType;

	/**
	 * Permission bit set
	 */
	allow: string;

	/**
	 * Permission bit set
	 */
	deny: string;
}

// SECTION Embed

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure Channel}
 */
export interface Embed {
	/**
	 * Title of embed
	 */
	title?: string;

	/**
	 * {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-types Type of embed} (always "rich" for webhook embeds)
	 */
	type?: EmbedType;

	/**
	 * Description of embed
	 */
	description?: string;

	/**
	 * URL of embed
	 */
	url?: string;

	/**
	 * Timestamp of the embed content
	 */
	timestamp?: string;

	/**
	 * Color code of the embed
	 */
	color?: number;

	/**
	 * Footer information
	 */
	footer?: EmbedFooter;

	/**
	 * Image information
	 */
	image?: EmbedMedia;

	/**
	 * Thumbnail information
	 */
	thumbnail?: EmbedMedia;

	/**
	 * Video information
	 */
	video?: EmbedMedia;

	/**
	 * Prodvider information
	 */
	provider?: EmbedProvider;

	/**
	 * Author information
	 */
	author?: EmbedAuthor;

	/**
	 * Fields information
	 */
	fields?: EmbedField[];
}

/**
 * Embed types are "loosely defined" and, for the most part, are not used by our clients for rendering.
 * Embed attributes power what is rendered. Embed types should be considered deprecated and might be removed in a future API version
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-types Channel}
 */
export type EmbedType = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';

/**
 * @source Channel
 * [[1](https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure)]
 * [[2](https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure)]
 * [[3](https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure)]
 */
export interface EmbedMedia {
	/**
	 * Source url of thumbnail or image (only supports http(s) and attachments), or video
	 */
	url?: string;

	/**
	 * A proxied url of the thumbnail, image, or video
	 */
	proxy_url?: string;

	/**
	 * Height of thumbnail, image, or video
	 */
	height?: number;

	/**
	 * Width of thumbnail, image, or video
	 */
	width?: number;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure Channel}
 */
export interface EmbedProvider {
	/**
	 * Name of provider or author
	 */
	name?: string;

	/**
	 * URL of provider or author
	 */
	url?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure Channel}
 */
export type EmbedAuthor = Omit<EmbedFooter, 'text'> & EmbedProvider;

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure Channel}
 */
export interface EmbedFooter {
	/**
	 * Footer text
	 */
	text: string;

	/**
	 * URL of footer or author icon (only supports http(s) and attachments)
	 */
	icon_url?: string;

	/**
	 * A proxied url of footer or author icon
	 */
	proxy_icon_url?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure Channel}
 */
export interface EmbedField {
	/**
	 * Name of the field
	 */
	name: string;

	/**
	 * Value of the field
	 */
	value: string;

	/**
	 * Whether or not this field should display inline
	 */
	inline?: boolean;
}

// !SECTION

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure Channel}
 */
export interface Attachment {
	/**
	 * Attachment ID
	 */
	id: Snowflake;

	/**
	 * Name of file attached
	 */
	filename: string;

	/**
	 * Size of file in bytes
	 */
	size: number;

	/**
	 * Source URL of file
	 */
	url: string;

	/**
	 * A proxied URL of fiel
	 */
	proxy_url: string;

	/**
	 * Height of file (if image)
	 */
	height?: Nullable<number>;

	/**
	 * Width of file (if image)
	 */
	width?: Nullable<number>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-mention-object-channel-mention-structure Channel}
 */
export interface ChannelMention {
	/**
	 * ID of the channel
	 */
	id: Snowflake;

	/**
	 * ID of the guild containing the channel
	 */
	guild_id: Snowflake;

	/**
	 * The {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types type of channel}
	 */
	type: ChannelType;

	/**
	 * The name of the channel
	 */
	name: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types Channel}
 */
export type AllowedMentionsType = 'roles' | 'users' | 'everyone';

/**
 * The allowed mention field allows for more granular control over mentions without various hacks to the message content.
 * This will always validate against message content to avoid phantom pings (e.g. to ping everyone, you must still have
 * `@everyone` in the message content), and check against user/bot permissions
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure Channel}
 */
export interface AllowedMentions {
	/**
	 * An array of {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types allowed mention types} to parse from the content
	 */
	parse: AllowedMentionsType[];

	/**
	 * Array of `role_id`s to mention (Max size of 100)
	 */
	roles: Snowflake[];

	/**
	 * Array of `user_id`s to mention (Max size of 100)
	 */
	users: Snowflake[];

	/**
	 * For replies, whether to mention the author of the message being replied to (default false)
	 */
	replied_user: boolean;
}

// ANCHOR Embed Limits

/**
 * All of the following limits are measured inclusively. Leading and trailing whitespace characters are not included (they are trimmed automatically).
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-limits-limits Channel}
 */
export enum EmbedLimit {
	/**
	 * 256 characters
	 */
	Title = 256,

	/**
	 * 2048 characters
	 */
	Description = 2048,

	/**
	 * Up to 25 {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure field} objects
	 */
	Fields = 25,

	/**
	 * 256 characters
	 */
	FieldName = 256,

	/**
	 * 1024 characters
	 */
	FieldValue = 1024,

	/**
	 * 2048 characters
	 */
	Footer = 2048,

	/**
	 * 256 characters
	 */
	Author = 256
}

export interface ChannelNickname {
	/**
	 * The ID of the user this nickname is applied to
	 */
	id: Snowflake;

	/**
	 * The user's nickname
	 */
	nick: string;
}

export enum OverwriteType {
	Role,
	GuildMember
}

// SECTION Endpoints

/**
 * Update a channel's settings. Requires the `MANAGE_CHANNELS` permission for the guild.
 *
 * @remarks
 * Only permissions your bot has in the guild or channel can be allowed/denied (unless your bot has a `MANAGE_ROLES` overwrite in the channel)
 *
 * @endpoint [PATCH] `/channels/{channel.id}`
 *
 * @returns A [channel][1] on success, and a `400 BAD REQUEST` on invalid parameters.
 * @fires A [Channel Update][2] Gateway event.  If modifying a category, individual [Channel Update][2] events will fire
 * for each child channel that also changes. If modifying permission overwrites, the `MANAGE_ROLES` permission is required.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/channel#modify-channel
 * [1]: https://discord.com/developers/docs/resources/channel#channel-object
 * [2]: https://discord.com/developers/docs/topics/gateway#channel-update
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
	 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as
	 * well as users with the permission `manage_messages` or `manage_channel`, are unaffected
	 *
	 * @channel Text
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
	permission_overwrites?: Nullable<Overwrite[]>;

	/**
	 * ID of the new parent category for a channel
	 *
	 * @channel Text, News, Store, Voice
	 */
	parent_id?: Nullable<Snowflake>;

	/**
	 * Image for the channel icon
	 *
	 * @channel Group DM
	 */
	icon?: string;
}

/**
 * Returns the messages for a channel.
 *
 * @remarks
 * If operating on a guild channel, this endpoint requires the `VIEW_CHANNEL` permission to be present on the current user. If the current user is
 * missing the `READ_MESSAGE_HISTORY` permission in the channel then this will return no messages (since they cannot read the message history).
 *
 * @endpoint [GET] `/channels/{channel.id}/messages`
 *
 * @returns An array of [message][1] objects on success, sorted by their ID in descending order.
 *
 * [GET]: https://discord.com/developers/docs/resources/channel#get-channel-messages
 * [1]: https://discord.com/developers/docs/resources/channel#message-object
 */
export interface GetChannelMessages {
	/**
	 * Get messages around this message ID
	 */
	around?: Snowflake;

	/**
	 * Get messages before this message ID
	 */
	before?: Snowflake;

	/**
	 * Get messages after this message ID
	 */
	after?: Snowflake;

	/**
	 * Max number of messages to return (1-100)
	 */
	limit?: number;
}

// SECTION Create Message

// ANCHOR JSON

/**
 * Post a message to a guild text or DM channel.
 *
 * @remarks
 * You may create a message as a reply to another message. To do so, include a [`message_reference`][1] with a `message_id`.
 * The `channel_id` and `guild_id` in the `message_reference` are optional, but will be validated if provided.
 *
 * @limitations
 * - When operating on a guild channel, the current user must have the `SEND_MESSAGES` permission
 * - When sending a message with `tts` (text-to-speech) set to `true`, the current user must have the `SEND_TTS_MESSAGES` permission
 * - When creating a message as a reply to another message, the current user must have the `READ_MESSAGE_HISTORY` permission
 * - The referenced message must exist and cannot be a system message
 * - The maximum request size when sending a message is **8MB**
 * - For the embed object, you can set every field except `type` (it will be `rich` regardless of if you
 *   try to set it), `provider`, `video`, and any `height`, `width`, or `proxy_url` values for images
 * - **Files can only be uploaded when using the `multipart/form-data` content type**
 *
 * @endpoint [POST] `/channels/{channel.id}/messages`
 *
 * @returns A [message][2] object.
 * @fires A [Message Create][3] Gateway event.
 *
 * [POST]: https://discord.com/developers/docs/resources/channel#create-message
 * [1]: https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure
 * [2]: https://discord.com/developers/docs/resources/channel#message-object
 * [3]: https://discord.com/developers/docs/topics/gateway#message-create
 */
export interface CreateMessageJSON {
	/**
	 * The message contents (up to 2000 characters)
	 */
	content?: string;

	/**
	 * A nonce that can be used for optimistic message sending
	 */
	nonce?: number | string;

	/**
	 * True if this is a TTS message
	 */
	tts?: boolean;

	/**
	 * Embedded rich content
	 */
	embed?: Embed;

	/**
	 * Allowed mentions for a message
	 */
	allowed_mentions?: AllowedMentions;

	/**
	 * Include to make your message a reply
	 */
	message_reference?: MessageReference;
}

// ANCHOR Form-Data

/**
 * Post a message to a guild text or DM channel.
 *
 * @remarks
 * - Some fields can be provided as `form-data` fields, but **if you supply a `payload_json`, all fields except for `file` fields will be ignored**.
 * - You may create a message as a reply to another message. To do so, include a [`message_reference`][1] with a `message_id`.
 *   The `channel_id` and `guild_id` in the `message_reference` are optional, but will be validated if provided.
 *
 * @info
 * Note that when sending `multipart/form-data`, you must provide a value for at **least one of** `content`, `embed`
 * or `file`. For a `file` attachment, the `Content-Disposition` subpart header MUST contain a `filename` parameter.
 *
 * @warning
 * This endpoint supports **all** the same fields as its `application/json` counterpart, however they must be set in `payload_json` rather than provided as form fields.
 *
 * @limitations
 * - When operating on a guild channel, the current user must have the `SEND_MESSAGES` permission
 * - When sending a message with `tts` (text-to-speech) set to `true`, the current user must have the `SEND_TTS_MESSAGES` permission
 * - When creating a message as a reply to another message, the current user must have the `READ_MESSAGE_HISTORY` permission
 * - The referenced message must exist and cannot be a system message
 * - The maximum request size when sending a message is **8MB**
 * - For the embed object, you can set every field except `type` (it will be `rich` regardless of if you
 *   try to set it), `provider`, `video`, and any `height`, `width`, or `proxy_url` values for images
 * - **Files can only be uploaded when using the `multipart/form-data` content type**
 *
 * @endpoint [POST] `/channels/{channel.id}/messages`
 *
 * @returns A [message][2] object.
 * @fires A [Message Create][3] Gateway event.
 *
 * [POST]: https://discord.com/developers/docs/resources/channel#create-message
 * [1]: https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure
 * [2]: https://discord.com/developers/docs/resources/channel#message-object
 * [3]: https://discord.com/developers/docs/topics/gateway#message-create
 */
export interface CreateMessageFormData {
	/**
	 * The message contents (up to 2000 characters)
	 */
	content?: string;

	/**
	 * A nonce that can be used for optimistic message sending
	 */
	nonce?: number | string;

	/**
	 * True if this is a TTS message
	 */
	tts?: boolean;

	/**
	 * The contents of the file being sent
	 */
	file?: unknown;

	/**
	 * JSON encoded body of any additional request fields
	 */
	payload_json?: string;
}

// !SECTION

/**
 * Get a list of users that reacted with this emoji.
 *
 * @endpoint [GET] `/channels/{channel.id}/messages/{message.id}/reactions/{emoji.id}
 *
 * @remarks
 * The `emoji` must be [URL Encoded][1] or the request will fail with `10014: Unknown Emoji`.
 *
 * @returns An array of [user][2] objects on success, sorted by their id in ascending order.
 *
 * [GET]: https://discord.com/developers/docs/resources/channel#get-reactions
 * [1]: https://en.wikipedia.org/wiki/Percent-encoding
 * [2]: https://discord.com/developers/docs/resources/user#user-object
 */
export interface GetReactions {
	/**
	 * Get users after this user ID
	 */
	after?: Snowflake;

	/**
	 * Max number of users to return (1-100)
	 *
	 * @default 25
	 */
	limit?: number;
}

/**
 * Edit a previously sent message.
 *
 * @remarks
 * The fields `content`, `embed`, `allowed_mentions` and `flags` can be edited by the original message author. Other users can only edit `flags` and only if they
 * have the `MANAGE_MESSAGES` permission in the corresponding channel. When specifying `flags`, ensure to include all previously set flags/bits in addition to
 * ones that you are modifying. Only `flags` documented in the table below may be modified by users (unsupported flag changes are currently ignored without error).
 *
 * @endpoint [PATCH] `/channels/{channel.id}/messages/{message.id}`
 *
 * @returns A [message][1] object.
 * @fires A [Message Update][2] gateway event.
 *
 * [PATCH]: https://discord.com/developers/docs/resources/channel#edit-message
 * [1]: https://discord.com/developers/docs/resources/channel#message-object
 * [2]: https://discord.com/developers/docs/topics/gateway#message-update
 */
export interface EditMessage {
	/**
	 * The new message contents (up to 2000 characters)
	 */
	content?: Nullable<string>;

	/**
	 * Embedded rich content
	 */
	embed?: Nullable<Embed>;

	/**
	 * Edit the {@link https://discord.com/developers/docs/resources/channel#message-object-message-flags flags} of a message (only `SUPPRESS_EMBEDS` can currently be set/unset)
	 */
	flags?: Nullable<number>;

	/**
	 * Allowed mentions for the message
	 */
	allowed_mentions?: Nullable<AllowedMentions>;
}

/**
 * Delete multiple messages in a single request.
 *
 * @remarks
 * This endpoint can only be used on guild channels and requires the `MANAGE_MESSAGES` permission. Any message IDs given that
 * do not exist or are invalid will count towards the minimum and maximum message count (currently 2 and 100 respectively).
 *
 * @warning
 * This endpoint will not delete messages older than 2 weeks, and will fail with a `400 BAD REQUEST`
 * if any message provided is older than that or if any duplicate message IDs are provided.
 *
 * @endpoint [POST] `/channels/{channel.id}/messages/bulk-delete`
 *
 * @returns A `204` empty response on success.
 * @fires A [Message Delete][1] Gateway event.
 *
 * [POST]: https://discord.com/developers/docs/resources/channel#bulk-delete-messages
 * [1]: https://discord.com/developers/docs/topics/gateway#message-delete-bulk
 */
export interface BulkDeleteMessages {
	/**
	 * An array of message IDs to delete (2-100)
	 */
	messages: Snowflake[];
}

/**
 * Edit the channel permission overwrites for a user or role in a channel. Only usable for guild channels. Requires the `MANAGE_ROLES` permission.
 *
 * @remarks
 * Only permissions your bot has in the guild or channel can be allowed/denied (unless your bot has a `MANAGE_ROLES` overwrite in the channel).
 *
 * @endpoint [PUT] `/channels/{channel.id}/permissions/{overwrite.id}`
 *
 * @returns A 204 empty response on success
 *
 * [PUT]: https://discord.com/developers/docs/resources/channel#edit-channel-permissions
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
 * Create a new [invite][1] object for the channel. Only usable for guild channels. Requires the `CREATE_INSTANT_INVITE` permission.
 *
 * @remarks
 * All JSON parameters for this route are optional, however the request body is not. If you are not sending any fields, you still have to send an empty JSON object (`{}`).
 *
 * @endpoint [POST] `/channels/{channel.id}/invites`
 *
 * @returns An [invite][1] object.
 * @fires An [Invite Create][2] Gateway event.
 *
 * [POST]: https://discord.com/developers/docs/resources/channel#create-channel-invite
 * [1]: https://discord.com/developers/docs/resources/invite#invite-object
 * [2]: https://discord.com/developers/docs/topics/gateway#invite-create
 */
export interface CreateChannelInvite {
	/**
	 * Duration of invite in seconds before expiry, or 0 for never. Between 0 and 604800 (7 days)
	 *
	 * @default 86400 (24 hours)
	 */
	max_age?: number;

	/**
	 * Max number of uses or 0 for unlimited. Between 0 and 100
	 *
	 * @default 0
	 */
	max_uses?: number;

	/**
	 * Whether this invite only grants temporary membership
	 *
	 * @default false
	 */
	temporary?: boolean;

	/**
	 * If true, don't try to reuse a similar invite (useful for creating many unique one time use invites)
	 *
	 * @default false
	 */
	unique?: boolean;

	/**
	 * The target user ID for this invite
	 */
	target_user_id?: string;

	/**
	 * The type of user target for this invite
	 */
	target_user_type?: number;
}

/**
 * Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel.
 *
 * @endpoint [POST] `/channels/{channel.id}/followers`
 *
 * @returns A [followed channel][1] object.
 *
 * [POST]: https://discord.com/developers/docs/resources/channel#follow-news-channel
 * [1]: https://discord.com/developers/docs/resources/channel#followed-channel-object
 */
export interface FollowNewsChannel {
	/**
	 * ID of target channel
	 */
	webhook_channel_id: Snowflake;
}

/**
 * Adds a recipient to a Group DM using their access token.
 *
 * @endpoint [PUT] `/channels/{channel.id}/recipients/{user.id}`
 *
 * [PUT]: https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
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

// !SECTION
