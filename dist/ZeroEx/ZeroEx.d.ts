import { Provider, ContractWrappersConfig, ExchangeWrapper, EtherTokenWrapper, ERC20TokenWrapper, ERC20ProxyWrapper, Order, SignedOrder, SignerType, ERC721TokenWrapper } from '0x.js';
import BigNumber from 'bignumber.js';
/**
 * This class includes all the functionality related to 0x packages instantiation
 */
export declare class ZeroEx {
    exchange: ExchangeWrapper;
    erc20Token: ERC20TokenWrapper;
    etherToken: EtherTokenWrapper;
    erc20Proxy: ERC20ProxyWrapper;
    erc721Token: ERC721TokenWrapper;
    private _initialized;
    private readonly _provider;
    private readonly _contractWrappers;
    private readonly _web3WrapperInstance;
    private readonly _exchangeContractAddress;
    private readonly _zrxAssetData;
    private readonly _orderValidationUtils;
    private readonly _exchangeTransferSimulator;
    /**
     * Instantiate ZeroEx
     * @public
     * @param Provider  provider  Web3 Provider instance to use
     * @param ContractWrappersConfig  config  Should contain for example desired networkId
     */
    constructor(provider: Provider, config: ContractWrappersConfig);
    /**
     * When creating an order without a specified taker or feeRecipient you must supply the Solidity
     * address null type (as opposed to Javascripts `null`, `undefined` or empty string). We expose
     * this constant for your convenience.
     */
    static NULL_ADDRESS: string;
    /**
     * Get exchange contract address
     * @public
     * @return string  The exchange contract address
     */
    getExchangeContractAddress(): string;
    /**
     * A unit amount is defined as the amount of a token above the specified decimal places (integer part).
     * E.g: If a currency has 18 decimal places, 1e18 or one quintillion of the currency is equivalent
     * to 1 unit.
     * @param   amount      The amount in baseUnits that you would like converted to units.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in units.
     */
    static toUnitAmount(amount: BigNumber, decimals: number): BigNumber;
    /**
     * Convert to Base Unit Amount
     * A baseUnit is defined as the smallest denomination of a token. An amount expressed in baseUnits
     * is the amount expressed in the smallest denomination.
     * E.g: 1 unit of a token with 18 decimal places is expressed in baseUnits as 1000000000000000000
     * @param   amount      The amount of units that you would like converted to baseUnits.
     * @param   decimals    The number of decimal places the unit amount has.
     * @return  The amount in baseUnits.
     */
    static toBaseUnitAmount(amount: BigNumber, decimals: number): BigNumber;
    /**
     * Computes the orderHash for a supplied order.
     * @param   order   An object that conforms to the Order or SignedOrder interface definitions.
     * @return  The resulting orderHash from hashing the supplied order.
     */
    static getOrderHashHex(order: Order | SignedOrder): string;
    /**
     * Returns the current timestamp in milliseconds, which is used for the salt.
     * The salt can be included in a 0x order. This ensures that the order generates
     * a unique orderHash and allows orders to be canceled using CancelUpTo.
     */
    static generateSaltTimestamp(): BigNumber;
    /**
     * Waits for a transaction to be mined and returns the transaction receipt.
     * Note that just because a transaction was mined does not mean it was
     * successful. You need to check the status code of the transaction receipt
     * to find out if it was successful, or use the helper method
     * awaitTransactionSuccessAsync.
     * @param   txHash            Transaction hash
     * @param   pollingIntervalMs How often (in ms) should we check if the transaction is mined.
     * @param   timeoutMs         How long (in ms) to poll for transaction mined until aborting.
     * @return  Transaction receipt with decoded log args.
     */
    awaitTransactionMinedAsync(txHash: string, pollingInterval?: number, timeoutMs?: number): Promise<import("../../../../../../Users/ian/radar-relay/sdk/node_modules/ethereum-types").TransactionReceiptWithDecodedLogs>;
    /**
     * Retrieves the transaction receipt for a given transaction hash
     * @param txHash Transaction hash
     * @returns The transaction receipt, including it's status (0: failed, 1: succeeded or undefined: not found)
     */
    getTransactionReceiptAsync(txHash: string): Promise<import("../../../../../../Users/ian/radar-relay/sdk/node_modules/ethereum-types").TransactionReceipt>;
    /**
     * Signs an orderHash and returns it's elliptic curve signature and signature type.
     * This method currently supports TestRPC, Geth and Parity above and below V1.6.6
     * @param   orderHash       Hex encoded orderHash to sign.
     * @param   signerAddress   The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the Provider supplied to 0x.js.
     * @param   signerType Different signers add/require different prefixes to be prepended to the message being signed.
     *          Since we cannot know ahead of time which signer you are using, you must supply a SignerType.
     * @return  A hex encoded string containing the Elliptic curve signature generated by signing the orderHash and the Signature Type.
     */
    ecSignOrderHashAsync(orderHash: string, signerAddress: string, signerType: SignerType): Promise<string>;
    /**
     * Validate that a signed order is fillable or throw
     * @param signedOrder The signed order to validate
     */
    validateOrderFillableOrThrowAsync(signedOrder: SignedOrder): Promise<void>;
}
