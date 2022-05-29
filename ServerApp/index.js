require('dotenv').config()
const express = require('express')
const http = require('http');
const morgan = require('morgan')

const port = process.env.PORT || 3000

require('./mongo.config')()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/users', require('./Users/UsersRouter'))
app.use('/authors', require('./Authors/AuthorRouter'))
app.use('/categories', require('./Categories/CategoriesRouter'))
app.use('/books', require('./Books/BooksRouter'))

const server = http.createServer(app)

server.listen(port, () => console.log('server listeing on port: ', port))





