import express from 'express'
import { CardsGet, RecommendationsItems, createItem } from '../Controller/CardController.js';
import { isAuthenticated } from '../Functions/isAuthentication.js';

const app = express();

app.post("/createitem" , isAuthenticated ,  createItem) 
app.get("/recommendations" , RecommendationsItems)
app.get("/getcards" , CardsGet)

export default app;