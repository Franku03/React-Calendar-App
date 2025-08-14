// Por cada API a la que nos conectemos tendremos un archivo .js
// Acá solo nos conectamos a nuestros Backend, por tanto tenemos un solo archivo api.js
 
import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
});

// * Configurar interceptores - Pueden ser aquellas que van al Backend (request) o las que Regresan de este (response)
// En este caso utilizamos uno para modificar la request y añadir el header de x-token para hacer peticiones a los endpoints protegidos del backend
// Es muy parecido a cuando modificabamos el parsing a JSON de Mongoose
calendarApi.interceptors.request.use( config => {

    // modificamos el header en la configuración
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    // regresamos las configuraciones
    return config;
} )


// Exportamos por defecto dado que la configuración de los interceptores la hacemos
// separada de la declaración de la variable del objeto 
export default calendarApi;