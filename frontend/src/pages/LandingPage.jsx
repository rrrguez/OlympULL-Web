import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import OlympULLIconButton from "../components/buttons/OlympULLIconButton";
import OlympULLButton from "../components/buttons/OlympULLButton";
import Footer from "../components/layouts/Footer";

export default function LandingPage() {
    document.body.style.cursor = "default";

    const navigate = useNavigate();

    return (
        <>
        <div className="landing-container">
            <div className="landing-div">
                <img
                    className="landing-logo"
                    src="/olympull-web_logo_purple.png"
                    alt="OlympULL Web logo"
                />

                <div className="landing-buttons">
                    <OlympULLButton
                        text="Inicio de sesión"
                        title="Inicio de sesión"
                        onClickAction={() => navigate("/login")}
                        buttonClass="landing-left-button"
                    />


                    <OlympULLButton
                        text="Acceso a rankings"
                        title="Acceso a rankings"
                        onClickAction={() => navigate("/ranking")}
                        buttonClass="landing-right-button"
                    />
                </div>
            </div>
        </div>

        <Footer/>
        </>
    );
}
