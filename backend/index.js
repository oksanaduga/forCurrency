const express = require('express')
let path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const fsp = require('fs/promises');

const PORT = process.env.PORT || 3001

const app = express()

app.listen(PORT, () => {
    console.log(`server start on ${PORT}...`);
})

app.get('/currency', async (req, res) => {
    let data = await fsp.readFile(__dirname + '/data.json', 'utf8');
    res.json(JSON.parse(data));
})

async function run () {
    try {
        const resp = await fetch(`https://api.simpleswap.io/v1/get_all_currencies?api_key=1eb05f06-53ae-4e11-a34a-a66bc963d9fc`)
        const data = await resp.json();
        await fsp.writeFile(__dirname + '/data.json', JSON.stringify(data));
    } catch (err) {
        console.error(err);
    }
}

run();

setTimeout(async () => await run(), 60000);