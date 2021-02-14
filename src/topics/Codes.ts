// SECTION Gateway Codes

// ANCHOR Close Codes

/**
 * Your connection to the gateway may sometimes close. When it does, you will receive a close code
 * that tells you what happened.
 *
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes|Opcodes and Status Codes}
 */
export enum GatewayCloseCode {
	/**
	 * An unknown error occurred
	 */
	UnknownError = 4000,

	/**
	 * You sent an invalid {@link https://discord.com/developers/docs/topics/gateway#payloads-and-opcodes|Gateway opcode} or an invalid payload for an opcode
	 */
	UnknownOPCode,

	/**
	 * You sent an invalid {@link https://discord.com/developers/docs/topics/gateway#sending-payloads|payload}
	 */
	DecodeError,

	/**
	 * You sent a payload prior to {@link https://discord.com/developers/docs/topics/gateway#identify|identifying}
	 */
	NotAuthenticated,

	/**
	 * The account token sent with your {@link https://discord.com/developers/docs/topics/gateway#identify|identify payload} is incorrect
	 */
	AuthenticationFailed,

	/**
	 * You sent more than one identify payload
	 */
	AlreadyAuthenticated,

	/**
	 * The sequence sent when {@link https://discord.com/developers/docs/topics/gateway#resume|resuming} the session was invalid. Reconnect and start a new session
	 */
	InvalidSequence = 4007,

	/**
	 * You're sending payloads to us too quickly. You will be disconnected on receiving this.
	 */
	RateLimited,

	/**
	 * Your session timed out. Reconnect and start a new one
	 */
	SessionTimedOut,

	/**
	 * You sent an invalid {@link https://discord.com/developers/docs/topics/gateway#sharding|shard when identifying}
	 */
	InvalidShard,

	/**
	 * The session would have handled too many guilds - you are required to {@link https://discord.com/developers/docs/topics/gateway#sharding|shard} your connection in order to connect
	 */
	ShardingRequired,

	/**
	 * You sent an invalid version for the gateway
	 */
	InvalidAPIVersion,

	/**
	 * You sent an invalid intent for a {@link https://discord.com/developers/docs/topics/gateway#gateway-intents|Gateway Intent}. You may have incorrectly calculated the bitwise value
	 */
	InvalidIntents,

	/**
	 * You sent a disallowed intent for a {@link https://discord.com/developers/docs/topics/gateway#gateway-intents|Gateway Intent}.
	 * You may have tried to specify an intent that you {@link https://discord.com/developers/docs/topics/gateway#privileged-intents|have not enabled or are not whitelisted for}.
	 */
	DisallowedIntents
}

// ANCHOR OP Codes

/**
 * All gateway events in Discord are tagged with an opcode that denotes the payload type.
 *
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes|Opcodes and Status Codes}
 */
export enum GatewayOPCode {
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
	PresenceUpdate,

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

// !SECTION

// ANCHOR JSON Error Codes

/**
 * The API can return more detailed error codes through a `code` key in a JSON error response.
 * The response will also contain a `message` key containing a more friendly error string.
 *
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes|Opcodes and Status Codes}
 */
export enum JSONErrorCode {
	/**
	 * General error (such as a malformed request body, amongst other things)
	 */
	General,

	/**
	 * Unknown account
	 */
	UnknownAccount = 10001,

	/**
	 * Unknown application
	 */
	UnknownApplication,

	/**
	 * Unknown Channel
	 */
	UnknownChannel,

	/**
	 * Unknown guild
	 */
	UnknownGuild,

	/**
	 * Unknown integration
	 */
	UnknownIntegration,

	/**
	 * Unknown invite
	 */
	UnknownInvite,

	/**
	 * Unknown member
	 */
	UnknownMember,

	/**
	 * Unknown message
	 */
	UnknownMessage,

	/**
	 * Unknown permission overwrite
	 */
	UnknownOverwrite,

	/**
	 * Unknown provider
	 */
	UnknownProvider,

	/**
	 * Unknown role
	 */
	UnknownRole,

	/**
	 * Unknown token
	 */
	UnknownToken,

	/**
	 * Unknown user
	 */
	UnknownUser,

	/**
	 * Unknown emoji
	 */
	UnknownEmoji,

	/**
	 * Unknown webhook
	 */
	UnknownWebhook,

	/**
	 * Unknown ban
	 */
	UnknownBan = 10026,

	/**
	 * Unknown SKU
	 */
	UnknownSKU,

	/**
	 * Unknown Store Listing
	 */
	UnknownStoreListing,

	/**
	 * Unknown entitlement
	 */
	UnknownEntitlement,

	/**
	 * Unknown build
	 */
	UnknownBuild,

	/**
	 * Unknown lobby
	 */
	UnknownLobby,

	/**
	 * Unknown branch
	 */
	UnknownBranch,

	/**
	 * Unknown redistributable
	 */
	UnknownRedistributable = 10036,

	/**
	 * Unknown guild template
	 */
	UnknownGuildTemplate = 10057,

