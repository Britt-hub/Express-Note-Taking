let path = require('path')
let express = require('express')
let app = express()

app.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname, './public/notes.html'))

})
app.listen(3000, function() {
    console.log('server is running on port 3000');
})