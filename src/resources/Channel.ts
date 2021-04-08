import type { FixedTuple, Nullable, Range } from 'extended-utility-types';
import type {
	GuildMember,
	Invite,
	InviteMetadata,
	InviteTargetType,
	MessageInteraction,
	PartialApplication,
	PartialEmoji,
	Snowflake,
	User
} from '../';

// SECTION Channel Types

// ANCHOR Partial Channel

export interface PartialChannel {
	/**
	 * The ID of this channel.
	 */
	id: Snowflake;

	/**
	 * The type of Channel.
	 */
	type: ChannelType;

	/**
	 * The name of the channel (2-100 characters).
	 */
	name: string;

	/**
	 * The computed permissions for the invoking user in that channel, including overwrites
	 */
	permissions: string;
}

/**
 * Represents a guild or DM channel within Discord.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-structure|Channel}
 */
export interface Channel extends PartialChannel {
	/**
	 * The ID of the guild.
	 */
	guild_id: Snowflake;

	/**
	 * Sorting position of the channel.
	 */
	position: number;

	/**
	 * Explicit permission overwrites for members and roles.
	 */
	permission_overwrites: Overwrite[];

	/**
	 * The channel topic (0-1024 characters).
	 */
	topic: Nullable<string>;

	/**
	 * Whether the channel is NSFW.
	 */
	nsfw: boolean;

	/**
	 * ID of the parent category for a channel (each parent category can contain up to 50 channels).
	 */
	parent_id: Nullable<string>;
}

// ANCHOR Channel Type

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types|Channel}
 */
export enum ChannelType {
	/**
	 * A text channel within a server.
	 */
	GuildText,

	/**
	 * A direct message between users.
	 */
	DM,

	/**
	 * A voice channel within a server.
	 */
	GuildVoice,

	/**
	 * A direct message between multiple users.
	 */
	GroupDM,

	/**
	 * An organizational category that contains up to 50 channels.
	 */
	GuildCategory,

	/**
	 * A channel that users can follow and crosspost into their own server.
	 */
	GuildNews,

	/**
	 * A channel in which game developers can sell their game on Discord.
	 */
	GuildStore

	/**
	 * Undocumented & unusable channel types; here for when they're released.
	 *
	 * PUBLIC_THREAD = 11
	 * PRIVATE_THREAD = 12
	 * GUILD_STAGE_VOICE = 13
	 */
}

// ANCHOR Text Channel

/**
 * A text channel within a server.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-text-|Channel}
 */
export interface TextChannel extends Channel {
	/**
	 * The ID of the last message sent in this channel (may not point to an existing or valid
	 * message).
	 */
	last_message_id: Nullable<Snowflake>;

	/**
	 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as
	 * well as users with the permission `manage_messages` or `manage_channel`, are unaffected.
	 */
	rate_limit_per_user: number;

	/**
	 * When the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE`
	 * when a message is not pinned.
	 */
	last_pin_timestamp: Nullable<string>;
}

// ANCHOR News Channel

/**
 * A channel that users can follow and crosspost into their own server. Bots can post or
 * publish messages in this type of channel if they have the proper permissions.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-news-channel|Channel}
 */
export type NewsChannel = Omit<TextChannel, 'rate_limit_per_user'>;

// ANCHOR Voice Channel

/**
 * A voice channel within a server.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-guild-voice-channel|Channel}
 */
export interface VoiceChannel extends Channel {
	/**
	 * The bitrate (in bits) of the voice channel.
	 */
	bitrate: number;

	/**
	 * The user limit of the voice channel.
	 */
	user_limit: number;

	/**
	 * Voice region ID for the voice channel, automatic when set to `null`.
	 */
	rtc_region: Nullable<string>;
}

// ANCHOR DM Channel

/**
 * A direct message between users.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-dm-channel|Channel}
 */
/* prettier-ignore */
/* eslint-disable-next-line */
export interface DMChannel extends Pick<Channel, 'id'|'type'>, Pick<TextChannel, 'last_message_id'|'last_pin_timestamp'> {
	/**
	 * The recipients of the DM.
	 */
	recipients: User[];

	/**
	 * Application ID of the group DM creator if it is bot-created.
	 */
	application_id?: Snowflake;
}

// ANCHOR Group DM Channel

/**
 * A direct message between multiple users.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-group-dm-channel|Channel}
 */
export interface GroupDMChannel extends DMChannel, Nullable<Pick<Channel, 'name'>> {
	/**
	 * The nicknames that are set for a group DM channel's recipients.
	 */
	nicks: ChannelNickname[];

	/**
	 * Icon hash.
	 */
	icon: Nullable<string>;

	/**
	 * ID of the DM creator.
	 */
	owner_id: Snowflake;
}

// ANCHOR Channel Category

/**
 * An organizational category that contains up to 50 channels.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-channel-category|Channel}
 */