	/**
	 * Unknown discovery category
	 */
	UnknownDiscoveryCategory = 10059,

	/**
	 * Unknown interaction
	 */
	UnknownInteraction = 10062,

	/**
	 * Unknown application command
	 */
	UnknownApplicationCommand,

	/**
	 * Bots cannot use this endpoint
	 */
	ExclusiveBotEndpoint = 20001,

	/**
	 * Only bots can use this endpoint
	 */
	InclusiveBotEndpoint,

	/**
	 * This message cannot be edited due to announcement rate limits
	 */
	AnnouncementRateLimit = 200022,

	/**
	 * The channel you are writing has hit the write rate limit
	 */
	ChannelRateLimit = 200028,

	/**
	 * Maximum number of guilds reached (100)
	 */
	MaximumGuildsReached = 30001,

	/**
	 * Maximum number of friends reached (1000)
	 */
	MaximumFriendsReached,

	/**
	 * Maximum number of pins reached for the channel (50)
	 */
	MaximumPinsReached,

	/**
	 * Maximum number of guild roles reached (250)
	 */
	MaximumRolesReached = 30005,

	/**
	 * Maximum number of webhooks reached (10)
	 */
	MaximumWebhooksReached = 30007,

	/**
	 * Maximum number of reactions reached (20)
	 */
	MaximumReactionsReached = 30010,

	/**
	 * Maximum number of channels reached (500)
	 */
	MaximumChannelsReached = 30013,

	/**
	 * Maximum number of attachments in a message reached (10)
	 */
	MaximumAttachmentsReached = 30015,

	/**
	 * Maximum number of invites reached (1000)
	 */
	MaximumInvitesReached,

	/**
	 * Maximum number of guild discovery subcategories has been reached (5)
	 */
	MaximumDiscoverySubcategories = 30030,

	/**
	 * Guild already has a template
	 */
	GuildTemplateExists,

	/**
	 * Unauthorized
	 */
	Unauthorized = 40001,

	/**
	 * You need to verify your account in order to perform this action
	 */
	VerifiedAccountRequired,

	/**
	 * Request entity too large
	 */
	MaximumRequestSizeReached = 40005,

	/**
	 * This feature has been temporarily disabled server-side
	 */
	FeatureTemporarilyDisabled,

	/**
	 * The user is banned from this guild
	 */
	BannedUser,

	/**
	 * This message has already been crossposted
	 */
	MessageAlreadyCrossposted = 40033,

	/**
	 * Missing access
	 */
	MissingAccess = 50001,

	/**
	 * Invalid account type
	 */
	InvalidAccountType,

	/**
	 * Cannot execute action on a DM channel
	 */
	CannotExecuteDM,

	/**
	 * Guild widget disabled
	 */
	WidgetDisabled,

	/**
	 * Cannot edit a message authored by another user
	 */
	CannotEdit,

	/**
	 * Cannot send an empty message
	 */
	CannotSendEmpty,

	/**
	 * Cannot send messages to this user
	 */
	CannotDM,

	/**
	 * Cannot send messages in a voice channel
	 */
	CannotSendVoice,

	/**
	 * Channel verification level is too high for you to gain access
	 */
	InvalidVerificationLevel,

	/**
	 * OAuth2 application does not have a bot
	 */
	MissingOAuthApplicationBot,

	/**
	 * OAuth2 application limit reached
	 */
	MaximumOAuthApplicationReached,

	/**
	 * Invalid OAuth2 state
	 */
	InvalidOAuthState,

	/**
	 * You lack permissions to perform that action
	 */
	InvalidPermissions,

	/**
	 * Invalid authentication token provided
	 */
	InvalidAuthenticationToken,

	/**
	 * Note was too long
	 */
	MaximumNoteLengthReached,

	/**
	 * Provided too few or too many messages to delete (`2 ≤ x ≤ 100`)
	 */
	InvalidMessageDeleteAmount,

	/**
	 * A message can only be pinned to the channel it was sent in
	 */
	InvalidChannelPin = 50019,

	/**
	 * Invite code was either invalid or taken
	 */
	InvalidInviteCode,

	/**
	 * Cannot execute action on a system message
	 */
	CannotExecuteSystem,

	/**
	 * Cannot execute action on this channel type
	 */
	CannotExecuteChannel = 50024,

	/**
	 * Invalid OAuth2 access token provided
	 */
	InvalidOAuthToken,

	/**
	 * Invalid webhook token provided
	 */
	InvalidWebhookToen = 50027,

	/**
	 * Invalid Recipient(s)
	 */
	InvalidRecipients = 50033,

	/**
	 * A message provided was too old to bulk delete (\> 14 days)
	 */
	MaximumMessageAgeReached,

	/**
	 * Invalid form body (returned for both `application/json` and `multipart/form-data` bodies),
	 * or invalid `Content-Type` provided
	 */
	InvalidFormBody,

	/**
	 * An invite was accepted to a guild the application's bot is not in
	 */
	MissingGuildInvite,

	/**
	 * Invalid API version provided
	 */
	InvalidAPIVersion = 50041,

