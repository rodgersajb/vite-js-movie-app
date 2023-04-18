import React from "react";
import Modal from "./Modal";

function MovieCard(props) {
  
  return (
    <>
      
        <Modal
          title={props.title}
          poster_path={props.poster_path}
          overview={props.overview}
        />
        <h2>{props.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
          alt={props.overview}
          className="movie-card"
        />
        <p>{props.overview}</p>
        {props[1] ? <>
        <h5>This movie can be streamed in Canada on:</h5>
        <div className="image-container">

        {Object.values(props[1]).map((site, index) => {
          return (
            <img src={`https://image.tmdb.org/t/p/w200/${site.logo_path}`} />
            );
          })}
          </div>
        </> : <h5>This movie is not available for streaming in Canada</h5>}
      
    </>
  );
}

export default MovieCard;
