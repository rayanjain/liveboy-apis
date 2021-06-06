const axios = require('axios')
const user = require('../../models/user')
const stream = require('../../models/stream')
const payment = require('../../models/payment')

module.exports = async function (req, res) {
  try {
    //get user info
    const userInfo = await user.findOne({ email: req.email })
    if (
      !userInfo.contact_id &&
      !userInfo.fund_account_id &&
      !userInfo.fund_account_type
    ) {
      res.status(406).send({
        message: 'Fill Payment details in Account Setting to get paid',
      })
      return
    }
    //get stream info
    const streamInfo = await stream.findById(req.params.id)
    if (streamInfo.email != req.email) {
      res.sendStatus(401)
      return
    }
    //create payout
    const amount = streamInfo.price * streamInfo.views * 90
    //check if amount is 0
    if (amount == 0) {
      streamInfo.payout = true
      await streamInfo.save()
      res.sendStatus(200)
      return
    }
    var mode = 'UPI'
    if (userInfo.fund_account_type == 'bank_account') {
      if (amount < 20000000) mode = 'IMPS'
      else mode = 'RTGS'
    }
    const payoutDetails = await axios.post(
      'https://api.razorpay.com/v1/payouts',
      {
        account_number: process.env.X_ACCOUNT_NUMBER,
        fund_account_id: userInfo.fund_account_id,
        amount: parseInt(amount),
        currency: 'INR',
        mode: mode,
        purpose: 'payout',
        queue_if_low_balance: true,
      },
      {
        auth: {
          username: process.env.RAZORPAY_USERNAME,
          password: process.env.RAZORPAY_PASSWORD,
        },
      }
    )
    //save payout details
    streamInfo.payout = true
    await streamInfo.save()
    const newPayment = new payment({
      email: req.email,
      type: 'payout',
      amount: amount / 100,
      payment_id: payoutDetails.data.id,
      video: req.params.id,
      paymentstatus: true,
    })
    await newPayment.save()
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
