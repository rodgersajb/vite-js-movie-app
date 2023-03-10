import React from "react";
import Modal from "./Modal";

function MovieCard(props) {
  return (
    <>
      <Modal title={props.title} poster_path={props.poster_path} overview={props.overview}/>
      <h2>{props.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
        alt={props.overview}
        className="movie-card"
      />
      <p>{props.overview}</p>
    </>
  );
}

export default MovieCard;
