Run client and server with:
npm run client/server

Cannot use node-cp-abe package without executing electron since the versions will mismatch.
If versions mismatch when using electron use this: 
https://github.com/electron/electron/blob/master/docs/tutorial/using-native-node-modules.md


TODO:
- Fix version mismatch (2 node modules?, not possible to use node-cp-abe with just node now). Server has to be initialized with electron now.
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

