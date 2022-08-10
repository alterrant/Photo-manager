import { all } from 'redux-saga/effects';
import { authSaga } from './auth/saga';
import { registration } from './registration/saga';
import { photoStorageSaga } from './photo-storage/saga';

export function* rootSaga(): Generator {
    yield all([authSaga(), registration(), photoStorageSaga()]);
}
