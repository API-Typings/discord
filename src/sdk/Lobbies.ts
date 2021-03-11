import type { Discord, Snowflake } from '../';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies#data-models-lobbytype-enum|Lobbies}
 */
export enum LobbyType {
	Private = 1,
	Public
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies#data-models-lobby-struct|Lobbies}
 */
export interface Lobby {
	/**
	 * The unique ID of the lobby.
	 */
	Id: bigint;

	/**
	 * If the lobby is public or private.
	 */
	Type: LobbyType;

	/**
	 * The `userId` of the lobby owner.
	 */
	OwnerId: bigint;

	/**
	 * The password to the lobby.
	 */
	Secret: string;

	/**
	 * The max capacity of the lobby.
	 */
	Capacity: number;

	/**
	 * Whether or not the lobby can be joined.
	 */
	Locked: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies#data-models-lobbysearchcomparison-enum|Lobbies}
 */
export enum LobbySearchComparison {
	LessThanOrEqual = -2,
	LessThan,
	Equal,
	GreaterThan,
	GreaterThanOrEqual,
	NotEqual
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies#data-models-lobbysearchcast-enum|Lobbies}
 */
export enum LobbySearchCast {
	String = 1,
	Number
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies#data-models-lobbysearchdistance-enum|Lobbies}
 */
export enum LobbySearchDistance {
	/**
	 * Within the same region.
	 */
	Local,

	/**
	 * Within the same and adjacent regions.
	 */
	Default,

	/**
	 * Far distances, like US to EU.
	 */
	Extended,

	/**
	 * All regions.
	 */
	Global
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies#data-models-lobbytransaction-struct|Lobbies}
 */
export interface LobbyTransaction {
	/**
	 * Marks a lobby as private or public.
	 *
	 * @param type - Private or public
	 */
	SetType(type: LobbyType): void;

	/**
	 * Sets a new owner for the lobby.
	 *
	 * @warning
	 * This method is only valid for `LobbyUpdateTransactions` and may cause issues if you set it on
	 * a `LobbyCreateTransaction`.
	 *
	 * @param userId - The new owner's user ID
	 */
	SetOwner(userId: bigint): void;

	/**
	 * Sets a new capacity for the lobby.
	 *
	 * @param capacity - The new max lobby size
	 */
	SetCapacity(capacity: number): void;

	/**
	 * Sets metadata value under a given key name for the lobby.
	 *
	 * @param key - Key for the data
	 * @param value - Data value
	 */
	SetMetadata(key: string, value: string): void;

	/**
	 * Deletes the lobby metadata for a key.
	 *
	 * @param key - Key for the data
	 */
	DeleteMetadata(key: string): void;

	/**
	 * Sets the lobby to locked or unlocked. When locked, new users cannot join the lobby.
	 *
	 * @param locked - Whether to lock or unlock the lobby
	 */
	SetLocked(locked: boolean): void;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies#data-models-lobbymembertransaction-struct|Lobbies}
 */
export interface LobbyMemberTransaction {
	/**
	 * Sets metadata value under a given key name for the current user.
	 *
	 * @param key - Key for the data
	 * @param value - Data value
	 */
	SetMetadata(key: string, value: string): void;

	/**
	 * Deletes the user metadata for a key.
	 *
	 * @param key - Key for the data
	 */
	DeleteMetadata(key: string): void;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies#data-models-lobbysearchquery-struct|Lobbies}
 */
export interface LobbySearchQuery {
	/**
	 * Filters lobbies based on metadata comparison. Available filter values are `owner_id`,
	 * `capacity`, `slots`, and `metadata`. If you are filtering based on metadata, make sure you
	 * prepend your key with `metadata.`.
	 *
	 * @param key - Key to search for filter data
	 * @param comp - How the value on the lobby metadata should be compared to the search value
	 * @param cast - Should the search value be cast as a string or a number
	 * @param value - The value to filter against
	 */
	Filter(key: string, comp: LobbySearchComparison, cast: LobbySearchCast, value: string): void;

	/**
	 * Sorts the filtered lobbies based on "near-ness" to a given value.
	 *
	 * @param key - Key for the data
	 * @param cast - Should the search value be cast as a string or a number
	 * @param value - The value to sort by
	 */
	Sort(key: string, cast: LobbySearchCast, value: string): void;

