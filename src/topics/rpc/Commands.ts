import type { Nullable, Range } from 'extended-utility-types';
import type {
	Activity,
	Application,
	AuthorizationInformation,
	Device,
	Guild,
	Message,
	PartialChannel,
	PartialUser,
	RPC,
	Snowflake,
	VoiceChannel,
	VoiceState
} from '../../';

export interface CommandPayload<C extends Command> extends Omit<RPC.Payload, 'evt'> {
	cmd: C;
	nonce: string;
}

/**
 * Commands are requests made to the RPC socket by a client.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#commands-and-events-rpc-commands|RPC}
 */
export enum Command {
	/**
	 * Event dispatch
	 */
	Dispatch = 'DISPATCH',

	/**
	 * Used to authorize a new client with your app
	 */
	Authorize = 'AUTHORIZE',

	/**
	 * Used to authenticate an existing client with your app
	 */
	Authenticate = 'AUTHENTICATE',

	/**
	 * Used to retrieve guild information from the client
	 */
	GetGuild = 'GET_GUILD',

	/**
	 * Used to retrieve a list of guilds from the client
	 */
	GetGuilds = 'GET_GUILDS',

	/**
	 * Used to retrieve channel information from the client
	 */
	GetChannel = 'GET_CHANNEL',

	/**
	 * Used to retrieve a list of channels for a guild from the client
	 */
	GetChannels = 'GET_CHANNELS',

	/**
	 * Used to subscribe to an RPC event
	 */
	Subscribe = 'SUBSCRIBE',

	/**
	 * Used to unsubscribe from an RPC event
	 */
	Unsubscribe = 'UNSUBSCRIBE',

	/**
	 * Used to change voice settings of users in voice channels
	 */
	SetUserVoiceSettings = 'SET_USER_VOICE_SETTINGS',

	/**
	 * Used to join or leave a voice channel, group DM, or DM
	 */
	SelectVoiceChannel = 'SELECT_VOICE_CHANNEL',

	/**
	 * Used to get the current voice channel the client is in
	 */
	GetSelectedVoiceChannel = 'GET_SELECTED_VOICE_CHANNEL',

	/**
	 * Used to join or leave a voice channel, group DM, or DM
	 */
	SelectTextChannel = 'SELECT_TEXT_CHANNEL',

	/**
	 * Used to retrieve the client's voice settings
	 */
	GetVoiceSettings = 'GET_VOICE_SETTINGS',

	/**
	 * Used to set the client's voice settings
	 */
	SetVoiceSettings = 'SET_VOICE_SETTINGS',

	/**
	 * Used to capture a keyboard shortcut entered by the user
	 */
	CaptureShortcut = 'CAPTURE_SHORTCUT',

	/**
	 * Used to send info about certified hardware devices
	 */
	SetCertifiedDevices = 'SET_CERTIFIED_DEVICES',

	/**
	 * Used to update a user's Rich Presence
	 */
	SetActivity = 'SET_ACTIVITY',

	/**
	 * Used to consent to a Rich Presence Ask to Join request
	 */
	SendActivityJoinInvite = 'SEND_ACTIVITY_JOIN_INVITE',

	/**
	 * Used to reject a Rich Presence Ask to Join request
	 */
	CloseActivityRequest = 'CLOSE_ACTIVITY_REQUEST'
}

// ANCHOR Authorize

/**
 * Used to authenticate a new client with your app. By default this pops up a modal in-app that asks
 * the user to authorize access to your app.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#authorize|RPC}
 */
export interface Authorize extends CommandPayload<Command.Authorize> {
	args: {
		/**
		 * Scopes to authorize
		 */
		scopes: string;

		/**
		 * OAuth2 application ID
		 */
		client_id: Snowflake;

		/**
		 * One-time use RPC token
		 */
		rpc_token: string;

		/**
		 * Username to create a guest account with if the user does not have Discord
		 */
		username: string;
	};

	data: {
		/**
		 * OAuth2 authorization code
		 */
		code: string;
	};
}

// ANCHOR Authenticate

/**
 * Used to authenticate an existing client with your app.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#authenticate|RPC}
 */
export interface Authenticate extends CommandPayload<Command.Authenticate> {
	args: {
		/**
		 * OAuth2 access token
		 */
		access_token: string;
	};

	data: Omit<AuthorizationInformation, 'user' | 'application'> & {
		/**
		 * The authed user
		 */
		user: PartialUser;

		/**
		 * Application the user authorized
		 */
		application: Pick<Application, 'id' | 'name' | 'description' | 'icon' | 'rpc_origins'>;
	};
}

// ANCHOR Get Guilds

/**
 * Used to get a list of guilds the client is in.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#getguilds|RPC}
 */
export interface GetGuilds extends CommandPayload<Command.GetGuilds> {
	args: Record<string, never>;

	data: {
		/**
		 * The guilds the user is in
		 */
		guilds: Pick<Guild, 'id' | 'name'>[];
	};
}

