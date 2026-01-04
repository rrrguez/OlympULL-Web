import OlympULLIconButton from "../buttons/OlympULLIconButton"

export default function PageHeader({ title, newButton = 0, importButton = 0, exportButton = 0, newButtonText="", newButtonRoute="", importButtonRoute="", exportButtonRoute="", backButtonRoute}) {
    return (
        <>
            <div style={{display: "flex"}}>
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
                    <div/>
                )}
                { importButton === 1 ? (
                    <OlympULLIconButton
                        text="Importar datos"
                        buttonClass="icon-button"
                        route={ importButtonRoute }
                        icon="fa-solid fa-file-arrow-down"
                    />
                ) : (
                    <div/>
                )}
                { exportButton === 1 ? (
                    <OlympULLIconButton
                        text="Exportar datos"
                        buttonClass="icon-button"
                        route={ exportButtonRoute }
                        icon="fa-solid fa-file-arrow-up"
                    />
                ) : (
                    <div/>
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
