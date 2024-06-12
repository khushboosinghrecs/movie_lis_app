import React from "react";
import Button from "../Button/Button";

import styles from "./styles.module.scss";

const MovieDetail = (props) => {
  const { movieTitle } = props;
  return (
    <div className={styles.movieDetail}>
      <div className={styles.movieDetailWrapper}>
        <h3>Update Movie Title</h3>
        <p className={styles.movieTitle}>{movieTitle}</p>
        <Button>Update and Save</Button>
      </div>
    </div>
  );
};

export default MovieDetail;
