const {kafka}=require("./KafkaClient");

(async function init(){
    const admin =kafka.admin();
    console.log("Admin connecting..");
    await admin.connect();
    console.log("Admin connected successfully.");

    //creating topics
    console.log("Creating topics..");
    await admin.createTopics({
        topics:[{
            topic:"rider-updates",
            numPartitions:2,
        }
        ]
    });
    console.log("Topics created success.");

    await admin.disconnect();
    console.log("Admin disconnected.");

})();