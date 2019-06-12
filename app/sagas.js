import appSagas from 'containers/App/sagas';
import loginSagas from 'containers/Login/saga';
import usersSaga from 'containers/Users/saga';
import articlesSaga from 'containers/Articles/saga';
import offresSaga from 'containers/Offres/saga';
import pharmaciesSaga from 'containers/Pharmacie/saga';
import laboratoiresSaga from 'containers/laboratoire/saga';

export default [
  loginSagas,
  appSagas,
  usersSaga,
  articlesSaga,
  offresSaga,
  pharmaciesSaga,
  laboratoiresSaga,
];
