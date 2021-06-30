const util = require("util");
const redis = require("redis");
const client = redis.createClient();

const handler = {
  get(target, propKey, receiver) {
    return util.promisify(target[propKey]).bind(target);
  },
};

const clientProxy = new Proxy(client, handler);

module.exports = { client, asyncClient: clientProxy };
