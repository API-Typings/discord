import type { RangeOf } from '@api-typings/core';
import type { Discord, Snowflake } from '../';

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/store#data-models-sku-struct|Store}
 */
export interface Sku {
	/**
	 * The unique ID of the SKU
	 */
	Id: bigint;

	/**
	 * What sort of SKU it is
	 */
	Type: SkuType;

	/**
	 * The name of the SKU
	 */
	Name: string;

	/**
	 * The price of the SKU
	 */
	Price: SkuPrice;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/store#data-models-skutype-enum|Store}
 */
export enum SkuType {
	/**
	 * SKU is a game
	 */
	Application = 1,

	/**
	 * SKU is a DLC
	 */
	DLC,

	/**
	 * SKU is a consumable (in-app purchase)
	 */
	Consumable,

	/**
	 * SKU is a bundle (comprising the other 3 types)
	 */
	Bundle
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/store#data-models-skuprice-struct|Store}
 */
export interface SkuPrice {
	/**
	 * The amount of money the SKU costs
	 */
	Amount: number;

	/**
	 * The currency the amount is in
	 */
	Currency: string;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/store#data-models-entitlement-struct|Store}
 */
export interface Entitlement {
	/**
	 * The unique ID of the entitlement
	 */
	Id: bigint;

	/**
	 * The kind of entitlement it is
	 */
	Type: EntitlementType;

	/**
	 * The ID of the SKU to which the user is entitled
	 */
	SkuId: bigint;
}

export enum EntitlementType {
	/**
	 * Entitlement was purchased
	 */
	Purchase = 1,

	/**
	 * Entitlement for a Discord Nitro subscription
	 */
	PremiumSubscription,

	/**
	 * Entitlement was gifted by a developer
	 */
	DeveloperGift,

	/**
	 * Entitlement was purchased by a dev in application test mode
	 */
	TestModePurchase,

	/**
	 * Entitlement was granted when the SKU was free
	 */
	FreePurchase,

	/**
	 * Entitlement was gifted by another user
	 */
	UserGift,

	/**
	 * Entitlement was claimed by user for free as a Nitro Subscriber
	 */
	PremiumPurchase
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/store|Store}
 */
export interface StoreManager extends NodeJS.EventEmitter {
	/**
	 * Fetches the list of SKUs for the connected application, readying them for iteration.
	 *
	 * @warning
	 * Only SKUs that have a price set will be fetched. If you aren't seeing any SKUs being
	 * returned, make sure they have a price set.
	 */
	FetchSkus(callback: (result: Discord.Result) => void): void;

	/**
	 * Get the number of SKUs readied by `FetchSkus()`.
	 */
	CountSkus(): number;

	/**
	 * Gets a SKU by its ID. You must call `FetchSkus()` first before being able to access SKUs in
	 * this way.
	 *
	 * @param skuId - The ID of the SKU to get
	 */
	GetSku(skuId: bigint): Discord.Sku;

	/**
	 * Gets a SKU by index when iterating over SKUs. You must call `FetchSkus()` first before being
	 * able to access SKUs in this way.
	 *
	 * @param index - The index at which to get
	 */
	GetSkuAt(index: number): Discord.Sku;

	/**
	 * Fetches a list of entitlements to which the user is entitled.
	 *
	 * @remarks
	 * Applications, DLC, and Bundles will always be returned. Consumables will be returned until
	 * they are consumed by the application via the HTTP endpoint.
	 */
	FetchEntitlements(callback: (result: Discord.Result) => void): void;

	/**
	 * Get the number of entitlements readied by `FetchEntitlements()`. You must call
	 * `FetchEntitlements()` first before being able to access SKUs in this way.
	 */
	CountEntitlements(): number;

	/**
	 * Gets an entitlement by its id. You must call `FetchEntitlements()` first before being able
	 * to access SKUs in this way.
	 *
	 * @param entitlementId - The ID of the entitlement to get
	 */
	GetEntitlement(entitlementId: bigint): Discord.Entitlement;

	/**
	 * Gets an entitlement by index when iterating over SKUs. You must call `FetchEntitlements()`
	 * first before being able to access SKUs in this way.
	 *
	 * @param index - The index at which to get
	 */
	GetEntitlementAt(index: number): Discord.Entitlement;

