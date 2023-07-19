## Process flow

![Flow](https://raw.githubusercontent.com/minhduc2001/payment-momo-lib/128c128056ef44c7f3713d81bf8fe5b464c8240b/flow-momo.svg)

## Installation

The first, Momo partner must be successfully registered.
Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
npm i momo-payment-api
```

## Usage

### Develop

```typescript
import { MomoPayment } from "momo-payment-api";
import {
  ICreatePayment,
  IRefundPayment,
  IResponsePayment,
} from "momo-payment-api/src/type";

// Read the input parameter on https://developers.momo.vn/v3/en/docs/payment/api/payment-api/init
class MomoPaymentService {
  private momoPayment: any;

  /**
   * @param partnerCode
   * @param accessKey
   * @param secretKey
   * @param enviroment = production -> live || development -> sanbox
   */
  constructor(
    partnerCode: string,
    accessKey: string,
    secretKey: string,
    enviroment: string = "development"
  ) {
    this.momoPayment = new MomoPayment(
      partnerCode,
      accessKey,
      secretKey,
      enviroment
    );
  }

  async createPayment(input: ICreatePayment) {
    try {
      const result: IResponsePayment = await this.momoPayment.createPayment(
        input
      );

      // handle your code here

      return result;
    } catch (error) {
      throw error;
    }
  }

  async refundPayment(input: IRefundPayment) {
    try {
      const result = await this.momoPayment.refundPayment(input);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
```

### Paramater

```typescript
export interface ICreatePayment {
  subPartnerCode?: string; // Định danh duy nhất của tài khoản M4B của bạn
  storeName?: string; // Tên đối tác
  storeId?: string; // Mã cửa hàng
  requestId: string; // Định danh duy nhất cho mỗi yêu cầu
  orderId: string; // Mã đơn hàng của đối tác
  amount: number; // Số tiền cần thanh toán Nhỏ Nhất: 1.000 VND Tối đa: 50.000.000 VND Tiền tệ: VND Kiểu dữ liệu: Long
  orderInfo: string; // Thông tin đơn hàng
  ipnUrl: string; // API của đối tác. Được MoMo sử dụng để gửi kết quả thanh toán theo phương thức IPN (server-to-server)
  extraData?: string; // mặc định "" Encode base64 theo định dạng Json: {"key": "value"} VD: {"username": "momo"} -> extraData: eyJ1c2VybmFtZSI6ICJtb21vIn0=
  redirectUrl: string; // URL này được sử dụng để chuyển trang (redirect) từ MoMo về trang mua hàng của đối tác sau khi khách hàng thanh toán.
  requestType?: string; // captureWallet
  items?: Array<IItems>; // Danh sách các sản phẩm hiển thị trên trang thanh toán. Tối đa: 50 loại sản phẩm
  deliveryInfo?: IDeliveryInfo; // Thông tin giao hàng của đơn hàng
  userInfo?: IUserInfo; // Thông tin người dùng
  referenceId?: string; // Mã tham chiếu phụ của đối tác. Ví dụ dùng trong các trường hợp như mã khách hàng, mã hộ gia đình, mã hóa đơn, mã thuê bao v.v
  autoCapture?: boolean; // Nếu giá trị false, giao dịch sẽ không tự động capture. Mặc định là true
  lang?: string; // Ngôn ngữ của message được trả về (vi hoặc en); Mặc định 'en'
}

export interface IRefundPayment {
  subPartnerCode?: string;
  orderId: string;
  requestId: string;
  amount: string; // Số tiền cần hoàn
  transId: string; // 	Mã giao dịch của MoMo; Đây là Id do MoMo cung cấp cho giao dịch mua thành công của hàng hóa/dịch vụ này
  lang?: string; // default 'en'
  description?: string; // Mô tả chi tiết yêu cầu hoàn tiền
}
```

## Important

Mail: ngoduc2468@gmail.com
Documentation: https://developers.momo.vn/

## License

[MIT](https://choosealicense.com/licenses/mit/)
