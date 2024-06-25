import { useState } from 'react';

const Dashboard = () => {
const fechaActual = new Date().toLocaleDateString();

  return (
    <>
      <h1 className="text-2xl font-black">Sistema de Viajes :||: {fechaActual}</h1>
    </>
  )
}

export default Dashboard