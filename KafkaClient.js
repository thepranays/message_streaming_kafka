const {Kafka} = require("kafkajs")

exports.kafka =new Kafka({
    clientId:"first_kafka_app",
    brokers:["10.50.14.37:9092"],
});