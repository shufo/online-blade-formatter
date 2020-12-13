import { NowRequest, NowResponse } from '@vercel/node'
// eslint-disable-next-line no-global-assign
require = require('esm')(module)
const Formatter = require('blade-formatter/src/formatter')

module.exports = async (req: NowRequest, res: NowResponse) => {
  try {
    // eslint-disable-next-line new-cap
    const formatter = new Formatter.default()
    const formatted = await formatter.formatContent(req.body.data)
    res.json({ data: formatted })
  } catch (error) {
    res.status(400).send(error.toString())
  }
}
