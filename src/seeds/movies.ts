import {openDb as db} from "../db/db";
import {Database} from "sqlite3";

const movies = [
  {
    "name": "Movie about Bob Dylan",
    "description": "lorem ipsum dolor sit atmet",
    "rating": 9
  },
  {
    "name": "Movie about Freddy Mercury",
    "description": "lorem ipsum dolor sit atmet",
    "rating": 10
  },
  {
    "name": "Movie about Elton John",
    "description": "lorem ipsum dolor sit atmet",
    "rating": 8
  },
  {
    "name": "Movie about Lady Gaga",
    "description": "lorem ipsum dolor sit atmet",
    "rating": 7
  },
  {
    "name": "Movie about Raimond Paul",
    "description": "lorem ipsum dolor sit atmet",
    "rating": 6
  },
]

const getFirstMovie = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * from movies", (err, row) => {
      if(err) {
        reject()
      }

      resolve(!!row)
    })
  })
}

const createMoviesTable = () => {
  // to show it in https://dbdiagram.io/d you need to remove "if not exists" and "AUTOINCREMENT"
  return new Promise((resolve, reject) => {
    db.run(`create table if not exists movies (
    movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(255) NOT NULL, 
    description TEXT NOT NULL, 
    rating INTEGER,
    lastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )`, [], (err) => {

      if(err) {
        reject(err)

        return
      }

      resolve(true)
    })
  })
}

export const seedMovies = async () => {

  await createMoviesTable()

  const alreadySeeded = await getFirstMovie()

  if(alreadySeeded) {
    return
  }

  const requests: Database[] = []

  movies.forEach(({rating, name, description}) => {
    const response = db.run(`
        INSERT INTO movies(name, description, rating)
        VALUES( '${name}', '${description}', '${rating}' );
    `)

    requests.push(response)
  })

  await Promise.all(requests)
}
