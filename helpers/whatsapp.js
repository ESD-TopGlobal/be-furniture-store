const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const waClient = new Client()

const initWhatsapp = async () => {

    console.log('Initializing Whatsapp Client');
    await waClient.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.generate(qr, { small: true })
    })

    waClient.on('authenticated', (session) => {
        console.log('AUTHENTICATED', session);
    })

    waClient.on('ready', () => {
        console.log('Client is ready');
    })

    waClient.on('message', async (msg) => {
        if (msg.body === '!ping') {
            msg.reply('pong')
        }
    })

    await waClient.initialize()

}

module.exports = { initWhatsapp, waClient }