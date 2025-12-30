import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function OlympULLIconButton({ text, buttonSize = "sm", buttonClass = "", route, icon }) {
    const navigate = useNavigate();

    return (
        <Button
            size = { buttonSize }
            className = { buttonClass }
            onClick={() => navigate(route)}
        >
            {icon && <i className={`${icon} me-2`}></i>}
            { text }
        </Button>
    );
}
