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
	 * An unknown error occurred.
	 */
	UnknownError = 4000,

	/**
	 * You sent an invalid Gateway opcode or an invalid payload for an opcode.
	 */
	UnknownOPCode,

	/**
	 * You sent an invalid payload.
	 */
	DecodeError,

	/**
	 * You sent a payload prior to identifying.
	 */
	NotAuthenticated,

	/**
	 * The account token sent with your identify payload is incorrect.
	 */
	AuthenticationFailed,

	/**
	 * You sent more than one identify payload.
	 */
	AlreadyAuthenticated,

	/**
	 * The sequence sent when resuming the session was invalid. Reconnect and start a new
	 * session.
	 */
	InvalidSequence = 4007,

	/**
	 * You're sending payloads to us too quickly. You will be disconnected on receiving this.
	 */
	RateLimited,

	/**
	 * Your session timed out. Reconnect and start a new one.
	 */
	SessionTimedOut,

	/**
	 * You sent an invalid shard when identifying.
	 */
	InvalidShard,

	/**
	 * The session would have handled too many guilds–you are required to shard your connection
	 * in order to connect.
	 */
	ShardingRequired,

	/**
	 * You sent an invalid version for the gateway.
	 */
	InvalidAPIVersion,

	/**
	 * You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated
	 * the bitwise value.
	 */
	InvalidIntents,

	/**
	 * You sent a disallowed intent for a Gateway Intent. You may have tried to specify an
	 * intent that you have not enabled or are not whitelisted for.
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
	 * An event was dispatched. The client can receive this action.
	 */
	Dispatch,

	/**
	 * Fired periodically by the client to keep the connection alive. The client can send and
	 * receive this action.
	 */
	Heartbeat,

	/**
	 * Starts a new session during the initial handshake. The client can send this action.
	 */
	Identify,

	/**
	 * Update the client's presence. The client can send this action.
	 */
	PresenceUpdate,

	/**
	 * Used to join/leave or move between voice channels. The client can send this action.
	 */
	VoiceStateUpdate,
	VoiceGuildPing,

	/**
	 * Resume a previous session that was disconnected. The client can send this action.
	 */
	Resume,

	/**
	 * You should attempt to reconnect and resume immediately. The client can receive this action.
	 */
	Reconnect,

	/**
	 * Request information about offline guild members in a large guild. The client can send this
	 * action.
	 */
	RequestGuildMembers,

	/**
	 * The session has been invalidated. You should reconnect and identify/resume accordingly. The
	 * client can receive this action.
	 */
	InvalidSession,

	/**
	 * Sent immediately after connecting, contains the `heartbeat_interval` to use. The client can
	 * receive this action.
	 */
	Hello,

	/**
	 * Sent in response to receiving a heartbeat to acknowledge that it has been received. The
	 * client can receive this action.
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
	 * General error (such as a malformed request body, amongst other things).
	 */
	General,
	UnknownAccount = 10001,
	UnknownApplication,
	UnknownChannel,
	UnknownGuild,
	UnknownIntegration,
	UnknownInvite,
	UnknownMember,
	UnknownMessage,
	UnknownOverwrite,
	UnknownPlatform,
	UnknownRole,
	UnknownToken,
	UnknownUser,
	UnknownEmoji,
	UnknownWebhook,
	UnknownWebhookService,
	UnknownSession,
	UnknownBan = 10026,
	UnknownSKU,
	UnknownStoreListing,
	UnknownEntitlement,
	UnknownBuild,
	UnknownLobby,
	UnknownBranch,
	UnknownStoreDirectoryLayout,
	UnknownRedistributable = 10036,
	UnknownGiftCode = 10038,
	UnknownGuildTemplate = 10057,
	UnknownDiscoveryCategory = 10059,
	UnknownInteraction = 10062,
	UnknownApplicationCommand,
	UnknownApplicationCommandPermissions,

	/**
	 * Bots cannot use this endpoint.
	 */
	BotDisallowed = 20001,

	/**
	 * Only bots can use this endpoint.
	 */
	BotRequired,
	RPCProxyDisallowed,

	/**
	 * Explicit content cannot be sent to the desired recipient(s).
	 */
	ExplicitContent = 20009,
	AccountScheduledForDeletion = 20011,
	UserUnauthorizedForApplication,
	AccountDisabled,
	SlowmodeRateLimited = 20016,

	/**
	 * Only the owner of this account can perform this action.
	 */
	InvalidAccountOwner = 20018,

	/**
	 * This message cannot be edited due to announcement rate limits.
	 */
	ChannelFollowingRateLimited = 20022,
	UnderMinimumAge = 20024,

	/**
	 * The channel you are writing has hit the write rate limit.
	 */
	ChannelRateLimited = 20028,

	/**
	 * Maximum number of guilds reached (100).
	 */
	TooManyGuilds = 30001,

	/**
	 * Maximum number of friends reached (1000).
	 */
	TooManyFriends,

	/**
	 * Maximum number of pins reached for the channel (50).
	 */
	TooManyPinsInChannel,

	/**
	 * Maximum number of recipients reached (10).
	 */
	TooManyRecipients,

	/**
	 * Maximum number of guild roles reached (250).
	 */
	TooManyGuildRoles,
	TooManyUsingUsername,

	/**
	 * Maximum number of webhooks reached (10).
	 */
	TooManyWebhooks,
	TooManyEmojis,

	/**
	 * Maximum number of reactions reached (20).
	 */
	TooManyReactions = 30010,

	/**
	 * Maximum number of channels reached (500).
	 */
	TooManyChannels = 30013,

	/**
	 * Maximum number of attachments in a message reached (10).
	 */
	TooManyAttachments = 30015,

	/**
	 * Maximum number of invites reached (1000).
	 */
	TooManyInvites,
	TooManyAnimatedEmojis = 30018,
	GuildAtCapacity,
	NotEnoughGuildMembers = 30029,

	/**
	 * Maximum number of guild discovery subcategories has been reached (5).
	 */
	TooManyDiscoverySubcategories,

	/**
	 * Guild already has a template.
	 */
	GuildTemplateExists,

	/**
	 * Maximum number of bans for non-guild members have been exceeded.
	 */
	TooManyNonGuildMemberBans = 30035,
	TooManyBanFetches = 30037,
	Unauthorized = 40001,
	EmailVerificationRequired,
	DMOpenRateLimited,
	SendMessageTemporarilyDisabled,
	RequestEntityTooLarge,
	FeatureTemporarilyDisabled,
	UserBanned,
	ConnectionRevoked = 40012,
	DeleteAccountTransferTeamOwnership = 40028,
	UserNotConnectedToVoice = 400032,
	MessageAlreadyCrossposted,
	ApplicationCommandNameExists = 40041,
	InvalidAccess = 50001,
	InvalidAccountType,

	/**
	 * Cannot execute action on a DM channel.
	 */
	InvalidDMAction,

	/**
	 * Guild widget disabled.
	 */
	InvalidEmbedDisabled,

	/**
	 * Cannot edit a message authored by another user.
	 */
	InvalidMessageAuthor,
	InvalidMessageEmpty,
	InvalidMessageSendUser,

	/**
	 * Cannot send messages in a voice channel.
	 */
	InvalidMessageSendNonText,

	/**
	 * Channel verification level is too high to gain access.
	 */
	InvalidMessageVerificationLevel,

	/**
	 * OAuth2 application does not have a bot.
	 */
	InvalidOAuthAppBot,

	/**
	 * OAuth2 application limit reached.
	 */
	InvalidOAuthAppLimit,
	InvalidOAuthState,
	InvalidPermissions,
	InvalidToken,

	/**
	 * Note was too long.
	 */
	InvalidNote,

	/**
	 * Provided too few or too many messages to delete (`2 ≤ x ≤ 100`).
	 */
	InvalidBulkDeleteCount,
	InvalidMFALevel,
	InvalidPassword,

	/**
	 * A message can only be pinned to the channel it was sent in.
	 */
	InvalidPinMessageChannel,
	InvalidInviteCode,

	/**
	 * Cannot execute action on a system message.
	 */
	InvalidMessageAction,
	InvalidPhoneNumber,
	InvalidClientID,

	/**
	 * Cannot execute action on this channel type.
	 */
	InvalidChannelType,
	InvalidOAuth2AccessToken,
	InvalidOAuth2MisingScope,
	InvalidWebhookToken,
	InvalidRole,

	/**
	 * Invalid recipient(s).
	 */
	InvalidRecipients = 50033,

	/**
	 * A message provided was too old to bulk delete (\> 14 days).
	 */
	InvalidMessageAge,

	/**
	 * Invalid form body (returned for both `application/json` and `multipart/form-data` bodies),
	 * or invalid `Content-Type` provided.
	 */
	InvalidFormBody,

	/**
	 * An invite was accepted to a guild the application's bot is not in.
	 */
	InvalidGuildInvite,
	InvalidAPIVersion = 50041,
	InvalidGiftRedemptionExhausted = 50050,
	InvalidGiftRedemptionOwned,
	InvalidGiftSelfRedemption = 50054,
	InvalidGiftPaymentSourceRequired = 500070,

	/**
	 * Cannot delete a channel required for Community guilds.
	 */
	RequiredCommunityChannel = 50074,
	InvalidStickerSent = 50081,
	MFAEnabled = 60001,
	MFADisabled,

	/**
	 * Tried to perform an operation on an archived thread.
	 */
	InvalidThreadArchiveState = 50083,
	InvalidThreadNotificationSettings,

	/**
	 * `before` value is earlier than the thread creation date.
	 */
	InvalidBeforeThreadCreationDateValue,
	MFARequired,
	MFAUnverified,
	MFAInvalidSecret,
	MFAInvalidTicket,
	MFAInvalidCode,
	MFAInvalidSession,
	PhoneNumberUnableToSend = 70003,
	PhoneVerificationRequired = 70007,
	RelationshipIncomingDisabled = 80000,
	RelationshipIncomingBlocked,
	RelationshipInvalidUserBot,
	RelationshipInvalidSelf,
	RelationshipInvalidDiscordTag,
	RelationshipAlreadyFriends = 80007,
	ReactionBlocked = 90001,
	InvalidGiftRedemptionSubscriptionManaged = 100021,
	InvalidGiftRedemptionSubscriptionIncompatible = 100023,
	InvalidGiftRedemptionInvoiceOpen,
	ListingAlreadyJoined = 120000,
	ListingTooManyMembers,
	ListingJoinBlocked,
	APIResourceOverloaded = 130000
}

