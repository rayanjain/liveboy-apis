const crypto = require('crypto')
const payment = require('../../models/payment')
const stream = require('../../models/stream')

module.exports = async function (req, res) {
  try {
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_PASSWORD)
    hmac.update(req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id)
    const generated_signature = hmac.digest('hex')

    if (generated_signature == req.body.razorpay_signature) {
      const payInfo = await payment.findOne({
        payment_id: req.body.razorpay_order_id,
      })
      payInfo.paymentstatus = true
      payInfo.payment_id = req.body.razorpay_payment_id
      await payInfo.save()
      streamInfo = await stream.findById(payInfo.video)
      streamInfo.views = streamInfo.views + 1
      await streamInfo.save()
      return res.sendStatus(200)
    }
    res.sendStatus(400)
  } catch {
    res.sendStatus(500)
  }
}
