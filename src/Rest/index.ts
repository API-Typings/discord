export * from './Request';
export * from './Response';

export interface GetBotGateway {
	url: string;
	shards: number;
	session_start_limit: SessionStartLimit;
}

export interface GetBotGatewayReq {
	v: number;
	encoding: EncodingType;
	compress?: 'zlib-stream';
}

export interface SessionStartLimit {
	total: number;
	remaining: number;
	reset_after: number;
}

export type EncodingType = 'json' | 'etf';
