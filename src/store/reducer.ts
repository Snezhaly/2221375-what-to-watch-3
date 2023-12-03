import { CardsFilm } from '../mocks/films';
import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getFilms, loadAuthorPreview, loadFilms, requireAuthorization, setError, setFilmsDataLoadingStatus } from './action';
import { FilmCardType } from '../types/mainType';
import { AuthorizationStatus, Genres } from '../const';


type InitialState = {
  genre: string;
  films: FilmCardType[];
  AuthorizationStatus: AuthorizationStatus;
  isFilmsDataLoading: boolean;
  error: string | null;
  authorPreview: string | null;
}

const initialState: InitialState = {
  genre: Genres.All,
  films: [],
  AuthorizationStatus: AuthorizationStatus.Unknown,
  isFilmsDataLoading: false,
  error: null,
  authorPreview: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilms, (state) => {
      state.films = CardsFilm;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.AuthorizationStatus = action.payload;
    })
    .addCase(loadAuthorPreview, (state, action) => {
      state.authorPreview = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
