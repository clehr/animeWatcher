import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDzA6Udo_gD7joeNLweS5sqQewaZZrZz1Y",
    authDomain: "animewatcher-7af10.firebaseapp.com",
    databaseURL: "https://animewatcher-7af10.firebaseio.com",
    projectId: "animewatcher-7af10",
    storageBucket: "animewatcher-7af10.appspot.com",
    messagingSenderId: "892643941504",
    appId: "1:892643941504:web:26df1f87d21db1aace5a65",
    measurementId: "G-VKRL1ST3XJ"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;

