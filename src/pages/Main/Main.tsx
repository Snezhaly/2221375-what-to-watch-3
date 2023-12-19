import { SelectedFilmType } from '../../types/mainType';
import FilmList from '../../components/filmList/filmList';
import SelectedFilm from '../../components/selectedFilm/selectedFilm';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Genres, GenresValues } from '../../const';
import { changeGenre } from '../../store/action';
import { useState } from 'react';
import Spinner from '../../components/spinner/spinner';
import Header from '../../components/header/header';

type MainProps = {
  SelectedFilmItem: SelectedFilmType;
}

const lengthSection = 8;

function Main({ SelectedFilmItem }: MainProps): JSX.Element {

  const selectedGenre = useAppSelector((state) => state.genre);
  const filmsList = useAppSelector((state) => state.films);
  const isFilmsLoading = useAppSelector((state) => state.isFilmsDataLoading);
  const authorizationStatus = useAppSelector((state) => state.AuthorizationStatus);
  const authorAvatar = useAppSelector((state) => state.authorPreview);
  const filteredFilms = filmsList.filter((moviePreview) =>
    selectedGenre === Genres.All
      ? moviePreview
      : moviePreview.genre === selectedGenre);
  const [filmsSection, setFilmsSection] = useState(lengthSection);
  const dispatch = useAppDispatch();

  const genres = [...new Set(filmsList.map((film) => film.genre))].sort();
  genres.unshift(Genres.All);

  return (
    <main>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={SelectedFilmItem.backgroundImage} alt={SelectedFilmItem.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        {authorizationStatus && <Header authorizationStatus={authorizationStatus} authorAvatar={authorAvatar} />}
        {<SelectedFilm name={SelectedFilmItem.name} genre={SelectedFilmItem.genre} posterImage={SelectedFilmItem.posterImage} dateFilm={SelectedFilmItem.released} />}
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            {genres.map((genre) => (
              <li
                key={genre}
                onClick={() => {
                  dispatch(changeGenre(genre as GenresValues));
                }}
                style={{ cursor: 'pointer' }}
                className={`catalog__genres-item ${selectedGenre === genre ? 'catalog__genres-item--active' : ''}`}
              >
                <a className="catalog__genres-link">{genre}</a>
              </li>))}
          </ul>

          {isFilmsLoading ? <FilmList filmsSection={filmsSection} filmsList={filteredFilms} /> : <Spinner />}

          {filmsSection < filteredFilms.length &&
            <div className="catalog__more">
              <button onClick={() => {
                setFilmsSection(lengthSection + filmsSection);
              }} className="catalog__button" type="button"
              >Show more
              </button>
            </div>}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default Main;