export type ChannelCategory = Omit<Channel, 'topic'>;

// ANCHOR Store Channel

/**
 * A channel in which game developers can sell their game on Discord.
 *
 * @remarks
 * Bots can neither send or read messages from this channel type (as it is a store page).
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-object-example-store-channel|Channel}
 */
export type StoreChannel = Omit<Channel, 'topic'>;

// !SECTION

// SECTION Message

/**
 * Represents a message sent in a channel within Discord.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-structure|Channel}
 */
export interface Message {
	/**
	 * ID of the message.
	 */
	id: Snowflake;

	/**
	 * ID of the channel the message was sent in.
	 */
	channel_id: Snowflake;

	/**
	 * ID of the guild the message was sent in.
	 */
	guild_id?: Snowflake;

	/**
	 * The author of this message (not guaranteed to be a valid user).
	 *
	 * @remarks
	 * The author object follows the structure of the user object, but is only a valid user in the
	 * case where the message is generated by a user or bot user. If the message is generated by a
	 * webhook, the author object corresponds to the webhook's ID, username, and avatar. You can
	 * tell if a message is generated by a webhook by checking for the `webhook_id` on the message
	 * object.
	 */
	author: User;

	/**
	 * Member properties for this message's author.
	 *
	 * @remarks
	 * The member object exists in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from
	 * text-based guild channels. This allows bots to obtain real-time member data without
	 * requiring bots to store member state in memory.
	 */
	member?: GuildMember;

	/**
	 * Contents of the message.
	 */
	content: string;

	/**
	 * When this message was sent.
	 */
	timestamp: string;

	/**
	 * When this message was edited (or `null` if never).
	 */
	edited_timestamp?: Nullable<string>;

	/**
	 * Whether this was a TTS message.
	 */
	tts: boolean;

	/**
	 * Whether this message mentions everyone.
	 */
	mention_everyone: boolean;

	/**
	 * Users specifically mentioned in the message.
	 *
	 * @remarks
	 * The user objects in the mentions array will only have the partial `member` field present in
	 * `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels.
	 */
	mentions: UserMention[];

	/**
	 * Roles specifically mentioned in this message.
	 */
	mention_roles: Snowflake[];

	/**
	 * Any attached files.
	 */
	attachments: Attachment[];

	/**
	 * Any embedded content.
	 */
	embeds: Embed[];

	/**
	 * Reactions to the message.
	 */
	reactions?: Reaction[];

	/**
	 * Used for validating a message was sent.
	 */
	nonce?: number | string;

	/**
	 * Whether this message is pinned.
	 */
	pinned: boolean;

	/**
	 * If the message is generated by a webhook, this is the webhook's ID.
	 */
	webhook_id?: Snowflake;

	/**
	 * Type of message
	 */
	type: MessageType;

	/**
	 * Sent with Rich Presence-related chat embeds.
	 */
	activity?: MessageActivity;

	/**
	 * Sent with Rich Presence-related chat embeds.
	 */
	application?: PartialApplication;

	/**
	 * Message flags combined as a bitfield.
	 */
	flags?: MessageFlags;

	/**
	 * The stickers sent with the message (bots currently can only receive messages with stickers,
	 * not send).
	 */
	stickers?: Sticker[];

	/**
	 * The message associated with the `message_reference`.
	 *
	 * @remarks
	 * This field is only returned for messages with a `type` of `19` (`REPLY`). If the message is
	 * a reply but the `referenced_message` field is not present, the backend did not attempt to
	 * fetch the message that was being replied to, so its state is unknown. If the field exists
	 * but is null, the referenced message was deleted.
	 */
	referenced_message?: Nullable<Message>;

	/**
	 * Sent if the message is a response to an Interaction.
	 */
	interaction?: MessageInteraction;
}

export interface UserMention extends User {
	member?: Partial<Omit<GuildMember, 'user'>>;
}

// ANCHOR Message Type Enum

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-types|Channel}
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
	ApplicationCommand,
	GuildInviteReminder = 22
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-structure|Channel}
 */
export interface MessageActivity {
	/**
	 * Type of message activity.
	 */
	type: MessageActivityType;

	/**
	 * `party_id` from a Rich Presence event.
	 */
	party_id?: string;
}

// ANCHOR Message Reference

/**
 * There are four situations in which a message has a `message_reference` object:
 *
 * **Crosspost Messages** – messages that originated from another channel (`IS_CROSSPOST` flag).
 * - These messages have all three fields, with data of the original message that was crossposted.
 *
 * **Channel Follow Add Messages** – automatic messages sent when a channel is followed into the
 * current channel (type `12`).
 * - These messages have the `channel_id` and `guild_id` fields, with data of the followed
 * announcement channel.
 *
 * **Pin Messages** – automatic messages sent when a message is pinned (type `6`).
 * - These messages have `message_id` and `channel_id`, and `guild_id` if it is in a guild, with
 * data of the message that was pinned.
 *
 * **Replies** – messages replying to a previous message (type `19`).
 * - These messages have `message_id` and `channel_id`, and `guild_id` if it is in a guild, with
 * data of the message that was replied to. The `channel_id` and `guild_id` will be the same as
 * the reply. Replies are created by including a `message_reference` when sending a message.
 * When sending, only `message_id` is required.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-reference-structure|Channel}
 */
