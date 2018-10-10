# Paraffin API Server

Paraffin api server using the [parse-server](https://github.com/ParsePlatform/parse-server) module on Express.

Read the full Parse Server [guide](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide)

## Installation
### For Local Development

* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `npm install`
* Install mongo locally using [how to install mongodb on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04) and [MongoDB Doc](https://docs.mongodb.com/manual/administration/install-community/)
* Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
* Run the api server with `npm start`
* By default it will use a path of /api for the API routes. It can be changed in .env file
* By defualt you now have a database named "paraffin" that contains your Parse data


## Using it

Before using it, you can access a test page to verify if the basic setup is working fine [http://localhost:1337/test](http://localhost:1337/test).
Then you can use the REST API, the JavaScript SDK, and any of  [Parse open-source SDKs](http://parseplatform.org):

Example request to a server running locally:

```
curl -X POST \
  -H "X-Parse-Application-Id: APP_ID" \
  -H "Content-Type: application/json" \
  -d '{}' \
  http://localhost:1337/api/functions/hello
```