// ANCHOR Get Guild

/**
 * Used to get a guild the client is in.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#getguild|RPC}
 */
export interface GetGuild extends CommandPayload<Command.GetGuild> {
	args: {
		/**
		 * ID of the guild to get
		 */
		guild_id: Snowflake;

		/**
		 * Asynchronously get guild with time to wait before timing out
		 */
		timeout: number;
	};

	data: Pick<Guild, 'id' | 'name'> & {
		/**
		 * Guild icon URL
		 */
		icon_url: string;

		/**
		 * Members of the guild (deprecated; always empty array)
		 */
		members: [];
	};
}

// ANCHOR Get Channel

/**
 * Used to get a channel the client is in.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#getchannel|RPC}
 */
export interface GetChannel extends CommandPayload<Command.GetChannel> {
	args: {
		/**
		 * ID of the channel to get
		 */
		channel_id: Snowflake;
	};

	data: Omit<VoiceChannel, 'parent' | 'permission_overwrites'> & {
		/**
		 * Channel's voice states
		 */
		voice_states: VoiceState[];

		/**
		 * Channel's messages
		 */
		messages: Message[];
	};
}

// ANCHOR Get Channels

/**
 * Used to get a guild's channels the client is in.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#getchannels|RPC}
 */
export interface GetChannels extends CommandPayload<Command.GetChannels> {
	args: {
		/**
		 * ID of the guild to get channels for
		 */
		guild_id: Snowflake;
	};

	data: {
		/**
		 * Guild channels the user is in
		 */
		channels: PartialChannel[];
	};
}

// ANCHOR Set User Voice Settings

/**
 * Used to change voice settings of users in voice channels.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#setuservoicesettings|RPC}
 */
