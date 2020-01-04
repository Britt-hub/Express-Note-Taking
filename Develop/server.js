let path = require('path')
let express = require('express')
let app = express()
let db = require('./db/db.json')
let bodyParser = require('body-parser')
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))

})

app.get('/api/notes', function (req, res) {
    res.json(db)

})

app.post('/api/notes', function (req, res) {
    //pull notes info from req.body
    req.body
    console.log(req.body)
    db.push(req.body);
    res.status(200);

})

app.delete('/api/notes/:id', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))

})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))

})

app.listen(3000, function () {
    console.log('server is running on port 3000');
})



