const fs = require('fs-extra'); // Brug fs-extra til både read og write
const EventEmitter = require('events');
const express = require('express');
const path = require('node:path');
const app = express();
const port = '3000';

const eventEmitter = new EventEmitter(); // Opret en instans af EventEmitter

// Event-handler for 'log' eventen
eventEmitter.on('log', (message) => {
    console.log(`Log message: ${message}`);
});

// Udløs 'log' eventen med en besked
eventEmitter.emit('log', 'This is a log-message');

// Middleware til at logge alle HTTP-anmodninger
app.use((req, res, next) => {
    const logMessage = `${req.method} ${req.url}`;
    eventEmitter.emit('log', logMessage);
    next();
});

// Servér statiske filer fra 'public' mappen
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// GET /read-file
app.get('/read-file', async (req, res) => {
    const filePath = path.join(__dirname, 'data.txt');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.send(data);
    } catch (err) {
        eventEmitter.emit('log', `Error while reading file: ${err.message}`);
        res.status(500).send('Error while reading file');
    }
});

// POST /write-file
app.post('/write-file', async (req, res) => {
    const filePath = path.join(__dirname, 'data.txt');
    const fileContent = req.body.content;

    if (!fileContent) {
        eventEmitter.emit('log', 'Data has not been received!');
        return res.status(400).send('Data has not been received!');
    }

    try {
        await fs.writeFile(filePath, fileContent, 'utf8');
        eventEmitter.emit('log', 'File has been updated!');
        res.send('File has been updated!');
    } catch (err) {
        eventEmitter.emit('log', `Error while writing file: ${err.message}`);
        res.status(500).send('Error while writing file');
    }
});

// Start serveren
app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});