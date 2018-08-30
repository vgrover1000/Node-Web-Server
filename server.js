const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to file.');
        }
    });

    next();
});

app.use((req, res) =>{
    res.render('maintenance.hbs');
});

app.get('/', (req, res) =>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: "Hello. Welcome to the home page!"
    });
});

app.get('/about', (req, res) =>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) =>{
    res.send({
        errorMessage: 'Unable to fulfill the request'
    })
});

app.listen(3000, () => {
    console.log('Server started on port 3000.')
});