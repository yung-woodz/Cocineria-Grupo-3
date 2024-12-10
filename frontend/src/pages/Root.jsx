import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import { AuthProvider } from '@context/AuthContext';

function Root()  {
return (
    <AuthProvider>
        <PageRoot/>
    </AuthProvider>
);
}

function PageRoot() {
    return (
        <div className="flex h-screen w-full">
          {/* Sidebar */}
          <Navbar />
    
          {/* Contenido Principal */}
          <div className="flex-1 p-7 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      );
}

export default Root;