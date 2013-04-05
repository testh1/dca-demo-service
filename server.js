var express = require('express'),
    works = require('./routes/works');
 
var app = express();
 
app.configure(function () {
    app.use(allowCrossDomain);
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/works', works.findAll);
app.get('/works/:id', works.findById);
app.post('/works', works.addWork);
app.put('/works/:id', works.updateWork);
app.delete('/works/:id', works.deleteWork);
 
app.listen(process.env.PORT || 3000);
//console.log('Listening on port 3000...');

function allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
}