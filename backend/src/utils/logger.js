module.exports = async function (request, reply) {
  if (process.env.ENABLE_EVENT_LOGGER === 'true') {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
  }
};
