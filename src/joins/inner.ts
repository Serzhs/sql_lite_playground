import {openDb as db} from "../db/db";

// https://www.w3schools.com/sql/sql_ref_join.asp
// Combines all comments with movies and returns
// each comment repeats movie
// sorts by movie ID
export const innerJoin = () => {
  return new Promise((resolve, reject) => {
    db.all(`
        SELECT *
        FROM movies
                 INNER JOIN comments ON movies.movie_id = comments.movie_id
        ORDER BY movies.movie_id ASC
    `, (err,rows) => {

      resolve(rows)
    })
  })

}
