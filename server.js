let path = require('path')
let express = require('express')
let app = express()
let db = require('./db/db.json')
let bodyParser = require('body-parser')
app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))


})
// for heroku 
const PORT = process.env.PORT || 3000;

app.get('/api/notes', function (req, res) {
    res.json(db)

})

app.post('/api/notes', function (req, res) {
    //pull notes info from req.body
    req.body
    console.log(req.body)
    db.push(req.body);
    res.status(200).end();

})
/////////////////
////work on the function part
app.delete('/api/notes/:id', function (req, res) {
    db = db.filter(function(note){
        if(req.params.id == note.id) {
            return false
        } else {
            return true 
        }
    })
    res.status(200).end();

})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))

})

app.listen(PORT, function () {
    console.log(`server is running on port ${PORT}`);
})



