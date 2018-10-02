<h1>Restful API para un servicio de gestión de deudas entre amigos</h1>

<p>Puedes probar una demo de esta API en: <a>https://deduas-api.herokuapp.com/</a></p>

<h2> Implementación </h2>
<p> Para poder implementar el servidor será necesario modificar las variables ambientales del fichero settings en <code> /settings/settings.js</code>. Añadiendo tu dirección de tu BBDD y una sal propia para la encriptación. </p>


<p>Desarrollada en Node.js y utilizando una base de datos mongoDB, siendo totalmente segura al utilizar jwt
y almacenando y validando las contraseñas con fuciones hash.
</p>

<p>El principal motivo para haber realizado esta API es para la posterior creación de una web app o aplicación que se sirva de ella.
Para la gestión de la seguridad al haber optado por el uso de jwt hace necesario el envio de tokens de indentificación para
todas las rutas restringidas a los usuarios.</p>

<h2> Objetos </h2>
<p>A continuacion describiremos los parametros de todos los objetos que se almacenan en la base de datos:</p>

<h3> Usuario </h3>
<ul>
  <li><b>_id: Obligatoria</b> String unico de identificación del usuario en la base de dato</li>
  <li><b>email: Obligatoria</b> String con el email del usuario</li>
  <li><b>password: Obligatoria</b> String con el hash</li>
  <li>image: Opcional Entero con el numero del avatar del usuario</li>
  <li>name: Opcional String con el nombre del usuario</li>
</ul>

<h3> Deuda </h3>
<ul>
  <li><b>_id: Obligatoria</b> String unico de identificación de la deuda en la base de dato</li>
  <li><b>user_id: Obligatoria</b> String unico de identificación de la deuda en la base de dato</li>
  <li><b>debtor: Obligatoria</b> String con el email del usuario</li>
  <li><b>amount: Obligatoria</b> Number con la cantidad que se debe</li>
  <li><b>reason: Obligatoria</b> Razon por la que se debe el dinero</li>
  <li><b>date: Obligatoria</b> Date con la fecha en la que se contrae la deuda (por defecto la actual)</li>
  <li>description: Opcional Entero con el numero del avatar del usuario</li>
</ul>

<h2> Rutas </h2>

<p> Existen 2 rutas principales en esta API: </p>
<p> <code> /users </code>para crear borrar actualizar y logear usuarios. </p>
<p> <code> /debts </code>para crear borrar actualizar y mostrar sus deudas a aquellos usuarios logeados. </p>

<p> A continuación se detalla cada una de estas rutas, el tipo de peticion y los parametros que aceptan y que devuelven </p>

<h3> Usuarios </h3>

<h4>Registro</h4>
<code>/users/signup </code>
  <p>Permite crear un usuario a partir de un email y una contraseña<p>
  <p>Tipo<code> POST</code><p>
  <p>Autentificación necesaria: Ninguna<p>
  <p>Parametros: <p>
  <ul>
    <li><b>email: Obligatoria</b> String</li>
    <li><b>password: Obligatoria</b> String</li>
    <li>image: Opcional Entero con el numero del avatar del usuario</li>
    <li>name: Opcional String con el nombre del usuario</li>
  </ul>
    <p>Respuesta: <p>
  <ul>
    <li>Mensaje de confirmación</li>
  </ul>

<h4>Login</h4>
<code>/users/login </code>
  <p>Permite logear a un usuario y devuelve un token de identificación para poder gestionar su cuenta y sus deudas<p>
  <p>Tipo:</b> <code> POST</code>
  <p>Autentificación necesaria: Ninguna<p>
  <p>Parametros: <p>
  <ul>
    <li><b>email: Obligatoria</b> String</li>
    <li><b>password: Obligatoria</b> String</li>
  </ul>
  
  <p>Respuesta: <p>
  <ul>
    <li>Bearer token</li>
  </ul>