export interface MessageReference {
	/**
	 * ID of the originating message.
	 */
	message_id?: Snowflake;

	/**
	 * ID of the originating message's channel.
	 *
	 * @remarks
	 * `channel_id` is optional when creating a reply, but will always be present when receiving an
	 * event/response that includes this data model.
	 */
	channel_id?: Snowflake;

	/**
	 * ID of the originating message's guild.
	 */
	guild_id?: Snowflake;

	/**
	 * When sending, whether to error if the referenced message doesn't exist instead of sending as
	 * a normal (non-reply) message.
	 *
	 * @defaultValue true
	 */
	fail_if_not_exists?: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-activity-types|Channel}
 */
export enum MessageActivityType {
	Join = 1,
	Spectate,
	Listen,
	JoinRequest = 5
}

// ANCHOR Message Flags

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-flags|Channel}
 */
export enum MessageFlags {
	/**
	 * This message has been published to subscribed channels (via Channel Following).
	 */
	Crossposted = 1 << 0,

	/**
	 * This message originated from a message in another channel (via Channel Following).
	 */
	IsCrosspost = 1 << 1,

	/**
	 * Do not include any embeds when serializing this message.
	 */
	SuppressEmbeds = 1 << 2,

	/**
	 * The source message for this crosspost has been deleted (via Channel Following).
	 */
	SourceDeleted = 1 << 3,

	/**
	 * This message came from the urgent message system.
	 */
	Urgent = 1 << 4,

	/**
	 * This message is only visible to the user who did the Interaction.
	 */
	Ephemeral = 1 << 6,

	/**
	 * This message is an `InteractionResponse` and the bot is "thinking".
	 */
	Loading = 1 << 7
}

// ANCHOR Sticker

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-sticker-structure|Channel}
 */
export interface Sticker {
	/**
	 * ID of the sticker.
	 */
	id: Snowflake;

	/**
	 * ID of the pack the sticker is from.
	 */
	pack_id: Snowflake;

	/**
	 * Name of the sticker.
	 */
	name: string;

	/**
	 * Description of the sticker.
	 */
	description: string;

	/**
	 * A comma-separated list of tags for the sticker.
	 */
	tags?: string;

	/**
	 * Sticker asset hash.
	 */
	asset: string;

	/**
	 * Sticker preview asset hash.
	 */
	preview_asset: string;

	/**
	 * Type of sticker format.
	 */
	format_type: StickerFormat;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-message-sticker-format-types|Channel}
 */
export enum StickerFormat {
	PNG = 1,
	APNG,
	LOTTIE
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#message-object-example-crossposted-message|Channel}
 */
export interface CrosspostedMessage extends Message {
	/**
	 * Channels specifically mentioned in this message.
	 */
	mention_channels?: ChannelMention[];

	/**
	 * Data showing the source of a crosspost, channel follow add, pin, or reply message.
	 */
	message_reference: MessageReference;
}

// !SECTION

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure|Channel}
 */
export interface FollowedChannel {
	/**
	 * Source channel ID.
	 */
	channel_id: Snowflake;

	/**
	 * Created target webhook ID.
	 */
	webhook_id: Snowflake;
}

// ANCHOR Reaction

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#reaction-object-reaction-structure|Channel}
 */
export interface Reaction {
	/**
	 * Times this emoji has been used to react.
	 */
	count: number;

	/**
	 * Whether the current user reacted using this emoji.
	 */
	me: boolean;

	/**
	 * Emoji information.
	 */
	emoji: PartialEmoji;
}

// ANCHOR Overwrite

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure|Channel}
 */
export interface Overwrite {
	/**
	 * Role or user ID.
	 */
	id: Snowflake;

	/**
	 * Either 0 (role) or 1 (member).
	 */
	type: OverwriteType;

	/**
	 * Permission bit set.
	 */
	allow: string;

	/**
	 * Permission bit set.
	 */
	deny: string;
}

// SECTION Embed

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure|Channel}
 */
export interface Embed {
	/**
	 * Title of embed.
	 */
	title?: string;

	/**
	 * Type of embed (always `rich` for webhook embeds).
	 */
	type?: EmbedType;

	/**
	 * Description of embed.
	 */
	description?: string;

	/**
	 * URL of embed.
	 */
	url?: string;

