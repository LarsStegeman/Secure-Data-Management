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

3. (Re)set database
```sh
$ npm run db.reset
```

4. Move Bootstrap required files to client/vendor
```sh
$ npm run build
```
Note: This step needs only to be executed once, as long as you don't delete client/vendor or its contents

5. Run the client
```sh
$ npm run client
```
or the server
```sh
$ npm run server
```

### Server REST API

When running the server, you can reach it at localhost:8080. Many routes are available (see server/routes foulder)

### Troubleshooting

If versions mismatch when using nw use this:
http://docs.nwjs.io/en/latest/For%20Users/Advanced/Use%20Native%20Node%20Modules/

