import type { Application, ApplicationAsset, PartialApplication } from '../';

/**
 * @endpoint [GET](https://discord.com/developers/docs/topics/oauth2#get-current-bot-application-information) `/oauth2/applications/@me`
 */
export interface GetCurrentBotApplicationInformation {
	response: Omit<Application, 'flags'>;
}

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/application#get-application-information) `/applications/{application.id}/rpc`
 */
export interface GetApplicationInformation {
	response: PartialApplication;
}

/**
 * @endpoint [GET](https://discord.com/developers/docs/resources/application#get-application-assets) `/oauth2/applications/{application.id}/assets`
 */
export interface GetApplicationAssets {
	response: ApplicationAsset[];
}
