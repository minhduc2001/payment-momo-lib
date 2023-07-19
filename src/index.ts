import axios from "axios";
import * as crypto from "crypto";
import { ICreatePayment, IResponsePayment } from "./interface";

export class MomoPaymentService {
  private readonly partnerCode: string;
  private readonly accessKey: string;
  private readonly secretKey: string;
  private readonly environment: string;

  constructor(
    partnerCode: string,
    accessKey: string,
    secretKey: string,
    enviroment: string = "development"
  ) {
    this.partnerCode = partnerCode;
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.environment = enviroment;
  }

  async createPayment(input: ICreatePayment) {
    try {
      if (
        !input.orderId ||
        !input.amount ||
        !input.orderInfo ||
        !input.ipnUrl
      ) {
        throw new Error("invalid input");
      }
      if (input?.extraData) input.extraData = "";
      if (input?.lang) input.lang = "en";
      if (input?.requestType) input.requestType = "captureWallet";

      const url = this._getURL() + "/create";
      const redirectUrl = "https://momo.vn/return";

      const signatureRaw =
        "accessKey=" +
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

      const signature = crypto
        .createHmac("sha256", this.secretKey)
        .update(signatureRaw)
        .digest("hex");

      const data = {
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

      const res = await axios<IResponsePayment>({
        method: "POST",
        headers: { "content-type": "application/json" },
        url,
        data,
      });
      console.log(res);

      return res.data;
    } catch (e) {}
  }

  private _getURL() {
    if (this.environment === "development") {
      return "https://test-payment.momo.vn/v2/gateway/api";
    }

    if (this.environment === "product") {
      return "https://payment.momo.vn/";
    }

    return false;
  }
}
