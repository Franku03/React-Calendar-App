import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector ( state => state.auth );
    
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    // Esto es para evitar que el fabDelete se quedé ahí en la UI una vez se cierra el modal,
    // dado que cuando se abre el modal para añadir un evento, se coloca una nota activa default y esta no se reemplaza por un null, cosa necesaria para cambiar el display del botón a 'none'
    const disableActiveEvent = () => {
        dispatch( onSetActiveEvent( null ) );
    }

    const startSavingEvent = async ( calendarEvent ) => {

        try {

            if( calendarEvent.id ){
                // Actualizando
                await calendarApi.put(`events/${ calendarEvent.id }`, calendarEvent )
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return
            }
    
            // Creando
            const { data } = await calendarApi.post('events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento?.id, user }) );

        } catch (error) {
            console.log( error );
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
            disableActiveEvent();
        }


    }

    const startDeletingEvent = async () => {

        try {
            // Actualizando
            await calendarApi.delete(`events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() );
            // disableActiveEvent(); No hace falta porque en el onDeleteEvent ya colocamos la nota en null

        } catch (error) {
            console.log( error );
            Swal.fire('Error al Eliminar', error.response.data.msg, 'error');
            disableActiveEvent();
        }

    }

    const startLoadingEvents = async () => {

        try {
            
            const { data } = await calendarApi.get('events');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );

        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error)
        }


    };



    return {
        // * Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        
        // * Métodos
        disableActiveEvent,
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}
