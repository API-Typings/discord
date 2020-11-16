interface JSONErrorType<M extends JSONErrorMessage, C extends JSONErrorCodes> {
	message: M;
	code: C;
}

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

export type JSONError =
	| JSONErrorType<'General', JSONErrorCodes.General>
	| JSONErrorType<'Unknown account', JSONErrorCodes.UnknownAccount>
	| JSONErrorType<'Unknown application', JSONErrorCodes.UnknownApplication>
	| JSONErrorType<'Unknown channel', JSONErrorCodes.UnknownChannel>
	| JSONErrorType<'Unknown guild', JSONErrorCodes.UnknownGuild>
	| JSONErrorType<'Unknown integration', JSONErrorCodes.UnknownIntegration>
	| JSONErrorType<'Unknown invite', JSONErrorCodes.UnknownInvite>
	| JSONErrorType<'Unknown member', JSONErrorCodes.UnknownMember>
	| JSONErrorType<'Unknown message', JSONErrorCodes.UnknownMessage>
	| JSONErrorType<'Unknown permission overwrite', JSONErrorCodes.UnknownPermissionOverwrite>
	| JSONErrorType<'Unknown provider', JSONErrorCodes.UnknownProvider>
	| JSONErrorType<'Unknown role', JSONErrorCodes.UnknownRole>
	| JSONErrorType<'Unknown token', JSONErrorCodes.UnknownToken>
	| JSONErrorType<'Unknown user', JSONErrorCodes.UnknownUser>
	| JSONErrorType<'Unknown emoji', JSONErrorCodes.UnknownEmoji>
	| JSONErrorType<'Unknown webhook', JSONErrorCodes.UnknownWebhook>
	| JSONErrorType<'Unknown ban', JSONErrorCodes.UnknownBan>
	| JSONErrorType<'Unknown SKU', JSONErrorCodes.UnknownSKU>
	| JSONErrorType<'Unknown Store Listing', JSONErrorCodes.UnknownStoreListing>
	| JSONErrorType<'Unknown entitlement', JSONErrorCodes.UnknownEntitlement>
	| JSONErrorType<'Unknown build', JSONErrorCodes.UnknownBuild>
	| JSONErrorType<'Unknown lobby', JSONErrorCodes.UnknownLobby>
	| JSONErrorType<'Unknown branch', JSONErrorCodes.UnknownBranch>
	| JSONErrorType<'Unknown redistributable', JSONErrorCodes.UnknownRedistributable>
	| JSONErrorType<'Unknown guild template', JSONErrorCodes.UnknownGuildTemplate>
	| JSONErrorType<'Bots cannot use this endpoint', JSONErrorCodes.ForbiddenBotEndpoint>
	| JSONErrorType<'Only bots can use this endpoint', JSONErrorCodes.BotOnlyEndpoint>
	| JSONErrorType<
			'This message cannot be edited due to announcement rate limits',
			JSONErrorCodes.AnnouncementRateLimit
	  >
	| JSONErrorType<
			'The channel you are writing has hit the write rate limit',
			JSONErrorCodes.ChannelRateLimit
	  >
	| JSONErrorType<'Maximum number of guilds reached (100)', JSONErrorCodes.MaximumGuildsReached>
	| JSONErrorType<
			'Maximum number of friends reached (1000)',
			JSONErrorCodes.MaximumFriendsReached
	  >
	| JSONErrorType<
			'Maximum number of pins reached for the channel (50)',
			JSONErrorCodes.MaximumPinsReached
	  >
	| JSONErrorType<
			'Maximum number of guild roles reached (250)',
			JSONErrorCodes.MaximumRolesReached
	  >
	| JSONErrorType<
			'Maximum number of webhooks reached (10)',
			JSONErrorCodes.MaximumWebhooksReached
	  >
	| JSONErrorType<
			'Maximum number of reactions reached (20)',
			JSONErrorCodes.MaximumReactionsReached
	  >
	| JSONErrorType<
			'Maximum number of guild channels reached (500)',
			JSONErrorCodes.MaximumChannelsReached
	  >
	| JSONErrorType<
			'Maximum number of attachments in a message reached (10)',
			JSONErrorCodes.MaximumAttachmentsReached
	  >
	| JSONErrorType<
			'Maximum number of invites reached (1000)',
			JSONErrorCodes.MaximumInvitesReached
	  >
	| JSONErrorType<'Guild already has a template', JSONErrorCodes.GuildTemplateExists>
	| JSONErrorType<
			'Unauthorized. Provide a valid token and try again',
			JSONErrorCodes.Unauthorized
	  >
	| JSONErrorType<
			'You need to verify your account in order to perform this action',
			JSONErrorCodes.VerifiedAccountRequired
	  >
	| JSONErrorType<
			'Request entity too large. Try sending something smaller in size',
			JSONErrorCodes.MaximumRequestSizeReached
	  >
	| JSONErrorType<
			'This feature has been temporarily disabled server-side',
			JSONErrorCodes.FeatureTemporarilyDisabled
	  >
	| JSONErrorType<'The user is banned from this guild', JSONErrorCodes.BannedUser>
	| JSONErrorType<
			'This message has already been crossposted',
			JSONErrorCodes.MessageAlreadyCrossposted
	  >
	| JSONErrorType<'Missing access', JSONErrorCodes.MissingAccess>
	| JSONErrorType<'Invalid account type', JSONErrorCodes.InvalidAccountType>
	| JSONErrorType<'Cannot execute action on a DM channel', JSONErrorCodes.BlockedDMExecution>
	| JSONErrorType<'Guild widget disabled', JSONErrorCodes.WidgetDisabled>
	| JSONErrorType<
			'Cannot edit a message authored by another user',
			JSONErrorCodes.InvalidMessageAuthor
	  >
	| JSONErrorType<'Cannot send an empty message', JSONErrorCodes.EmptyMessage>
	| JSONErrorType<'Cannot send messages to this user', JSONErrorCodes.BlockedDMSend>
	| JSONErrorType<
			'Cannot send messages in a voice channel',
			JSONErrorCodes.BlockedVoiceChannelSend
	  >
	| JSONErrorType<
			'Channel verification level is too high for you to gain access',
			JSONErrorCodes.InvalidVerificationLevel
	  >
	| JSONErrorType<
			'OAuth2 application does not have a bot',
			JSONErrorCodes.MissingOAuthApplicationBot
	  >
	| JSONErrorType<
			'OAuth2 application limit reached',
			JSONErrorCodes.MaximumOAuthApplicationReached
	  >
	| JSONErrorType<'Invalid OAuth2 state', JSONErrorCodes.InvalidOAuthState>
	| JSONErrorType<
			'You lack permissions to perform that action',
			JSONErrorCodes.InvalidPermissions
	  >
	| JSONErrorType<
			'Invalid authentication token provided',
			JSONErrorCodes.InvalidAuthenticationToken
	  >
	| JSONErrorType<'Note was too long', JSONErrorCodes.MaximumNoteLengthReached>
	| JSONErrorType<
			'Provided too few or too many messages to delete. Must provide at least 2 and fewer than 100 messages to delete',
			JSONErrorCodes.InvalidMessageDeleteAmount
	  >
	| JSONErrorType<
			'A message can only be pinned to the channel it was sent in',
			JSONErrorCodes.InvalidChannelPin
	  >
	| JSONErrorType<'Invite code was either invalid or taken', JSONErrorCodes.InvalidInviteCode>
	| JSONErrorType<
			'Cannot execute action on a system message',
			JSONErrorCodes.BlockedSystemMessageExecution
	  >
	| JSONErrorType<
			'Cannot execute action on this channel type',
			JSONErrorCodes.BlockedChannelTypeExecution
	  >
	| JSONErrorType<'Invalid OAuth2 access token provided', JSONErrorCodes.InvalidOAuthToken>
	| JSONErrorType<'"Invalid Recipient(s)"', JSONErrorCodes.InvalidRecipients>
	| JSONErrorType<
			'A message provided was too old to bulk delete',
			JSONErrorCodes.MaximumBulkDeleteAgeReached
	  >
	| JSONErrorType<
			'Invalid form body (returned for both application/json and multipart/form-data bodies), or invalid Content-Type provided',
			JSONErrorCodes.InvalidFormBody
	  >
	| JSONErrorType<
			"An invite was accepted to a guild the application's bot is not in",
			JSONErrorCodes.InvalidAcceptedBotInvite
	  >
	| JSONErrorType<'Invalid API version provided', JSONErrorCodes.InvalidAPIVersion>
	| JSONErrorType<
			'Cannot delete a channel required for Community guilds',
			JSONErrorCodes.RequiredCommunityChannel
	  >
	| JSONErrorType<'Invalid sticker sent', JSONErrorCodes.InvalidStickerSent>
	| JSONErrorType<'Reaction was blocked', JSONErrorCodes.ReactionBlocked>
	| JSONErrorType<
			'API resource is currently overloaded. Try again a little later',
			JSONErrorCodes.APIOverloaded
	  >;

