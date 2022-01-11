import BladeFormatter from 'blade-formatter'
const { Formatter } = BladeFormatter

const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())
app.all('/format', async (req, res) => {
  try {
    const formatter = new Formatter()
    const formatted = await formatter.formatContent(req.body.data)
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
    res.json({ data: formatted })
  } catch (error) {
    res.status(400).send(error.toString())
  }
})

module.exports = app
