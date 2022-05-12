/* eslint-disable import/no-cycle */
import { onNavigate } from '../main.js';
import {
  onGetTasks,
  saveTask,
  deleteTask,
  getTask,
  updateTask,
} from './datosCrud.js';

export const MenuHome = (rootElement) => {
  const button2 = `
  <section class="MenuHome">
  <section>
      <nav class="navUp">
      <ol class="nav-sesionFinish">
        <img class="iconSesionFinish" id="imageUserProfile" src="./image/User.jpg" height="50" />
        <p class="iconSesionFinish" id="nameUser">ALICIA </p> <br/>
        <a class="iconSesionFinish" id="finishSesion" href="#"><img src="./image/finishSesion.png" height ="45"/></a>
      </ol>
      </nav>

      <nav class="navPhone">
        <ol class="nav-bar">
          <li><img class="logoMenu" src="./image/Logo.png"  height ="265"/></li>
          <li><div class="containerCategories">
              <h3>HEY! BIENVENIDX !</h3><br>
              <h5>AsiaMania es una red social para los apasionados del entretenimiento asiatica y sus expresiones de todos los tipos.<br><br>¿Y qué más?<br>
              -Es una plataforma segura para expresar opiniones libremente.<br>
              -Un lugar hospitalario para conocer gente de diferentes orígenes  de todo el mundo.</h5>
              </div></li>
          <img id="imageMenuHi" src="./image/hi.gif"  height ="85"/>
          <img id="imageMenuColor" src="./image/color.gif"  height ="70"/>
          <h4>Diviértete compartiendo :)</h4><img id="imageMenuLove" src="./image/love.gif"  height ="100"/>
        </ol>
      </nav>
  </section>

  <section class="containerPost">
    <div class="createPost">
    <form id="task-form">
      <textarea class="input-post" id="task-description" placeholder="¿Qué estas pensando?"></textarea><br>
      <button class="btnPost" id="btn-task-form" type="image"><span>PUBLICAR</span></button>
    </form><br>

      <p>LO MÁS VISTO HOY:</p><br>
      <div class="col-md-6" id="tasks-container"></div>
      </div>
  </section>
  </section> `;
  /* eslint-disable no-param-reassign */
  rootElement.innerHTML = button2;

  const SignOff = document.getElementById('finishSesion');
  SignOff.addEventListener('click', () => {
    // eslint-disable-next-line
    swal({
      text: 'Seguro que desea cerrar sesion?',
      icon: 'error',
      buttons: ['SI', 'NO'],
      dangerMode: true,
    })
      .then((result) => {
        if (result) {
          console.log('no cerro sesion');
        } else {
          /* volver al inicio */
          onNavigate('/');
        }
      });
  });

  // const hamburguer = document.getElementById('iconBurger');
  /* const navMenu = document.querySelector('.containerCategories'); */

  /* function responsive() {
    navMenu.classList.toggle('active');
  } */
  // hamburguer.addEventListener('click', responsive);

  const taskForm = document.getElementById('task-form');
  const tasksContainer = document.getElementById('tasks-container');

  let editStatus = false;
  let id = '';

  window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {
      tasksContainer.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const newPost = doc.data();
        tasksContainer.innerHTML += `
      <div class="showPost">
      <p><h4 class="post-text">${newPost.description}</h4><p><br>

    <button class="btn btn-primary btn-delete" data-id="${doc.id}">
      🗑 Eliminar
    </button>
    <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
    📌 Editar
    </button>

      </div>
    </div>
  </div>
  <br> `;
      });
      const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          try {
            await deleteTask(e.target.dataset.id);
          } catch (error) {
            console.log(error);
          }
        });
      });

      const btnsEdit = tasksContainer.querySelectorAll('.btn-edit');
      btnsEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          try {
            const doc = await getTask(e.target.dataset.id);
            const task = doc.data();
            taskForm['task-description'].value = task.description;

            editStatus = true;
            id = doc.id;
            /* eslint-disable no-unused-expressions */
            taskForm['btn-task-form'];
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });

  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = taskForm['task-description'];
    try {
      if (!editStatus) {
        await saveTask(description.value);
      } else {
        await updateTask(id, {
          description: description.value,
        });
        editStatus = false;
        id = '';
        taskForm['btn-task-form'];
      }
      taskForm.reset();
    } catch (error) {
      console.log(error);
    }
  });
};
