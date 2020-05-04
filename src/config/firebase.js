import * as firebase from "firebase"

//insert config from firebase
var firebaseConfig = {
      apiKey: "AIzaSyC1jBFCTrS32IQ_eNUWrWTJA7gTULV5PJ4",
      authDomain: "finalprojectcoe.firebaseapp.com",
      databaseURL: "https://finalprojectcoe.firebaseio.com",
      projectId: "finalprojectcoe",
      storageBucket: "",
      messagingSenderId: "391266250743",
      appId: "1:391266250743:web:5489f5003fc583546988f2",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