	/**
	 * Timestamp of the embed content.
	 */
	timestamp?: string;

	/**
	 * Color code of the embed.
	 */
	color?: number;

	/**
	 * Footer information.
	 */
	footer?: EmbedFooter;

	/**
	 * Image information.
	 */
	image?: EmbedImage;

	/**
	 * Thumbnail information.
	 */
	thumbnail?: EmbedThumbnail;

	/**
	 * Video information.
	 */
	video?: EmbedVideo;

	/**
	 * Prodvider information.
	 */
	provider?: EmbedProvider;

	/**
	 * Author information.
	 */
	author?: EmbedAuthor;

	/**
	 * Fields information.
	 */
	fields?: Partial<FixedTuple<EmbedField, 25>>;
}

/**
 * Embed types are "loosely defined" and, for the most part, are not used by the clients for
 * rendering. Embed attributes power what is rendered. Embed types should be considered deprecated
 * and might be removed in a future API version.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-types|Channel}
 */
export enum EmbedType {
	/**
	 * Generic embed rendered from embed attributes.
	 */
	Rich = 'rich',

	/**
	 * Image embed.
	 */
	Image = 'image',

	/**
	 * Video embed.
	 */
	Video = 'video',

	/**
	 * Animated gif image embed rendered as a video embed.
	 */
	GIFV = 'gifv',

	/**
	 * Article embed.
	 */
	Article = 'article',

	/**
	 * Link embed.
	 */
	Link = 'link'
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure|Channel}
 */
export interface EmbedThumbnail {
	/**
	 * Source URL of thumbnail or image (only supports http[s] and attachments), or video.
	 */
	url?: string;

	/**
	 * A proxied URL of the thumbnail, image, or video.
	 */
	proxy_url?: string;

	/**
	 * Height of thumbnail, image, or video.
	 */
	height?: number;

	/**
	 * Width of thumbnail, image, or video.
	 */
	width?: number;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure|Channel}
 */
export type EmbedVideo = EmbedThumbnail;

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure|Channel}
 */
export type EmbedImage = EmbedThumbnail;

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure|Channel}
 */
export interface EmbedProvider {
	/**
	 * Name of provider or author.
	 */
	name?: string;

	/**
	 * URL of provider or author.
	 */
	url?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure|Channel}
 */
export type EmbedAuthor = Omit<EmbedFooter, 'text'> & EmbedProvider;

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure|Channel}
 */
export interface EmbedFooter {
	/**
	 * Footer text.
	 */
	text: string;

	/**
	 * URL of footer or author icon (only supports http[s] and attachments).
	 */
	icon_url?: string;

	/**
	 * A proxied URL of footer or author icon.
	 */
	proxy_icon_url?: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-field-structure|Channel}
 */
export interface EmbedField {
	/**
	 * Name of the field.
	 */
	name: string;

	/**
	 * Value of the field.
	 */
	value: string;

	/**
	 * Whether or not this field should display inline.
	 */
	inline?: boolean;
}

// !SECTION

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#attachment-object-attachment-structure|Channel}
 */
export interface Attachment {
	/**
	 * Attachment ID.
	 */
	id: Snowflake;

	/**
	 * Name of file attached.
	 */
	filename: string;

	/**
	 * The attachment's media type.
	 */
	content_type?: string;

	/**
	 * Size of file in bytes.
	 */
	size: number;

	/**
	 * Source URL of file.
	 */
	url: string;

	/**
	 * A proxied URL of file.
	 */
	proxy_url: string;

	/**
	 * Height of file (if image).
	 */
	height?: Nullable<number>;

	/**
	 * Width of file (if image).
	 */
	width?: Nullable<number>;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#channel-mention-object-channel-mention-structure|Channel}
 */
export interface ChannelMention {
	/**
	 * ID of the channel.
	 */
	id: Snowflake;

	/**
	 * ID of the guild containing the channel.
	 */
	guild_id: Snowflake;

	/**
	 * The type of Channel.
	 */
	type: ChannelType;

	/**
	 * The name of the channel.
	 */
	name: string;
}

/**
 * @source {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types|Channel}
 */
export type AllowedMentionsType = 'roles' | 'users' | 'everyone';

/**
 * The allowed mention field allows for more granular control over mentions without various hacks
 * to the message content. This will always validate against message content to avoid phantom pings
 * (e.g. to ping everyone, you must still have `@everyone` in the message content), and check
 * against user/bot permissions.
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mentions-structure|Channel}
 */
export interface AllowedMentions {
	/**
	 * An array of allowed mention types to parse from the content.
	 */
	parse: AllowedMentionsType[];

	/**
	 * Array of `role_id`s to mention (max size of 100).
	 */
	roles: Snowflake[];

	/**
	 * Array of `user_id`s to mention (max size of 100).
	 */
	users: Snowflake[];

