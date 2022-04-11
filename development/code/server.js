import express from 'express';
import bodyParser from 'body-parser';


const app = express()
const port = process.env.PORT || 5000;
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
import Parser from './parsing/parser/Parser.js';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    const parser = new Parser()
    res.send({ express: 'Hello From Express', test: parser.parse("test;") });
});

app.post('/api/test', (req, res) => {
    console.log(req.body);

    console.log()
    res.send(
        `Post received : body =  ${req.body.post}`,
    );
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));