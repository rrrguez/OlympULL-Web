import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function OlympULLButton({ text, buttonSize = "lg", buttonClass = "", route }) {
    const navigate = useNavigate();

    return (
        <Button
            size = { buttonSize }
            className = { buttonClass }
            onClick={() => navigate(route)}
        >
            { text }
        </Button>
    );
}
