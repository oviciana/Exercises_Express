const express = require('express')
const stylus = require('stylus')
const nib = require('nib')

const app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
//app.use(express.logger('dev'))
app.use( stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use( express.static(__dirname + '/public'))
app.get('/', function (req, res) {
//  res.end('Hi there!')
		res.render('index',
		{ title : 'Home' }
		)
})
app.listen(3000, () => console.log("listening at port 3000 ..."))