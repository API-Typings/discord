export interface Embed {
	title?: string;
	type?: EmbedType;
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: EmbedFooter;
	image?: EmbedImage;
	thumbnail?: EmbedImage;
	video?: Omit<EmbedImage, 'proxy_url'>;
	provider?: EmbedProvider;
	author?: EmbedAuthor;
	fields?: EmbedField[];
}

export type EmbedAuthor = Omit<EmbedFooter, 'text'> & EmbedProvider;

export interface EmbedField {
	name: string;
	value: string;
	inline?: boolean;
}

export interface EmbedFooter {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface EmbedImage {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface EmbedProvider {
	name?: string;
	url?: string;
}

export enum EmbedLimits {
	Title = 256,
	Description = 2048,
	Fields = 25,
	FieldName = 256,
	FieldValue = 1024,
	Footer = 2048,
	Author = 256
}

export type EmbedType = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';
