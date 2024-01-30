const express = require('express')
const app = express()
const port = 3001

app.use(express.static('public'))

app.get('/search', async (req, res) => {
  try {
    const countryName = req.query.country
    const apiResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    if (!apiResponse.ok) {
      throw new Error(`HTTP response error: ${apiResponse.status}`)
    }
    const data = await apiResponse.json()
    console.log(data)
    res.send(data)
  } catch (error) {
    res.status(500).send({ message: error.message })
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
