import express from 'express'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv';

/**
 * Import routes
 */
import invoiceRoute from './routes/invoiceRoute.js'

dotenv.config({ 
  path: process.env.NODE_ENV === "test" ? ".env.testing" : 
    process.env.NODE_ENV === "production" ? ".env.production" : ".env"
});

const app = express()

app.use(bodyParser.json()); // to support JSON-encoded bodies

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','PUT'],
}));
app.use(fileUpload())

app.get('/', function(req, res) {
  	res.send('API is running');
});

// app.use('/api', auth)
app.use('/api/invoice', invoiceRoute)

// default response:
app.use((req, res) => {
    res.status(404)
})

export default app 