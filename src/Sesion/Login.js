import { onNavigate } from '../main.js';
//import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getFirestore  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
//import { getAuth,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getAuth ,signInWithEmailAndPassword ,GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { app } from '../firebase/conectorFB.js';

export const Login = (rootElement) => {
  const button = `
      <section class="HomeView">

        <section class="logoWelcome">
          <img src="./image/Logo.png" class="AppLogo"/>
          <h2>1, 2, 3, Hello! Bienvenidx!</h2>
        </section>
        <section class="containerLogin">
          <form class="login">
            <label class="form-login">Correo Electronico :</label><br>
            <input class="inputForm" id="inputEmail"/><br>

            <label class="form-login">Contraseña :</label><br> <span class="icon-eyeL">
            <i class="fa-solid fa-eye-slash"></i></span>
            <input type="password" class="inputForm" id="inputPassword"/><br>
          </form>

          <section class="loginButtons">
            <button class="logo" id="LoginButton">INICIAR SESIÓN</button><br><br>

            <button class="LoginGmail" id="loginGoogle" type="image"> <img src="./image/LogoGmail.jpg" height ="21"/>  INICIAR SESIÓN CON GOOGLE</button><br><br>
            <h1>¿No tienes una cuenta?</h1>

            <a href="/NewUser" class="crear">Registrate</a><br>
            </section>
        </section>
      </section>`;
      
rootElement.innerHTML = button;

//Ocultar contraseña
const iconEyeLogin= document.querySelector(".icon-eyeL");
iconEyeLogin.addEventListener("click", function () {
  const iconeye = this.querySelector("i");

 if(this.nextElementSibling.type === "password"){
   this.nextElementSibling.type = "text";
   iconeye.classList.remove("fa-eye-slash");
   iconeye.classList.add ("fa-eye");
 } else {
    this.nextElementSibling.type = "password";
    iconeye.classList.remove ("fa-eye");
   iconeye.classList.add("fa-eye-slash");
 }
});


const auth = getAuth(app);
 //const db = getFirestore();
 const provider = new GoogleAuthProvider();

//funcion iniciar sesion
const btnLogin = document.getElementById("LoginButton")
   btnLogin.addEventListener('click',(e)=>{
    var inputEmail = document.getElementById('inputEmail').value;
    var inputPassword = document.getElementById('inputPassword').value;

       signInWithEmailAndPassword(auth, inputEmail, inputPassword)

       .then((userCredential) => {
        const user = userCredential.user;
        
       console.log("iniciaste sesion"),
       onNavigate('/MenuHome');

      })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         alert("error al iniciar sesion");
   });
   });
 
   //login con google
   const login = document.getElementById("loginGoogle")
    login.addEventListener('click',(e) => {
  //signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)
   .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
   // const token = credential.accessToken;
    const user = result.user;
    alert(user.displayName);
    console.log("ingresate")
    onNavigate('/MenuHome');

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    alert(errorMessage);
  });
 });

   //iniciar con google
/* const Registrarse = document.getElementById('loginGoogle');
  Registrarse.addEventListener('click', () => {
    // accedo al servicio de autenticación
    const authService = firebase.auth();
    // manejador de eventos para loguearse
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    authService.signInWithPopup(provider)

      .then((result) => {
      // logueado con éxito
        console.log('Hemos autenticado al usuario ', result.user);
        onNavigate('/MenuHome');
      })

      .catch((error) => {
        // Fallo de login
        console.log('Se ha encontrado un error:', error);
      });
  });*/

//primera opcion
 /* loginGoogle.addEventListener('click',(e) => {
    //signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)
    
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      alert(user.displayName);
      onNavigate('/MenuHome');

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(errorMessage);
    });
   });


//segunda opcion (falta mejorar)
/*const loginGoogle = document.getElementById("loginGoogle")
   loginGoogle.addEventListener('click',(e) => {
    signInWithRedirect(auth, provider);
 
    // redirect the result
    getRedirectResult(auth)
       .then((result) => {
         // This gives you a Google Access Token. You can use it to access Google APIs.
         const credential = GoogleAuthProvider.credentialFromResult(result);
         const token = credential.accessToken;
        // The signed-in user info.
         const user = result.user;

      }).catch((error) => {
         // Handle Errors here.
         const errorCode = error.code;
         const errorMessage = error.message;
         // The email of the user's account used.
         const email = error.email;
         // The AuthCredential type that was used.
       const credential = GoogleAuthProvider.credentialFromError(error);
       // ...
    });
   });*/

  }
