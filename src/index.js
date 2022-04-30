 
//* Inficamos los modelos a usar en el sistema 
const express = require('express');
//* Creamos una asignación de express a una variable global 
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false})); 

//Importamos el archivo que manejará las rutas 
app.use(require('./routers/index'));


//* Definimos el arranque de escucha del servidor 
app.listen(3000);

//* Se imporme un mensaje en consola acerca de que se inicio el servidor  */
console.log('El servidor se inicio sobre el puerto 3000'); 

