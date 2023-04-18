import { useState } from "react";

const Modal = ({ title, poster_path, overview }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {showModal && (
        <div
          className="modal-container"
          style={{ display: showModal ? "block" : "none" }}
          onClick={closeModal}
        >
          <div className="modal">
            <h2>{title}</h2>
            <div className="container">
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={overview}
                className="movie-card"
              />
              <p>{overview}</p>
            </div>
            <button onClick={closeModal}>close Modal</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
