import { useState, useEffect } from "react";
import "../styles/sass/style.scss";
import UserLists from "./Components/UserLists";
import UserChoices from "./Components/UserChoices";

function App() {
  
  const [genreOptions, setGenreOptions] = useState([])

    useEffect(() => {
      
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=a5e87382f2c41fc47e2facb317187475`
      )
        .then((response) => response.json())
        .then((data) => setGenreOptions(data.genres));
    }, []);
  

  return (
    <>
      <div className="App">
        <h1>HEYYYYYYYYYYYYY</h1>
        <UserLists genreOptions={genreOptions}/>
        
        
      </div>
    </>
  );
}

export default App;
