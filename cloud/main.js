var brokerIP = process.env.BROKER_IP || '::ffff:127.0.0.1';

Parse.Cloud.define('hello', function (request, response) {
    response.success('Hello world, Peace be upon Jesus who will return with Mahdi');
});


Parse.Cloud.define("auth", function (request, response) {

    // the params passed through the start request
    const params = request.params;
    // Headers from the request that triggered the job
    const headers = request.headers;
    // get the parse-server logger
    const log = request.log;
    const isMaster = request.master; // if the function is run with masterKey
/*
    console.log("Request:");
    console.log(request);
    console.log("headers:");
    console.log(JSON.stringify(headers));
    console.log("params:");
    console.log(JSON.stringify(params));
    console.log("logs:");
    console.log(JSON.stringify(log));
*/
    if (!isMaster) {
        response.error("Request hasnot MasterKey.");
    }
    if (request.ip != brokerIP) {
        response.error("Request IP is not valid.");
    }
    const query = new Parse.Query("Device");
    query.equalTo("clientid", params.client_id);
    query.find()
        .then((results) => {

            if (results.length != 1) {
                response.error("clientId lookup failed");
            }
            password = results[0].get("password");
            username = results[0].get("username");
            console.log("username: " + username);
            if (username == params.username && password == params.password) {
                var r = {
                    authenticated: true,
                    profile: {topics: [username]}
                }
                response.success(r);
            }
        })
        .catch(() => {
            response.error("Device lookup failed");
        });
});