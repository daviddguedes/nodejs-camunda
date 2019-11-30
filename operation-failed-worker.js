const { Client, logger } = require('camunda-external-task-client-js');

const config = {
    baseUrl: 'http://localhost:8080/engine-rest',
    use: logger, 
    asyncResponseTimeout: 10000
};

const client = new Client(config);

client.subscribe('operation-failed', async function ({ task, taskService }) {
    console.log('Operation failed.');

    await taskService.complete(task);
});