	/**
	 * For replies, whether to mention the author of the message being replied to.
	 *
	 * @defaultValue false
	 */
	replied_user?: boolean;
}

// ANCHOR Embed Limits

/**
 * All of the following limits are measured inclusively. Leading and trailing whitespace
 * characters are not included (they are trimmed automatically).
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-limits-limits|Channel}
 */
export enum EmbedLimit {
	/**
	 * 256 characters.
	 */
	Title = 256,

	/**
	 * 2048 characters.
	 */
	Description = 2048,

	/**
	 * Up to 25 field objects.
	 */
	Fields = 25,

	/**
	 * 256 characters.
	 */
	FieldName = 256,

	/**
	 * 1024 characters.
	 */
	FieldValue = 1024,

	/**
	 * 2048 characters.
	 */
	Footer = 2048,

	/**
	 * 256 characters.
	 */
	Author = 256
}

export interface ChannelNickname {
	/**
	 * The ID of the user this nickname is applied to.
	 */
	id: Snowflake;

	/**
	 * The user's nickname.
	 */
	nick: string;
}

export enum OverwriteType {
	Role,
	GuildMember
}

// SECTION Endpoints

/**
 * Get a channel by ID.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#get-channel) `/channels/{channel.id}`
 */
export type GetChannel = { response: Channel };

/**
 * Update a channel's settings. Requires the `MANAGE_CHANNELS` permission.
 *
 * If modifying permission overwrites, the MANAGE_ROLES permission is required. Only permissions
 * your bot has in the guild or channel can be allowed/denied (unless your bot has a `MANAGE_ROLES`
 * overwrite in the channel).
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/channel#modify-channel) `/channels/{channel.id}`
 */
export interface ModifyChannel {
	body: {
		/**
		 * 2-100 character channel name. Applies to all channel types.
		 */
		name?: string;

		/**
		 * The type of Channel; only conversion between text and news is supported and only in
		 * guilds with the `NEWS` feature. Applies to text and news channels.
		 */
		type?: ChannelType;

		/**
		 * The position of the channel in the left-hand listing. Applies to all channel types.
		 */
		position?: Nullable<number>;

		/**
		 * 0-1024 character channel topic. Applies to text or news channels.
		 */
		topic?: Nullable<string>;

		/**
		 * Whether the channel is NSFW. Applies to text, news, or store channels.
		 */
		nsfw?: Nullable<boolean>;

		/**
		 * Amount of seconds a user has to wait before sending another message (0-21600); bots, as
		 * well as users with the permission `manage_messages` or `manage_channel`, are unaffected.
		 * Applies to text channels.
		 */
		rate_limit_per_user?: Nullable<number>;

		/**
		 * The bitrate (in bits) of the voice channel; 8000 to 96000 (128000 for VIP servers).
		 * Applies to voice channels.
		 */
		bitrate?: Nullable<number>;

		/**
		 * The user limit of the voice channel; 0 refers to no limit, 1 to 99 refers to a user
		 * limit. Applies to voice channels.
		 */
		user_limit?: Nullable<Range<0, 99>>;

		/**
		 * Channel or category-specific permissions. Applies to all channel types.
		 */
		permission_overwrites?: Nullable<Overwrite[]>;

		/**
		 * ID of the new parent category for a channel. Applies to all channel types except
		 * categories.
		 */
		parent_id?: Nullable<Snowflake>;

		/**
		 * Image for the channel icon. Applies to group DMs.
		 */
		icon?: string;

		/**
		 * Channel voice region ID, automatic when set to `null`. Applies to voice channels.
		 */
		rtc_region?: Nullable<string>;
	};

	response: Channel;
}

/**
 * Delete a channel. Requires the `MANAGE_CHANNELS` permission.
 *
 * @remarks
 * - Deleting a category does not delete its child channels; they will have their `parent_id`
 * removed.
 * - For Community guilds, the Rules or Guidelines channel and the Community Updates channel cannot
 * be deleted.
 * - Deleting a guild channel cannot be undone. Use this with caution, as it is impossible to undo
 * this action.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#deleteclose-channel) `/channels/{channel.id}`
 */
export type DeleteChannel = { response: Channel };

/**
 * Close a private message.
 *
 * @remarks
 * It is possible to undo this action by opening a private message with the recipient again.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#deleteclose-channel) `/channels/{channel.id}`
 */
export type CloseChannel = { response: Channel };

/**
 * Returns the messages for a channel.
 *
 * @remarks
 * - If operating on a guild channel, this endpoint requires the `VIEW_CHANNEL` permission to be
 * present on the current user.
 * - If the current user is missing the `READ_MESSAGE_HISTORY` permission in the channel then this
 * will return no messages (since they cannot read the message history).
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#get-channel-messages) `/channels/{channel.id}/messages`
 */
export interface GetChannelMessages {
	/**
	 * @remarks
	 * The before, after, and around keys are mutually exclusive, only one may be passed at a time.
	 */
	query: {
		/**
		 * Get messages around this message ID.
		 */
		around?: Snowflake;

		/**
		 * Get messages before this message ID.
		 */
		before?: Snowflake;

		/**
		 * Get messages after this message ID.
		 */
		after?: Snowflake;

		/**
		 * Max number of messages to return (1-100).
		 *
		 * @defaultValue 50
		 */
		limit?: Range<1, 100>;
	};

