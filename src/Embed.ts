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
	image?: EmbedImage;

	/**
	 * Thumbnail information
	 */
	thumbnail?: EmbedImage;

	/**
	 * Video information
	 */
	video?: Omit<EmbedImage, 'proxy_url'>;

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
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-author-structure Channel}
 */
export type EmbedAuthor = Omit<EmbedFooter, 'text'> & EmbedProvider;

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
 * @source Channel
 * [[1](https://discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure)]
 * [[2](https://discord.com/developers/docs/resources/channel#embed-object-embed-video-structure)]
 * [[3](https://discord.com/developers/docs/resources/channel#embed-object-embed-image-structure)]
 */
export interface EmbedImage {
	/**
	 * Source url of thumbnail, image (only supports http(s) and attachments), or video
	 */
	url?: string;

	/**
	 * A proxied url of the thumbnail or image
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
 * All of the following limits are measured inclusively. Leading and trailing whitespace characters are not included (they are trimmed automatically)
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-limits-limits Channel}
 */
export enum EmbedLimits {
	Title = 256,
	Description = 2048,
	Fields = 25,
	FieldName = 256,
	FieldValue = 1024,
	Footer = 2048,
	Author = 256
}

/**
 * Embed types are "loosely defined" and, for the most part, are not used by our clients for rendering.
 * Embed attributes power what is rendered. Embed types should be considered deprecated and might be removed in a future API version
 *
 * @source {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-types Channel}
 */
export type EmbedType = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';
