import { useState, useEffect } from "react";

import { db } from "./Firebase";
import { ref, onValue, push, set } from "firebase/database";
import UserLists from "./UserLists";

import popcorn from "../assets/popcorn.png"

const Nav = (props) => {
  const { genreOptions } = props;

  // lists, setLists in useState as an empty array
  // userInput, setUserInput in useState as quotations
  const [lists, setLists] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isValidInput, setIsValidInput] = useState(true);
  const [message, setMessage] = useState(false);

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

    if (userInput.length < 3) {
      setIsValidInput(false);
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 4000);
    } else {
      setMessage(false);
      setIsValidInput(true);
      const listsRef = ref(db, `lists/${userInput}`);
      push(listsRef, userInput);
      setUserInput("");
    }
  };

  return (
    <>
      <nav>
        <div>
          <p>AR</p>
        </div>
        <img src={popcorn} alt="a bag of popcorn logo" />
        <h1>The Moviebase</h1>
        <form className="form-submit" onSubmit={handleFormSubmit}>
          <label htmlFor="new-list">
            <input
              type="text"
              id="new-list"
              onChange={handleInputChange}
              value={userInput}
              placeholder="create a list"
            />
            <button className="nav-button" onClick={handleSubmit}>
              🍿
            </button>
            {!isValidInput && message && (
              <div>Please enter at least three characters</div>
            )}
          </label>
        </form>
      </nav>

      <div className="wrapper">
        <h2 className="list-header">Your Lists</h2>
        <UserLists
          lists={lists}
          genreOptions={genreOptions}
          userInput={userInput}
        />
      </div>
    </>
  );
};

export default Nav;
