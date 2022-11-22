import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../Constant';


export default function ComponentName() {
    useEffect(() => {
        document.title = 'Instrucciones de encuesta';
        localStorage.removeItem(CONSTANT.key.answerSheet);
    });
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="bg-gray p-3 mt-5 br-3">
                        <div>Lea las instrucciones de la encuesta antes de continuar:</div>
                        <ul className='mt-3'>
                            <li>Seleccione la opcion correcta de acuerdo a la imagen </li>
                            <li>Una vez llegue al final, envie la encuesta</li>
                            <li>Observe los resultados y puntajes de acuerdo a su selección</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <Link to={CONSTANT.url.question} className='btn btn-primary float-end'>Comenzar Encuesta</Link>
                </div>
            </div>
        </div>
    )

    
}