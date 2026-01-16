const cron = require("node-cron");
const axios = require("axios");
const { DB_URL } = require("./utils");

async function myScheduledFunction() {
  const res = await axios.get(DB_URL);
  console.log(res.data);
}

cron.schedule("*/2 * * * *", myScheduledFunction);

console.log(
  "Cron job scheduled to run every 3 minutes. The Node.js process must stay alive for this to work."
);
