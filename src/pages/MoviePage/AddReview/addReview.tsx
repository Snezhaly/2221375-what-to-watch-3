import AddReviewForm from '../../../components/addReviewForm/addReviewForm';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { redirectToRoute } from '../../../store/action';
import Header from '../../../components/header/header';
import Spinner from '../../../components/spinner/spinner';
import { useParams } from 'react-router-dom';
import { getAuthorAvatar, getAuthorizationStatus } from '../../../store/userProcess/selectors';
import { getFilmInfo, getFilmInfoLoadStatus } from '../../../store/filmProcess/selectors';

export default function AddReview(): JSX.Element {
  const authorUrl = useAppSelector(getAuthorAvatar);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFilmLoading = useAppSelector(getFilmInfoLoadStatus);
  const film = useAppSelector(getFilmInfo);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
  });

  return (
    <div>
      {!isFilmLoading && film ?
        <section className="film-card film-card--full">
          <div className="film-card__header">
            <div className="film-card__bg">
              <img src={film.backgroundImage} alt={film.name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header authorizationStatus={authorizationStatus} authorAvatar={authorUrl} />

            <div className="film-card__poster film-card__poster--small">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
            </div>
          </div>
          {id && <AddReviewForm id={id} />}
        </section>
        :
        <Spinner />}
    </div>
  );
}

