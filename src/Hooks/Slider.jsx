import { useState } from "react";
const Slider = ({ results }) => {
  console.log(results, "RESULTS");
  // Create a state value for holding the index of which movie should be shown on the page
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  // Get the current Movie based on the state value created above
  const currentMovie = [results[currentMovieIndex]];
  console.log(currentMovie)
  //Event handler for switching to next movie
  const nextMovie = () => {
    let nextIndex = currentMovieIndex + 1;
    if (nextIndex >= results.length) {
      nextIndex = 0;
    }

    setCurrentMovieIndex(nextIndex);
  };
  // Event handler for switching to previous movie

  const prevMovie = () => {
    let prevIndex = currentMovieIndex - 1;
    if (prevIndex < 0) {
      prevIndex = results.length - 1;
    }
    setCurrentMovieIndex(prevIndex);
  };

  return (
    <>
      {currentMovie}
      {console.log(currentMovie, "CURRENT MOVIE")}
      <div>
        <button onClick={prevMovie}>Previous</button>
        <button onClick={nextMovie}>Next</button>
      </div>
    </>
  );
};

export default Slider;
