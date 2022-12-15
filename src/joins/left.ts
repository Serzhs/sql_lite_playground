import {openDb as db} from "../db/db";


// https://www.w3schools.com/sql/sql_ref_left_join.asp
// Combines and returns all rows from movies and matching from comments
// If there is no match, comments fields are returned as NULL
// sorts by movie ID
export const leftJoin = () => {
  return new Promise((resolve, reject) => {
    db.all(`
        SELECT *
        FROM movies
                 LEFT JOIN comments ON comments.movie_id = movies.movie_id
        ORDER BY movies.movie_id ASC
    `, (err,rows) => {

      resolve(rows)

    })
  })

}
