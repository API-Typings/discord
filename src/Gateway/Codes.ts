/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes Codes}
 */
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

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes Codes}
 */
export enum JSONErrorCodes {
	General,
	UnknownAccount = 10001,
	UnknownApplication,
	UnknownChannel,
	UnknownGuild,
	UnknownIntegration,
	UnknownInvite,
	UnknownMember,
	UnknownMessage,
	UnknownPermissionOverwrite,
	UnknownProvider,
	UnknownRole,
	UnknownToken,
	UnknownUser,
	UnknownEmoji,
	UnknownWebhook,
	UnknownBan = 10026,
	UnknownSKU,
	UnknownStoreListing,
	UnknownEntitlement,
	UnknownBuild,
	UnknownLobby,
	UnknownBranch,
	UnknownRedistributable = 10036,
	UnknownGuildTemplate = 10057,
	UnknownInteraction = 10062,
	ForbiddenBotEndpoint = 20001,
	BotOnlyEndpoint,
	AnnouncementRateLimit = 200022,
	ChannelRateLimit = 200028,
	MaximumGuildsReached = 30001,
	MaximumFriendsReached,
	MaximumPinsReached,
	MaximumRolesReached = 30005,
	MaximumWebhooksReached = 30007,
	MaximumReactionsReached = 30010,
	MaximumChannelsReached = 30013,
	MaximumAttachmentsReached = 30015,
	MaximumInvitesReached,
	GuildTemplateExists = 30031,
	Unauthorized = 40001,
	VerifiedAccountRequired,
	MaximumRequestSizeReached = 40005,
	FeatureTemporarilyDisabled,
	BannedUser,
	MessageAlreadyCrossposted = 40033,
	MissingAccess = 50001,
	InvalidAccountType,
	BlockedDMExecution,
	WidgetDisabled,
	InvalidMessageAuthor,
	EmptyMessage,
	BlockedDMSend,
	BlockedVoiceChannelSend,
	InvalidVerificationLevel,
	MissingOAuthApplicationBot,
	MaximumOAuthApplicationReached,
	InvalidOAuthState,
	InvalidPermissions,
	InvalidAuthenticationToken,
	MaximumNoteLengthReached,
	InvalidMessageDeleteAmount,
	InvalidChannelPin = 50019,
	InvalidInviteCode,
	BlockedSystemMessageExecution,
	BlockedChannelTypeExecution = 50024,
	InvalidOAuthToken,
	InvalidWebhookToen = 50027,
	InvalidRecipients = 50033,
	MaximumBulkDeleteAgeReached,
	InvalidFormBody,
	InvalidAcceptedBotInvite,
	InvalidAPIVersion = 50041,
	RequiredCommunityChannel = 50074,
	InvalidStickerSent = 50081,
	ReactionBlocked = 90001,
	APIOverloaded = 130000
}

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes Codes}
 */
export enum OPCodes {
	/**
	 * An event was dispatched
	 *
	 * @action Receive
	 */
	Dispatch,

	/**
	 * Fired periodically by the client to keep the connection alive
	 *
	 * @action Send, Receive
	 */
	Heartbeat,

	/**
	 * Starts a new session during the initial handshake
	 *
	 * @action Send
	 */
	Identify,

	/**
	 * Update the client's presence
	 *
	 * @action Send
	 */
	StatusUpdate,

	/**
	 * Used to join/leave or move between voice channels
	 *
	 * @action Send
	 */
	VoiceStateUpdate,
	VoiceGuildPing,

	/**
	 * Resume a previous session that was disconnected
	 *
	 * @action Send
	 */
	Resume,

	/**
	 * You should attempt to reconnect and resume immediately
	 *
	 * @action Receive
	 */
	Reconnect,

	/**
	 * Request information about offline guild members in a large guild
	 *
	 * @action Send
	 */
	RequestGuildMembers,

	/**
	 * The session has been invalidated. You should reconnect and identify/resume accordingly
	 *
	 * @action Receive
	 */
	InvalidSession,

	/**
	 * Sent immediately after connecting, contains the `heartbeat_interval` to use
	 *
	 * @action Receive
	 */
	Hello,

	/**
	 * Sent in response to receiving a heartbeat to acknowledge that it has been received
	 *
	 * @action Receive
	 */
	HeartbeatAck
}

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes Codes}
 */
export enum RPCCloseCodes {
	InvalidClientID = 4000,
	InvalidOrigin,
	RateLimited,
	TokenRevoked,
	InvalidVersion,
	InvalidEncoding
}

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc Codes}
 */
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

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes Codes}
 */
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

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes Codes}
 */
export enum VoiceOPCodes {
	/**
	 * Begin a voice websocket connection
	 *
	 * @sender Client
	 */
	Identify,

	/**
	 * Select the voice protocol
	 *
	 * @sender Client
	 */
	SelectProtocol,

	/**
	 * Complete the websocket handshake
	 *
	 * @sender Server
	 */
	Ready,

	/**
	 * Keep the websocket connection alive
	 *
	 * @sender Client
	 */
	Heartbeat,

	/**
	 * Describe the session
	 *
	 * @sender Server
	 */
	SessionDescription,

	/**
	 * Indicate which users are speaking
	 *
	 * @sender Client, Server
	 */
	Speaking,

	/**
	 * Sent to acknowledge a received client heartbeat
	 *
	 * @sender Server
	 */
	HeartbeatAck,

	/**
	 * Resume a connection
	 *
	 * @sender Client
	 */
	Resume,

	/**
	 * Time to wait between sending heartbeats in milliseconds
	 *
	 * @sender Server
	 */
	Hello,

	/**
	 * Acknowledge a successful session resume
	 *
	 * @sender Server
	 */
	Resumed,

	/**
	 * A client has disconnected from the voice channel
	 *
	 * @sender Server
	 */
	ClientDisconnect = 13
}
