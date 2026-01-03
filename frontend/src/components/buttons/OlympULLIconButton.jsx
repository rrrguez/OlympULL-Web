import { useNavigate } from "react-router-dom";

export default function OlympULLIconButton({ text, buttonClass, route, icon }) {
    const navigate = useNavigate();

    return (
        <button
            className = { buttonClass }
            onClick={() => navigate(route)}
        >
            {icon && <i className={`${icon} me-2`}></i>}
            <span className="button-text">{text}</span>
        </button>
    );
}
