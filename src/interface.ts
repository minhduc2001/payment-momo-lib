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
  signature?: string;
}

export interface IItems {
  id: string; // id sản phẩm
  name: string; // tên sản phẩm
  description?: string; // mô tả
  category?: string; // Phân loại
  imageUrl: string; // Link hình ảnh của sản phẩm
  manufacturer?: string; // Tên nhà sản xuất
  price: number; // Giá, type Long
  currency: string; // VND
  quantity: number; // Số lượng
  unit?: string; // ĐƠn vị đo lường (Kg, g, ...)
  totalPrice: number; // Tổng giá = Đơn giá x Số lượng
  taxAmount?: number; // Tổng thuế
}

export interface IDeliveryInfo {
  deliveryAddress: string; // Địa chỉ giao hàng
  deliveryFee: string; // Phí giao hàng
  quantity: number; // 	Số lượng sản phẩm
}

export interface IUserInfo {
  name: string; // Tên của người dùng
  phoneNumber: string; // Số điện thoại của người dùng
  email: string; // Email của người dùng
}

export interface ICheckTransactionStatus {
  partnerCode?: string;
  requestId: string;
  orderId: string;
  lang?: string;
  signature?: string;
}

export interface IConfirmPayment {
  partnerCode?: string;
  requestId: string;
  orderId: string; // Mã đơn hàng của đối tác đã xác thực
  /**
   * Loại yêu cầu với 2 giá trị sau:
    - Xác nhận giao dịch: capture
    - Hủy bỏ giao dịch: cancel
   */
  requestType: string;
  amount: number; // Số tiền của hóa đơn cần xác nhận (hủy bỏ)
  lang?: string; // default: 'en'
  description?: string; // Mô tả lý do (dùng trong trường hợp) cancel)
  signature?: string;
}

export interface IRefundPayment {
  partnerCode?: string;
  subPartnerCode?: string;
  orderId: string;
  requestId: string;
  amount: string; // Số tiền cần hoàn
  transId: string; // 	Mã giao dịch của MoMo; Đây là Id do MoMo cung cấp cho giao dịch mua thành công của hàng hóa/dịch vụ này
  lang?: string; // default 'en'
  description?: string; // Mô tả chi tiết yêu cầu hoàn tiền
  signature?: string;
}

// Phản hồi từ momo khi tạo payment
export interface IResponsePayment {
  partnerCode: string;
  requestId: string;
  orderId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: number;
  payUrl: string;
  deeplink: string;
  qrCodeUrl: string;
}
