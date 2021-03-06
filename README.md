<div style="text-align:center"><img src="./img/topshop.png" alt="background" style="width:70%; margin-left:auto; margin-right:auto; display: block; width:300px"/></div>

# 🧿 TopShop
Small project with login, register, user authentication and user modification based in Mongo Express Angular & Node.js
## Front server development
Run `ng serve` for a front dev server. Navigate to `http://localhost:4200/`.
## Back server development
in cd node
Run `nodemon aplicacion.js` for a back dev server. Navigate to `https://localhost:6001/`.

### Technologies
* 💫 Mongo
* 🔥 Express
* 💣 Angular
* ✨ Node.js

### Funcionality
* Login
* Register
   * Observable - Configurable connection
   * Authentication
   * https
* User Authentication
* User modification

### Dependencies
* validatorjs
* nodemon
* mongodb
* express
* jsonwebtoken

#### Notes about mongoDB
If you installed mongoDB globally you'd have to link it using:
```shell
npm link mongodb
```
  1. Only connect mongodb at the beginning
  2. You get an object that represents the database
     - You ask for the scheme, it is an object that represents the scheme.
  3. You ask the scheme for the collection:
   - It is an object that represents the collection

#### restClient
Include calls to check endpoints