const server = require('./server.js');
const accountsRouter = require('./accountsRouter.js');

const PORT = process.env.PORT || 4000;

server.use('/api/accounts', accountsRouter);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});