import type { PartialEmoji } from '../';

/**
 * Message components are a framework for adding interactive elements to the messages your app or
 * bot sends. They're accessible, customizable, and easy to use.
 *
 * @source {@link https://discord.com/developers/docs/interactions/message-components#component-object|Message Components}
 */
export interface Component {
	/**
	 * Valid for all components.
	 */
	type: ComponentType;

	/**
	 * Valid for Buttons.
	 */
	style?: ButtonStyle;

	/**
	 * Text that appears on the button, max 80 characters. Valid for Buttons.
	 */
	label?: string;

	/**
	 * Valid for Buttons.
	 */
	emoji?: PartialEmoji;

	/**
	 * A developer-defined identifier for the button, max 100 characters. Valid for Buttons.
	 */
	custom_id?: string;

	/**
	 * A URL for link-style buttons. Valid for Buttons.
	 */
	url?: string;

	/**
	 * Whether the button is disabled. Valid for Buttons..
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;

	/**
	 * A list of child components. Valid for Action Rows.
	 */
	components?: Component[];
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/message-components#component-types|Message Components}
 */
export enum ComponentType {
	/**
	 * A container for other components.
	 */
	ActionRow = 1,

	/**
	 * A clickable button.
	 */
	Button,
	Select
}

export interface ActionRow {
	type: ComponentType.ActionRow;
	components: Component[];
}

/**
 * Buttons are interactive components that render on messages. They can be clicked by users, and
 * send an interaction to your app when clicked.
 *
 * @remarks
 * - Buttons must be sent inside an `ActionRow`
 * - An `ActionRow` can contain up to 5 buttons
 *
 * @source {@link https://discord.com/developers/docs/interactions/message-components#buttons-button-object|Message Components}
 */
export type Button = ({
	type: ComponentType.Button;
} & Pick<Component, 'emoji' | 'label' | 'disabled'>) &
	(
		| {
				style: Exclude<ButtonStyle, ButtonStyle.Link>;
				custom_id: string;
		  }
		| {
				style: ButtonStyle.Link;
				url: string;
		  }
	);

/**
 * @source {@link https://discord.com/developers/docs/interactions/message-components#buttons-button-styles|Message Components}
 */
export enum ButtonStyle {
	Primary = 1,
	Secondary,
	Success,
	Danger,
	Link
}
