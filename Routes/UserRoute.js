import express from 'express'
import { UpdateDetails, getDetails, login, logout, signup } from '../Controller/UserController.js';
import { isAuthenticated } from '../Functions/isAuthentication.js';


const app = express();

app.post("/makeuser" , signup);
app.post("/accessuser" , login);

app.get("/getdetails" , isAuthenticated , getDetails)
app.post("/update" , isAuthenticated , UpdateDetails)
app.get("/logout" , logout)


export default app