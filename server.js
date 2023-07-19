const { MomoPaymentService } = require("./dist/index");

const momoService = new MomoPaymentService(
  "MOMO",
  "F8BBA842ECF85",
  "K951B6PE1waDMi640xX08PD3vg6EkVlz"
);

var orderId = new Date().getTime();
var requestId = orderId;
var autoCapture = true;
var redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
var ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
var amount = 50000;
var orderInfo = "pay with MoMo";
const res = momoService
  .createPayment({
    orderId: orderId,
    requestId: requestId,
    autoCapture: autoCapture,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    amount: amount,
    // orderInfo: orderInfo,
  })
  .then((data) => console.log(data));
