import Router, {Request, Response} from 'express'
import {openDb as db} from "../db/db";

const router = Router()

router.get('/movie/:movieId', (req: Request, res: Response) => {
  const { movieId } = req.params

  db.all(`
      SELECT * FROM comments
      WHERE movie_id = $movieId
    `, {
    $movieId: movieId,
  },(err, row) => {
    res.json(row);
  })
});

router.post('/', (req: Request, res: Response) => {
  const {author, comment, movieId} = req.body

  db.run(`
      INSERT INTO comments(movie_id, comment, author)
      VALUES( $movieId, $author, $comment );
    `, {
    $movieId: movieId,
    $author: author,
    $comment: comment,
  }, () => {
    res.json(true);
  })
});

export default router
