import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OlympULLIconButton from "../../components/buttons/OlympULLIconButton";

export default function Header() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
          if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false);
          }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="app-header">
        <img
            className="logo"
            src="/olympull-web_logo.png"
            alt="OlympULL Web logo"
        />
            <div className="user-menu-wrapper">
                <div
                    className={`user-menu ${open ? "open" : ""}`}
                    onClick={() => setOpen(!open)}
                    ref={menuRef}
                >
                    <div className="user-menu-icons">
                        <i className="fa-solid fa-user"></i>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>

                    {open && (
                    <div className="user-dropdown"
                    onClick={(e) => e.stopPropagation()}>
                        <OlympULLIconButton
                            text="Cambiar contraseña"
                            buttonClass="dropdown-button"
                            route="/change-password"
                            icon="fa-solid fa-key"
                        />
                        <OlympULLIconButton
                            text = "Cerrar sesión"
                            buttonClass="dropdown-button"
                            route="/login"
                            icon="fa-solid fa-power-off"
                        />
                    </div>
                    )}
                </div>
        </header>
    );
}
