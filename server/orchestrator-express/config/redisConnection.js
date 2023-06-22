const Redis = require("ioredis");
module.exports = new Redis({
	port: 17845, // Redis port
	host: "redis-17845.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
	password: "i1ueutCq7pYZ05aBIZoheewp8f2nl7v8",
});