export type JSONErrorMessage =
	| 'General'
	| 'Unknown account'
	| 'Unknown application'
	| 'Unknown channel'
	| 'Unknown guild'
	| 'Unknown integration'
	| 'Unknown invite'
	| 'Unknown member'
	| 'Unknown message'
	| 'Unknown permission overwrite'
	| 'Unknown provider'
	| 'Unknown role'
	| 'Unknown token'
	| 'Unknown user'
	| 'Unknown emoji'
	| 'Unknown webhook'
	| 'Unknown ban'
	| 'Unknown SKU'
	| 'Unknown Store Listing'
	| 'Unknown entitlement'
	| 'Unknown build'
	| 'Unknown lobby'
	| 'Unknown branch'
	| 'Unknown redistributable'
	| 'Unknown guild template'
	| 'Bots cannot use this endpoint'
	| 'Only bots can use this endpoint'
	| 'This message cannot be edited due to announcement rate limits'
	| 'The channel you are writing has hit the write rate limit'
	| 'Maximum number of guilds reached (100)'
	| 'Maximum number of friends reached (1000)'
	| 'Maximum number of pins reached for the channel (50)'
	| 'Maximum number of guild roles reached (250)'
	| 'Maximum number of webhooks reached (10)'
	| 'Maximum number of reactions reached (20)'
	| 'Maximum number of guild channels reached (500)'
	| 'Maximum number of attachments in a message reached (10)'
	| 'Maximum number of invites reached (1000)'
	| 'Guild already has a template'
	| 'Unauthorized. Provide a valid token and try again'
	| 'You need to verify your account in order to perform this action'
	| 'Request entity too large. Try sending something smaller in size'
	| 'This feature has been temporarily disabled server-side'
	| 'The user is banned from this guild'
	| 'This message has already been crossposted'
	| 'Missing access'
	| 'Invalid account type'
	| 'Cannot execute action on a DM channel'
	| 'Guild widget disabled'
	| 'Cannot edit a message authored by another user'
	| 'Cannot send an empty message'
	| 'Cannot send messages to this user'
	| 'Cannot send messages in a voice channel'
	| 'Channel verification level is too high for you to gain access'
	| 'OAuth2 application does not have a bot'
	| 'OAuth2 application limit reached'
	| 'Invalid OAuth2 state'
	| 'You lack permissions to perform that action'
	| 'Invalid authentication token provided'
	| 'Note was too long'
	| 'Provided too few or too many messages to delete. Must provide at least 2 and fewer than 100 messages to delete'
	| 'A message can only be pinned to the channel it was sent in'
	| 'Invite code was either invalid or taken'
	| 'Cannot execute action on a system message'
	| 'Cannot execute action on this channel type'
	| 'Invalid OAuth2 access token provided'
	| '"Invalid Recipient(s)"'
	| 'A message provided was too old to bulk delete'
	| 'Invalid form body (returned for both application/json and multipart/form-data bodies), or invalid Content-Type provided'
	| "An invite was accepted to a guild the application's bot is not in"
	| 'Invalid API version provided'
	| 'Cannot delete a channel required for Community guilds'
	| 'Invalid sticker sent'
	| 'Reaction was blocked'
	| 'API resource is currently overloaded. Try again a little later';
