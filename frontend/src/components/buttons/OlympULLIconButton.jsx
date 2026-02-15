import { useNavigate } from "react-router-dom";

export default function OlympULLIconButton({ text, buttonClass, route, icon, onClick, title, type }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (route) navigate(route);

        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            className = { buttonClass }
            onClick={handleClick}
            title={title}
            type = { type }
        >
            {icon && <i className={`${icon} me-2`}></i>}
            <span className="button-text">{text}</span>
        </button>
    );
}
