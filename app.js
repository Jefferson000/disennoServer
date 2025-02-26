var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var pruebasRouter = require('./routes/pruebas');
var professorController = require('./routes/professor');
var classroomController = require('./routes/clasroom')
var subjectController = require('./routes/subject')
var infoController = require('./routes/info');
var consultController = require('./routes/consult')
var userController = require('./routes/user')
var xssFilter = require('x-xss-protection');
var frameguard = require('frameguard');
var csp = require('helmet-csp');
var noSniff = require('dont-sniff-mimetype');
const limiter = require('./Midleware/limiter');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", limiter);
app.use(xssFilter());
app.use(xssFilter({ setOnOldIE: true }));
app.disable('x-powered-by');
app.use(frameguard({ action: 'deny' }));
app.use(csp({
    directives: {
        defaultSrc: ["'self'", 'default.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        sandbox: ['allow-forms', 'allow-scripts'],
        reportUri: '/report-violation',
        objectSrc: ["'self'"],
        baseUri: ["'self'"],
        childSrc: ["'self'"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        frameSrc: ["'self'"],
        imgSrc: ["'self'"],
        manifestSrc: ["'self'"],
        mediaSrc: ["'self'"],
        prefetchSrc: ["'self'"],
        styleSrc: ["'self'"],
        upgradeInsecureRequests: true,
        workerSrc: false  // This is not set.
      },
      reportOnly: true,
      browserSniff: false,
}));
app.use(noSniff());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
});
app.use('/', indexRouter);
app.use('/pruebas',pruebasRouter);
app.use('/professor',professorController)
app.use('/classroom',classroomController)
app.use('/subject',subjectController)
app.use('/info',infoController)
app.use('/consult',consultController)
app.use('/user',userController)
module.exports = app;