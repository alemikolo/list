import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import privateConfig from './privateConfig';

const config = { ...privateConfig };
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
