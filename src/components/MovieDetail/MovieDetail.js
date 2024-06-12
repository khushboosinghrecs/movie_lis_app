import React, { useState } from "react";
import Button from "../Button/Button";

import styles from "./styles.module.scss";

const MovieDetail = (props) => {
  const { movieTitle, closeModal, updateMovieTitle } = props;
  const [newTitle, setNewTitle] = useState(movieTitle);

  const handleInputChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSave = () => {
    updateMovieTitle(newTitle);
    closeModal();
  };

  return (
    <div className={styles.movieDetail}>
      <div className={styles.movieDetailWrapper}>
        <h3 className={styles.searchHeading}>Update Movie Title</h3>
        <input
          className={styles.movieTitle}
          value={newTitle}
          onChange={handleInputChange}
        />
        <Button className={styles.save} onClick={handleSave}>
          Update and Save
        </Button>
      </div>
    </div>
  );
};

export default MovieDetail;
