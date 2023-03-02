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
    const dbMovieRef = ref(db, `lists//${selectedList}${userInput}`);
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
      setSelectedList(selectedList);
      console.log(selectedList, "SELECTED LIST");
    });
  }, [selectedList]);

  const handleOnSubmitChange = (event) => {
    event.preventDefault();
    const movieRef = ref(db, `lists//${selectedList}${userInput}`);
    push(movieRef, movie);
  };

  return (
    <>
      <li key={props.index}>
        <MovieCard {...props.movie} />

        <label htmlFor="add-to-list"></label>
        <select onChange={handleMovieOnChange} name="created-lists" id="">
          <option value="">--Add Movie--</option>
          {props.lists.map((list) => {
            return <option value={list.key}>{list.id}</option>;
          })}
        </select>
        <button onClick={handleOnSubmitChange}>Add</button>
      </li>
      {/* <h2>
        {movieData.map((data) => {
          return (
            <ul>
              <li>
                <p>{data.title}</p>
                <p>{data.overview}</p>
              </li>
            </ul>
          );
        })}
      </h2> */}
    </>
  );
}

export default MovieSearchItem;