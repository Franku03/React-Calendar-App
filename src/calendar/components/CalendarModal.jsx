
import { addHours, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale/es';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useCalendarStore, useFormModal, useUiStore } from '../../hooks';

registerLocale( 'es', es );

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const modalData = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2 ),
};

export const CalendarModal = () => { 

    //  Ui and Form hook logic
    const { formValues, titleClass, onInputChanged, onDateChanged, onFormSubmitted } = useFormModal( modalData );

    const { isDateModalOpen, isMyModal, closeDateModal } = useUiStore();
    
    const { disableActiveEvent, startSavingEvent } = useCalendarStore();


    // Modal Methods
    const onCloseModal = () => {
        // Creamos una función por si hiciera falta en algún futuro agregar algún tipo de limpieza o código extra, de no ser así podría borrarse y llamar directamente a la función del hook desde el componente
        closeDateModal();
        disableActiveEvent();
    }
    
    const onSubmit = async ( event ) => {
        event.preventDefault();
        onFormSubmitted( true );

        const difference = differenceInSeconds( formValues.end, formValues.start );

        if( isNaN( difference ) || difference <= 0){
            Swal.fire('Fechas incorrectas', 'Revisar las fehcas ingresadas', 'error');
            return;
        }

        if( formValues.title.length <= 0) return;

        // console.log(formValues);
        await startSavingEvent( formValues );
        closeDateModal();
        onFormSubmitted( false );

    }

    return (
        <Modal
            isOpen={ isDateModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <h1 className='m-2'> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2 d-flex flex-column">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={ formValues.start }
                        onChange={ ( event ) => onDateChanged(event, 'start') }
                        className='form-control'
                        disabled={ !isMyModal }
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2 d-flex flex-column">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        minDate={ formValues.start }
                        selected={ formValues.end }
                        onChange={ ( event ) => onDateChanged(event, 'end') }
                        className='form-control'
                        disabled={ !isMyModal }
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />                
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass }`}
                        disabled={ !isMyModal }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChanged }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        disabled={ !isMyModal }
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChanged }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                    disabled={ !isMyModal }
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
