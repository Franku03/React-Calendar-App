import { useEffect, useMemo, useState } from "react";
import { useCalendarStore } from "./useCalendarStore";

export const useFormModal = ( initialModalData = {} ) => {

    // Get calendar Slice values from store
    const { activeEvent } = useCalendarStore();

    // States
    const [formSubmitted, setFormSubmitted] = useState(false);

    // useForm Basic inner-workings
    const [formValues, setFormValues] = useState( initialModalData );

    // CSS bootstrap class for stating invalid input value and memorizing it
    const titleClass = useMemo(() =>{
        if(!formSubmitted) return '';

        return (formValues.title.length > 0 )
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmitted]);

    // Para cargar y cambiar la referencia al formulario activo en el estado si el evento activo cambia en el store
    useEffect(() => {

      if( activeEvent !== null ){
        setFormValues({ ...activeEvent });
      }

    }, [ activeEvent ]);
    


    // useForm basic inner-working functions for handling react state
    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        })
    };

    // ¡For DatePicker values
    const onDateChanged = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event,
        })
    };

    const onFormSubmitted = ( formSubmission ) => {
        setFormSubmitted( formSubmission );
    }

    return {
        // * Propiedades
        titleClass,
        formValues,

        // * Métodos
        onInputChanged,
        onDateChanged,
        onFormSubmitted,
    }
}
