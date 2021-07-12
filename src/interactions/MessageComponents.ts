import type { Range, Tuple } from 'extended-utility-types';
import type { PartialEmoji } from '../';

/**
 * Message components are a framework for adding interactive elements to the messages your app or
 * bot sends. They're accessible, customizable, and easy to use.
 *
 * @source {@link https://discord.com/developers/docs/interactions/message-components#component-object|Message Components}
 */
export type Component = ActionRow | Button | SelectMenu;

/**
 * @source {@link https://discord.com/developers/docs/interactions/message-components#component-types|Message Components}
 */
export enum ComponentType {
	/**
	 * A container for other components.
	 */
	ActionRow = 1,

	/**
	 * A button object.
	 */
	Button,

	/**
	 * A select menu for picking from choices.
	 */
	SelectMenu
}

/**
 * An Action Row is a non-interactive container component for other types of components.
 *
 * @remarks
 * - A message can have up to 5 `ActionRow`s
 * - An `ActionRow` cannot contain another `ActionRow`
 *
 * @source {@link https://discord.com/developers/docs/interactions/message-components#action-rows|Message Components}
 */
export interface ActionRow {
	readonly type: ComponentType.ActionRow;

	/**
	 * A list of child components.
	 */
	components: [Button, ...Partial<Tuple<Button, 4>>] | [SelectMenu];
}

/**
 * Buttons are interactive components that render on messages. They can be clicked by users, and
 * send an interaction to your app when clicked.
 *
 * @remarks
 * - Buttons must be sent inside an `ActionRow`
 * - An `ActionRow` can contain up to 5 buttons
 * - An `ActionRow` containing buttons cannot also contain a select menu
 *
 * @source {@link https://discord.com/developers/docs/interactions/message-components#buttons-button-object|Message Components}
 */
export type Button = NonLinkButton | LinkButton;

export interface BaseButton {
	readonly type: ComponentType.Button;

	/**
	 * Text that appears on the button, max 80 characters.
	 */
	label?: string;
	emoji?: PartialEmoji;

	/**
	 * Whether the button is disabled.
	 *
	 * @defaultValue `false`
	 */
	disabled?: boolean;
}

export interface NonLinkButton extends BaseButton {
	style: Exclude<ButtonStyle, ButtonStyle.Link>;

	/**
	 * A developer-defined identifier for the button, max 100 characters.
	 */
	custom_id: string;
}

export interface LinkButton extends BaseButton {
	style: ButtonStyle.Link;

	/**
	 * A URL for link-style buttons.
	 */
	url: string;
}

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

/**
 * @source {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure|Message Components}
 */
export interface SelectMenu {
	/**
	 * A developer-defined identifier for the select menu, max 100 characters.
	 */
	custom_id: string;

	/**
	 * The choices in the select.
	 */
	options: [SelectOption, ...Partial<Tuple<SelectOption, 24>>];

	/**
	 * Custom placeholder text if nothing is selected, max 100 characters.
	 */
	placeholder?: string;

	/**
	 * The minimum number of items that must be chosen.
	 *
	 * @defaultValue `1`
	 */
	min_values?: Range<0, 25>;

	/**
	 * The maximum number of items that can be chosen.
	 *
	 * @defaultValue `1`
	 */
	max_values?: Range<1, 25>;

	/**
	 * @defaultValue `false`
	 */
	disabled?: boolean;
}

/**
 * @source {@link https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure|Message Components}
 */
export interface SelectOption {
	/**
	 * The user-facing name of the option, max 25 characters.
	 */
	label: string;

	/**
	 * The developer-defined value of the option, max 100 characters.
	 */
	value: string;

	/**
	 * An additional description of the option, max 50 characters.
	 */
	description?: string;
	emoji?: PartialEmoji;

	/**
	 * Will render this option as selected by default.
	 */
	default?: boolean;
}
