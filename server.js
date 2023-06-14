const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('/dist/tic-tac-toe'));

app.get('/*', (req, resp)=>{
    resp.sendFile('index.html', {root: '/dist/tic-tac-toe'});
});

app.listen(process.env.PORT || 8080);