import Formatter from 'blade-formatter/src/formatter'

const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())
app.all('/format', async (req, res) => {
  try {
    const formatter = new Formatter()
    const formatted = await formatter.formatContent(req.body.content)
    res.json({ formatted })
  } catch (error) {
    res.json({ error: error.toString() })
  }
})

module.exports = app
