export enum CloseCodes {
	UnknownError = 4000,
	UnknownOPCode,
	DecodeError,
	NotAuthenticated,
	AuthenticationFailed,
	AlreadyAuthenticated,
	InvalidSeq = 4007,
	RateLimited,
	SessionTimedOut,
	InvalidShard,
	ShardingRequired,
	InvalidAPIVersion,
	InvalidIntents,
	DisallowedIntents
}

export enum HTTPCodes {
	Ok = 200,
	Created,
	NoContent = 204,
	NotModified = 304,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidding = 403,
	NotFound,
	DisallowedMethod,
	RateLimited = 429,
	Unavailable = 502
}

export enum OPCodes {
	Dispatch,
	Heartbeat,
	Identify,
	StatusUpdate,
	VoiceStateUpdate,
	VoiceGuildPing,
	Resume,
	Reconnect,
	RequestGuildMembers,
	InvalidSession,
	Hello,
	HeartbeatAck
}

export enum RPCCloseCodes {
	InvalidClientID = 4000,
	InvalidOrigin,
	RateLimited,
	TokenRevoked,
	InvalidVersion,
	InvalidEncoding
}

export enum RPCCodes {
	UnknownError = 1000,
	InvalidPayload = 4000,
	InvalidCommand = 4002,
	InvalidGuild,
	InvalidEvent,
	InvalidChannel,
	InvalidPermissions,
	InvalidClientID,
	InvalidOrigin,
	InvalidToken,
	InvalidUser,
	OAuth2Error = 5000,
	SelectChannelTimedOut,
	GetGuildTimedOut,
	SelectVoiceForceRequired,
	CaptureShotcutAlreadyListening
}

export enum VoiceCloseCodes {
	UnknownOPCode = 4001,
	NotAuthenticated = 4003,
	AuthenticationFailed,
	AlreadyAuthenticated,
	InvalidSession,
	SessionTimeout = 4009,
	ServerNotFound = 4011,
	UnknownProtocol = 4012,
	Disconnected = 4014,
	VoiceServerCrashed,
	UnknownEncryptionMode
}

export enum VoiceOPCodes {
	Identify,
	SelectProtocol,
	Ready,
	Heartbeat,
	SessionDescription,
	Speaking,
	HeartbeatAck,
	Resume,
	Hello,
	Resumed,
	ClientDisconnect = 13
}
