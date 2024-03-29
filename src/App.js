import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/formulario";
import Cita from "./components/Cita";

function App() {

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (!citasIniciales) {
        citasIniciales = [];
    }

    // Arreglo de citas
    const [citas, setCitas] = useState(citasIniciales);




    useEffect(() => {
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));
        if(citasIniciales){
            localStorage.setItem('citas', JSON.stringify(citas));
        }else{
            localStorage.setItem('citas', JSON.stringify([]));
        }
        return () => {

        }
    }, [citas])

    // funcion que tome las citas actuales agregue las nuevas
    const crearCita = cita => {
        setCitas([...citas, cita]);
    }

    const eliminarCita = id => {
        const nuevasCitas = citas.filter(cita => cita.id !== id);

        setCitas(
            nuevasCitas
        );
    }

    const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus citas';

    return (
        <Fragment>
            <h1>Administrador de pacientes</h1>

            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario
                            crearCita={crearCita}
                        />
                    </div>
                    <div className="one-half column">
                        <h2>{titulo}</h2>
                        {citas.map(cita => (
                            <Cita
                                key={cita.id}
                                cita={cita}
                                eliminarCita={eliminarCita}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </Fragment>
    );
}

export default App;
