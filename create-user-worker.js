const { Client, logger } = require('camunda-external-task-client-js');

const config = {
    baseUrl: 'http://localhost:8080/engine-rest',
    use: logger, 
    asyncResponseTimeout: 10000
};

const client = new Client(config);

client.subscribe('save-database', async function ({ task, taskService }) {
    const username = task.variables.get('username');
    const email = task.variables.get('email');
    const age = task.variables.get('age');

    console.log('User created!');
    console.log(task.variables.getAll());

    await taskService.complete(task);
});