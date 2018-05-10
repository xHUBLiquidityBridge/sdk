import Web3 = require('web3');
import BigNumber from 'bignumber.js';
import { TransactionManager, UnsignedPayload, Wallet } from './types';
/**
 * Ethereum
 */
export declare class Ethereum implements TransactionManager {
    wallet: Wallet;
    provider: Web3.Provider;
    networkId: number;
    web3: Web3;
    private _events;
    constructor(wallet: string | Wallet, rpcUrl?: string);
    readonly defaultAccount: string;
    /**
     * Get accounts from the connected wallet
     */
    getAccounts(): string[];
    /**
     * Entry method for signing a message
     */
    signMessageAsync(unsignedMsg: UnsignedPayload): Promise<string>;
    /**
     * Entry method for signing/sending a transaction
     */
    signTransactionAsync(unsignedTx: UnsignedPayload): Promise<string>;
    /**
     * get the ether balance for an account
     */
    getEthBalanceAsync(address: string): Promise<BigNumber>;
    /**
     * transfer ether to another account
     */
    transferEthAsync(from: string, to: string, value: BigNumber): Promise<BigNumber>;
    /**
     * get the RPC Connections networkId
     */
    getNetworkIdAsync(): Promise<number>;
    /**
     * set eth defaultAccount to a
     * new address index or address
     */
    setDefaultAccount(account: number | string): Promise<void>;
    /**
     * Set the rpc providers
     */
    private setProvider(wallet, rpcUrl);
    private getDefaultGasPrice();
    private getGasLimit(unsignedPayload);
    private getTxNonce(unsignedPayload);
}
