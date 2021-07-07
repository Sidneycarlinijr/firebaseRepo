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
const collection = "sidney";

//vvvvvvvvvvvv Reading all collection data vvvvvvvvvvvv
  database.collection("sidney").get() //this module(.get) is a promise, so:
            .then((snapshot)=>{

              snapshot.forEach((doc)=>{
              let aluno = doc.data();
              console.log(aluno);
              })
            })

//vvvvvvvvvvvv Reading just a selected document vvvvvvvvvvvv
  let docRef = database.collection("sidney").doc("91WoauDD2FjFxutaLlSI");

    docRef.get().then((doc)=>{
    console.log(doc.data());
  })

//vvvvvvvvvvvv NAME IS DIFFERENT THAN SIDNEY vvvvvvvvvvvv  
  database.collection("sidney").where("nome","<","Sidney").get()
            .then(snapshot =>{
              snapshot.forEach((doc) => {
                let aluno = doc.data();
                console.log("Different than Sidney: " + aluno.nome, aluno.notas);
              })
            })

  database.collection("sidney").where("nome",">","Sidney").get()
            .then(snapshot =>{
              snapshot.forEach((doc) => {
                let aluno = doc.data();
                console.log("Different than Sidney: " + aluno.nome, aluno.notas);
              })
            })
//^^^^^^^^^^^^ NAME IS DIFFERENT THAN SIDNEY ^^^^^^^^^^^^ 

//vvvvvvvvvvvv CREATING OR REPLACING WITH .SET MODULE vvvvvvvvvvvv  
database.collection(collection).add({
  nome: "Marcos",
  sobrenome: "Novas",
  notas: {nota1: 9.6, nota2: 7},
}).then((doc)=>{
  console.log("Documento inserido. ", doc);
}).catch(err=>{
  console.log(err);
})

database.collection(collection).doc("AlunoNovo").set(
  {
    nome: "Caio",
    sobrenome: "Marcelo",
    notas: {nota1: 15, nota2: 10},
  }
).then(()=>{
  console.log("Documento inserido. ");
}).catch(err=>{
  console.log(err);
});


//vvvvvvvvvvvv MERGING CONTENT vvvvvvvvvvvv 
database.collection(collection).doc("AlunoNovo").set(
  {
    nome: "Caio",
    sobrenome: "Marcelo",
    notas: {nota1: 15, nota2: 10},
  }, {merge: true}                 // <---------------
).then(()=>{
  console.log("Documento inserido. ");
}).catch(err=>{
  console.log(err);
});

//vv CREATING OR REPLACING WITH .UPDATE METHOD DONT NEED THE MERGE THING vv  
database.collection(collection).doc("AlunoNovo").update(
  {
    sobrenome: "Novo",
    notas: {nota1: 10, nota2: 5},
  },
).then(()=>{
  console.log("Documento inserido. ");
}).catch(err=>{
  console.log(err);
});



//vvvvvvvvvvvv USING A LISTENER (onSnapshot) vvvvvvvvvvvv
database.collection("sidney").onSnapshot((snapshot) => {

  snapshot.forEach((doc) =>{
    let aluno = doc.data();
    console.log(aluno);
  })

})


//vvvvvvvvvvvv DELETING INFO vvvvvvvvvvvv
database.collection(collection).doc("AlunoNovo").update({

  notas: firebase.firestore.FieldValue.delete()

})
.then(()=>{
  console.log("Info deletada")
}).catch((err)=>{
  console.log(err);
})

//           DELETING ALL DOCUMENT DATA
database.collection(collection).doc("AlunoNovo").delete().then(() =>{
  console.log("Conteúdo deletado");
})
.catch((err) =>{
  console.log(err);
})



// ********************************************************************
//                           USER MANAGEMENT
// ********************************************************************

let auth = firebase.auth()

function createUser(){
let newUserEmail = "novoteste123@teste.com";
let newUserPassword = "123abc";

  auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword)
    .then(user => {
      console.log(user);
    })
    .catch(err => {
      console.log(err);
    })
}

function login(){
  let userEmail = "novoteste123@teste.com";
  let userPassword = "123abc";

                                          // LOCAL, SESSION or NONE
  auth.setPersistence(firebase.auth.Auth.Persistence.NONE).then(()=>{
    auth.signInWithEmailAndPassword(userEmail, userPassword)
      .then(loggedUser=>{
        console.log(auth.currentUser)
      }).catch(err =>{
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  }
// login();

//              THAT ONE IS A LISTENER METHOD (StateChanged)
  auth.onAuthStateChanged(user=>{
    if(user){
      console.log(user);
    }else{
      console.log("Ninguém logado.")}
  })

  function logout(){
    auth.signOut().then(()=> {
      console.log("Deslogado com sucesso")
    }).catch(err => {
      console.log(err);
    })
  }

  // setTimeout(login, 2000);