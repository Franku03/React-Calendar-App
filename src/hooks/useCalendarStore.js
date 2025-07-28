import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async ( calendarEvent ) => {
        // TODO: llegar al backend

        // Todo bien
        if( calendarEvent._id ){
            // Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        }else{
            // Creando
            // ! El _id se asigna aquí por ahora, cuando haya Backend este será el encargado de asignarlo
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    }

    const startDeletingEvent = () => {
        // TODO: llegar al backend

        // Todo bien
        dispatch( onDeleteEvent() );
    }

    // Esto es para evitar que el fabDelete se quedé ahí en la UI una vez se cierra el modal,
    // dado que cuando se abre el modal para añadir un evento, se coloca una nota activa default y esta no se reemplaza por un null, cosa necesaria para cambiar el display del botón a 'none'
    const disableActiveEvent = () => {
        dispatch( onSetActiveEvent( null ) );
    }

    return {
        // * Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        
        // * Métodos
        disableActiveEvent,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}
