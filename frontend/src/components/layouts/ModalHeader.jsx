import OlympULLIconButton from "../buttons/OlympULLIconButton"

export default function ModalHeader({ title, cancelAction }) {
    return (
        <>
            <div style={{display: "flex"}} className="modal-header-elements">
                <h2> { title } </h2>
                <OlympULLIconButton
                    text="Cancelar"
                    buttonClass="icon-button"
                    icon="fa-solid fa-xmark"
                    onClick={ cancelAction }
                />
            </div>
        </>
    );
}
