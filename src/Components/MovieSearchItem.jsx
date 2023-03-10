import { db } from "./Firebase";
import { ref, onValue, push, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";


function MovieSearchItem(props) {
  const { movie, index, lists, userInput } = props;

  const [selectedList, setSelectedList] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState([]);

  const handleMovieOnChange = (event) => {
    setSelectedList(event.target.value);
  };

  useEffect(() => {
    const dbMovieRef = ref(db, `lists/${selectedList}/movies/${userInput}`);
    onValue(dbMovieRef, (snapshot) => {
      const data = snapshot.val();

      const movieAdd = data
        ? Object.values(data)
            .map((key) => {
              return { id: key, ...data[key] };
            })
            .sort((a, b) => {
              return a - b;
            })
        : [];
      setSelectedList(movieAdd);
    });
  }, []);

  const handleOnSubmitChange = (event) => {
    event.preventDefault();
    const movieRef = ref(db, `lists/${selectedList}/movies/${userInput}`);
    push(movieRef, movie);
  };

  return (
    <>
      <li className="movie-list" key={props.index}>
        <MovieCard {...props.movie} />
        <div className="flex-container">
          <label htmlFor="add-to-list"></label>
          <select onChange={handleMovieOnChange} name="created-lists" id="">
            <option value="">Add Movie To...</option>
            {props.lists.map((list) => {
              return <option id="movie-id" value={list.key}>{list.id}</option>;
            })}
          </select>
          <button onClick={handleOnSubmitChange}>🍿 Add 🍿</button>
        </div>
      </li>
    </>
  );
}

export default MovieSearchItem;