	/**
	 * Cannot delete a channel required for Community guilds
	 */
	RequiredCommunityChannel = 50074,

	/**
	 * Invalid sticker sent
	 */
	InvalidStickerSent = 50081,
	TwoFactorAuthRequired = 60003,

	/**
	 * Reaction was blocked
	 */
	ReactionBlocked = 90001,

	/**
	 * API resource is currently overloaded
	 */
	APIOverloaded = 130000
}

// SECTION RPC Codes

// ANCHOR Close Codes

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes|Opcodes and Status Codes}
 */
export enum RPCCloseCode {
	/**
	 * You connected to the RPC server with an invalid client ID
	 */
	InvalidClientID = 4000,

	/**
	 * You connected to the RPC server with an invalid origin
	 */
	InvalidOrigin,

	/**
	 * You are being rate limited
	 */
	RateLimited,

	/**
	 * The OAuth2 token associated with a connection was revoked
	 */
	TokenRevoked,

	/**
	 * The RPC Server version specified in the connection string was not valid
	 */
	InvalidVersion,

	/**
	 * The encoding specified in the connection string was not valid
	 */
	InvalidEncoding
}

// ANCHOR Error Codes

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-error-codes|Opcodes and Status Codes}
 */
export enum RPCErrorCode {
	/**
	 * An unknown error occurred
	 */
	UnknownError = 1000,

	/**
	 * You sent an invalid payload
	 */
	InvalidPayload = 4000,

	/**
	 * Invalid command name specified
	 */
	InvalidCommand = 4002,

	/**
	 * Invalid guild ID specified
	 */
	InvalidGuild,

	/**
	 * Invalid event name specified
	 */
	InvalidEvent,

	/**
	 * Invalid channel ID specified
	 */
	InvalidChannel,

	/**
	 * You lack permissions to access the given resource
	 */
	InvalidPermissions,

	/**
	 * An invalid OAuth2 application ID was used to authorize or authenticate with
	 */
	InvalidClientID,

	/**
	 * An invalid OAuth2 application origin was used to authorize or authenticate with
	 */
	InvalidOrigin,

	/**
	 * An invalid OAuth2 token was used to authorize or authenticate with
	 */
	InvalidToken,

	/**
	 * The specified user ID was invalid
	 */
	InvalidUser,

	/**
	 * A standard OAuth2 error occurred; check the data object for the OAuth2 error details
	 */
	OAuth2Error = 5000,

	/**
	 * An asynchronous `SELECT_TEXT_CHANNEL`/`SELECT_VOICE_CHANNEL` command timed out
	 */
	SelectChannelTimedOut,

	/**
	 * An asynchronous `GET_GUILD` command timed out
	 */
	GetGuildTimedOut,

	/**
	 * You tried to join a user to a voice channel but the user was already in one
	 */
	SelectVoiceForceRequired,

	/**
	 * You tried to capture more than one shortcut key at once
	 */
	CaptureShortcutAlreadyListening
}

// !SECTION

// SECTION Voice Codes

// ANCHOR Close Codes

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes|Opcodes and Status Codes}
 */
export enum VoiceCloseCode {
	/**
	 * You sent an invalid {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes|opcode}
	 */
	UnknownOPCode = 4001,

	/**
	 * You sent an invalid payload in your {@link https://discord.com/developers/docs/topics/gateway#gateway-identify|identifying} to the Gateway
	 */
	DecodeFailure,

	/**
	 * You sent a payload before {@link https://discord.com/developers/docs/topics/gateway#gateway-identify|identifying} with the gateway
	 */
	NotAuthenticated,

	/**
	 * The token you sent in your {@link https://discord.com/developers/docs/topics/gateway#gateway-identify|identify} payload is incorrect
	 */
	AuthenticationFailed,

	/**
	 * You sent more than one {@link https://discord.com/developers/docs/topics/gateway#gateway-identify|identify} payload
	 */
	AlreadyAuthenticated,

	/**
	 * Your session is no longer valid
	 */
	InvalidSession,

	/**
	 * Your session has timed out
	 */
	SessionTimeout = 4009,

	/**
	 * The server you're trying to connect to can't be found
	 */
	ServerNotFound = 4011,

	/**
	 * The {@link https://discord.com/developers/docs/topics/voice-connections#establishing-a-voice-udp-connection-example-select-protocol-payload|protocol} you sent wasn't recognized
	 */
	UnknownProtocol,

	/**
	 * Either the channel was deleted or you were kicked. Should not reconnect
	 */
	Disconnected = 4014,

	/**
	 * The server crashed. Try {@link https://discord.com/developers/docs/topics/voice-connections#resuming-voice-connection|resuming}
	 */
	VoiceServerCrashed,

	/**
	 * Your {@link https://discord.com/developers/docs/topics/voice-connections#encrypting-and-sending-voice|encryption} wasn't recognized
	 */
	UnknownEncryptionMode
}

// ANCHOR OP Codes

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes|Opcodes and Status Codes}
 */
export enum VoiceOPCode {
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

// !SECTION
