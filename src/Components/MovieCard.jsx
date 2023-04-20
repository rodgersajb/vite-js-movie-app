import React from "react";
import Modal from "./Modal";
import { ModalContext } from "../Contexts/ModalContext";
import { useContext } from "react";


function MovieCard(props) {
  
    const { showModal, setShowModal } = useContext(ModalContext);

    const openModal = () => {
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false)
    }  
    
    return (
    <>
      
        <Modal
          {...props}
        />
        <h2>{props.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
          alt={props.overview}
          className="movie-card"
          onClick={openModal}
        />
        {/* <p>{props.overview}</p>
        {props[1] ? <>
        <h5>This movie can be streamed in Canada on:</h5>
        <div className="image-container">

        {Object.values(props[1]).map((site, index) => {
          return (
            <img src={`https://image.tmdb.org/t/p/w200/${site.logo_path}`} />
            );
          })}
          </div>
        </> : <h5>This movie is not available for streaming in Canada</h5>} */}
      
    </>
  );
}

export default MovieCard;
