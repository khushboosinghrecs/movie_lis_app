import React from "react";
import Button from "../Button/Button";

import styles from "./styles.module.scss";

const MovieDetail = (props) => {
  const { movieTitle, closeModal } = props;
  return (
    <div className={styles.movieDetail}>
      <div className={styles.movieDetailWrapper}>
        <h3 className={styles.searchHeading}>Update Movie Title</h3>
        <input className={styles.movieTitle} value={movieTitle} />
        <Button className={styles.save} onClick={closeModal}>
          Update and Save
        </Button>
      </div>
    </div>
  );
};

export default MovieDetail;
