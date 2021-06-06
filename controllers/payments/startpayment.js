const Razorpay = require('razorpay')
const stream = require('../../models/stream')
const payment = require('../../models/payment')

module.exports = async function (req, res) {
  try {
    const video = await stream.findById(req.params.id)
    if (video == null) return res.sendStatus(404)
    const instance = new Razorpay({
      key_id: 'rzp_test_KRkts81uzp4oLp',
      key_secret: 'mh5j7IShl5mO6VQ1b2Icfzd4',
    })
    if (video.price == 0) return res.sendStatus(400)
    const options = {
      amount: parseInt(video.price * 100),
      currency: 'INR',
    }
    const payInfo = await payment.findOne({
      email: req.email,
      video: req.params.id,
    })
    if (payInfo != null) {
      if (payInfo.paymentstatus) {
        return res.sendStatus(401)
      }
    }
    const order = await instance.orders.create(options)
    if (payInfo == null) {
      const newPayment = new payment({
        email: req.email,
        type: 'payment',
        payment_id: order.id,
        amount: video.price,
        video: video._id,
        paymentstatus: false,
      })
      await newPayment.save()
      return res.send({ order_id: order.id })
    }
    payInfo.payment_id = order.id
    await payInfo.save()
    return res.send({ order_id: order.id })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
