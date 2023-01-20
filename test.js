import express from 'express'
const app = express()

//app.use(express.static('.'))


app.get("/name/search", function (req, res) {
    let srch = req.params.srch;
    res.redirect('http://google.com/search?q=' + srch)
});

app.get("/google", function (req, res) {

    res.redirect('http://google.com')
});


app.listen(3000, () => {
    console.log('++++++');
});