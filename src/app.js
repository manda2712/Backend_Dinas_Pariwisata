const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
// langsung set tanpa .env
app.use(express.json())
const PORT = 3000
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

//admin
const adminController = require('./user/user.controller')
app.use('/api/user', adminController)

const eventController = require('./atraksi/event.controller')
app.use('/api/atraksi', eventController)

const ulasanController = require('./ulasan/ulasan.controller')
app.use('/api/ulasan', ulasanController)

const tourPackageController = require('./TourPackage/tourPackage.controller')
app.use('/api/tourPackage', tourPackageController)

const desaWisataController = require('./desaWisata/desaWisata.controller')
app.use('/api/desaWisata', desaWisataController)

const rumahMakanController = require('./rumahMakan/rumahMakan.controller')
app.use('/api/rumahMakan', rumahMakanController)

const kulinerController = require('./kuliner/kuliner.controller')
app.use('/api/kuliner', kulinerController)

const hotelController = require('./hotel/hotel.controller')
app.use('/api/hotel', hotelController)

const jarakDesaController = require('./jarakDesa/jarakDesa.controller')
app.use('/api/jarak', jarakDesaController)

const visitorRouter = require('./visitor/visitor.controller')
app.use('/api/visitor', visitorRouter)

const pageViewRouter = require('./pageView/pageView.controller')
app.use('/api/pageview', pageViewRouter)
