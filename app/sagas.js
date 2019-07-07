import appSagas from 'containers/App/sagas';
import loginSagas from 'containers/Login/saga';
import usersSaga from 'containers/Users/saga';
import articlesSaga from 'containers/Articles/saga';
import offresSaga from 'containers/Offres/saga';
import pharmaciesSaga from 'containers/Pharmacie/saga';
import laboratoiresSaga from 'containers/laboratoire/saga';
import registrationSaga from 'containers/RegisterPage/saga';
import commandSagas from 'containers/Command/store/saga';
import groupingSagas from 'containers/Grouping/store/saga';

export default [
  loginSagas,
  appSagas,
  usersSaga,
  articlesSaga,
  offresSaga,
  pharmaciesSaga,
  laboratoiresSaga,
  registrationSaga,
  commandSagas,
  groupingSagas,
];
