import OlympULLIconButton from "../buttons/OlympULLIconButton"

export default function PageHeader({ title, newButton = 0, importButton = 0, exportButton = 0, newButtonText="", newButtonRoute="", importButtonOnClick="", exportButtonOnClick="", backButtonRoute}) {
    return (
        <>
            <div className="page-header-layout">
                <h1> { title } </h1>
                <div className="page-header-buttons">
                { newButton === 1 ? (
                    <OlympULLIconButton
                        text= { newButtonText }
                        buttonClass="icon-button"
                        route= { newButtonRoute }
                        icon="fa-solid fa-plus"
                    />
                ) : (
                    null
                )}
                { importButton === 1 ? (
                    <OlympULLIconButton
                        text="Importar datos"
                        buttonClass="icon-button"
                        onClick={ importButtonOnClick }
                        icon="fa-solid fa-file-arrow-down"
                    />
                ) : (
                    null
                )}
                { exportButton === 1 ? (
                    <OlympULLIconButton
                        text="Exportar datos"
                        buttonClass="icon-button"
                        onClick={ exportButtonOnClick }
                        icon="fa-solid fa-file-arrow-up"
                    />
                ) : (
                    null
                )}
                <OlympULLIconButton
                    text="Volver"
                    buttonClass="icon-button"
                    route={ backButtonRoute }
                    icon="fa-solid fa-angle-left"
                />
                </div>
            </div>
        </>
    );
}
