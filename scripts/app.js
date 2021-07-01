// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyABWcDIsjVH5YpD3DEXaNAkCrZIFnzeiAQ",
  authDomain: "teste-a27d1.firebaseapp.com",
  projectId: "teste-a27d1",
  storageBucket: "teste-a27d1.appspot.com",
  messagingSenderId: "840211485742",
  appId: "1:840211485742:web:af35a10ac3efdbd8c6bbbf",
  measurementId: "G-HESN4X1ZBQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let database = firebase.firestore();

//vvvvvvvvvvvv Reading all collection data vvvvvvvvvvvv
// database.collection("sidney").get() //this module(.get) is a promise, so:
//           .then((snapshot)=>{

//             snapshot.forEach((doc)=>{
//             console.log(doc.data());
//             })
//           })

//vvvvvvvvvvvv Reading just a selected document vvvvvvvvvvvv
// let docRef = database.collection("sidney").doc("91WoauDD2FjFxutaLlSI");

//   docRef.get().then((doc)=>{
//   console.log(doc.data());
// })

//vvvvvvvvvvvv NAME IS DIFFERENT THAN SIDNEY vvvvvvvvvvvv  
database.collection("sidney").where("nome","<","Sidney").get()
          .then(snapshot =>{
            snapshot.forEach((doc) => {
              let aluno = doc.data();
              console.log(aluno.nome, aluno.notas);
            })
          })

database.collection("sidney").where("nome",">","Sidney").get()
          .then(snapshot =>{
            snapshot.forEach((doc) => {
              let aluno = doc.data();
              console.log(aluno.nome, aluno.notas);
            })
          })
//^^^^^^^^^^^^ NAME IS DIFFERENT THAN SIDNEY ^^^^^^^^^^^^ 