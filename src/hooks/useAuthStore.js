import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage  } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch( onChecking() );

        try {
            // Mandamos como argumento el segmento de URL correspondiente al endpoint que queremos hacerle la solicitud
            // OJO: si en la variable de entorno colocamos el final como /api/, no hace falta colocarlo aquí de nuevo
            const { data } = await calendarApi.post('auth',{ email, password });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() ); // Obtenemos la fecha de generación del token para poder hacer calculos o comprobaciones con este
            
            dispatch( onLogin({ name: data.name, uid: data.uid }) );


        } catch (error) {

            dispatch( onLogout('Credenciales Incorrectas') );
            // Tras mostrar el mensaje de error lo limpio del store esperando una milésima de segundo
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);

        }

    }

    const startRegister = async ({ name, email, password }) => {

        dispatch( onChecking() ) ;

        try {

            const { data } = await calendarApi.post('auth/new',{ name, email, password });

            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() ); // Obtenemos la fecha de generación del token para poder hacer calculos o comprobaciones con este
            
            dispatch( onLogin({ name: data.name, uid: data.uid }) );


        } catch (error) {

            console.log( error );

            dispatch( onLogout( error.response.data?.msg || 'Campos Incorrectos') );
            
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);

        }

    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get( 'auth/renew');
            console.log({ data });
            localStorage.setItem('token', data.token );
            localStorage.setItem('token-init-date', new Date().getTime() ); // Obtenemos la fecha de generación del token para poder hacer calculos o comprobaciones con este
            
            dispatch( onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }


    return {
        // * Propiedades

        status,
        user,
        errorMessage,

        // * Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}