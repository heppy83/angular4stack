'use strict'

const express = require('express')


const app = express()

app.use(express.static('dist/client'))
app.set('port', 3000)

app.listen(app.get('port'), () => console.log('App running on port ' + app.get('port')) )