	/**
	 * Limits the number of lobbies returned in a search.
	 *
	 * @param limit - The number of lobbies to return at max
	 */
	Limit(limit: number): void;

	/**
	 * Filters lobby results to within certain regions relative to the user's location.
	 *
	 * @param distance - The distance within which to search for lobbies
	 */
	Distance(distance: LobbySearchDistance): void;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies|Lobbies}
 */
export interface LobbyManager extends NodeJS.EventEmitter {
	/**
	 * Gets a Lobby transaction used for creating a new lobby.
	 */
	GetLobbyCreateTransaction(): Discord.LobbyTransaction;

	/**
	 * Gets a lobby transaction used for updating an existing lobby.
	 *
	 * @param lobbyId - The lobby you want to change
	 */
	GetLobbyUpdateTransaction(lobbyId: bigint): Discord.LobbyTransaction;

	/**
	 * Gets a new member transaction for a lobby member in a given lobby.
	 *
	 * @param lobbyId - The lobby you want to change
	 * @param userId - The user you want to change
	 */
	GetMemberUpdateTransaction(lobbyId: bigint, userId: bigint): Discord.LobbyMemberTransaction;

	/**
	 * Creates a lobby. Creating a lobby auto-joins the connected user to it.
	 *
	 * @warning
	 * **Do not call `SetOwner()` in the transaction for this method.**
	 *
	 * @param transaction - A lobby transaction with set properties like capacity
	 */
	CreateLobby(transaction: LobbyTransaction, callback: (result: Discord.Result, lobby: Discord.Lobby) => void): void;

	/**
	 * Updates a lobby with data from the given transaction. You *can* call `SetOwner()` in this
	 * transaction.
	 *
	 * @warning
	 * This call has a rate limit of 10 updates per 5 seconds. If you fear you might hit that, it
	 * may be a good idea to batch your lobby updates into transactions.
	 *
	 * @param lobbyId - The lobby you want to change
	 * @param transaction - The transaction with wanted changes
	 */
	UpdateLobby(lobbyId: bigint, transaction: LobbyTransaction, callback: (result: Discord.Result) => void): void;

	/**
	 * Deletes a given lobby.
	 *
	 * @param lobbyId - The lobby you want to delete
	 */
	DeleteLobby(lobbyId: bigint, callback: (result: Discord.Result) => void): void;

	/**
	 * Connects the current user to a given lobby. You can be connected to up to five lobbies at a
	 * time.
	 *
	 * @param lobbyId - The lobby you want to connect to
	 * @param lobbySecret - The password for the lobby
	 */
	/* prettier-ignore */
	/* eslint-disable-next-line */
	ConnectLobby(lobbyId: bigint, lobbySecret: string, callback: (result: Discord.Result, lobby: Discord.Lobby) => void): void

	/**
	 * Connects the current user to a lobby; requires the special activity secret from the lobby
	 * which is a concatenated `lobbyId` and `secret`.
	 *
	 * @param activitySecret - The special activity secret for the lobby
	 */
	/* prettier-ignore */
	/* eslint-disable-next-line */
	ConnectLobbyWithActivitySecret(activitySecret: string, callback: (result: Discord.Result, lobby: Discord.Lobby) => void): void

	/**
	 * Gets the special activity secret for a given lobby.
	 *
	 * @remarks
	 * If you are creating lobbies from game clients, use this to easily interact with Rich Presence
	 * invites. Set the returned secret to your activity's `JoinSecret`.
	 *
	 * @param lobbyId - The lobby you want to get the secret for
	 */
	GetLobbyActivitySecret(lobbyId: bigint): string;

	/**
	 * Disconnects the current user from a lobby.
	 *
	 * @param lobbyId - The lobby you want to leave
	 */
	DisconnectLobby(lobbyId: bigint, callback: (result: Discord.Result) => void): void;

	/**
	 * Gets the lobby object for a given lobby ID.
	 *
	 * @remarks
	 * You must first call [`Search()`][1] to build a stable list of lobbies. This function will
	 * then query those lobbies for ones with a matching ID.
	 *
	 * @param lobbyId - The lobby you want to get
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/lobbies#search
	 */
	GetLobby(lobbyId: bigint): Discord.Lobby;

	/**
	 * Returns the number of metadata key/value pairs on a given lobby. Used for accessing metadata
	 * by iterating over the list.
	 *
	 * @param lobbyId - The lobby you want to get metadata for
	 */
	LobbyMetadataCount(lobbyId: bigint): number;

