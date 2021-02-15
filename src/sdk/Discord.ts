import type {
	AchievementManager,
	ActivityManager,
	ApplicationManager,
	ImageManager,
	LobbyManager,
	NetworkManager,
	OverlayManager,
	RelationshipManager,
	StorageManager,
	StoreManager,
	UserManager,
	VoiceManager
} from './';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/discord#data-models-result-enum|Discord}
 */
export enum Result {
	Ok,
	ServiceUnavailable,
	InvalidVersion,
	LockFailed,
	InternalError,
	InvalidPayload,
	InvalidCommand,
	InvalidPermissions,
	NotFetched,
	NotFound,
	Conflict,
	InvalidSecret,
	InvalidJoinSecret,
	NoEligibleActivity,
	InvalidInvite,
	NotAuthenticated,
	InvalidAccessToken,
	ApplicationMismatch,
	InvalidDateUrl,
	InvalidBase64,
	NotFiltered,
	LobbyFull,
	InvalidLobbySecret,
	InvalidFileName,
	InvalidFileSize,
	InvalidEntitlement,
	NotInstalled,
	NotRunning,
	InsufficientBuffer,
	PurchaseCancelled,
	InvalidGuild,
	InvalidEvent,
	InvalidChannel,
	InvalidOrigin,
	RateLimited,
	OAuth2Error,
	SelectChannelTimeout,
	GetGuildTimeout,
	SelectVoiceForceRequired,
	CaptureShortcutAlreadyListening,
	UnauthorizedForAchievement,
	InvalidGiftCode,
	PurchaseError,
	TransactionAborted
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/discord#data-models-loglevel-enum|Discord}
 */
export enum LogLevel {
	/**
	 * Log only errors
	 */
	Error,

	/**
	 * Log warnings and errors
	 */
	Warning,

	/**
	 * Log info, warnings, and errors
	 */
	Info,

	/**
	 * Log everything
	 */
	Debug
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/discord#data-models-createflags-enum|Discord}
 */
export enum CreateFlags {
	/**
	 * Requires Discord to be running to play the game
	 */
	Default,

	/**
	 * Does not require Discord to be running, use this on other platforms
	 */
	NoRequireDiscord
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/discord|Discord}
 */
export interface Discord {
	/**
	 * Creates an instance of Discord to initialize the SDK.
	 *
	 * @param clientId - Your application's client ID
	 * @param flags - The creation parameters for the SDK
	 */
	new (clientId: bigint, flags: CreateFlags);

	/**
	 * Creates an instance of Discord to initialize the SDK.
	 *
	 * @param clientId - Your application's client ID
	 * @param flags - The creation parameters for the SDK
	 */
	Create(clientId: bigint, flags: CreateFlags): Discord;

	/**
	 * Destroys the instance.
	 */
	Dispose(): void;

	/**
	 * Registers a logging callback function with the minimum level of message to receive.
	 *
	 * @param level - The minimum level of event to log
	 * @param callback - The callback function to catch the messages
	 */
	SetLogHook(level: LogLevel, callback: (level: LogLevel, message: string) => void): void;

	/**
	 * Runs all pending SDK callbacks.
	 *
	 * @remarks
	 * This function also serves as a way to know that the local Discord client is still connected.
	 * If the user closes Discord while playing your game, `RunCallbacks()` will return/throw
	 * `Discord.Result.NotRunning`.
	 */
	RunCallbacks(): Result;

	/**
	 * Fetches an instance of the manager for interfacing with activities in the SDK.
	 */
	GetActivityManager(): ActivityManager;

	/**
	 * Fetches an instance of the manager for interfacing with relationships in the SDK.
	 */
	GetRelationshipManager(): RelationshipManager;

	/**
	 * Fetches an instance of the manager for interfacing with images in the SDK.
	 */
	GetImageManager(): ImageManager;

	/**
	 * Fetches an instance of the manager for interfacing with users in the SDK.
	 */
	GetUserManager(): UserManager;

	/**
	 * Fetches an instance of the manager for interfacing with lobbies in the SDK.
	 */
	GetLobbyManager(): LobbyManager;

	/**
	 * Fetches an instance of the manager for interfacing with networking in the SDK.
	 */
	GetNetworkManager(): NetworkManager;

	/**
	 * Fetches an instance of the manager for interfacing with the overlay in the SDK.
	 */
	GetOverlayManager(): OverlayManager;

	/**
	 * Fetches an instance of the manager for interfacing with applications in the SDK.
	 */
	GetApplicationManager(): ApplicationManager;

	/**
	 * Fetches an instance of the manager for interfacing with storage in the SDK.
	 */
	GetStorageManager(): StorageManager;

	/**
	 * Fetches an instance of the manager for interfacing with SKUs and Entitlements in the SDK.
	 */
	GetStoreManager(): StoreManager;

	/**
	 * Fetches an instance of the manager for interfacing with voice chat in the SDK.
	 */
	GetVoiceManager(): VoiceManager;

	/**
	 * Fetches an instance of the manager for interfacing with achievements in the SDK.
	 */
	GetAchievementManager(): AchievementManager;
}
