import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import Button from "../../components/Button/Button";

import { API_KEY, API_URL } from "../../url";

import Modal from "../../components/Modal";
import MovieDetail from "../../components/MovieDetail/MovieDetail";

import Eye from "../../assets/svg/eye.svg";
import styles from "./styles.module.scss";

const columns = [
  { header: "S.No", accessor: "sno" },
  { header: "Movie Title", accessor: "title" },
  { header: "Movie Poster", accessor: "moviePoster", isImage: true },
  { header: "Action", accessor: "action" },
  { header: "", accessor: "view" },
];

const Movie = () => {
  const [searchValue, setSearchValue] = useState("movie");
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => setSearchValue(e.target.value);

  const handleView = (ele) => () => {
    setMovieTitle(ele.Title);
    openModal();
  };

  const handleDelete = (id) => () => {
    setMovies(movies.filter((movie) => movie.imdbID !== id));
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSort = (accessor) => {
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

  useEffect(() => {
    getMovies();
  }, []);

  const data2 = movies.map((ele, rowIndex) => ({
    sno: rowIndex + 1,
    title: ele?.Title,
    moviePoster: <img src={ele?.Poster} alt="image poster" />,
    action: <Button onClick={handleDelete(ele?.imdbID)}>Delete</Button>,
    view: (
      <div onClick={handleView(ele)}>
        <img src={Eye} alt="view" />
      </div>
    ),
  }));

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
          <Button onClick={() => handleSort("Title")}>Sort</Button>
        </div>
        {movies && movies.length > 0 ? (
          <Table columns={columns} data={data2} />
        ) : (
          <p>No data</p>
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
        <MovieDetail movieTitle={movieTitle} />
      </Modal>
    </>
  );
};

export default Movie;
