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
import { Logout as LogoutIcon } from '@mui/icons-material';

import {
    Dashboard as DashboardIcon,
    Person as AccountsIcon,
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

    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Informacion", icon: <DashboardIcon />, link: "/home", roles: ["mesero", "cocinero", "jefeCocina", "administrador"] },
        { title: "Platillos", icon: <BrunchDiningIcon />, gap: true, link: "/dishes", roles: ["usuario", "mesero", "cocinero", "jefeCocina", "administrador"] },
        { title: "Ordenes", icon: <SummarizeIcon />, link: "/order/all", roles: ["mesero", "cocinero", "jefeCocina", "administrador"] },
        { title: "Inventario", icon: <InventoryIcon />, link: "/inventory", roles: ["mesero", "cocinero", "jefeCocina", "administrador"] },
        { title: "Notificaciones", icon: <AccessAlarmIcon />, gap: true, link: "/order/orderByChef", roles: ["mesero", "cocinero", "jefeCocina", "administrador"] },
        { title: "Usuarios", icon: <AccountsIcon />, link: "/users", roles: ["administrador"] },
    ];

    if (userRole === "usuario" && location.pathname === "/home") {
        navigate('/dishes');
    }

    return (
        <div className="flex">
            <div
                className={` ${open ? "w-72" : "w-20"} bg-[#212121] h-screen p-5 pt-8 relative duration-300`}
            >
                <ArrowCircleRightIcon
                    src="./src/assets/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 bg-[#212121] text-white border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />

                <div className="flex gap-x-4 items-center">
                    <RestaurantIcon
                        className={`cursor-pointer text-white duration-500 ${open && "rotate-[360deg]"}`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
                    >
                        COCINERIAS
                    </h1>
                </div>

                <ul className="pt-6">
                    {Menus.filter(Menu => Menu.roles.includes(userRole)).map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4  ${Menu.gap ? "mt-9" : "mt-2"}`}
                        >
                            <NavLink
                                to={Menu.link}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-x-4 ${isActive ? "active text-white" : "text-gray-300"}`
                                }
                            >
                                <span className="text-white">{Menu.icon}</span>
                                <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-center justify-between bg-[#212121]">
                    <div className="text-left">
                        <p className={`text-white font-medium text-sm ${!open && "hidden"}`}>{user.name || 'Usuario'}</p>
                        <p className={`text-white text-xs ${!open && "hidden"}`}>{user.email || 'correo@example.com'}</p>
                    </div>
                    <LogoutIcon
                        onClick={() => {
                            logoutSubmit();
                            setMenuOpen(false);
                        }}
                        className="text-white cursor-pointer hover:text-white"
                    />
                </div>
            </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold"> </h1>
            </div>
        </div>
    );
};

export default Navbar;
