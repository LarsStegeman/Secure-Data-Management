Run client and server with:
npm run client/server

If versions mismatch when using nw use this: 
http://docs.nwjs.io/en/latest/For%20Users/Advanced/Use%20Native%20Node%20Modules/

TODO:
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

