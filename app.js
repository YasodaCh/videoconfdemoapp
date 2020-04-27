let jsSHA = require('jssha');
let btoa = require('btoa');

let applicationId = "Default Application";
let developerKey = "8b0b****************************";

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(9999));
}

function generateToken(expiresInSeconds) {
    var EPOCH_SECONDS = 62167219200;onVidyoClientLoaded
    var expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;
    var shaObj = new jsSHA("SHA-384", "TEXT");
    shaObj.setHMACKey(developerKey, "TEXT");
    jid = "demoUser" + getRandomInt() + '@' + applicationId;
    var body = 'provision' + '\x00' + jid + '\x00' + expires + '\x00';
    shaObj.update(body);
    var mac = shaObj.getHMAC("HEX");
    var serialized = body + '\0' + mac;
    return btoa(serialized);
}

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/token', (req, res) => {
    let thirtyMinutes = 30 * 60;
    let response = JSON.stringify({
        token: "cHJvdmlzaW9uAHVzZXIxQGMzNTUzMC52aWR5by5pbwA2Mzc1NTEzOTk3NAAAZDg0YjE5OTBjZDVhMTJhMTE0YTBlM2M4ZmQ4YTNiZjY1MmVjY2Q3MmFiYzljYWU4M2ViMzQzNTI2Y2ViZWIxOTEwN2FmMDQ0NzNlZWI3MDZhMTA1NWFhNTAzZWViOWVh"
    });
    res.send(response);
})

app.listen(port, () => console.log(`Listening on port ${port}!`))