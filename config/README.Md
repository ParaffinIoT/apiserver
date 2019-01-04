## A short description of the config folder and what it does


### Concept

During developement it becomes a problem when using environmental variables `.env`.  
Sometimes the best solution to providing both production development `.envs` is to do.. 
```javascript
process.env.DB_URL || 'DB_URL=mongodb://localhost:27017/paraffin'
```

This approach brings a lot of inconsistencies as the code base becomes large. 

### Solution

#### Loading .env
The config `dir` uses [dovenv](https://github.com/motdotla/dotenv) to load local env variables by first checking the `NODE_ENV` value.

#### Setting up different env for various parts of the code

The idea is to not load all env for all aspects of the project. Workers might use different env than say the main server (thread) or api.

Find various env in `components` which are loaded by setting the PROCESS_TYPE for the project

eg. For the main parser-server, `.envs` are loaded by setting `PROCESS_TYPE=parser-server` when running the code. i.e. `PROCESS_TYPE=parser-server node index.js`

For more understanding look inside [config/index.js](/config/index.js)