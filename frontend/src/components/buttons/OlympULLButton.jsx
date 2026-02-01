import { useNavigate } from "react-router-dom";

export default function OlympULLButton({ text, buttonClass = "", route="", onClickAction="" }) {
    const navigate = useNavigate();

    return (
        <button
            className = { buttonClass }
            route={ route }
            onClick={onClickAction}
        >
            { text }
        </button>
    );
}
