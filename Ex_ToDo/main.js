const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let aTasks = []
let aCompleted = []

app.set( 'view engine', 'pug' )

app.use( express.static( __dirname + '/public' ) )
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  const title = 'To Do List'
	var msgTxt = 'No tasks.'
	if (aTasks.length !== 0) {
		msgTxt = ""
	}
 	res.render('list_tasks', { title, aTasks, msgTxt })
})

app.get('/done/:id', (req,res) => {
	aCompleted.push(aTasks[req.params.id].name + " Completed at " + dateHour())
	aTasks.splice(req.params.id,1)
	res.redirect('/')
})

app.get('/alldone', (req,res) => {
	for (var pos = aTasks.length -1; pos >= 0; pos--){
		aCompleted.push(aTasks[pos].name + " Completed at " + dateHour())
		aTasks.splice(pos,1)
	}
	res.redirect('/')
})

app.get('/delete/:id', (req,res) => {
	aTasks.splice(req.params.id,1)
	res.redirect('/')
})

app.get('/completed', (req, res) => {
	const title = 'Completed'
	res.render('completed', { title, aCompleted })
})

app.post('/', (req, res) => {
	if (req.body.addTask !== "") {
		aTasks.push({ name : req.body.addTask, create : ("Create at: " + dateHour()) })
	}
	res.redirect('/')
});

app.listen(3005,() =>
	console.log('listening on port 3005')) 

/*var dateHour = () => {
	var today = new Date()
	var myDate = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate()
	var myHour = today.getHours() + ":" + today.getMinutes()
	(myDate + " " + myHour)
}*/
function dateHour() {
	var today = new Date()
	var myDate = today.getFullYear()
		+ "/"
		+ ("0" + (today.getMonth() + 1)).slice(-2)
		+ "/"
		+ ("0" + today.getDate()).slice(-2)
	var myHour = ("0" + today.getHours()).slice(-2)
		+ ":"
		+ ("0" + today.getMinutes()).slice(-2)
	return (myDate + " " + myHour)
}