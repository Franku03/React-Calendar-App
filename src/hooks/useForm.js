import { useEffect, useMemo, useState } from "react";

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [formState, setformState] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [ formState ]);

    useEffect(() => {
        setformState( initialForm );
    }, [initialForm]);
    

    // useMemo para memorizar el valor de retorno de la función
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if( formValidation[formValue] !== null ) return false;
        }

        return true;

    }, [formValidation]);
    
    const onInputChange = ( { target }) => {
         const { value, name } = target;
         setformState({
              ...formState,
              [ name ]: value,
         });   
    }

    const onResetForm = () => {
        setformState( initialForm );
    }

    const createValidators = () => {
        const formCheckedValues = {};

        for( const formField of Object.keys( formValidations )){
            // Se usa la bracket notation de los objetos en JS para acceder a las tuplas

            const [ fn, errorMessage = 'Este campo es requerido' ] = formValidations[formField];

            // Una vez tomada la tupla, usando las computed values agregamos valores a FormCheckedValues
            // El cual será un valor booleano que se obtiene al llamar a la función de validación mandando
            // la propiedad respectiva del formState a través de la bracked Notation

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage ;
        }

        setFormValidation( formCheckedValues );
        // console.log(formCheckedValues);
        
    };


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}