	/**
	 * An array of message objects, sorted by their ID in descending order.
	 */
	response: Message[];
}

/**
 * Returns a specific message in the channel.
 *
 * If operating on a guild channel, this endpoint requires the `READ_MESSAGE_HISTORY` permission to
 * be present on the current user.
 */
export type GetChannelMessage = { response: Message };

// SECTION Create Message

// ANCHOR JSON

/**
 * Post a message to a guild text or DM channel.
 *
 * @remarks
 * Note that when sending `application/json` you must send at **least one of** `content` or `embed`.
 *
 * **Limitations**
 * - When operating on a guild channel, the current user must have the `SEND_MESSAGES` permission
 * - When sending a message with `tts` (text-to-speech) set to `true`, the current user must have
 * the `SEND_TTS_MESSAGES` permission,
 * - When creating a message as a reply to another message, the current user must have the
 * `READ_MESSAGE_HISTORY` permission,
 * - The referenced message must exist and cannot be a system message,
 * - The maximum request size when sending a message is **8MB**,
 * - For the embed object, you can set every field except `type` (it will be `rich` regardless of
 * if you try to set it), `provider`, `video`, and any `height`, `width`, or `proxy_url` values
 * for images,
 * - **Files can only be uploaded when using the `multipart/form-data` content type**,
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#create-message) `/channels/{channel.id}/messages`
 */
export interface CreateMessageJSON {
	body: {
		/**
		 * The message contents (up to 2000 characters).
		 */
		content?: string;

		/**
		 * A nonce that can be used for optimistic message sending (up to 25 characters).
		 */
		nonce?: number | string;

		/**
		 * True if this is a TTS message.
		 */
		tts?: boolean;

		/**
		 * Embedded rich content.
		 */
		embed?: Embed;

		/**
		 * Allowed mentions for a message.
		 */
		allowed_mentions?: AllowedMentions;

		/**
		 * Include to make your message a reply.
		 */
		message_reference?: MessageReference;
	};

	response: Message;
}

// ANCHOR Form-Data

/**
 * Post a message to a guild text or DM channel.
 *
 * @remarks
 * - This endpoint supports all the same fields as its `application/json` counterpart, however they
 * must be set in `payload_json` rather than provided as form fields. Some fields can be provided
 * as `form-data` fields, but if you supply a `payload_json`, **all fields except for `file` fields
 * will be ignored**.
 * - Note that when sending `multipart/form-data`, you must provide a value for at **least one of**
 * `content`, `embed` or `file`. For a `file` attachment, the `Content-Disposition` subpart header
 * MUST contain a `filename` parameter.
 *
 * **Limitations**
 * - When operating on a guild channel, the current user must have the `SEND_MESSAGES` permission
 * - When sending a message with `tts` (text-to-speech) set to `true`, the current user must have
 * the `SEND_TTS_MESSAGES` permission
 * - When creating a message as a reply to another message, the current user must have the
 * `READ_MESSAGE_HISTORY` permission
 * - The referenced message must exist and cannot be a system message
 * - The maximum request size when sending a message is **8MB**
 * - For the embed object, you can set every field except `type` (it will be `rich` regardless of
 * if you try to set it), `provider`, `video`, and any `height`, `width`, or `proxy_url` values
 * for images
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#create-message) `/channels/{channel.id}/messages`
 */
export interface CreateMessageFormData {
	body: {
		/**
		 * The message contents (up to 2000 characters).
		 */
		content?: string;

		/**
		 * A nonce that can be used for optimistic message sending.
		 */
		nonce?: number | string;

		/**
		 * True if this is a TTS message.
		 */
		tts?: boolean;

		/**
		 * The contents of the file being sent.
		 */
		file?: unknown;

		/**
		 * JSON encoded body of any additional request fields.
		 */
		payload_json?: string;
	};

