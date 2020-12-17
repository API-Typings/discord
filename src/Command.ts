export interface Command {
    id: string
    application_id: string
    name: string
    description: string
    options?: CommandOption[]
}

export interface CommandInteractionData {
    id: string
    name: string
    options?: CommandInteractionDataOption[]
}

export interface CommandInteractionDataOption {
    name: string
    value?: any
    options?: CommandInteractionDataOption[]
}

export interface CommandOption {
    type: CommandOptionType
    name: string
    description: string
    default?: boolean
    required?: boolean
    choices?: CommandOptionChoice[]
    options?: CommandOption[]
}

export interface CommandOptionChoice {
    name: string
    value: string | number
}

export enum CommandOptionType {
    SubCommand = 1,
    SubCommandGroup,
    String,
    Integer,
    Boolean,
    User,
    Channel,
    Role
}