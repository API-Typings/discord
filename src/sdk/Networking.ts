/**
 * @source {@link https://discord.com/developers/docs/game-sdk/networking|Networking}
 */
export interface NetworkManager extends NodeJS.EventEmitter {
	/**
	 * Get the networking peer ID for the current user, allowing other users to send packets to
	 * them.
	 */
	GetPeerId(): bigint;

	/**
	 * Flushes the network. Run this at the end of your game's loop, once you've finished sending
	 * all you need to send.
	 */
	Flush(): void;

	/**
	 * Opens a channel to a user with their given peer ID on the given channel number.
	 *
	 * @remarks
	 * Unreliable channels—`reliable = false`—should be used for loss-tolerant data, like player
	 * positioning in the world. Reliable channels—`reliable = true`—should be used for data that
	 * *must* get to the user, like loot drops.
	 *
	 * @param peerId - The `peerId` of the user to connect to
	 * @param channelId - The channel on which to connect
	 * @param reliable - Whether the channel should be unreliable or reliable
	 */
	OpenChannel(peerId: bigint, channelId: number, reliable: boolean): void;

	/**
	 * Opens a network connection to another Discord user.
	 *
	 * @param peerId - The `peerId` of the user to connect to
	 * @param route - The route the user is currently broadcasting
	 */
	OpenPeer(peerId: bigint, route: string): void;

	/**
	 * Updates the network connection to another Discord user.
	 *
	 * @remarks
	 * You'll want to call this when notified that the route for a user to which you are connected
	 * has changed, most likely from a lobby member update event.
	 *
	 * @param peerId - The user's `peerId`
	 * @param route - The new route for the user
	 */
	UpdatePeer(peerId: bigint, route: string): void;

	/**
	 * Sends data to a given peer ID through the given channel.
	 *
	 * @param peerId - The peer ID to connect to
	 * @param channelId - The channel on which to connect
	 * @param data - The data to send
	 */
	SendMessage(peerId: bigint, channelId: number, data: number): void;

	/**
	 * Close the connection to a given user by peerId on the given channel.
	 *
	 * @param peerId - The `peerId` of the user to disconnect from
	 * @param channelId - The route to close
	 */
	CloseChannel(peerId: bigint, channelId: number): void;

	/**
	 * Disconnects the network session to another Discord user.
	 *
	 * @param peerId - The user's `peerId`
	 */
	ClosePeer(peerId: bigint): void;

	/**
	 * Fires when data is recieved from another user.
	 *
	 * @remarks
	 * This callback will only fire if you already have an open channel with the user sending you
	 * data. Make sure you're running `RunCallbacks()` in your game loop, or you'll never get data.
	 *
	 * @param peerId - The peer ID of the sender
	 * @param channelId - The channel it was sent on
	 * @param data - The data sent
	 */
	on(event: 'Message', listener: (peerId: bigint, channelId: number, data: number) => void): this;

	/**
	 * Fires when the networking route has changed.
	 *
	 * @remarks
	 * You should broadcast to other users to whom you are connected that this has changed,
	 * probably by updating your lobby member metadata for others to receive.
	 *
	 * @param route - The new route to the user
	 */
	on(event: 'RouteUpdate', listener: (route: string) => void): this;
}
