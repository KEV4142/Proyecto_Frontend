import React, { useState } from 'react';

export const Fecha = ({  fecha, setFecha } ) => {
    const handleDateChange = (event) => {
        setFecha(event.target.value);
    };
    
    return (
        <div>
            <label className="text-gray-700 capitalize font-bold text-sm" >Fecha </label>
            <input className="border w-1/3 p-2 mt-2 mx-5 placeholder-gray-400 rounded-md"
                type="date"
                id="fecha"
                name="fecha"
                value={fecha}
                onChange={handleDateChange}
                min={fecha}
            />
        </div>
    );
};

export default Fecha;
