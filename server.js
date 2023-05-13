const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const crypto = require('crypto');
const cors = require('cors');

//npm install express express-session cookie-parser
const userRouter = require('./routes/users.router');
const productsRouter = require('./routes/products.router');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));


// app.use((req, res, next) => {
//     const start = Date.now();
//     res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', true );
//     next();
//     const delta = Date.now() - start;
//     console.log(`${req.method} ${req.url} ${delta}ms`);
// })


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
// session middleware
app.use(sessions({
    genid: function(req) {
      return crypto.randomUUID() // use UUIDs for session IDs
    },
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
  }));
// cookie parser middleware
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/products', productsRouter);


app.listen(PORT, () => { 
    console.log(`Server is listening to http://localhost:${PORT}`); // http://localhost:5000
});