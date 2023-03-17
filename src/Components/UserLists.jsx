import { useState, useEffect } from "react";

import { db } from "./Firebase";
import { ref, onValue, push, set, update, remove } from "firebase/database";
import UserChoices from "./UserChoices";
import MovieListCard from "./MovieListCard";

const UserLists = (props) => {
  const { lists, genreOptions, userInput } = props;

  const handleRemove = (listId) => {
    console.log(listId);
    const listRef = ref(db, `lists/${listId}`);
    remove(listRef);
  };

  return (
    <>
      {lists.length < 1 ? (
        <div className="no-lists">
          <p>

          You have no lists currently, create lists in the bar above to get
          started!
          </p>
        </div>
      ) : (
        lists &&
        lists.length > 0 && (
          <ul className="user-lists">
            {lists.map((list, index) => {
              return (
                <>
                  <div key={index} className="list-container">
                    <h3>{list.id}</h3>
                    <button onClick={() => handleRemove(list.id)}>
                      Remove
                    </button>
                  </div>
                  <li className="" key={list.id}>
                    {list.movies &&
                      Object.entries(list.movies).map((movie, index) => {
                        console.log(movie, "MOVIE FROM USERLIST");
                        return (
                          <>
                            <MovieListCard
                              movie={movie[1]}
                              listId={list.id}
                              movieKey={movie[0]}
                            />
                          </>
                        );
                      })}
                  </li>
                </>
              );
            })}
          </ul>
        )
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
