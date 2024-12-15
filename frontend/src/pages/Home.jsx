import React from "react";
import { NotificationsProvider } from "../context/NotificationsContext";
import NotificationsToast from "../components/NotificationsToast.jsx"; // Ajusta la ruta si es necesario

const Home = () => {
  return (
    <>
      <NotificationsProvider>
        <h1 className="text-4xl font-bold underline">
          Hello world!
        </h1>
        {/* Agrega el componente de notificaciones */}
        <NotificationsToast />
      </NotificationsProvider>
    </>
  );
};

export default Home;
