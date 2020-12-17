import { AuditLog } from '../AuditLog';
import { Connection, User } from '../User';
import { Emoji, Message } from '../Message';
import { Member, Role, VoiceRegion } from '../Member';
import { Channel, DMChannel, FollowedChannel } from '../Channel';
import {
	Ban,
	Guild,
	GuildPreview,
	Integration,
	Invite,
	InviteMetadata,
	PartialGuild,
	PartialInvite,
	Prune,
	Template,
	Webhook,
	Widget,
	WidgetSettings
} from '../Guild';
import { HTTPCodes } from '../Gateway';
import { Command } from '../Command';

export type AddMember = (HTTPCodes.Created & Member) | HTTPCodes.NoContent;

export type AddMemberRole = HTTPCodes.NoContent;

export type AddPinnedMessage = HTTPCodes.NoContent;

export type CreateBan = HTTPCodes.NoContent;

export type CreateChannel = Channel;

export type CreateChannelInvite = Invite;

export type CreateCrosspost = Message;

export type CreateDM = DMChannel;

export type CreateEmoji = Emoji;

export type CreateGlobalCommand = HTTPCodes.Ok & Command

export type CreateGuild = Guild;

export type CreateGuildCommand = HTTPCodes.Ok & Command

export type CreateIntegration = HTTPCodes.NoContent;

export type CreateMessage = Message;

export type CreateReaction = HTTPCodes.NoContent;

export type CreateRole = Role;

export type CreateTemplate = Template;

export type CreateTemplatedGuild = Guild;

export type CreateWebhook = Webhook;

export type DeleteBan = HTTPCodes.NoContent;

export type DeleteChannel = Channel;

export type DeleteChannelPermission = HTTPCodes.NoContent;

export type DeleteEmoji = HTTPCodes.NoContent;

export type DeleteGlobalCommand = HTTPCodes.NoContent

export type DeleteGuild = HTTPCodes.NoContent;

export type DeleteGuildCommand = HTTPCodes.NoContent;

export type DeleteIntegration = HTTPCodes.NoContent;

export type DeleteInvite = Invite;

export type DeleteMember = HTTPCodes.NoContent;

export type DeleteMemberRole = HTTPCodes.NoContent;

export type DeleteMessage = HTTPCodes.NoContent;

export type DeleteOwnReaction = HTTPCodes.NoContent;

export type DeletePinnedMessage = HTTPCodes.NoContent;

export type DeleteReaction = HTTPCodes.NoContent;

export type DeleteRole = HTTPCodes.NoContent;

export type DeleteTemplate = Template;

export type DeleteTokenatedWebhook = DeleteWebhook;

export type DeleteWebhook = HTTPCodes.NoContent;

export type EditChannel = Channel;

export type EditChannelPositions = HTTPCodes.NoContent;

export type EditChannelPermissions = HTTPCodes.NoContent;

export type EditCurrentUser = User;

export type EditCurrentUserNick = HTTPCodes.Ok;

export type EditEmoji = Emoji;

export type EditGlobalCommand = CreateGlobalCommand

export type EditGuild = Guild;

export type EditGuildCommand = HTTPCodes.Ok & Command;

export type EditIntegration = HTTPCodes.NoContent;

export type EditMember = HTTPCodes.NoContent;

export type EditMessage = Message;

export type EditRole = Role;

export type EditRolePositions = Role[];

export type EditTemplate = Template;

export type EditTokenatedWebook = Omit<Webhook, 'user'>;

export type EditWebook = Webhook;

export type EditWidgetSettings = WidgetSettings;

export type FollowNewsChannel = FollowedChannel;

export type GetAuditLog = AuditLog;

export type GetBan = Ban;

export type GetBans = Ban[];

export type GetChannel = Channel;

export type GetChannelInvites = InviteMetadata[];

export type GetChannelWebhooks = Webhook[];

export type GetChannels = Channel[];

export type GetCurrentUser = User;

export type GetCurrentUserConnections = Connection[];

export type GetCurrentUserDMs = DMChannel[];

export type GetCurrentUserGuilds = PartialGuild;

export type GetEmoji = Emoji;

export type GetEmojis = Emoji[];

export type GetGlobalCommands = Command[]

export type GetGuild = Guild;

export type GetGuildCommands = Command[]

export type GetGuildPreview = GuildPreview;

export type GetGuildVoiceRegions = VoiceRegion[];

export type GetIntegrations = Integration[];

export type GetInvite = Invite;

export type GetInvites = GetChannelInvites;

export type GetMember = Member;

export type GetMembers = Member[];

export type GetMessage = Message;

export type GetMessages = Message[];

export type GetPinnedMessages = Message[];

export type GetPruneCount = Prune;

export type GetReactions = User[];

export type GetRoles = Role[];

export type GetTemplate = Template;

export type GetTemplates = Template[];

export type GetTokenatedWebhook = Omit<Webhook, 'user'>;

export type GetUser = User;

export type GetVanityURL = PartialInvite;

export type GetVoiceRegions = VoiceRegion[];

export type GetWebhook = Webhook;

export type GetWebhooks = Webhook[];

export type GetWidget = Widget;

export type GetWidgetSettings = WidgetSettings;

export type GuildPrune = Prune;

export type LeaveGuild = HTTPCodes.NoContent;

export type SyncIntegration = HTTPCodes.NoContent;

export type SyncTemplate = Template;

export type TriggerTyping = HTTPCodes.NoContent;