export interface SetUserVoiceSettings extends CommandPayload<Command.SetUserVoiceSettings> {
	data: {
		/**
		 * User ID
		 */
		user_id: Snowflake;

		/**
		 * Set the pan of the user
		 */
		pan?: Pan;

		/**
		 * Set the volume of the user (defaults to 100, min 0, max 200)
		 *
		 * @defaultValue 100
		 */
		volume?: Range<0, 200>;

		/**
		 * Set the mute state of the user
		 */
		mute?: boolean;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#setuservoicesettings-pan-object|RPC}
 */
export interface Pan {
	/**
	 * Left pan of user (min: 0.0, max: 1.0)
	 */
	left: number;

	/**
	 * Right pan of user (min: 0.0, max: 1.0)
	 */
	right: number;
}

// ANCHOR Select Voice Channel

/**
 * Used to join and leave voice channels, group DMs, or DMs.
 *
 * @warning
 * When trying to join the user to a voice channel, you will receive a `5003` error coded response
 * if the user is already in a voice channel. The `force` parameter should only be specified in
 * response to the case where a user is already in a voice channel and they have **approved** to be
 * moved by your app to a new voice channel.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#selectvoicechannel|RPC}
 */
export interface SelectVoiceChannel extends CommandPayload<Command.SelectVoiceChannel> {
	args: {
		/**
		 * Channel ID to join (or `null` to leave).
		 */
		channel_id: Nullable<Snowflake>;

		/**
		 * Asynchronously join channel with time to wait before timing out.
		 */
		timeout?: number;

		/**
		 * Forces a user to join a voice channel.
		 */
		force?: boolean;
	};

	data: Nullable<GetChannel['data']>;
}

// ANCHOR Get Selected Voice Channel

/**
 * Used to get the client's current voice channel.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#getselectedvoicechannel|RPC}
 */
export interface GetSelectedVoiceChannel extends CommandPayload<Command.GetSelectedVoiceChannel> {
	args: Record<string, never>;
	data: Nullable<GetChannel['data']>;
}

/**
 * Used to join and leave text channels, group dms, or dms.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#selecttextchannel|RPC}
 */
export interface SelectTextChannel extends CommandPayload<Command.SelectTextChannel> {
	args: Omit<SelectVoiceChannel, 'force'>;
	data: Nullable<GetChannel['data']>;
}

// SECTION Voice Settings

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#getvoicesettings|RPC}
 */
export interface GetVoiceSettings extends CommandPayload<Command.GetVoiceSettings> {
	args: Record<string, never>;

	data: {
		/**
		 * Input settings.
		 */
		input: VoiceSettingsInput;

		/**
		 * Output settings.
		 */
		output: VoiceSettingsOutput;

		/**
		 * Voice mode settings.
		 */
		mode: VoiceSettingsMode;

		/**
		 * State of automatic gain control.
		 */
		automatic_gain_control: boolean;

		/**
		 * State of echo cancellation.
		 */
		echo_cancellation: boolean;

		/**
		 * State of noise suppression.
		 */
		noise_suppression: boolean;

		/**
		 * State of voice quality of service.
		 */
		qos: boolean;

		/**
		 * State of silence warning notice.
		 */
		silence_warning: boolean;

		/**
		 * State of self-deafen.
		 */
		deaf: boolean;

		/**
		 * State of self-mute.
		 */
		mute: boolean;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#getvoicesettings-voice-settings-input-object|RPC}
 */
export interface VoiceSettingsInput {
	/**
	 * Device ID.
	 */
	device_id: string;

	/**
	 * Input voice level (min: 0, max: 100).
	 */
	volume: number;

	/**
	 * Array of readonly device objects containing `id` and `name` string keys.
	 */
	available_devices: readonly VoiceDevice[];
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#getvoicesettings-voice-settings-output-object|RPC}
 */
export type VoiceSettingsOutput = VoiceSettingsInput;

export interface VoiceDevice {
	id: string;
	name: string;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#getvoicesettings-voice-settings-mode-object|RPC}
 */
export interface VoiceSettingsMode {
	/**
	 * Voice setting mode type.
	 */
	type: VoiceSettingsModeType;

	/**
	 * Voice activity threshold automatically sets its threshold.
	 */
	auto_threshold: boolean;

	/**
	 * Threshold for voice activity (in dB) (min: -100, max: 0).
	 */
	threshold: number;

	/**
	 * Shortcut key combos for PTT.
	 */
	shortcut: ShortcutKeyCombo[];

	/**
	 * The PTT release delay (in ms) (min: 0, max: 2000).
	 */
	delay: number;
}

export type VoiceSettingsModeType = 'PUSH_TO_TALK' | 'VOICE_ACTIVITY';

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#getvoicesettings-shortcut-key-combo-object|RPC}
 */
export interface ShortcutKeyCombo {
	/**
	 * Key type.
	 */
	type: KeyType;

	/**
	 * Key code.
	 */
	code: number;

	/**
	 * Key name.
	 */
	name: string;
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#getvoicesettings-shortcut-key-combo-object|RPC}
 */
export enum KeyType {
	KeyboardKey,
	MouseButton,
	KeyboardModifierKey,
	GamepadButton
}

// !SECTION

/**
 * When setting voice settings, all fields are optional. Only passed fields are updated.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#setvoicesettings|RPC}
 */
export interface SetVoiceSettings extends CommandPayload<Command.SetVoiceSettings> {
	args: Partial<GetVoiceSettings['data']>;
	data: GetVoiceSettings['data'];
}

// SECTION (Un)Subscribe

/**
 * Used to subscribe to events.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#subscribe|RPC}
 */
export interface Subscribe<T extends RPC.Event> extends CommandPayload<Command.Subscribe> {
	/**
	 * The event being subscribed to.
	 */
	evt: T;

	/**
	 * The args needed for the event.
	 */
	args: RPC.EventPayload<T>;

	data: {
		/**
		 * Event name now subscribed to.
		 */
		evt: T;
	};
}

export interface Unsubscribe<T extends RPC.Event> extends CommandPayload<Command.Unsubscribe> {
	/**
	 * The event that was subscribed to.
	 */
	evt: T;

	/**
	 * The args needed for the previously subscribed event.
	 */
	args: RPC.EventPayload<T>;

	data: {
		/**
		 * Event name now unsubscribed from.
		 */
		evt: T;
	};
}

// !SECTION

/**
 * Used to capture a keyboard shortcut entered by the user.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#captureshortcut|RPC}
 */
export interface CaptureShortcut extends CommandPayload<Command.CaptureShortcut> {
	args: {
		/**
		 * Capture action.
		 */
		action: CaptureShortcutAction;
	};

	data: {
		/**
		 * The captured shortcut key combo array, or `null` for the `STOP` action.
		 */
		shortcut: ShortcutKeyCombo[];
	};
}

export type CaptureShortcutAction = 'START' | 'STOP';

// SECTION Set Certified Devices

/**
 * Used by hardware manufacturers to send information about the current state of their certified
 * devices that are connected to Discord.
 *
 * @source {@link https://discord.com/developers/docs/topics/rpc#setcertifieddevices|RPC}
 */
export interface SetCertifiedDevices extends CommandPayload<Command.SetCertifiedDevices> {
	args: {
		/**
		 * A list of devices for the manufacturer, in order of priority
		 */
		devices: Device[];
	};
}

// !SECTION

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#setactivity|RPC}
 */
export interface SetActivity extends CommandPayload<Command.SetActivity> {
	args: {
		/**
		 * The application's process ID.
		 */
		pid: number;

		/**
		 * The rich precense to assign to the user.
		 */
		activity: Activity;
	};
}

/**
 * @source {@link https://discord.com/developers/docs/topics/rpc#sendactivityjoininvite|RPC}
 */
export interface SendActivityJoinInvite extends CommandPayload<Command.SendActivityJoinInvite> {
	args: {
		/**
		 * The ID of the requesting user.
		 */
		user_id: Snowflake;
	};
}

export type CloseActivityRequest = CommandPayload<Command.CloseActivityRequest> & {
	args: SendActivityJoinInvite['args'];
};
