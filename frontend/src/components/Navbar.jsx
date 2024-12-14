    import { NavLink, useNavigate, useLocation } from "react-router-dom";
    import { logout } from '@services/auth.service.js';
    import { useState } from "react";

    import { Outlet } from "react-router-dom";

    import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
    import RestaurantIcon from '@mui/icons-material/Restaurant';
    import { BrunchDining as BrunchDiningIcon } from '@mui/icons-material';
    import { BreakfastDining as BreakfastDiningIcon} from '@mui/icons-material';
    import { Summarize as SummarizeIcon } from '@mui/icons-material';
    import {Inventory as InventoryIcon} from '@mui/icons-material';

    import {
        Dashboard as DashboardIcon,
        Person as AccountsIcon,
        Folder as FilesIcon,
        Alarm as AccessAlarmIcon,
    } from '@mui/icons-material';


    const Navbar = () => {
        const navigate = useNavigate();
        const location = useLocation();
        const user = JSON.parse(sessionStorage.getItem('usuario')) || '';
        const userRole = user?.rol;
        const [menuOpen, setMenuOpen] = useState(false);

        const logoutSubmit = () => {
            try {
                logout();
                navigate('/auth'); 
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        };

        const toggleMenu = () => {
            if (!menuOpen) {
                removeActiveClass();
            } else {
                addActiveClass();
            }
            setMenuOpen(!menuOpen);
        };

        const removeActiveClass = () => {
            const activeLinks = document.querySelectorAll('.nav-menu ul li a.active');
            activeLinks.forEach(link => link.classList.remove('active'));
        };

        const addActiveClass = () => {
            const links = document.querySelectorAll('.nav-menu ul li a');
            links.forEach(link => {
                if (link.getAttribute('href') === location.pathname) {
                    link.classList.add('active');
                }
            });
        };

        const [open, setOpen] = useState(true);
        const Menus = [
            { title: "Informacion", icon: <DashboardIcon />, link: "/home" },
            { title: "Notificaciones", icon: <AccessAlarmIcon />, link: "/order/orderByChef" },
            { title: "Menú", icon: <BreakfastDiningIcon />, gap: true, link: "/menu" },
            { title: "Platillos", icon: <BrunchDiningIcon />, link: "/dishes" },
            { title: "Ordenes", icon: <SummarizeIcon />, link: "/order/all" },
            { title: "Inventario", icon: <InventoryIcon />, gap: true, link: "/inventory" },
            { title: "Usuarios", icon: <AccountsIcon />, link: "/users" },
        ];
        

    return (
        <nav className="navbar">
            <div className={`nav-menu ${menuOpen ? 'activado' : ''}`}>
                <ul>
                    <li>
                        <NavLink 
                            to="/home" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            Inicio
                        </NavLink>
                    </li>
                    {userRole === 'administrador' && (
                        <>
                            <li>
                                <NavLink 
                                    to="/create-dish" 
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Crear Platillo
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dishes" 
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    Ver Platillos
                                </NavLink>
                            </li>
                        </>
                    )}
                    {userRole === 'administrador' && (
                    <li>
                        <NavLink 
                            to="/users" 
                            onClick={() => { 
                                setMenuOpen(false); 
                                addActiveClass();
                            }} 
                            activeClassName="active"
                        >
                            Usuarios
                        </NavLink>
                    </li>
                    )}
                    <li>
                        <NavLink 
                            to="/auth" 
                            onClick={() => { 
                                logoutSubmit(); 
                                setMenuOpen(false); 
                            }} 
                            activeClassName="active"
                        >
                            Cerrar sesión
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
            <h1 className="text-2xl font-semibold "> </h1>
            </div>
        </div>
        
        );
    };

    export default Navbar;