// SECTION RPC Codes

// ANCHOR Close Codes

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-close-event-codes|Opcodes and Status Codes}
 */
export enum RPCCloseCode {
	/**
	 * You connected to the RPC server with an invalid client ID.
	 */
	InvalidClientID = 4000,

	/**
	 * You connected to the RPC server with an invalid origin.
	 */
	InvalidOrigin,

	/**
	 * You are being rate limited
	 */
	RateLimited,

	/**
	 * The OAuth2 token associated with a connection was revoked.
	 */
	TokenRevoked,

	/**
	 * The RPC Server version specified in the connection string was not valid.
	 */
	InvalidVersion,

	/**
	 * The encoding specified in the connection string was not valid.
	 */
	InvalidEncoding
}

// ANCHOR Error Codes

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc-rpc-error-codes|Opcodes and Status Codes}
 */
export enum RPCErrorCode {
	/**
	 * An unknown error occurred.
	 */
	UnknownError = 1000,
	ServiceUnavailable,
	TransactionAborted,

	/**
	 * You sent an invalid payload.
	 */
	InvalidPayload = 4000,

	/**
	 * Invalid command name specified.
	 */
	InvalidCommand = 4002,

	/**
	 * Invalid guild ID specified.
	 */
	InvalidGuild,

	/**
	 * Invalid event name specified.
	 */
	InvalidEvent,

