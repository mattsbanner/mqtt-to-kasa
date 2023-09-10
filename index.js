require('dotenv').config();
const { Client } = require('tplink-smarthome-api');
const mqtt= require('mqtt')

const kasaClient = new Client();

const mqttClient  = mqtt.connect(
    `mqtt://${process.env.MQTT_BROKER_IP}:${process.env.MQTT_PORT}/mqtt`,
    { clientId: 'mqtt-to-kasa' }
)

mqttClient.on('connect', function () {
    console.log('Connected to MQTT broker')

    mqttClient.subscribe('kasa/#', function () {
        console.log('Subscribed to MQTT topic')
    })
})

mqttClient.on('message', function (topic, buffer) {
    if (! topic.endsWith('/state')) {
        console.log(`Topic ${topic} cannot be handled`)
        return;
    }

    const ip = topic
        .replace('kasa/', '')
        .replace('/state', '')

    const message = buffer.toString();

    if (message !== "0" && message !== "1") {
        console.log(`Cannot handle message ${message}`)
        return;
    }

    kasaClient
        .getDevice({ host: ip })
        .then((device) => {
            device.setPowerState(message === "1");
            console.log(`Set state ${message} on ${ip}`)
        })
        .catch(function () {
            console.log(`Failed to set power state on ${ip}`);
        })
})
