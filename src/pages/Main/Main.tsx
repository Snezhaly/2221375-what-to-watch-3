import { SelectedFilmType } from '../../type/mainType';
import FilmList from '../../components/film-list/film-list';
import SelectedFilm from '../../components/selectedFilm/selectedFilm';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Genres, GenresValues } from '../../const';
import { changeGenre } from '../../store/action';

type MainProps = {
  SelectedFilmItem: SelectedFilmType;
}

function Main({ SelectedFilmItem }: MainProps): JSX.Element {

  const selectedGenre = useAppSelector((state) => state.genre);
  const filmsList = useAppSelector((state) => state.films);
  const filteredFilms = filmsList.filter((moviePreview) =>
    selectedGenre === Genres.All
      ? moviePreview
      : moviePreview.genre === selectedGenre);
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

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>
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

          <FilmList filmsList={filteredFilms} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
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
