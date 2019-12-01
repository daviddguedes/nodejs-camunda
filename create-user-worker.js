const { Client, logger, Variables } = require('camunda-external-task-client-js');

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

    const processVariables = new Variables();
    processVariables.set("permission", { type: 'grant', level: 20 });

    console.log(logger.success('User created!'));

    await taskService.complete(task, processVariables);
});