	/**
	 * Returns the key for the lobby metadata at the given index.
	 *
	 * @param lobbyId - The lobby you want to get metadata for
	 * @param index - The index of lobby metadata to access
	 */
	GetLobbyMetadataKey(lobbyId: bigint, index: number): string;

	/**
	 * Returns lobby metadata value for a given key and ID. Can be used with iteration, or direct
	 * access by keyname.
	 *
	 * @param lobbyId - The lobby you want to get metadata for
	 * @param key - The key name to access
	 */
	GetLobbyMetadataValue(lobbyId: bigint, key: string): string;

	/**
	 * Get the number of members in a lobby.
	 *
	 * @param lobbyId - The lobby you want to get members for
	 */
	MemberCount(lobbyId: bigint): number;

	/**
	 * Gets the user ID of the lobby member at the given index.
	 *
	 * @param lobbyId - The lobby the member belongs to
	 * @param index - The index of the lobby member to access
	 */
	GetMemberUserId(lobbyId: bigint, index: number): bigint;

	/**
	 * Gets the user object for a given user ID.
	 *
	 * @param lobbyId - The lobby the member belongs to
	 * @param userId - The user's `userId`
	 */
	GetMemberUser(lobbyId: bigint, userId: bigint): Discord.User;

	/**
	 * Gets the number of metadata key/value pairs for the given lobby member. Used for accessing
	 * metadata by iterating over a list.
	 *
	 * @param lobbyId - The lobby the member belongs to
	 * @param userId - The ID of the user to get metadata for
	 */
	MemberMetadataCount(lobbyId: bigint, userId: bigint): number;

	/**
	 * Gets the key for the lobby metadata at the given index on a lobby member.
	 *
	 * @param lobbyId - The lobby the member belongs to
	 * @param userId - The ID of the user to get metadata for
	 * @param index - The index of metadata to access
	 */
	GetMemberMetadataKey(lobbyId: bigint, userId: bigint, index: number): string;

	/**
	 * Returns user metadata for a given key.
	 *
	 * @remarks
	 * Can be used in conjunction with the count and get key functions if you're iterating over
	 * metadata, or you can access the metadata directly by keyname.
	 *
	 * @param lobbyId - The lobby the member belongs to
	 * @param userId - The ID of the user to get metadata for
	 * @param key - The metadata key to access
	 */
	GetMemberMetadataValue(lobbyId: bigint, userId: bigint, key: string): string;

	/**
	 * Updates lobby member info for a given member of the lobby.
	 *
	 * @param lobbyId - The lobby the member belongs to
	 * @param userId - ID of the user
	 * @param transaction - Transaction with the changed data
	 */
	/* prettier-ignore */
	/* eslint-disable-next-line */
	UpdateMember(lobbyId: bigint, userId: bigint, transaction: LobbyMemberTransaction, callback: (result: Discord.Result) => void): void

	/**
	 * Sends a message to the lobby on behalf of the current user. You must be connected to the
	 * lobby you are messaging.
	 *
	 * This method has a rate limit of 10 messages per 5 seconds.
	 *
	 * @remarks
	 * You should use this function for message sending if you are *not* using the built in
	 * networking layer for the lobby. If you are, you should use [SendNetworkMessage][1] instead
	 *
	 * @param lobbyId - The lobby the member belongs to
	 * @param data - The data to send
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/lobbies#sendnetworkmessage
	 */
	SendLobbyMessage(lobbyId: bigint, data: number, callback: (result: Discord.Result) => void): void;

	/**
	 * Creates a search object to search available lobbies.
	 */
	GetSearchQuery(): Discord.LobbySearchQuery;

	/**
	 * Searches available lobbies based on the search criteria chosen in the
	 * `Discord.LobbySearchQuery` member functions.
	 *
	 * @remarks
	 * Lobbies that meet the criteria are then globally filtered, and can be accessed via iteration
	 * with `LobbyCount()` and GetLobbyId(). The callback fires when the list of lobbies is stable
	 * and ready for iteration.
	 *
	 * You do not necessarily need to access the filtered lobbies within the context of the result
	 * callback, but it may make it easier for the sake of asynchronous timing.
	 *
	 * @param search - The search criteria
	 */
	Search(search: LobbySearchQuery, callback: (result: Discord.Result) => void): void;