<h4>Borrado</h4>
<code>/users/delete/:userId </code>
  <p>Permite borrar su cuenta a un usuario identificado<p>
  <p>Tipo:</b> <code> DELETE</code>
  <p>Autentificación necesaria: Bearer token<p>
  <p>Parametros: <p>
  <ul>
    <li><b>userId: Obligatoria</b> String con el id del usuario</li>
  </ul>
  
  <p>Respuesta: <p>
  <ul>
    <li>Mensaje de confirmación</li>
  </ul>
  
<h4>Actualización</h4>
<code>/users/update/:userId </code>
  <p>Permite modificar su cuenta a un usuario identificado<p>
  <p>Tipo:</b> <code> PATCH</code>
  <p>Autentificación necesaria: Bearer token<p>
  <p>Parametros: <p>
  <ul>
    <li><b>userId: Obligatoria</b> String con el id del usuario</li>
    <li>image: Opcional Entero con el numero del avatar del usuario</li>
    <li>name: Opcional String con el nombre del usuario</li>
  </ul>
  
  <p>Respuesta: <p>
  <ul>
    <li>Mensaje de confirmación</li>
  </ul>

<h3> Deudas </h3>

<h4>Recuperación de las deudas</h4>
<code>/debts</code>
  <p>Devuelve a un usuario identificado todas sus deudas<p>
  <p>Tipo<code> GET</code><p>
  <p>Autentificación necesaria: Bearer token<p>
  <p>Parametros: <p>
  <ul>
    <li>Nada</li>
  </ul>
    <p>Respuesta: <p>
  <ul>
    <li>count: Numero de deudas</li>
    <li>debts: Array con todas las deudas, sus ids y enlaces a ellas</li>
  </ul>

<h4>Añadir una deuda</h4>
<code>/debts</code>
  <p>Permite añadir a un usuario una deuda<p>
  <p>Tipo<code> POST</code><p>
  <p>Autentificación necesaria: Bearer token<p>
  <p>Parametros: <p>
  <ul>
    <li><b>debtor: Obligatoria</b> String</li>
    <li><b>reason: Obligatoria</b> String</li>
    <li><b>amount: Obligatoria</b> Double</li>
    <li>description: Opcional String</li>
    <li>date: Opcional Date</li>
  </ul>
    <p>Respuesta: <p>
  <ul>
    <li>Mensaje de confirmación</li>
  </ul>

<h4>Recuperar una única deuda</h4>

<code>/debts/:debtId</code>
  <p>Permite obtener una deuda del usuario identificado<p>
  <p>Tipo<code> GET</code><p>
  <p>Autentificación necesaria: Bearer token<p>
  <p>Parametros: <p>
  <ul>
    <li><b>debtId: Obligatoria</b> String</li>
  </ul>
    <p>Respuesta: <p>
  <ul>
    <li>Debt: Objeto con la informacion de la deuda</li>
  </ul>

<h4>Borrado de deuda</h4>
<code>/debts/:debtId</code>
  <p>Permite borrar una deuda del usuario identificado<p>
  <p>Tipo<code> DELETE</code><p>
  <p>Autentificación necesaria: Bearer token<p>
  <p>Parametros: <p>
  <ul>
    <li><b>debtId: Obligatoria</b> String</li>
  </ul>
    <p>Respuesta: <p>
  <ul>
    <li>Mensaje de confirmacion</li>
  </ul>


<h4>Actualización de deuda</h4>
<code>/debts/:debtId</code>
  <p>Permite modificar una deuda del usuario identificado cambiando solo los los parametros que sean enviados<p>
  <p>Tipo<code> PATCH</code><p>
  <p>Autentificación necesaria: Bearer token<p>
  <p>Parametros: <p>
  <ul>
    <li><b>debtId: Obligatoria</b> String</li>
    <li>debtor: Opcional String</li>
    <li>reason: Opcional String</li>
    <li>amount: Opcional Double</li>
    <li>description: Opcional String</li>
    <li>date: Opcional Date</li>
  </ul>
    <p>Respuesta: <p>
  <ul>
    <li>Mensaje de confirmacion</li>
  </ul>
