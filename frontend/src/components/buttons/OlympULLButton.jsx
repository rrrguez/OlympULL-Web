export default function OlympULLButton({ text, buttonClass = "", route="", onClickAction="" }) {

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
