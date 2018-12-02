import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import privateConfig from './privateConfig';

const config = { ...privateConfig };
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
