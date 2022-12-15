import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser'
import {openDb as db} from "./db/db";
import {seedComments} from "./seeds/comments";
import {seedMovies} from "./seeds/movies";
import {innerJoin} from "./joins/inner";
import {leftJoin} from "./joins/left";

import movieRouter from './controllers/movies'
import commentRouter from './controllers/comments'

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


(async () => {

  console.log('Seeding some data if there are no')
  await seedMovies()
  await seedComments()
  console.log('End seeding some data')

  // const innerResult = await innerJoin()
  // const leftResult = await leftJoin()

  app.use('/movie', movieRouter);
  app.use('/comment', commentRouter);

  app.listen(3000, () => {
    console.log('Application started on port 3000!');
  });

})()


