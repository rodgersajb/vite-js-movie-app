import { useState, useEffect } from "react";
import MovieSearchItem from "./MovieSearchItem";
import Slider from "../Hooks/Slider";
const UserChoices = (props) => {
  const { genreOptions, lists, userInput } = props;
  const [canSubmit, setCanSubmit] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(0);
  const [results, setResults] = useState([]);
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleOnSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${currentGenre}&with_runtine.lte=${time}include_video=true&include_adult=false&api_key=a5e87382f2c41fc47e2facb317187475`
    );
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
    const movies = await response.json();

    setResults(movies.results);
    setLoading(false);
  }

  useEffect(() => {
    setCanSubmit(time > 0 && currentGenre > 0);
  }, [currentGenre, time]);

  return (
    <>
      <form action="">
        <p>I feel like watching a</p>
        <select
          name=""
          onChange={(event) => setCurrentGenre(event.target.value)}
        >
          <option value="">--please select a genre</option>
          {genreOptions.map((genre, index) => {
            return (
              <option key={index} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <p>and my time limit is</p>

        <select name="" onChange={(event) => setTime(event.target.value)}>
          <option value="">--please select a time!--</option>
          <option value="90">Hour and a Half</option>
          <option value="120">Two hours</option>
          <option value="900">All the time in the World</option>
        </select>
        <button onClick={handleOnSubmit} disabled={!canSubmit}>
          🍿 FIND ME MOVIES 🍿
        </button>
      </form>
      {results.length > 0 && (
        <>
          {loading && <p>It's loading</p>}
          {!loading && (
            <ul className="search-results">
              {results.map((result, index) => {
                return (
                  <MovieSearchItem
                    movie={result}
                    index={index}
                    lists={lists}
                    userInput={userInput}
                    key={index}
                    movieId={result.id}
                  />
                );
              })}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default UserChoices;
