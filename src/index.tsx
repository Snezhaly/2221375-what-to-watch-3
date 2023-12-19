import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { CardsFilm } from './mocks/films';
import { SelectedFilmItem } from './const';
import { videoSrc } from './mocks/video';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/errorMessage/errorMessage';
import { checkAuthAction, fetchFilmsAction } from './store/apiActions';

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App CardsFilm={CardsFilm} SelectedFilmItem={SelectedFilmItem} video={videoSrc} />
    </Provider>

  </React.StrictMode>
);
