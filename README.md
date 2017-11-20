# SDM - Patient Health Records System

### Requirements
- NodeJS (I would recommend v9.0.0) and NPM
- git

### Installation for Development

1. Clone the repository:
```sh
$ git clone git@github.com:LarsStegeman/Secure-Data-Management.git
```

2. Install dependencies:
```sh
$ npm install
```
** Recommendation: ** Install nwjs SDK, so you can access Chromium Devtools with F12 while running the client for better debugging
```sh
$ npm install nw --nwjs_build_type=sdk
```

3. Create the database
```sh
$ npm run db.create
```

4. Run the .sql script to insert the tables
```sh
$ npm run db.tables
```
Note: You can reset the database by repeating steps 3 and 4

5. Move Bootstrap required files to client/vendor
```sh
$ npm run build
```
Note: This step needs only to be executed once, as long as you don't delete client/vendor or its contents

6. Run the client
```sh
$ npm run client
```
or the server
```sh
$ npm run server
```

### Server REST API

When running the server, you can reach it at localhost:8080

The current working routes are:
- localhost:8080/hospital/ - Returns all the hospitals IDs
- localhost:8080/hospital/:id - Returns the data from the hospital with hospitalID = id
- localhost:8080/patient/ - Returns all the patients IDs
- localhost:8080/patient/:id - Returns the data from the patient with patientID = id


### Troubleshooting

If versions mismatch when using nw use this:
http://docs.nwjs.io/en/latest/For%20Users/Advanced/Use%20Native%20Node%20Modules/

For more troubleshooting check the Drive

 ### TODO
- All connection parameters should be in configuration folders (database, server, client).
Client:
	- Make it look better.
	- Show errors : not able to connect to host/wrong key/wrong username.
	- After succesful decrypt go to next page to show results.
	- Change results by encrypting and sending to server. (Later: add some validation).

Server:
	- Publish public key for client. (Maybe display when connecting)
	- Create keys with given policy.
	- Handle request messages and return results from database.
	- Handle update messages and update in database. (Later: add some validation).
