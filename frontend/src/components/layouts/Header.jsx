import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import OlympULLIconButton from "../../components/buttons/OlympULLIconButton";

export default function Header() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        localStorage.removeItem("id");
        toast.info("Se ha cerrado la sesión. ¡Hasta pronto!");
        setOpen(!open);
    }

    return (
        <header className="app-header">
        <img
            className="logo"
            src="/olympull-web_logo.png"
            alt="OlympULL Web logo"
        />
            {location.pathname != "/login" &&
            <div className="user-menu-wrapper">
                <div
                    className={`user-menu ${open ? "open" : ""}`}
                    ref={menuRef}
                >
                    <div className="user-menu-icons">
                        <i className="fa-solid fa-user"></i>
                        <i className="fa-solid fa-caret-down"
                        onClick={() => setOpen(!open)}></i>
                    </div>
                </div>

                {open && (
                    <div className="user-dropdown"
                    onClick={(e) => e.stopPropagation()}>
                        <OlympULLIconButton
                            text="Cambiar contraseña"
                            buttonClass="dropdown-button"
                            icon="fa-solid fa-key"
                            route="/change-password"
                            onClick={() => setOpen(false)}
                        />
                        <OlympULLIconButton
                            text = "Cerrar sesión"
                            buttonClass="dropdown-button"
                            icon="fa-solid fa-power-off"
                            route="/login"
                            onClick={() => handleLogout()}
                        />
                    </div>
                )}
            </div>
            }
        </header>
    );
}
