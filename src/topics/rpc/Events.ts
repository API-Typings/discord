import { FixedTuple, Nullable } from 'extended-utility-types';
import type {
	Message,
	PartialChannel,
	PartialGuild,
	PartialUser,
	RPC,
	RPCErrorCode,
	Snowflake,
	VoiceState
} from '../../';

export interface EventPayload<E extends Event> extends Omit<RPC.Payload, 'nonce' | 'args'> {
	cmd: RPC.Command.Dispatch;
	evt: E;
}

// ANCHOR Events

/**
 * Events are payloads sent over the socket to a client that correspond to events in Discord.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#commands-and-events-rpc-events|RPC}
 */
export enum Event {
	/**
	 * Non-subscription event sent immediately after connecting, contains server information.
	 */
	Ready = 'READY',

	/**
	 * Non-subscription event sent when there is an error, including command responses.
	 */
	Error = 'ERROR',

	/**
	 * Sent when a subscribed server's state changes.
	 */
	GuildStatus = 'GUILD_STATUS',

	/**
	 * Sent when a guild is created/joined on the client.
	 */
	GuildCreate = 'GUILD_CREATE',

	/**
	 * Sent when a channel is created/joined on the client.
	 */
	ChannelCreate = 'CHANNEL_CREATE',

	/**
	 * Sent when the client joins a voice channel.
	 */
	VoiceChannelSelect = 'VOICE_CHANNEL_SELECT',

	/**
	 * Sent when a user joins a subscribed voice channel.
	 */
	VoiceStateCreate = 'VOICE_STATE_CREATE',

	/**
	 * Sent when a user's voice state changes in a subscribed voice channel (mute, volume, etc.).
	 */
	VoiceStateUpdate = 'VOICE_STATE_UPDATE',

	/**
	 * Sent when a user parts a subscribed voice channel.
	 */
	VoiceStateDelete = 'VOICE_STATE_DELETE',

	/**
	 * Sent when the client's voice settings update.
	 */
	VoiceSettingsUpdate = 'VOICE_SETTINGS_UPDATE',

	/**
	 * Sent when the client's voice connection status changes.
	 */
	VoiceConnectionStatus = 'VOICE_CONNECTION_STATUS',

	/**
	 * Sent when a user in a subscribed voice channel speaks.
	 */
	SpeakingStart = 'SPEAKING_START',

	/**
	 * Sent when a user in a subscribed voice channel stops speaking.
	 */
	SpeakingStop = 'SPEAKING_STOP',

	/**
	 * Sent when a message is created in a subscribed text channel.
	 */
	MessageCreate = 'MESSAGE_CREATE',

	/**
	 * Sent when a message is updated in a subscribed text channel.
	 */
	MessageUpdate = 'MESSAGE_UPDATE',

	/**
	 * Sent when a message is deleted in a subscribed text channel.
	 */
	MessageDelete = 'MESSAGE_DELETE',

	/**
	 * Sent when the client receives a notification (mention or new message in eligible channels).
	 */
	NotificationCreate = 'NOTIFICATION_CREATE',

	/**
	 * Sent when the user presses a key during shortcut capturing.
	 */
	CaptureShortcutChange = 'CAPTURE_SHORTCUT_CHANGE',

	/**
	 * Sent when the user clicks a Rich Presence join invite in chat to join a game.
	 */
	ActivityJoin = 'ACTIVITY_JOIN',

	/**
	 * Sent when the user clicks a Rich Presence spectate invite in chat to spectate a game.
	 */
	ActivitySpectate = 'ACTIVITY_SPECTATE',

	/**
	 * Sent when the user receives a Rich Presence Ask to Join request.
	 */
	ActivityJoinRequest = 'ACTIVITY_JOIN_REQUEST'
}

// ANCHOR Ready

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#ready|RPC}
 */
