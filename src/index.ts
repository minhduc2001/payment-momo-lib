import axios from "axios";
import * as crypto from "crypto";
import { ICreatePayment, IRefundPayment, IResponsePayment } from "./type";

export class MomoPayment {
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
      const url = this._getURL() + "/create";

      const signatureRaw =
        "accessKey=" +
        this.accessKey +
        "&amount=" +
        input.amount +
        "&extraData=" +
        (input.extraData ?? "") +
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
        (input.requestType ?? "captureWallet");

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
        extraData: input.extraData ?? "",
        requestType: input.requestType ?? "captureWallet",
        signature: signature,
        lang: input.lang ?? "en",
      };

      const res = await axios<IResponsePayment>({
        method: "POST",
        headers: { "content-type": "application/json" },
        url,
        data,
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async refundPayment(input: IRefundPayment) {
    if (!input.orderId || !input.amount || !input.transId || !input.requestId) {
      throw new Error("Invalid input");
    }

    const url = this._getURL() + "/refund";

    const signatureRaw = `accessKey=${this.accessKey}&amount=${input.amount}&description=&orderId=${input.orderId}&partnerCode=${this.partnerCode}&requestId=${input.requestId}&transId=${input.transId}`;
    const signature = crypto
      .createHmac("sha256", this.secretKey)
      .update(signatureRaw)
      .digest("hex");

    const data = JSON.stringify({
      requestId: input.requestId,
      partnerCode: this.partnerCode,
      orderId: input.orderId,
      amount: input.amount,
      transId: input.transId,
      lang: input.lang ?? "en",
      signature,
    });
    const res = await axios({
      method: "POST",
      headers: { "content-type": "application/json" },
      url,
      data,
    });

    return await res.data;
  }

  private _getURL() {
    if (this.environment === "development") {
      return "https://test-payment.momo.vn/v2/gateway/api";
    }

    if (this.environment === "production") {
      return "https://payment.momo.vn/";
    }

    return false;
  }
}
