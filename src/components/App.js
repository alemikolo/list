import React, { Component } from 'react';
import classes from './App.module.scss';
import firebase from '../config/firebaseConfig';

class ShoppingList extends Component {
  componentDidMount() {
    const listA = [];
    firebase.collection('shoppingLists')
      .where('userId', '==', '1111111111').get()
      .then((snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ ...doc.data(), listId: doc.id });
        });
        console.log(list);
      });
    firebase.collection('complexLists')
      .where('userId', '==', '1111111111').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          listA.push(doc.data());
        });
        // console.log(listA[0].lists[0].id);
        // firebase.collection('complexLists').doc(listA[0].lists[0].id).get()
        //   .then((snap) => {
        //     console.log(snap);
        //     const refDocs = [];
        //     // snap.forEach((doc) => {
        //     //   refDocs.push(doc.data());
        //     // });
        //     console.log(refDocs);
        //   });
      });
    firebase.doc('shoppingLists/MEsEc2znaCZPBAYgAP4U').get()
      .then((snapshot) => {
        console.log(snapshot.data());
      });
  }

  render() {
    return (
      <div className={classes.ShoppingList}>Hello World!</div>
    );
  }
}

export default ShoppingList;