export interface Ready extends EventPayload<Event.Ready> {
	args: never;
	data: {
		/**
		 * RPC version.
		 */
		v: number;

		/**
		 * Server configuration.
		 */
		config: RPCServerConfiguration;

		/**
		 * The user to whom you are connected.
		 */
		user: PartialUser;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#ready-rpc-server-configuration-object|RPC}
 */
export interface RPCServerConfiguration {
	/**
	 * Server's CDN.
	 */
	cdn_host: string;

	/**
	 * Server's API endpoint.
	 */
	api_endpoint: string;

	/**
	 * Server's environment.
	 */
	environment: string;
}

// ANCHOR Error

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#error|RPC}
 */
export interface Error extends EventPayload<Event.Error> {
	args: never;
	data: {
		/**
		 * RPC error code.
		 */
		code: RPCErrorCode;

		/**
		 * Error description.
		 */
		message: string;
	};
}

// SECTION Guild/Channel Events

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#guildstatus|RPC}
 */
export interface GuildStatus extends EventPayload<Event.GuildStatus> {
	args: {
		/**
		 * ID of guild to listen to updates of.
		 */
		guild_id: Snowflake;
	};

	data: {
		/**
		 * Guild with requested ID.
		 */
		guild: Pick<PartialGuild, 'id' | 'name'> & {
			icon_url: Nullable<string>;
		};

		/**
		 * Always `0`.
		 */
		online: 0;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#guildcreate|RPC}
 */
export interface GuildCreate extends EventPayload<Event.GuildCreate> {
	args: never;
	data: Pick<PartialGuild, 'id' | 'name'>;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#channelcreate|RPC}
 */
export interface ChannelCreate extends EventPayload<Event.ChannelCreate> {
	args: never;
	data: Omit<PartialChannel, 'permissions'>;
}

// !SECTION

// SECTION Voice Events

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#voicechannelselect|RPC}
 */
export interface VoiceChannelSelect extends EventPayload<Event.VoiceChannelSelect> {
	args: never;
	data: {
		/**
		 * ID of guild (`null` if none).
		 */
		guild_id: Nullable<Snowflake>;

		/**
		 * ID of channel (`null` if none).
		 */
		channel_id: Nullable<Snowflake>;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#voicesettingsupdate|RPC}
 */
export interface VoiceSettingsUpdate extends EventPayload<Event.VoiceSettingsUpdate> {
	args: never;
	data: RPC.GetVoiceSettings['data'];
}

interface VoiceStateEvent<T extends Event> extends EventPayload<T> {
	args: {
		/**
		 * ID of channel to listen to updates of.
		 */
		channel_id: Snowflake;
	};

	data: {
		voice_state: Pick<VoiceState, 'mute' | 'deaf' | 'self_mute' | 'self_deaf' | 'suppress'>;
		user: PartialUser & { bot: boolean };
		nick: string;
		volume: number;
		mute: boolean;
		pan: RPC.Pan;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#voicestatecreatevoicestateupdatevoicestatedelete|RPC}
 */
export type VoiceStateCreate = VoiceStateEvent<Event.VoiceStateCreate>;

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#voicestatecreatevoicestateupdatevoicestatedelete|RPC}
 */
export type VoiceStateUpdate = VoiceStateEvent<Event.VoiceStateUpdate>;

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#voicestatecreatevoicestateupdatevoicestatedelete|RPC}
 */
export type VoiceStateDelete = VoiceStateEvent<Event.VoiceStateDelete>;

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#voiceconnectionstatus|RPC}
 */
export interface VoiceConnectionStatus extends EventPayload<Event.VoiceConnectionStatus> {
	args: never;
	data: {
		/**
		 * A voice connection state.
		 */
		state: VoiceConnectionState;

		/**
		 * Hostname of the connected voice server.
		 */
		hostname: string;

		/**
		 * Last 20 pings (in ms).
		 */
		pings: Partial<FixedTuple<number, 20>>;

		/**
		 * Average ping (in ms).
		 */
		average_ping: number;

		/**
		 * Last ping (in ms).
		 */
		last_ping: number;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#voiceconnectionstatus-voice-connection-states|RPC}
 */
export enum VoiceConnectionState {
	/**
	 * TCP disconnected.
	 */
	Disconnected = 'DISCONNECTED',

	/**
	 * Waiting for voice endpoint.
	 */
	AwaitingEndpoint = 'AWAITING_ENDPOINT',

	/**
	 * TCP authenticating.
	 */
	Authenticating = 'AUTHENTICATING',

	/**
	 * TCP connecting.
	 */
	Connecting = 'CONNECTING',

	/**
	 * TCP connected.
	 */
	Connected = 'CONNECTED',

	/**
	 * TCP connected, Voice disconnected.
	 */
	VoiceDisconnected = 'VOICE_DISCONNECTED',

	/**
	 * TCP connected, Voice connecting.
	 */
	VoiceConnecting = 'VOICE_CONNECTING',

	/**
	 * TCP connected, Voice connected.
	 */
	VoiceConnected = 'VOICE_CONNECTED',

	/**
	 * No route to host.
	 */
	NoRoute = 'NO_ROUTE',

	/**
	 * WebRTC ice checking.
	 */
	IceChecking = 'ICE_CHECKING'
}

// !SECTION

// SECTION Message Events

interface MessageEvent<T extends Event> extends EventPayload<T> {
	args: VoiceStateCreate['args'];
	data: {
		channel_id: Snowflake;
		message: Message;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#messagecreatemessageupdatemessagedelete|RPC}
 */
export type MessageCreate = MessageEvent<Event.MessageCreate>;

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#messagecreatemessageupdatemessagedelete|RPC}
 */
export type MessageUpdate = MessageEvent<Event.MessageUpdate>;

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#messagecreatemessageupdatemessagedelete|RPC}
 */
export type MessageDelete = MessageEvent<Event.MessageDelete>;

// !SECTION

// SECTION Speaking Events

interface SpeakingEvent<T extends Event> extends EventPayload<T> {
	args: VoiceStateCreate['args'];
	data: {
		/**
		 * ID of user who started/stopped speaking.
		 */
		user_id: Snowflake;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#speakingstartspeakingstop|RPC}
 */
export type SpeakingStart = SpeakingEvent<Event.SpeakingStart>;

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#speakingstartspeakingstop|RPC}
 */
export type SpeakingStop = SpeakingEvent<Event.SpeakingStop>;

// !SECTION

/**
 * This event requires the `rpc.notifications.read` OAuth2 scope.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#notificationcreate|RPC}
 */
export interface NotificationCreate extends EventPayload<Event.NotificationCreate> {
	args: never;
	data: {
		/**
		 * ID of channel where notification occurred.
		 */
		channel_id: Snowflake;

		/**
		 * Message that generated this notification.
		 */
		message: Message;

		/**
		 * Icon URL of the notification.
		 */
		icon_url: string;

		/**
		 * Title of the notification.
		 */
		title: string;

		/**
		 * Body of the notification.
		 */
		body: string;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#captureshortcutchange|RPC}
 */
export interface CaptureShortcutChange extends EventPayload<Event.CaptureShortcutChange> {
	args: never;
	data: {
		/**
		 * Captured shortcut key combos.
		 */
		shortcut: RPC.ShortcutKeyCombo;
	};
}

// SECTION Activity Events

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#activityjoin|RPC}
 */
export interface ActivityJoin extends EventPayload<Event.ActivityJoin> {
	args: never;
	data: {
		/**
		 * The `join_secret` for the given invite.
		 */
		secret: string;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#activityspectate|RPC}
 */
export interface ActivitySpectate extends EventPayload<Event.ActivitySpectate> {
	args: never;
	data: {
		/**
		 * The `spectate_secret` for the given invite.
		 */
		secret: string;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#activityjoinrequest|RPC}
 */
export interface ActivityJoinRequest extends EventPayload<Event.ActivityJoinRequest> {
	args: never;
	data: {
		/**
		 * Information about the user requesting to join.
		 */
		user: PartialUser;
	};
}

// !SECTION