	/**
	 * Get the number of lobbies that match the search.
	 */
	LobbyCount(): number;

	/**
	 * Returns the ID for the lobby at the given index.
	 *
	 * @param index - The index at which to access the list of lobbies
	 */
	GetLobbyId(index: number): bigint;

	/**
	 * Connects to the voice channel of the current lobby.
	 *
	 * @remarks
	 * When connected to voice, the user can open their Discord overlay to see a list of other
	 * users with whom they are in voice, allowing them to mute/deafen themselves as well as mute/
	 * adjust the volume of other lobby members.
	 *
	 * You can also allow users to adjust voice settings for your game with [Overlay
	 * OpenVoiceSettings][1].
	 *
	 * @param lobbyId - Lobby to voice connect to
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/overlay#openvoicesettings
	 */
	ConnectVoice(lobbyId: bigint, callback: (result: Discord.Result) => void): void;

	/**
	 * Disconnects from the voice channel of a given lobby.
	 *
	 * @param lobbyId - Lobby to voice disconnect from
	 */
	DisconnectVoice(lobbyId: bigint, callback: (result: Discord.Result) => void): void;

	/**
	 * Fires when a lobby is updated.
	 *
	 * @param lobbyId - Lobby that updated
	 */
	on(event: 'LobbyUpdate', listener: (lobbyId: bigint) => void): this;

	/**
	 * Fired when a lobby is deleted.
	 *
	 * @param lobbyId - Lobby that was deleted
	 * @param reason - Reason for deletion–this is a system message
	 */
	on(event: 'LobbyDelete', listener: (lobbyId: bigint, reason: string) => void): this;

	/**
	 * Fires when a new member joins the lobby.
	 *
	 * @param lobbyId - Lobby the user joined
	 * @param userId - User that joined
	 */
	on(event: 'MemberConnect', listener: (lobbyId: bigint, userId: bigint) => void): this;

	/**
	 * Fires when data for a lobby member is updated.
	 *
	 * @param lobbyId - Lobby the user is a member of
	 * @param userId - User that was updated
	 */
	on(event: 'MemberUpdate', listener: (lobbyId: bigint, userId: bigint) => void): this;

	/**
	 * Fires when a member leaves the lobby.
	 *
	 * @param lobbyId - Lobby the user was a member of
	 * @param userId - User that left
	 */
	on(event: 'MemberDisconnect', listener: (lobbyId: bigint, userId: bigint) => void): this;

	/**
	 * Fires when a message is sent to the lobby.
	 *
	 * @param lobbyId - Lobby the message is sent to
	 * @param userId - User that sent the message
	 * @param data - The message contents
	 */
	on(event: 'LobbyMessage', listener: (lobbyId: bigint, userId: bigint, data: number) => void): this;

	/**
	 * Fires when a user connected to voice starts or stops speaking.
	 *
	 * @param lobbyId - Lobby the user is connected to
	 * @param userId - User in voice
	 * @param speaking - `true` == started speaking, `false` == stopped speaking
	 */
	on(event: 'Speaking', listener: (lobbyId: bigint, userId: bigint, speaking: boolean) => void): this;

	// SECTION Integrated Networking

	/**
	 * Connects to the networking layer for the given lobby ID. Call this when connecting to the
	 * lobby.
	 *
	 * @param lobbyId - The ID of the lobby you are in
	 */
	ConnectNetwork(lobbyId: bigint): void;

	/**
	 * Disconnects from the networking layer for the given lobby ID.
	 *
	 * @param lobbyId - The ID of the lobby you are in
	 */
	DisconnectNetwork(lobbyId: bigint): void;

	/**
	 * Flushes the network. Call this when you're done sending messages.
	 */
	FlushNetwork(): void;

	/**
	 * Opens a network channel to all users in a lobby on the given channel number.
	 *
	 * @param lobbyId - The ID of the lobby you are in
	 * @param channelId - The channel on which to connect
	 * @param reliable - Whether the channel should be unreliable or reliable
	 */
	OpenNetworkChannel(lobbyId: bigint, channelId: number, reliable: boolean): void;

	/**
	 * Sends a network message to the given user ID that is a member of the given lobby ID over the
	 * given channel ID.
	 *
	 * @param lobbyId - The ID of the lobby you are in
	 * @param userId - The ID of the user to send a message to
	 * @param channelId - The channel on which to connect
	 * @param data - The message to send
	 */
	SendNetworkMessage(lobbyId: bigint, userId: bigint, channelId: number, data: number): void;

