import Router, {Request, Response} from 'express'
import {openDb as db} from "../db/db";

const router = Router()

router.all('/', (req: Request, res: Response) => {
  db.get(`
      SELECT * FROM movies
    `,(err, row) => {
    res.json(row);
  })
});

router.get('/:movieId', (req: Request, res: Response) => {
  const { movieId } = req.params

  db.get(`
      SELECT * FROM movies
      WHERE movie_id = $movieId
    `, {
    $movieId: movieId,
  },(err, row) => {
    res.json(row);
  })
});

router.post('/',  (req: Request, res: Response) => {
  console.log(123)
  const {name, description, rating} = req.body

  db.run(`
      INSERT INTO movies(name, description, rating)
      VALUES( $name, $description, $rating );
    `, {
    $name: name,
    $description: description,
    $rating: rating,
  },() => {
    res.send('movie post works!');
  })

});

router.put('/:movieId', (req: Request, res: Response) => {
  const { movieId } = req.params
  const {name, description, rating} = req.body

  db.run(`
        UPDATE movies
        SET name = $name,
            description = $description,
            rating = $rating
        WHERE movie_id = $movieId;
    `,
    {
      $movieId: movieId,
      $name: name,
      $description: description,
      $rating: rating,
    },
    () => {
      res.json({
        movieId,
        name,
        description,
        rating
      })
    })
})

router.delete('/:movieId', (req: Request, res: Response) => {
  const { movieId } = req.params

  db.run(`
        DELETE FROM movies
        WHERE movie_id = $movieId;
    `,
    {
      $movieId: movieId,
    },
    () => {
      res.send(movieId)
    })
})

export default router