	/**
	 * Invalid channel ID specified.
	 */
	InvalidChannel,

	/**
	 * You lack permissions to access the given resource.
	 */
	InvalidPermissions,

	/**
	 * An invalid OAuth2 application ID was used to authorize or authenticate with.
	 */
	InvalidClientID,

	/**
	 * An invalid OAuth2 application origin was used to authorize or authenticate with.
	 */
	InvalidOrigin,

	/**
	 * An invalid OAuth2 token was used to authorize or authenticate with.
	 */
	InvalidToken,

	/**
	 * The specified user ID was invalid.
	 */
	InvalidUser,
	InvalidInvite,
	InvalidActivityJoinRequest,
	InvalidLobby,
	InvalidLobbySecret,
	InvalidEntitlement,
	InvalidGiftCode,
	InvalidGuildTemplate,

	/**
	 * A standard OAuth2 error occurred; check the data object for the OAuth2 error details.
	 */
	OAuth2Error = 5000,

	/**
	 * An asynchronous `SELECT_TEXT_CHANNEL`/`SELECT_VOICE_CHANNEL` command timed out.
	 */
	SelectChannelTimedOut,

	/**
	 * An asynchronous `GET_GUILD` command timed out.
	 */
	GetGuildTimedOut,

	/**
	 * You tried to join a user to a voice channel but the user was already in one.
	 */
	SelectVoiceForceRequired,

