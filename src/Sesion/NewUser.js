export const NewUser = (rootElement) => {
  const containerLogo = '< p class="titleNewUser" > iniciar registro</p > ';
  const containerRegistro = '< p > Subir foto de perfil</p >'
                              '<input></input>'
                             ' <p>Nombre</p>'
                              '<input></input>'
                             ' <p>Correo</p>'
                              '<input></input>'
                             ' <p>Contraseña</p>'
                             ' <input></input>';                            
  const containerCrearCuenta = 
    '<button class="button" id="BotonCrearCuenta">Crear Cuenta</button>'
  ;
 
rootElement.innerHTML = containerLogo+containerRegistro+containerCrearCuenta
};