	/**
	 * Fires when the user receives a message from the lobby's networking layer.
	 *
	 * @param lobbyId - The ID of the lobby you are in
	 * @param userId - The ID of the user who sent the message
	 * @param channelId - The channel the message was sent on
	 * @param data - The message
	 */
	/* prettier-ignore */
	/* eslint-disable-next-line */
	on(event: 'NetworkMessage', listener: (lobbyId: bigint, userId: bigint, channelId: number, data: number) => void): void

	// !SECTION
}

// SECTION Endpoints

/**
 * Creates a new lobby.
 *
 * @endpoint [POST](https://discord.com/developers/docs/game-sdk/lobbies#create-lobby) `/lobbies`
 */
export interface CreateLobby {
	body: UpdateLobby & {
		/**
		 * Your application ID.
		 */
		application_id: Snowflake;

		/**
		 * The region in which to make the lobby.
		 *
		 * @defaultValue The region of the requesting server's IP address
		 */
		region?: string;
	};

	response: CreateLobby['body'] & {
		secret: string;
		id: Snowflake;
		owner_id: Snowflake;
	};
}

/**
 * Updates a lobby.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/game-sdk/lobbies#update-lobby) `/lobbies/{lobby.id}`
 */
export interface UpdateLobby {
	body: {
		/**
		 * The type of lobby.
		 */
		type: LobbyType;

		/**
		 * Metadata for the lobby–key/value pairs with types `string`.
		 */
		metadata: Record<string, string>;

		/**
		 * Max lobby capacity.
		 *
		 * @defaultValue 16
		 */
		capacity?: number;
	};
}

/**
 * Deletes a lobby.
 *
 * @endpoint [DELETE](https://discord.com/developers/docs/game-sdk/lobbies#delete-lobby) `/lobbies/{lobby.id}`
 */
export type DeleteLobby = { response: never };

/**
 * Updates the metadata for a lobby member.
 *
 * @endpoint [PATCH](https://discord.com/developers/docs/game-sdk/lobbies#update-lobby-member) `/lobbies/{lobby.id}/members/{user.id}`
 */
export interface UpdateLobbyMember {
	body: {
		/**
		 * Metadata for the lobby member–key/value pairs with types `string`.
		 */
		metadata: Record<string, string>;
	};
}

/**
 * Creates a lobby search for matchmaking around given criteria.
 *
 * @endpoint [POST](https://discord.com/developers/docs/game-sdk/lobbies#create-lobby-search) `/lobbies/search`
 */
export interface CreateLobbySearch {
	body: {
		/**
		 * Your application ID.
		 */
		application_id: string;

		/**
		 * The filter to check against.
		 */
		filter: SearchFilter;

		/**
		 * How to sort the results.
		 */
		sort: SearchSort;

		/**
		 * Limit of lobbies returned.
		 *
		 * @defaultValue 25
		 */
		limit?: number;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies#create-lobby-search-searchfilter-object|Lobbies}
 */
export interface SearchFilter {
	/**
	 * The metadata key to search.
	 */
	key: string;

	/**
	 * The value of the metadata key to validate against.
	 */
	value: string;

	/**
	 * The type to cast `value` as.
	 */
	cast: LobbySearchCast;

	/**
	 * How to compare the metadata values.
	 */
	comparison: LobbySearchComparison;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/lobbies#create-lobby-search-searchsort-object|Lobbies}
 */
export interface SearchSort {
	/**
	 * The metadata key on which to sort lobbies that meet the search criteria.
	 */
	key: string;

	/**
	 * The type to cast `value` as.
	 */
	cast: LobbySearchCast;

	/**
	 * The value around which to sort the key.
	 */
	near_value: string;
}

/**
 * Sends a message to the lobby, fanning it out to other lobby members.
 *
 * @remarks
 * This endpoints accepts a UTF8 string. If you want to send binary, you can send it to this
 * endpoint as a base64 encoded data uri.
 *
 * @endpoint [POST](https://discord.com/developers/docs/game-sdk/lobbies#send-lobby-data|Lobbies) `/lobbies/{lobby.id}/send`
 */
export interface SendLobbyData {
	body: {
		/**
		 * A message to be sent to other lobby members.
		 */
		data: string;
	};
}

// !SECTION
