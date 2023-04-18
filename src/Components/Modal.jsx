import { useState } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faExpand);

const Modal = (props) => {
  console.log(props, "MODAL");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button onClick={openModal} className="open-modal">
        <FontAwesomeIcon icon="fa-solid fa-expand" />
      </button>
      {showModal && (
        <div
          className="modal-container"
          style={{ display: showModal ? "block" : "none" }}
          onClick={closeModal}
        >
          <div className="modal">
            <header>
              <h2>{props.title}</h2>
            </header>
            <div className="container">
              <img
                src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
                alt={props.overview}
                className="movie-card"
              />
              <div className="content">
                <p>{props.overview}</p>
                <p>
                  {props.vote_average} / 10 out of {props.vote_count} votes{" "}
                </p>
                <p>Released on {props.release_date}</p>
              </div>
            </div>
            <h5>Streaming availability in 🍁:</h5>
            <div className="image-container">
              {props[1] ? (
                Object.values(
                  props[1].map((site, index) => {
                    return (
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${site.logo_path}`}
                      />
                    );
                  })
                )
              ) : (
                <h5>Not available in 🍁</h5>
              )}
            </div>
            <button onClick={closeModal}>x</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
