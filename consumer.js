const {kafka} = require("./KafkaClient");

const group = process.argv[2];
(async function init(){
    const consumer = kafka.consumer({groupId:group});
    await consumer.connect();
    await consumer.subscribe({topics:["rider-updates"]}); //fromBeginning:false by default ,only get latest receive messages instead from beginning stored in the kafka db
    await consumer.run({
        eachMessage:async({topic,partition,message,heartbeat,pause})=>{
            console.log(`|${group}|,[${topic}] part:${partition} - }`,message.value.toString());

        }
    });
    //await consumer.disconnect();
})();