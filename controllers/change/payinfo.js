const axios = require('axios')
const user = require('../../models/user')

module.exports = async function (req, res) {
  try {
    //create contact
    const contact = await axios.post(
      'https://api.razorpay.com/v1/contacts',
      req.body.contacts,
      {
        auth: {
          username: process.env.RAZORPAY_USERNAME,
          password: process.env.RAZORPAY_PASSWORD,
        },
      }
    )
    req.body.fund_accounts.contact_id = contact.data.id
    //create fund_account
    const fund_account = await axios.post(
      'https://api.razorpay.com/v1/fund_accounts',
      req.body.fund_accounts,
      {
        auth: {
          username: process.env.RAZORPAY_USERNAME,
          password: process.env.RAZORPAY_PASSWORD,
        },
      }
    )
    //add details
    const userInfo = await user.findOne({ email: req.email })
    userInfo.contact_id = contact.data.id
    userInfo.fund_account_id = fund_account.data.id
    userInfo.fund_account_type = req.body.fund_accounts.account_type
    await userInfo.save()
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