	response: Message;
}

// !SECTION

/**
 * Crosspost a message in a News Channel to following channels. This endpoint requires the
 * `SEND_MESSAGES` permission, if the current user sent the message, or additionally the
 * `MANAGE_MESSAGES` permission, for all other messages, to be present for the current user.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#crosspost-message) `/channels/{channel.id}/messages/{message.id}/crosspost`
 */
export type CrosspostMessage = { response: Message };

/**
 * Create a reaction for the message. This endpoint requires the `READ_MESSAGE_HISTORY` permission
 * to be present on the current user. Additionally, if nobody else has reacted to the message using
 * this emoji, this endpoint requires the `ADD_REACTIONS` permission to be present on the current
 * user.
 *
 * The `emoji` must be URL Encoded or the request will fail with `10014: Unknown Emoji`.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#create-reaction) `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
 */
export type CreateReaction = { response: never };

/**
 * Delete a reaction the current user has made for the message.
 *
 * The `emoji` must be URL Encoded or the request will fail with `10014: Unknown Emoji`.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-own-reaction) `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me`
 */
export type DeleteOwnReaction = { response: never };

/**
 * Deletes another user's reaction. This endpoint requires the `MANAGE_MESSAGES` permission to be
 * present on the current user.
 *
 * The `emoji` must be URL Encoded or the request will fail with `10014: Unknown Emoji`.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-user-reaction) `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}`
 */
export type DeleteUserReaction = { response: never };

/**
 * Get a list of users that reacted with this emoji.
 *
 * The `emoji` must be URL Encoded or the request will fail with `10014: Unknown Emoji`.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#get-reactions) `/channels/{channel.id}/messages/{message.id}/reactions/{emoji.id}`
 */
export interface GetReactions {
	query: {
		/**
		 * Get users after this user ID.
		 */
		after?: Snowflake;

		/**
		 * Max number of users to return (1-100).
		 *
		 * @defaultValue 25
		 */
		limit?: Range<1, 100>;
	};

	/**
	 * An array of user objects, sorted by their ID in ascending order.
	 */
	response: User[];
}

/**
 * Deletes all reactions on a message. This endpoint requires the `MANAGE_MESSAGES` permission to
 * be present on the current user.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-all-reactions) `/channels/{channel.id}/messages/{message.id}/reactions`
 */
export type DeleteAllReactions = { response: never };

/**
 * Deletes all the reactions for a given emoji on a message. This endpoint requires the
 * `MANAGE_MESSAGES` permission to be present on the current user.
 *
 * The `emoji` must be URL Encoded or the request will fail with `10014: Unknown Emoji`.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-all-reactions-for-emoji) `/channels/{channel.id}/messages/{message.id}/reactions/{emoji}`
 */
export type DeleteAllEmojiReactions = { response: never };

/**
 * Edit a previously sent message.
 *
 * @remarks
 * The fields `content`, `embed`, `allowed_mentions` and `flags` can be edited by the original
 * message author. Other users can only edit `flags` and only if they have the `MANAGE_MESSAGES`
 * permission in the corresponding channel. When specifying `flags`, ensure to include all
 * previously set flags/bits in addition to ones that you are modifying. Only `flags` documented in
 * the table below may be modified by users (unsupported flag changes are currently ignored without
 * error).
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/resources/channel#edit-message) `/channels/{channel.id}/messages/{message.id}`
 */
export interface EditMessage {
	body: {
		/**
		 * The new message contents (up to 2000 characters),
		 */
		content?: Nullable<string>;

		/**
		 * Embedded `rich` content,
		 */
		embed?: Nullable<Embed>;

		/**
		 * Edit the flags of a message (only `SUPPRESS_EMBEDS` can currently be set/unset).
		 */
		flags?: Nullable<number>;

		/**
		 * Allowed mentions for the message.
		 */
		allowed_mentions?: Nullable<AllowedMentions>;
	};
}

/**
 * Delete a message.
 *
 * If operating on a guild channel and trying to delete a message that was not sent by the current
 * user, this endpoint requires the `MANAGE_MESSAGES` permission.
 */
export type DeleteMessage = { response: never };

/**
 * Delete multiple messages in a single request. This endpoint can only be used on guild channels
 * and requires the `MANAGE_MESSAGES` permission.
 *
 * Any message IDs given that do not exist or are invalid will count towards the minimum and
 * maximum message count (currently 2 and 100 respectively).
 *
 * @remarks
 * This endpoint will not delete messages older than 2 weeks, and will fail with a `400 BAD REQUEST`
 * if any message provided is older than that or if any duplicate message IDs are provided.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#bulk-delete-messages) `/channels/{channel.id}/messages/bulk-delete`
 */
export interface BulkDeleteMessages {
	body: {
		/**
		 * An array of message IDs to delete (2-100).
		 */
		messages: Snowflake[];
	};

	response: never;
}

/**
 * Edit the channel permission overwrites for a user or role in a channel. Requires the
 * `MANAGE_ROLES` permission. Only usable for guild channels.
 *
 * Only permissions your bot has in the guild or channel can be
 * allowed/denied (unless your bot has a `MANAGE_ROLES` overwrite in the channel).
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#edit-channel-permissions) `/channels/{channel.id}/permissions/{overwrite.id}`
 */
export interface EditChannelPermissions {
	body: {
		/**
		 * The bitwise value of all allowed permissions.
		 */
		allow?: string;

		/**
		 * The bitwise value of all disallowed permissions.
		 */
		deny?: string;

		/**
		 * 0 for a role or 1 for a member.
		 */
		type?: 0 | 1;
	};

