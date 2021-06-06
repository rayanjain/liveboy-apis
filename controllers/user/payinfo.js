const user = require('../../models/user')
const axios = require('axios')

module.exports = async function (req, res) {
  try {
    const userPayInfo = await user.findOne(
      { email: req.email },
      'contact_id fund_account_id'
    )
    if (userPayInfo.contact_id && userPayInfo.fund_account_id) {
      const contacts = await axios.get(
        `https://api.razorpay.com/v1/contacts/${userPayInfo.contact_id}`,
        {
          auth: {
            username: process.env.RAZORPAY_USERNAME,
            password: process.env.RAZORPAY_PASSWORD,
          },
        }
      )
      const fund_accounts = await axios.get(
        `https://api.razorpay.com/v1/fund_accounts/${userPayInfo.fund_account_id}`,
        {
          auth: {
            username: process.env.RAZORPAY_USERNAME,
            password: process.env.RAZORPAY_PASSWORD,
          },
        }
      )
      res.send({ contacts: contacts.data, fund_accounts: fund_accounts.data })
    } else {
      res.sendStatus(200)
    }
  } catch {
    res.sendStatus(500)
  }
}
