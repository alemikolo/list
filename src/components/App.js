import React, { Component } from 'react';
import firebase from 'firebase/app';
import db from '../config/firebaseConfig';
import Toolbar from './Toolbar/Toolbar';
import ShoppingLists from './ShoppingLists/ShoppingLists';
import classes from './App.module.scss';

class ShoppingList extends Component {
  state = {
    shoppingLists: [
      {
        name: 'codzienne',
        bought: 5,
        total: 13,
        type: 'complex',
        shared: false,
      },
      {
        name: 'warzywa',
        color: 'Blue',
        bought: 2,
        total: 14,
        type: 'simple',
        shared: false,
      },
      {
        name: 'chemia',
        color: 'Green',
        bought: 7,
        total: 8,
        type: 'simple',
        shared: false,
      },
      {
        name: 'prezenty',
        color: 'Orange',
        bought: 1,
        total: 4,
        type: 'simple',
        shared: true,
      },
      {
        name: 'agd',
        color: 'Pink',
        bought: 3,
        total: 6,
        type: 'simple',
        shared: true,
      },
      {
        name: 'rtv',
        color: 'Red',
        bought: 1,
        total: 4,
        type: 'simple',
        shared: true,
      },
      {
        name: 'ksiazki',
        color: 'Purple',
        bought: 3,
        total: 4,
        type: 'simple',
        shared: true,
      },
      {
        name: 'muza',
        color: 'Lime',
        bought: 7,
        total: 7,
        type: 'simple',
        shared: true,
      },
    ],
  };

  componentDidMount() {
    // const listA = [];
    // db.collection('simpleLists')
    //   .where('creator', '==', '1111111111').get()
    //   .then((snapshot) => {
    //     const list = [];
    //     snapshot.forEach((doc) => {
    //       list.push({
    //         ...doc.data(),
    //         listId: doc.id,
    //       });
    //     });
    //     console.log(list);
    //   });
    // db.collection('complexLists')
    //   .where('creator', '==', '1111111111').get()
    //   .then((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       listA.push(doc.data());
    //     });
    //     listA[0].lists[0].get()
    //       .then((snaps) => {
    //         console.log({
    //           ...snaps.data(),
    //           listId: snaps.id,
    //         });
    //       });
    //   });
    // const userRef = db
    //   .collection('simpleLists')
    //   .doc('FTGskMPOxNREtEsjYSEu');
    // console.log('dddddddddddddddddddddd', userRef);

    // db.doc('simpleLists/MEsEc2znaCZPBAYgAP4U').get()
    //   .then((snapshot) => {
    //     console.log({
    //       ...snapshot.data(),
    //       listId: snapshot.id,
    //     });
    //   });

    // const refff = db
    //   .collection('complexLists')
    //   .doc('C49zx8Kgvobx8OHLwSMr');
    // console.log(refff);
    // console.log(db);
    // refff.update({ lists: firebase.firestore.FieldValue.arrayUnion(userRef) });
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <div className={classes.AppContainer}>
          <ShoppingLists
            shoppingLists={this.state.shoppingLists}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ShoppingList;
