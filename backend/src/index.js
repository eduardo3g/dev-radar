const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

/*
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ns1bp.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/

mongoose.connect('mongodb+srv://dbJu:dbJu@cluster0.irktq.gcp.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
    console.log(server.address())
    console.log(`Server up and running on port ${PORT}`)
})


