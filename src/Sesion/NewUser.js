/* eslint-disable import/no-unresolved */
import {
  createUserWithEmailAndPassword,
  collection,
  addDoc,
} from '../firebase/importFB.js';
import { db, auth } from '../firebase/initFB.js';

export const NewUser = (rootElement) => {
  const containerRegistro = `
      <section class="logoWelcomeViewRegister">
        <img src="./image/Logo.png" class="AppLogoRegister"/>
      </section>
      <section class="newUserView">
        <h1 class="titleNewUser" id="titleNewUser">Iniciar Registro</h1><br>
        <section class="newUserImageProfile">
          <p class="photoRegist">Subir foto de perfil</p><br>
          <button class="photoUpload"></button>
        </section>
        <form class="newUserForm">
          <label class="form-newUser">Nombre :</label><br>
          <input class="inputFormNewUser" id="newUserName"></input><br>

          <label class="form-newUser">Correo Electrónico:</label><br>
          <input class="inputFormNewUser" id="newUserEmail"></input><br>

          <div class="passwordcreate"><label class="form-newUser">Crear contraseña :</label><br>
          <span class="icon-eye">
          <i class="fa-solid fa-eye-slash"></i></span>
          <input type="password" class="inputFormNewUser" id="newUserPassword"></input><br></div>

          <label class="form-newUser">Escribe tu descripción :</label><br>
          <textarea class="writeDescript" id="newUserDescription"></textarea> </br>
        </form>
        <button class="registerBtn" id="sighUp">REGISTRARSE</button>
      </section> `;
  /* eslint-disable no-param-reassign */
  rootElement.innerHTML = containerRegistro;

  const iconEye = document.querySelector('.icon-eye');
  iconEye.addEventListener('click', function () {
    const icon = this.querySelector('i');

    if (this.nextElementSibling.type === 'password') {
      this.nextElementSibling.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      this.nextElementSibling.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });

  const sighUp = document.getElementById('sighUp');
  sighUp.addEventListener('click', () => {
    const newUserName = document.getElementById('newUserName').value;
    const newUserEmail = document.getElementById('newUserEmail').value;
    const newUserPassword = document.getElementById('newUserPassword').value;
    const newUserDescription = document.getElementById('newUserDescription').value;

    createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword)
      .then(() => {
        try {
          const register = addDoc(collection(db, 'register'), {
            /* eslint-disable  object-shorthand */
            newUserName: newUserName,
            newUserEmail: newUserEmail,
            newUserDescription: newUserDescription,
          });
          console.log(register);
          // eslint-disable-next-line
    swal({
            title: 'Registro realizado',
            text: 'Su cuenta a sido creada con exito!!',
            icon: 'success',
            button: 'Iniciar Sesion',
            dangerMode: true,
          })
            .then((result) => {
              if (result) {
                window.location.href = ('./Login');
              }
            });
        } catch (e) {
          console.error('Error, no se pudo registrar ', e);
        }
      })
      .catch(() => {
        // eslint-disable-next-line
        swal({
          title: 'No se pudo registrar',
          text: 'Verifique tus datos',
          icon: 'error',
          button: 'Volver',
          dangerMode: true,
        });
      });
  });
};
