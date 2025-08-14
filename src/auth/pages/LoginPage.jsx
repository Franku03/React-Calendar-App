import { useEffect, useState } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
};

const loginFormValidations = {
    loginEmail: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    loginPassword: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 letras'],
};

const registerFormFields = {
    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',
};

const registerFormValidations = {
    registerName: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
    registerEmail: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    registerPassword: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 letras'],
    registerPassword2: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 letras'],
};


export const LoginPage = () => {

    const [ loginFormSubmitted, setLoginFormSubmitted ] = useState( false );
    const [ registerFormSubmitted, setRegisterFormSubmitted ] = useState( false );

    const { startLogin, errorMessage, startRegister } = useAuthStore(); 

    const { 
        loginEmail, loginPassword, onInputChange: onLoginInputChange, 
        loginEmailValid, loginPasswordValid 
    } = useForm( loginFormFields, loginFormValidations );

    const { 
        registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange, 
        registerNameValid, registerEmailValid, registerPasswordValid, registerPassword2Valid
    } = useForm( registerFormFields, registerFormValidations );

    useEffect(() => {
        // Recordar no colocar cosas como codigo limpio if() return, pues el return en el useEffect es para pasar funciones de limpieza
        if( errorMessage !== undefined ) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage]);
    

    const loginSubmit = ( event ) => {
        event.preventDefault();
        setLoginFormSubmitted( true ); // Habilitamos los mensajes de error

        startLogin({ email: loginEmail, password: loginPassword });

        // setLoginFormSubmitted( false ); // Deshabilitamos los mensajes de error
    }

    const registerSubmit = ( event ) => {
        event.preventDefault();
        setRegisterFormSubmitted( true );

        if( registerPassword !== registerPassword2 ){
            Swal.fire('Error en el registro', 'Las contraseñas no son iguales', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword})

        // console.log({ registerName, registerEmail, registerPassword, registerPassword2 }); 

        // setLoginFormSubmitted( false );
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className={`form-control ${ loginFormSubmitted && loginEmailValid  ? 'is-invalid' : '' }`}
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className={`form-control ${ loginFormSubmitted && loginPasswordValid  ? 'is-invalid' : ''  }`}
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grip gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className={`form-control ${ registerFormSubmitted && registerNameValid  ? 'is-invalid' : '' }`}
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className={`form-control ${ registerFormSubmitted && registerEmailValid  ? 'is-invalid' : '' }`}
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className={`form-control ${ registerFormSubmitted && registerPasswordValid  ? 'is-invalid' : '' }`}
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className={`form-control ${ registerFormSubmitted && registerPassword2Valid  ? 'is-invalid' : '' }`}
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}