import express from 'express';

const app = express();

app.use(express.static('public'));

/**
 *
 */
app.get('/', (req, res) => {
    res.send(`<div> hey </div>`);
});

/**
 *
 */
app.listen(3000, async () => {
    console.log('Server running on port 3000 \n');
});
