import { db } from "./Firebase";
import { ref, update, remove } from "firebase/database";

const MovieListCard = (props) => {
  const { movie, listId, movieKey } = props;
  console.log(listId, "LISTID");
  console.log(movie.id, "MOOOOOVIE");
  console.log(props.movie.id, "HEY");

  const handleRemove = (movieId) => {
    const movieCardRef = ref(db, `lists/${listId}/movies/${movieKey}`);
    remove(movieCardRef);
  };

  return (
    <>
      <div key={props.index} className="flex-container">
        <img
          src={`https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`}
          alt=""
        />
        <button onClick={() => handleRemove(movie.id)}>X</button>;
      </div>
    </>
  );
};

export default MovieListCard;
