const express = require('express'); // also express middlewear
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
console.log(port);
var app = express(); // creats app

hbs.registerPartials(__dirname + '/views/partials/')
app.set('view engine', 'hbs');

app.use((req, res, next) => {// next exists so you can tell express when your middlewear fn is done
    var now = new Date().toString();
    
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to server.log.');
    });
    next();
});

//app.use((req,res,next) => {
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    var year = new Date().getFullYear();
    return year;
    //return 'test';
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to my bomb-ass website!'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})

//binds application to host on machine
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}); // common port for developping locally
