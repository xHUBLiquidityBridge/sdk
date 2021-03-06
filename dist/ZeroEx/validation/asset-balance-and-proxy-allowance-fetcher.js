"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_utils_1 = require("@0xproject/order-utils");
var types_1 = require("@0xproject/types");
var bignumber_js_1 = require("bignumber.js");
var AssetBalanceAndProxyAllowanceFetcher = /** @class */ (function () {
    // --- Constructor --- //
    function AssetBalanceAndProxyAllowanceFetcher(erc20Token, erc721Token, stateLayer) {
        this._erc20Token = erc20Token;
        this._erc721Token = erc721Token;
        this._stateLayer = stateLayer;
    }
    // --- Exposed methods --- //
    AssetBalanceAndProxyAllowanceFetcher.prototype.getBalanceAsync = function (assetData, userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var decodedAssetData, decodedERC20AssetData, balance, decodedERC721AssetData, tokenOwner, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        decodedAssetData = order_utils_1.assetDataUtils.decodeAssetDataOrThrow(assetData);
                        if (!(decodedAssetData.assetProxyId === types_1.AssetProxyId.ERC20)) return [3 /*break*/, 2];
                        decodedERC20AssetData = decodedAssetData;
                        return [4 /*yield*/, this._erc20Token.getBalanceAsync(decodedERC20AssetData.tokenAddress, userAddress, {
                                defaultBlock: this._stateLayer,
                            })];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, balance];
                    case 2:
                        decodedERC721AssetData = decodedAssetData;
                        return [4 /*yield*/, this._erc721Token.getOwnerOfAsync(decodedERC721AssetData.tokenAddress, decodedERC721AssetData.tokenId, {
                                defaultBlock: this._stateLayer,
                            })];
                    case 3:
                        tokenOwner = _a.sent();
                        balance = tokenOwner === userAddress ? new bignumber_js_1.BigNumber(1) : new bignumber_js_1.BigNumber(0);
                        return [2 /*return*/, balance];
                }
            });
        });
    };
    AssetBalanceAndProxyAllowanceFetcher.prototype.getProxyAllowanceAsync = function (assetData, userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var decodedAssetData, decodedERC20AssetData, proxyAllowance, decodedERC721AssetData, isApprovedForAll, isApproved, proxyAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        decodedAssetData = order_utils_1.assetDataUtils.decodeAssetDataOrThrow(assetData);
                        if (!(decodedAssetData.assetProxyId === types_1.AssetProxyId.ERC20)) return [3 /*break*/, 2];
                        decodedERC20AssetData = decodedAssetData;
                        return [4 /*yield*/, this._erc20Token.getProxyAllowanceAsync(decodedERC20AssetData.tokenAddress, userAddress, {
                                defaultBlock: this._stateLayer,
                            })];
                    case 1:
                        proxyAllowance = _a.sent();
                        return [2 /*return*/, proxyAllowance];
                    case 2:
                        decodedERC721AssetData = decodedAssetData;
                        return [4 /*yield*/, this._erc721Token.isProxyApprovedForAllAsync(decodedERC721AssetData.tokenAddress, userAddress, {
                                defaultBlock: this._stateLayer,
                            })];
                    case 3:
                        isApprovedForAll = _a.sent();
                        if (!isApprovedForAll) return [3 /*break*/, 4];
                        return [2 /*return*/, new bignumber_js_1.BigNumber(this._erc20Token.UNLIMITED_ALLOWANCE_IN_BASE_UNITS)];
                    case 4: return [4 /*yield*/, this._erc721Token.isProxyApprovedAsync(decodedERC721AssetData.tokenAddress, decodedERC721AssetData.tokenId, {
                            defaultBlock: this._stateLayer,
                        })];
                    case 5:
                        isApproved = _a.sent();
                        proxyAllowance = isApproved ? new bignumber_js_1.BigNumber(1) : new bignumber_js_1.BigNumber(0);
                        return [2 /*return*/, proxyAllowance];
                }
            });
        });
    };
    return AssetBalanceAndProxyAllowanceFetcher;
}());
exports.AssetBalanceAndProxyAllowanceFetcher = AssetBalanceAndProxyAllowanceFetcher;