	/**
	 * You tried to capture more than one shortcut key at once.
	 */
	CaptureShortcutAlreadyListening,
	InvalidActivitySecret,
	NoEligibleActivity,
	LobbyFull,
	PurchaseCancelled,
	PurchaseError,
	UnauthorizedForAchievement,
	RateLimited
}

// !SECTION

// ANCHOR Dispatch Error Codes

export enum DispatchErrorCode {
	ApplicationNotFound = 101,
	DiskLow = 2022,
	DiskPermissionDenied = 2025,
	RedistributableInstallFailed,
	ApplicationLoadFailed = 2034,
	DeserializationFailed = 2047,
	Interrupted = 2055,
	MaxRequestRetriesExceeded = 2058,
	AuthenticationFailed = 2063,
	IOPermissionDenied,
	NoManifests,
	PostInstallCancelled,
	APIError = 2069,
	FileNameTooLong = 2072,
	NotEntitled,
	ApplicationLockFailed = 2076,
	NotDirectory,
	InvalidDrive,
	DiskFull = 2080
}

// SECTION Voice Codes

// ANCHOR Close Codes

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-close-event-codes|Opcodes and Status Codes}
 */
export enum VoiceCloseCode {
	/**
	 * You sent an invalid opcode.
	 */
	UnknownOPCode = 4001,

	/**
	 * You sent an invalid payload in your identifying to the Gateway
	 */
	DecodeFailure,

	/**
	 * You sent a payload before identifying with the gateway.
	 */
	NotAuthenticated,

	/**
	 * The token you sent in your identify payload is incorrect.
	 */
	AuthenticationFailed,

	/**
	 * You sent more than one identify payload.
	 */
	AlreadyAuthenticated,

	/**
	 * Your session is no longer valid.
	 */
	InvalidSession,

	/**
	 * Your session has timed out.
	 */
	SessionTimeout = 4009,

	/**
	 * The server you're trying to connect to can't be found.
	 */
	ServerNotFound = 4011,

	/**
	 * The protocol you sent wasn't recognized,
	 */
	UnknownProtocol,

	/**
	 * Channel was deleted, you were kicked, voice server changed, or the main gateway session was
	 * dropped. Should not reconnect.
	 */
	Disconnected = 4014,

	/**
	 * The server crashed. Try resuming.
	 */
	VoiceServerCrashed,

	/**
	 * Your encryption wasn't recognized.
	 */
	UnknownEncryptionMode
}

// ANCHOR OP Codes

/**
 * @source {@link https://discord.com/developers/docs/topics/opcodes-and-status-codes#voice-voice-opcodes|Opcodes and Status Codes}
 */
export enum VoiceOPCode {
	/**
	 * Begin a voice websocket connection. This is sent by the client.
	 */
	Identify,

	/**
	 * Select the voice protocol. This is sent by the client.
	 */
	SelectProtocol,

	/**
	 * Complete the websocket handshake. This is sent by the server.
	 */
	Ready,

	/**
	 * Keep the websocket connection alive. This is sent by the client.
	 */
	Heartbeat,

	/**
	 * Describe the session. This is sent by the server.
	 */
	SessionDescription,

	/**
	 * Indicate which users are speaking. This is sent by the client and server.
	 */
	Speaking,

	/**
	 * Sent to acknowledge a received client heartbeat. This is sent by the server.
	 */
	HeartbeatAck,

	/**
	 * Resume a connection. This is sent by the client.
	 */
	Resume,

	/**
	 * Time to wait between sending heartbeats in milliseconds. This is sent by the server.
	 */
	Hello,

	/**
	 * Acknowledge a successful session resume. This is sent by the server.
	 */
	Resumed,

	/**
	 * A client has disconnected from the voice channel. This is sent by the server.
	 */
	ClientDisconnect = 13
}

// !SECTION
