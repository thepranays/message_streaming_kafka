const {kafka} = require("./KafkaClient");
const readline = require('readline');
const scanner = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});


(async function init(){
    const producer = kafka.producer();

    console.log("Connecting producer..");
    await producer.connect();
    console.log("Connected Producer");
    
    scanner.setPrompt('> ');
    scanner.prompt();
    let [riderName,location]=["",""];
    scanner.on('line',async function(line){
        [riderName,location]=line.split(" ");
        await producer.send({
            topic:"rider-updates",
            messages:[{
                partition:location.toLowerCase() == "pune" ? 0:1 , //Which parition in given topic should the message go
                key:'location-update',value:JSON.stringify({name:riderName,loc:location}),
            }]
        });
    }).on("close",async()=>{
        await producer.disconnect();
        console.log("Disconnected producer");

    });
    
    
})();