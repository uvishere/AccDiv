"use strict"

const express = require('express')
const apiRoutes = require('./api/routes')

//Define Express configs
const app = express()
app.use(express.json())
app.use(apiRoutes)

//Define port initialisation settings
const port = process.env.PORT || 3000

app.listen( port, () => {
    console.log('Server is Up on Port ' + port)
})
