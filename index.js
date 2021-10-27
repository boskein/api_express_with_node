const express = require('express');
const routerApi = require('./routes');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const IP = "192.168.100.78";
const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');

app.use(express.json()); //Middleware nativo de express - Se usa cuando queremos empezar a recibir informaciòn en json

const whiteList = ['http://localhost:5500', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('insufficient permission'))
    }
  }
}
app.use(cors(options))

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)


// app.get('users/')


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: http://${IP}:${port}`)
});
