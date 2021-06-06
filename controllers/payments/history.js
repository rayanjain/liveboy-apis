const payment = require('../../models/payment')

module.exports = async function (req, res) {
  try {
    const paymentHistory = await payment
      .find(
        {
          email: req.email,
          paymentstatus: true,
        },
        'payment_id type amount video'
      )
      .sort('-time')
      .sort()
      .populate('video', 'videotitle thumbnail -_id')
    res.send(paymentHistory)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
