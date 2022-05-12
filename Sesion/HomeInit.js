/* eslint-disable import/no-cycle */
import { onNavigate } from '../main.js';

export const HomeInit = (rootElement) => {
  const ContainerHome = `<body id="redireccionamiento">
                            <a href="./Login"><img class="ImageLogo" src="../image/Logo.png"/></a>
                            <img class="ImageCharge" src="../image/charge.gif"/> 
                                                    
                          </body> `;
  /* eslint-disable-next-line no-param-reassign */
  rootElement.innerHTML = ContainerHome;
  /* redireccionamiento */
  function Redireccionamiento() {
    onNavigate('/Login');
  }
  setTimeout(Redireccionamiento, 3500);
};
