/* eslint-disable import/no-cycle */
import { onNavigate } from '../main.js';
import { auth } from '../firebase/initFB.js';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from '../firebase/importFB.js';

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
  /* eslint-disable no-param-reassign */
  rootElement.innerHTML = button;

  /* Ocultar contraseña */
  const iconEyeLogin = rootElement.querySelector('.icon-eyeL');
  iconEyeLogin.addEventListener('click', function () {
    const iconeye = this.querySelector('i');

    if (this.nextElementSibling.type === 'password') {
      this.nextElementSibling.type = 'text';
      iconeye.classList.remove('fa-eye-slash');
      iconeye.classList.add('fa-eye');
    } else {
      this.nextElementSibling.type = 'password';
      iconeye.classList.remove('fa-eye');
      iconeye.classList.add('fa-eye-slash');
    }
  });

  const provider = new GoogleAuthProvider();
  /* funcion iniciar sesion */
  const btnLogin = rootElement.querySelector('#LoginButton');
  btnLogin.addEventListener('click', () => {
    const inputEmail = rootElement.querySelector('#inputEmail').value;
    const inputPassword = rootElement.querySelector('#inputPassword').value;

    signInWithEmailAndPassword(auth, inputEmail, inputPassword)

      .then(() => {
        onNavigate('/MenuHome');
      })
      .catch(() => {
        // eslint-disable-next-line
        swal({
          title: 'Cuenta Invalida!!',
          text: 'Verifique sus datos',
          icon: 'error',
          button: 'Volver',
          dangerMode: true,
        });
      });
  });

  /* login con google */
  const login = document.getElementById('loginGoogle');
  login.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // eslint-disable-next-line
       swal({
          title: `Hola ${user.displayName} `,
          text: 'Bienvenido(a) a Asia Mania ',
          button: 'Aceptar',
          dangerMode: true,
        });
        onNavigate('/MenuHome');
      }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });
};