	/**
	 * Returns whether or not the user is entitled to the given SKU ID. You must call
	 * `FetchEntitlements()` first before being able to access SKUs in this way.
	 *
	 * @param skuId - The ID of the SKU to check
	 */
	HasSkuEntitlement(skuId: bigint): boolean;

	/**
	 * Opens the overlay to begin the in-app purchase dialogue for the given SKU ID. You must call
	 * `FetchSkus()` first before being able to access SKUs in this way.
	 *
	 * @remarks
	 * If the user has enabled the overlay for your game, a purchase modal will appear in the
	 * overlay. Otherwise, the Discord client will be auto-focused with a purchase modal.
	 *
	 * @param skuId - The ID of the SKU to begin purchasing
	 */
	StartPurchase(skuId: bigint, callback: (result: Discord.Result) => void): void;

	/**
	 * Fires when the connected user receives a new entitlement, either through purchase or through
	 * a developer grant.
	 *
	 * @param entitlement - The entitlement the user has been granted
	 */
	on(event: 'EntitlementCreate', listener: (entitlement: Discord.Entitlement) => void): this;

	/**
	 * Fires when the connected user loses an entitlement, either by expiration, revocation, or
	 * consumption in the case of consumable entitlements.
	 *
	 * @param entitlement - The entitlement the user has lost
	 */
	on(event: 'EntitlementDelete', listener: (entitlement: Discord.Entitlement) => void): this;
}

/**
 * @source {@link https://discord.com/developers/docs/game-sdk/store#httpspecific-data-models-limited-payment-data-object|Store}
 */
export interface LimitedPaymentData {
	/**
	 * Unique ID of the payment
	 */
	id: string;

	/**
	 * The currency the payment was made in
	 */
	currency: string;

	/**
	 * The amount paid
	 */
	amount: number;

	/**
	 * The amount of tax
	 */
	tax: number;

	/**
	 * Whether the amount is tax-inclusive
	 */
	tax_inclusive: boolean;
}

// SECTION Endpoints

/**
 * Gets entitlements for a given user. You can use this on your game backend to check entitlements
 * of an arbitrary user, or perhaps in an administrative panel for your support team.
 *
 * @endpoint [GET] `/applications/{application.id}/entitlements`
 *
 * [GET]: https://discord.com/developers/docs/game-sdk/store#get-entitlements
 */
export interface GetEntitlements {
	/**
	 * The user ID to look up entitlements for
	 */
	user_id?: Snowflake;

	/**
	 * The list SKU IDs to check entitlements for
	 */
	sku_ids?: string;

	/**
	 * Returns [limited payment data][1] for each entitlement
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/store#httpspecific-data-models-limited-payment-data-object
	 */
	with_payments?: boolean;

	/**
	 * Retrieve entitlements before this time
	 */
	before?: Snowflake;

	/**
	 * Retrieve entitlements after this time
	 */
	after?: Snowflake;

	/**
	 * Number of entitlements to return, 1-100
	 *
	 * @defaultValue 100
	 */
	limit?: RangeOf<1, 100>;
}

/**
 * Fetch an entitlement by its ID. This may be useful in confirming that a user has a given
 * entitlement that another call or the SDK says they do.
 *
 * @endpoint [GET] `/applications/{application.id}/entitlements/{entitlement.id}`
 *
 * [GET]: https://discord.com/developers/docs/game-sdk/store#get-entitlement
 */
export interface GetEntitlement {
	/**
	 * Returns [limited payment data][1] for the entitlement
	 *
	 * [1]: https://discord.com/developers/docs/game-sdk/store#httpspecific-data-models-limited-payment-data-object
	 */
	with_payment?: boolean;
}

/**
 * Creates a discount for the given user on their next purchase of the given SKU.
 *
 * @remarks
 * You should call this endpoint from your backend server just before calling [StartPurchase][1] for
 * the SKU you wish to discount. The user will then see a discounted price for that SKU at time of
 * payment. The discount is automatically consumed after successful purchase or if the TTL expires.
 *
 * [1]: https://discord.com/developers/docs/game-sdk/store#start-purchase
 */
export interface CreatePurchaseDiscount {
	/**
	 * The percentage to discount
	 */
	percent_off: RangeOf<1, 100>;

	/**
	 * The time to live for the discount, in seconds
	 *
	 * @defaultValue 600
	 */
	ttl?: RangeOf<60, 3600>;
}

// !SECTION
