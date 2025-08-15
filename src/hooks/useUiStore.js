// Hook para manejar todo lo referente al uiSlice

import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isDateModalOpen, isMyModal } = useSelector( state => state.ui );

    // User Determination logic
    const { user } = useSelector( state => state.auth );
    const { activeEvent } = useSelector( state => state.calendar );


    const openDateModal = () => {
        // Remember: isMyEvent =  ( user.uid === activeEvent?.user._id ) ? true : false 
        // La última condición es para cuando se selecciona el botón de agregar FabAddNew
        dispatch( onOpenDateModal( ( user.uid === activeEvent?.user._id ) || ( user.uid === activeEvent?.user.uid ) || (!activeEvent)) );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    const toggleDateModal = () => {
        (!isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }

    return {
        // * Propiedades
        isDateModalOpen,
        isMyModal,

        // * Métodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }

}