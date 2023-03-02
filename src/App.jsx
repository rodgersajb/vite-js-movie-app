import { useState, useEffect } from "react";
import "../styles/sass/style.scss";
import { db } from "./Components/Firebase";
import { ref, onValue, push, set, update } from "firebase/database";

function App() {
  // lists, setLists in useState as an empty array
  // userInput, setUserInput in useState as quotations
  const [lists, setLists] = useState([]);
  const [userInput, setUserInput] = useState("");

  // UseEffect to create a snapshot of firebase
  // Convert Object into an array, mapping through the data received from the snapshot
  // return and id of key and a copy of data with and index of key

  useEffect(() => {
    const listsRef = ref(db, "lists");
    onValue(
      listsRef,
      (snapshot) => {
        const data = snapshot.val();

        const list = data
          ? Object.keys(data).map((key) => {
              return { id: key, ...data[key] };
            })
          : [];
        setLists(list);
      },
      []
    );
  }, []);

  // handleInputChange method to keep track or user input
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };
  // handleFormSubmit to prevent page reloading on submit

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  // handleSubmit method to submit user information

  const handleSubmit = (event) => {
    event.preventDefault();
    const listsRef = ref(db, `lists/${userInput}`);
    push(listsRef, userInput);
    setUserInput("");
  };

  return (
    <>
      <div className="App">
        <h1>HEYYYYYYYYYYYYY</h1>
        <form action="" onSubmit={handleFormSubmit}>
          <label htmlFor="new-list">
            <input
              type="text"
              id="new-list"
              onChange={handleInputChange}
              value={userInput}
            />
          </label>
          <button onClick={handleSubmit}>SUBMIT</button>
        </form>

        <ul>
          {lists.map((list) => {
            console.log(list);
            return (
              <li key={list.id}>
                <p>{list.id}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
