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

const data = [
  {
    Title: "The Lego Movie",
    Year: "2014",
    imdbID: "tt1490017",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_SX300.jpg",
  },
  {
    Title: "The Simpsons Movie",
    Year: "2007",
    imdbID: "tt0462538",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNjc4NmQyNGUtMDg4NS00ZTZkLWI3ODQtMGJmYThiYjQxNGRiXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg",
  },
  {
    Title: "El Camino: A Breaking Bad Movie",
    Year: "2019",
    imdbID: "tt9243946",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNjk4MzVlM2UtZGM0ZC00M2M1LThkMWEtZjUyN2U2ZTc0NmM5XkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_SX300.jpg",
  },
  {
    Title: "Scary Movie",
    Year: "2000",
    imdbID: "tt0175142",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
  {
    Title: "The Super Mario Bros. Movie",
    Year: "2023",
    imdbID: "tt6718170",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_SX300.jpg",
  },
  {
    Title: "Bee Movie",
    Year: "2007",
    imdbID: "tt0389790",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjE1MDYxOTA4MF5BMl5BanBnXkFtZTcwMDE0MDUzMw@@._V1_SX300.jpg",
  },
  {
    Title: "Scary Movie 2",
    Year: "2001",
    imdbID: "tt0257106",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMzQxYjU1OTUtYjRiOC00NDg2LWI4MWUtZGU5YzdkYTcwNTBlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
  {
    Title: "The Lego Batman Movie",
    Year: "2017",
    imdbID: "tt4116284",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg",
  },
  {
    Title: "Scary Movie 3",
    Year: "2003",
    imdbID: "tt0306047",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDE2NTIyMjg2OF5BMl5BanBnXkFtZTYwNDEyMTg3._V1_SX300.jpg",
  },
  {
    Title: "Scary Movie 4",
    Year: "2006",
    imdbID: "tt0362120",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmFkMzc2NTctN2U1Ni00MzE5LWJmMzMtYWQ4NjQyY2MzYmM1XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  },
];

const Movie = () => {
  const [searchValue, setSearchValue] = useState("movie");
  const [movies, setMovies] = useState(data);
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

  const data2 = movies.map((ele, rowIndex) => ({
    sno: rowIndex + 1,
    title: ele?.Title,
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    moviePoster: (
      <div className={styles.posterImage}>
        <img src={ele?.Poster} alt="image poster" />
      </div>
    ),
    action: <Button onClick={handleDelete(ele?.imdbID)}>Delete</Button>,
    view: (
      <div onClick={handleView(ele)}>
        <img src={Eye} alt="view" />
      </div>
    ),
  }));

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <MovieDetail closeModal={closeModal} movieTitle={movieTitle} />
      </Modal>
    </>
  );
};

export default Movie;
