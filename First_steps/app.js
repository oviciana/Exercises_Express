const express = require('express');
const app = express();
var hbs = require('hbs');
var blogEngine = require('./blog');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
//app.use(express.bodyParser());

app.get('/', function(req, res) {
    res.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries()});
});

//formato arrow function
// app.get('/', (req, res) => 
//    res.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries()});
 
app.get('/about', function(req, res) {
    res.render('about', {title:"About Me"});
});
 
app.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});
 
// app.get('/', function(req, res) {
//     res.sendfile('./views/index.html');
// });
 
// app.get('/about', function(req, res) {
//     res.sendfile('./views/about.html');
// });
 
// app.get('/article', function(req, res) {
//     res.sendfile('./views/article.html');
//podriamos descargar un fichero por ejemplo res.sendfile('./docs/books.pdf')
// });
 
app.listen(3000);