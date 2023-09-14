const express= require('express');
const cors = require('cors');
const config = require('config');
const bodyParser = require('body-parser');

// const createError = require('http-errors');


const routes = require('./routes');

const app = express();

app.use('/public', express.static('public'))
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
// app.use((req, res, next) => {
//   // Set headers for all responses
//   res.setHeader('Content-Type', 'application/json');
//   // You can set other headers here as needed

//   // Continue processing the request
//   next();
// });

app.use('/',routes);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// app.use((error, req, res, next) => {
//   if (error instanceof CustomError) {
//     res.status(error.status).json({ message: error.message });
//   } else {
//     // Handle other types of errors or provide a generic response
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
