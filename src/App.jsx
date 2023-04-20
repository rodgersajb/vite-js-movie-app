import { useState, useEffect } from "react";
import "../styles/sass/style.scss";
import UserLists from "./Components/UserLists";
import UserChoices from "./Components/UserChoices";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Nav from "./Components/Navbar";
import { ModalProvider } from "./Contexts/ModalContext";

function App() {
  const [genreOptions, setGenreOptions] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=a5e87382f2c41fc47e2facb317187475`
    )
      .then((response) => response.json())
      .then((data) => setGenreOptions(data.genres));
  }, []);

  return (
    <>
      <ModalProvider>
        <div className="app">
          <Nav genreOptions={genreOptions} />
        </div>
      </ModalProvider>
    </>
  );
}

export default App;
