import {openDb as db} from "../db/db";
import {Database} from "sqlite3";

const comments = [
  {
    "author": "Bob dylan",
    "comment": "This was awesome movie",
    "movieId": 1
  },
  {
    "author": "Freddy Mercury",
    "comment": "This was awesome movie",
    "movieId": 2
  },
  {
    "author": "Elton John",
    "comment": "This was awesome movie",
    "movieId": 3
  },
  {
    "author": "Tupac Shakur",
    "comment": "This was awesome movie",
  },
  {
    "author": "Lady Gaga",
    "comment": "This was awesome movie",
    "movieId": 4
  },
  {
    "author": "Eminem",
    "comment": "This was awesome movie",
  },
]

const getFirstComment = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * from comments", (err, row) => {
      if(err) {
        reject()
      }

      resolve(!!row)
    })
  })
}

const createCommentsTable = () => {
  // to show it in https://dbdiagram.io/d you need to remove "if not exists" and "AUTOINCREMENT"
  return new Promise((resolve, reject) => {
    db.run(`create table if not exists comments (
     comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
     author varchar(255) NOT NULL,
     comment TEXT NOT NULL,
     movie_id INTEGER,
     lastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
     FOREIGN KEY (movie_id)
       REFERENCES movies (movie_id)
      )`, [], (err) => {
      if(err) {
        reject(err)

        return
      }


      resolve(true)
    })
  }
)}


export const seedComments = async () => {
  await createCommentsTable()

  const alreadySeeded = await getFirstComment()

  if(alreadySeeded) {
    return
  }

  const requests: Database[] = []

  comments.forEach(({author, comment, movieId}) => {
    const response = db.run(`
      INSERT INTO comments(author, comment, movie_id)
      VALUES( '${author}', '${comment}', '${movieId}' );
    `)

    requests.push(response)
  })

  await Promise.all(requests)
}
