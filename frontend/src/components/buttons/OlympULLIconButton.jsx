import { useNavigate } from "react-router-dom";

export default function OlympULLIconButton({ text, buttonClass, route, icon, onClick }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (route) navigate(route);

        if (onClick) {
            requestAnimationFrame(onClick);
        }
    };

    return (
        <button
            className = { buttonClass }
            onClick={handleClick}
        >
            {icon && <i className={`${icon} me-2`}></i>}
            <span className="button-text">{text}</span>
        </button>
    );
}
