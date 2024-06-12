import { useEffect, useState, useCallback } from "react";

import { Table } from "../../components/Table";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal";
import MovieDetail from "../../components/MovieDetail/MovieDetail";

import { API_KEY, API_URL } from "../../url";
import { columns } from "../../utills/constant";

import Eye from "../../assets/svg/eye.svg";
import styles from "./styles.module.scss";

const Movie = () => {
  const [searchValue, setSearchValue] = useState("movie");
  const [movies, setMovies] = useState(data);
  const [movieTitle, setMovieTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => setSearchValue(e.target.value);

  const handleView = (index) => () => {
    setCurrentMovieIndex(index);
    setMovieTitle(movies[index].Title);
    openModal();
  };

  const handleDelete = (id) => () => {
    setMovies(movies.filter((movie) => movie.imdbID !== id));
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSort = (accessor) => () => {
    const sortedMovies = [...movies].sort((a, b) => {
      const valueA =
        typeof a[accessor] === "string"
          ? a[accessor].toLowerCase()
          : a[accessor];
      const valueB =
        typeof b[accessor] === "string"
          ? b[accessor].toLowerCase()
          : b[accessor];

      if (valueA < valueB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setMovies(sortedMovies);
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const getMovies = async () => {
    const url = `${API_URL}${API_KEY}&s=${searchValue}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  const updateMovieTitle = useCallback(
    (newTitle) => {
      setMovies((prevMovies) => {
        const updatedMovies = [...prevMovies];
        if (currentMovieIndex !== null) {
          updatedMovies[currentMovieIndex].Title = newTitle;
        }
        return updatedMovies;
      });
    },
    [currentMovieIndex]
  );

  const data2 = movies.map((ele, rowIndex) => ({
    sno: rowIndex + 1,
    title: ele?.Title,
    moviePoster: (
      <div className={styles.posterImage}>
        <img src={ele?.Poster} alt="image poster" />
      </div>
    ),
    action: <Button onClick={handleDelete(ele?.imdbID)}>Delete</Button>,
    view: (
      <div className={styles.eyeIcon} onClick={handleView(rowIndex)}>
        <img src={Eye} alt="view" />
      </div>
    ),
  }));

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className={styles.movieContainer}>
        <p>Filter List of the Movie Title</p>

        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <input value={searchValue} onChange={handleInputChange} />
            <Button onClick={getMovies}>Search</Button>
            <Button onClick={handleClear}>Clear</Button>
          </div>
          <div className={styles.sortButton}>
            <Button onClick={handleSort("Title")}>Sort</Button>
          </div>
        </div>

        {movies && movies?.length > 0 ? (
          <Table columns={columns} data={data2} />
        ) : (
          <p>loading.....</p>
        )}
      </div>

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        setIsModalOpen={setIsModalOpen}
        shouldHandleOutsideClick
        darkBackground
        isCentered
        className={styles.requestModal}
      >
        <MovieDetail
          closeModal={closeModal}
          movieTitle={movieTitle}
          updateMovieTitle={updateMovieTitle}
        />
      </Modal>
    </>
  );
};

export default Movie;
