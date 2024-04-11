const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')



const user_creation_api = require('./api/user_creation_api')
const stock_api = require('./api/stock_api')
const attendance_api = require('./api/attendance_api')

var cors = require('cors')
const middleware = require('./middleware')
const reation = require('./api/reation')
const document = require('./api/document')


// const port = process.env.PORT || 5008
const app = express()
app.use(cors())
app.use(bodyParser.json({limit:"10mb"}))
app.use(cookieParser())

app.post('/relation_creation_api',reation.createrelation)
app.post('/reation_get_user_id',reation.realation_get_id)
app.post('/relation_validate',reation.relation_vali)
app.post('/document_create',document.documentCreate)
app.post('/document_create_id',document.document_id)
app.put('/document_send_relation/',document.document_relation)


app.get('/user_creation_api_list', user_creation_api.listProducts)
app.get('/user_creation_api/:id', user_creation_api.getuserbyid)
app.post('/user_creation_api', user_creation_api.createProduct)
app.put('/user_creation_api/:id', user_creation_api.editProduct)
app.delete('/user_creation_api/:id', user_creation_api.deleteProduct)
app.post('/user_creation_api_validate', user_creation_api.user_validate)

app.post('/attendance_creation_api_list', attendance_api.listProducts)
app.get('/attendance_creation_api/:id', attendance_api.getuserbyid)
app.post('/attendance_creation_api', attendance_api.createProduct)
app.put('/attendance_creation_api/:id', attendance_api.editProduct)
app.delete('/attendance_creation_api/:id', attendance_api.deleteProduct)

app.get('/stock_api_list', stock_api.listProducts)
app.post('/stock_api_list_client_id', stock_api.listProductsbyclient_id)
app.get('/stock_api/:id', stock_api.getuserbyid)
app.post('/stock_api', stock_api.createProduct)
app.put('/stock_api/:id', stock_api.editProduct)
app.delete('/stock_api/:id', stock_api.deleteProduct)


app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)

// var https_options = {

//   key: fs.readFileSync('./key/backend.cloudjiffy.net.key'),

//   cert: fs.readFileSync("./key/backend.cloudjiffy.net.cer"),

//   ca: [fs.readFileSync('./key/fullchain.cer'),]
// };


// https.createServer(https_options, app).listen(5008);

const server = app.listen(5008, () =>
  console.log(`Server listening on port ${5008}`)
)

if (require.main !== module) {
  module.exports = server
}


//  setInterval(function(){
//  order_management_try.process()
//  order_management_subscribe.process()
//  }, 1000);      