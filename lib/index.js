"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MomoPayment = void 0;
var axios_1 = __importDefault(require("axios"));
var crypto = __importStar(require("crypto"));
var MomoPayment = /** @class */ (function () {
    function MomoPayment(partnerCode, accessKey, secretKey, enviroment) {
        if (enviroment === void 0) { enviroment = "development"; }
        this.partnerCode = partnerCode;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.environment = enviroment;
    }
    MomoPayment.prototype.createPayment = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var url, redirectUrl, signatureRaw, signature, data, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!input.orderId ||
                            !input.amount ||
                            !input.orderInfo ||
                            !input.ipnUrl) {
                            throw new Error("invalid input");
                        }
                        if (input === null || input === void 0 ? void 0 : input.extraData)
                            input.extraData = "";
                        if (input === null || input === void 0 ? void 0 : input.lang)
                            input.lang = "en";
                        if (input === null || input === void 0 ? void 0 : input.requestType)
                            input.requestType = "captureWallet";
                        url = this._getURL() + "/create";
                        redirectUrl = "https://momo.vn/return";
                        signatureRaw = "accessKey=" +
                            this.accessKey +
                            "&amount=" +
                            input.amount +
                            "&extraData=" +
                            input.extraData +
                            "&ipnUrl=" +
                            input.ipnUrl +
                            "&orderId=" +
                            input.orderId +
                            "&orderInfo=" +
                            input.orderInfo +
                            "&partnerCode=" +
                            this.partnerCode +
                            "&redirectUrl=" +
                            input.redirectUrl +
                            "&requestId=" +
                            input.requestId +
                            "&requestType=" +
                            input.requestType;
                        signature = crypto
                            .createHmac("sha256", this.secretKey)
                            .update(signatureRaw)
                            .digest("hex");
                        data = {
                            partnerCode: this.partnerCode,
                            accessKey: this.accessKey,
                            requestId: input.requestId,
                            amount: input.amount,
                            orderId: input.orderId,
                            orderInfo: input.orderInfo,
                            redirectUrl: input.redirectUrl,
                            ipnUrl: input.ipnUrl,
                            extraData: input.extraData,
                            requestType: input.requestType,
                            signature: signature,
                            lang: input.lang,
                        };
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: "POST",
                                headers: { "content-type": "application/json" },
                                url: url,
                                data: data,
                            })];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res.data];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MomoPayment.prototype.refundPayment = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var url, signatureRaw, signature, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!input.orderId || !input.amount || !input.transId || !input.requestId) {
                            throw new Error("Invalid input");
                        }
                        if (input === null || input === void 0 ? void 0 : input.lang)
                            input.lang = "en";
                        url = this._getURL() + "/refund";
                        signatureRaw = "accessKey=".concat(this.accessKey, "&amount=").concat(input.amount, "&description=&orderId=").concat(input.orderId, "&partnerCode=").concat(this.partnerCode, "&requestId=").concat(input.requestId, "&transId=").concat(input.transId);
                        signature = crypto
                            .createHmac("sha256", this.secretKey)
                            .update(signatureRaw)
                            .digest("hex");
                        data = JSON.stringify({
                            requestId: input.requestId,
                            partnerCode: this.partnerCode,
                            orderId: input.orderId,
                            amount: input.amount,
                            transId: input.transId,
                            lang: input.lang,
                            signature: signature,
                        });
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: "POST",
                                headers: { "content-type": "application/json" },
                                url: url,
                                data: data,
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.data];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MomoPayment.prototype._getURL = function () {
        if (this.environment === "development") {
            return "https://test-payment.momo.vn/v2/gateway/api";
        }
        if (this.environment === "product") {
            return "https://payment.momo.vn/";
        }
        return false;
    };
    return MomoPayment;
}());
exports.MomoPayment = MomoPayment;