	response: never;
}

/**
 * Returns a list of invite objects (with invite metadata) for the channel. Requires the
 * `MANAGE_CHANNELS` permission. Only usable for guild channels.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#get-channel-invites) `/channels/{channel.id}/invites`
 */
export type GetChannelInvites = { response: InviteMetadata[] };

/**
 * Create a new invite object for the channel. Requires the `CREATE_INSTANT_INVITE` permission. Only
 * usable for guild channels.
 *
 * @remarks
 * All JSON parameters for this route are optional, however the request body is not. If you are not
 * sending any fields, you still have to send an empty JSON object (`{}`).
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#create-channel-invite) `/channels/{channel.id}/invites`
 */
export interface CreateChannelInvite {
	body:
		| {
				/**
				 * Duration of invite in seconds before expiry, or 0 for never. Between 0 and
				 * 604800 (7 days).
				 *
				 * @defaultValue 86400 (24 hours)
				 */
				max_age?: number;

				/**
				 * Max number of uses or 0 for unlimited. Between 0 and 100.
				 *
				 * @defaultValue 0
				 */
				max_uses?: Range<0, 100>;

				/**
				 * Whether this invite only grants temporary membership.
				 *
				 * @defaultValue false
				 */
				temporary?: boolean;

				/**
				 * If true, don't try to reuse a similar invite (useful for creating many unique
				 * one time use invites).
				 *
				 * @defaultValue false
				 */
				unique?: boolean;

				/**
				 * The type of target for this voice channel invite.
				 */
				target_type?: InviteTargetType;

				/**
				 * The ID of the user whose stream to display for this invite, required if
				 * `target_type` is 1, the user must be streaming in the channel.
				 */
				target_user_id?: Snowflake;

				/**
				 * The ID of the embedded application to open for this invite, required if
				 * `target_type` is 2, the application must have the `EMBEDDED` flag.
				 */
				target_application_id?: Snowflake;
		  }
		| Record<string, never>;

	response: Invite;
}

/**
 * Delete a channel permission overwrite for a user or role in a channel. Requires the
 * `MANAGE_ROLES` permission. Only usable for guild channels.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-channel-permission) `/channels/{channel.id}/permissions/{overwrite.id}`
 */
export type DeleteChannelPermission = { response: never };

/**
 * Follow a News Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS`
 * permission in the target channel.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#follow-news-channel) `/channels/{channel.id}/followers`
 */
export interface FollowNewsChannel {
	body: {
		/**
		 * ID of target channel.
		 */
		webhook_channel_id: Snowflake;
	};

	response: FollowedChannel;
}

/**
 * Post a typing indicator for the specified channel.
 *
 * @remarks
 * Generally bots should **not** implement this route. However, if a bot is responding to a command
 * and expects the computation to take a few seconds, this endpoint may be called to let the user
 * know that the bot is processing their message.
 *
 * @endpoint [POST](https://discord.com/developers/docs/resources/channel#trigger-typing-indicator) `/channels/{channel.id}/typing`
 */
export type TriggerTypingIndicator = { response: never };

/**
 * Returns all pinned messages in the channel.
 *
 * @endpoint [GET](https://discord.com/developers/docs/resources/channel#get-pinned-messages) `/channels/{channel.id}/pins`
 */
export type GetPinnedMessages = { response: Message[] };

/**
 * Pin a message in a channel. Requires the `MANAGE_MESSAGES` permission.
 *
 * @remarks
 * The max pinned messages is 50.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#add-pinned-channel-message) `/channels/{channel.id}/pins/{message.id}`
 */
export type AddPinnedChannelMessage = { response: never };

/**
 * Delete a pinned message in a channel. Requires the `MANAGE_MESSAGES` permission.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#delete-pinned-channel-message) `/channels/{channel.id}/pins/{message.id}`
 */
export type DeletePinnedChannelMessage = { response: never };

/**
 * Adds a recipient to a Group DM using their access token.
 *
 * @endpoint [PUT](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient) `/channels/{channel.id}/recipients/{user.id}`
 */
export interface GroupDMAddRecipient {
	body: {
		/**
		 * Access token of a user that has granted your app the `gdm.join` scope.
		 */
		access_token: string;

		/**
		 * Nickname of the user being added.
		 */
		nick: string;
	};

	response: never;
}

/**
 * Removes a recipient from a Group DM.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/resources/channel#group-dm-delete-recipient) `/channels/{channel.id}/recipients/{user.id}`
 */
export type GroupDMRemoveRecipient = { response: never };

// !SECTION
