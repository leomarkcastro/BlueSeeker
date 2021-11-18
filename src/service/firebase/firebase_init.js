// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  collection,
  orderBy,
  addDoc,
  getDocs,
  onSnapshot,
  limitToLast,
  where,
  arrayUnion, 
  doc, 
  getDoc, 
  getFirestore, 
  setDoc, 
  updateDoc,
  query
} from "firebase/firestore"; 

let firebaseConfig = {
  apiKey: "AIzaSyAzvK4SWRAKw4YovLv_lOf6GaVm7YZWvLg",
  authDomain: "blueseeker-3df39.firebaseapp.com",
  projectId: "blueseeker-3df39",
  storageBucket: "blueseeker-3df39.appspot.com",
  messagingSenderId: "390072071084",
  appId: "1:390072071084:web:963805cbac196b3fcdc009"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { auth }

export async function loginUser(email, password, resultCB=(e)=>console.log(e)){

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
        resultCB(userCredential)
      // ...
    })
    .catch((error) => {
      resultCB(false)
    });
}

export async function registerUser(email, password, resultCB=(e)=>console.log(e)){
    
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      createAccountInfo(userCredential.user.uid)
      resultCB(userCredential)

    })
    .catch((error) => {
      resultCB(false)
      // ..
    });
  
}

export function logoutUser(){
  signOut(auth)
}

export function hookAccount(callback){

  onAuthStateChanged(auth, callback)

}

export async function createAccountInfo(id){
    try {
        await setDoc(doc(db, "accounts", id), {
          first_run: true, //
          date_created: Date.now(), //
          date_active: Date.now(), //
          givenname: "Blue Worker", //
          fullname: "Blue Worker", //
          address_line: "", //
          city: "", //
          province: "", //
          zip: "", //
          country: "", //
          work_profile: [], 
          portfolio: [], // ignore
          skills: "", // 
          work_time: "8",
          language: "", //
          education: [], // ignore
          projects: [], //
        });
        //console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export async function updateAccountInfo(id, data){
  try {
    await updateDoc(doc(db, "accounts", id), data);
    //console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export async function getAccountInfo(id){
    const docRef = doc(db, "accounts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      return false;
    }
}

export async function applyJobListing(userId, jobData){
  try {
    await updateDoc(doc(db, "accounts", userId), {
      projects: arrayUnion({...jobData, status:"Proposals"})
    });
    //console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export async function getJobListings(qe){
  let querySnapshot
  if(query){
    const q = query(collection(db, "jobs"), where("type", "==", qe));
    querySnapshot = await getDocs(q);
  }
  else{
    querySnapshot = await getDocs(collection(db, "jobs"));
  }
  
  return querySnapshot
}

export async function getJobTypes(){
    const querySnapshot = await getDocs(collection(db, "job_type"));
    return querySnapshot
}

export async function listenPrivMessageData(id, callback){
    const q = query(collection(db, "priv", id, "message"), orderBy("date"), limitToLast(75));
    const unsub = onSnapshot(q, 
        callback
        //(querySnapshot) => {
        //    const cities = [];
        //    querySnapshot.forEach((doc) => {
        //        cities.push(doc.data().message);
        //    });
        //    console.log("Current cities in CA: ", cities.join(", "));
        //}
    );

    return unsub
}