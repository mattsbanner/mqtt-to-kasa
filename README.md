# MQTT to Kasa

Simple Node.js application that subscribes to MQTT messages and forwards on the relevant command to TP-Link Kasa devices.

## Topics
Currently, only a state topic is supported. Kasa devices can only be specified by their local IP address.

### State
Publishing 1 or 0 to `/kasa/kasa-device-ip/state` will send the request required to turn on or off the device (e.g. `/kasa/192.168.1.100/state` will turn the device at `192.168.1.100` off when the message is 0).

## Environment
Each of the following environment variables must be declared.

- MQTT_BROKER_IP
- MQTT_BROKER_PORT

## Development

A `docker-compose.yml` file is included for running locally.

```
    docker-compose up
```