import { db } from "./Firebase";
import { ref, onValue, push, set, update } from "firebase/database";
import React, { useEffect, useState, useMemo } from "react";
import MovieCard from "./MovieCard";

function MovieSearchItem(props) {
  const { movie, index, lists, userInput, movieId } = props;

  const [selectedList, setSelectedList] = useState([]);

  const [canadaStreamingInfo, setCanadaStreamingInfo] = useState([]);
  const [inUS, setInUS] = useState("");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=a5e87382f2c41fc47e2facb317187475`
    )
      .then((response) => response.json())
      .then((data) => setCanadaStreamingInfo(data.results.CA, "DATA"));
  }, [movieId]);

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

  // convert object returned from API into an array

  const inCanada = useMemo(() => {
    return canadaStreamingInfo ? Object.values(canadaStreamingInfo) : null;
  }, [canadaStreamingInfo]);

  const streamingSites = useMemo(() => {
    return canadaStreamingInfo ? Object.values(canadaStreamingInfo) : null;
  }, [canadaStreamingInfo]);
  // if there is a flaterate offered for the movie, capture in variable

  console.log(inCanada, "IN CANADA");

  if (!canadaStreamingInfo || Object.keys(canadaStreamingInfo).length === 0) {
    return ;
  }

  console.log(streamingSites, "Streaming sites");

  const handleMovieOnChange = (event) => {
    setSelectedList(event.target.value);
  };

  const handleOnSubmitChange = (event) => {
    event.preventDefault();
    const movieRef = ref(db, `lists/${selectedList}/movies/${userInput}`);
    push(movieRef, movie);
  };

  return (
    <>
      <li className="movie-list" key={props.index}>
        

        <MovieCard {...props.movie} {...inCanada} />
        <div className="flex-container">
          <label htmlFor="add-to-list"></label>
          <select onChange={handleMovieOnChange} name="created-lists" id="">
            <option value="">Add {movie.title} To...</option>
            {props.lists.map((list) => {
              return (
                <>
                  <option id="movie-id" value={list.key}>
                    {list.id}
                  </option>
                </>
              );
            })}
          </select>
          <button onClick={handleOnSubmitChange}>🍿 Add 🍿</button>
        </div>
      </li>
    </>
  );
}

export default MovieSearchItem;
