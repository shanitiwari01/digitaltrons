## Project Setup
Use the node package manager(npm) to install the application

- Clone this repository
```bash
git clone https://github.com/shanitiwari01/digitaltrons.git
```

- create a database `appointment` on your mysql
## Backend installation ( Appointment-API Node )

- changes nysql details .env file

```env

MYSQL_DB_NAME = 'appointment'
MYSQL_DB_HOST = '127.0.0.1'
MYSQL_DB_PORT = 3306
MYSQL_DB_USER = 'root' # your mysql username
MYSQL_DB_PASS =        # your mysql password

```

- env `DB_RESET` uses

DB_RESET make true on first time only or when you want reset whole db

- install packages

```bash
npm install

```

- start backend api

```bash

npm start

```

please make `DB_RESET` value false when start server second time

## Frontend installation ( Appointment React native )

- install packages

```bash
npm install
```

- clean project

```bash
cd android && gradlew clean
```

- change backend api domain

go to Appointment/src/core/ folder and put your ipaddress on base url constant

#### constant.js
```js

/**
 * backend app url
 */
export const BASE_URL = "http://youripaddress:8082";


export const UPDATE_SLOT = 'UPDATE_SLOT';
export const FETCH_SLOTS = 'FETCH_SLOTS';

```

For get your ipaddress use ipconfig commmand on your terminal

#### in windows

```bash
ipconfig
```

#### in mac and linux

```bash
ifconfig
```

- run Appointment project

```bash
npx react-native run-android
```