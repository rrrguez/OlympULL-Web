import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function OlympULLButton({ text, buttonClass = "", route }) {
    const navigate = useNavigate();

    return (
        <button
            className = { buttonClass }
            onClick={() => navigate(route)}
        >
            { text }
        </button>
    );
}
