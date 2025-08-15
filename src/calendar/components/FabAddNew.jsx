// Fab = Floating action Button

import { addHours } from "date-fns";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    // los atributos comentados en el setActiveEvent son aquellos que nunca fueron necesarios, se pusieron ahí como placeholder
    
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();
    const { user } = useAuthStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            user,
            // bgColor: '#fafafa',
            // user: {
            //     _id:'123',
            //     name: 'Franku'
            // }
        });
        openDateModal();
    }

    return (
        <button
            className='btn btn-primary fab'
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
