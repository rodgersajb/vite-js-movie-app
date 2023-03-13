import { useState, useEffect } from "react";

import { db } from "./Firebase";
import { ref, onValue, push, set, update, remove } from "firebase/database";
import UserChoices from "./UserChoices";

const UserLists = (props) => {
  const { genreOptions } = props;

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

  const handleRemove = (listId) => {
    console.log(listId);
    const listRef = ref(db, `lists/${listId}`);
    remove(listRef);
  };

  return (
    <>
      <form className="user-list-form" action="" onSubmit={handleFormSubmit}>
        
        <label htmlFor="new-list">
          <input
            type="text"
            id="new-list"
            onChange={handleInputChange}
            value={userInput}
          />
          <button onClick={handleSubmit}></button>
        </label>
      </form>

      {lists.length > 0 && (
        <ul className="user-lists">
          {lists.map((list, index) => {
            return (
              <>
                <div key={index} className="list-container">
                  <h3>{list.id}</h3>
                  <button onClick={() => handleRemove(list.id)}>Remove</button>
                </div>
                <li className="" key={list.id}>
                  {list.movies &&
                    Object.entries(list.movies).map((movie, index) => {
                      return (
                        <>
                          <div key={index} className="flex-container">
                            {/* <p key={index}>{movie[1].title}</p> */}
                            <img
                              src={`https://image.tmdb.org/t/p/w200/${movie[1].poster_path}`}
                              alt=""
                            />
                          </div>
                        </>
                      );
                    })}
                </li>
              </>
            );
          })}
        </ul>
      )}

      <UserChoices
        genreOptions={genreOptions}
        lists={lists}
        userInput={userInput}
      />
    </>
  );
};

export default UserLists;
