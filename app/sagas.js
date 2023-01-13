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
import statisticsSagas from 'containers/Dashboards/saga';
import reportingSagas from 'containers/Reporting/saga';
import StateSaga from 'containers/statistiques/saga';
import pharmacieSaga from 'containers/Pharmacies/saga';
import providerSagas from 'containers/Providers/saga';
import laboratoireSaga from 'containers/laboratoires/saga';
import alertSaga from 'containers/Alerts/saga';
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
  statisticsSagas,
  reportingSagas,
  StateSaga,
  pharmacieSaga,
  providerSagas,
  laboratoireSaga,
  alertSaga,
];
