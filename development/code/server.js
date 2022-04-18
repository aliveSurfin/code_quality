import express from 'express';
import bodyParser from 'body-parser';


const app = express()
const port = process.env.PORT || 5000;
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
import Evaluate from "./parsing/evaluate/evaluate.js"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/ping', (req, res) => {

    res.send({ alive: true });
});

app.post('/api/analysis', (req, res) => {
    res.send(Evaluate(req.body.post));
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