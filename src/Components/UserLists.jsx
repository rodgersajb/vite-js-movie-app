import { useState, useEffect } from "react";

import { db } from "./Firebase";
import { ref, onValue, push, set, update, remove } from "firebase/database";
import UserChoices from "./UserChoices";

const UserLists = (props) => {
  const { lists, genreOptions } = props;
  console.log(lists, "lists");
  const handleRemove = (listId) => {
    console.log(listId);
    const listRef = ref(db, `lists/${listId}`);
    remove(listRef);
  };

  return (
    <>
      
      {lists && lists.length > 0 && (
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
        // userInput={userInput}
      />
    </>
  );
};

export default UserLists;
