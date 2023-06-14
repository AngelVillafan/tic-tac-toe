let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/tic-tac-toe'));

app.get('/*', (req, resp)=>{
    resp.sendFile(__dirname+'/dist/tic-tac-toe/index.html');
});

app.listen(process.env.PORT || 8080);