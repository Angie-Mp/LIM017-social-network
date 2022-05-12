/* eslint-disable import/no-cycle */
import { onNavigate } from '../main.js';

export const NavMenu = (rootElement) => {
  const containerMenu = `
    <section class="NavMenu">
        <nav>
            <div class="menuContainerCategories">
                <h1>Categorías :</h1><br/>
                <li><a class="menuCategories" id="AnimeSelector" href="#"><img class="iconMenu" src="./image/anime.jpg" height ="60"/>ANIME</a></li><br>
                <li><a class="menuCategories" id="DoramasSelector" href="#"><img class="iconMenu" src="./image/doramas.jpg" height ="60"/>DORAMAS</a></li><br>
                <li><a class="menuCategories" id="KpopSelector" href="#"><img class="iconMenu" src="./image/kpop.jpg" height ="60"/>KPOP</a></li><br>
                <li><a class="menuCategories" id="NewsSelector" href="#"><img class="iconMenu" src="./image/news.jpg" height ="60"/>NEWS</a></li>
            </div>
        </nav>
    </section>`;
  /* eslint-disable no-param-reassign */
  rootElement.innerHTML = containerMenu;
  const IniciarSecion = document.getElementById('CloseSesion');
  IniciarSecion.addEventListener('click', () => {
    onNavigate('/');
  });
};
