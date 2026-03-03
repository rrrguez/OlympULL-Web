import PageHeader from "../components/layouts/PageHeader";

export default function NotFoundPage() {
    const backRouteFunction = () => {
        if (localStorage.getItem("type") === "ADMIN") {
            return "/admin"
        } else if (localStorage.getItem("type") === "ORGANIZER") {
            return "/organizer"
        } else if (localStorage.getItem("type") === "MONITOR") {
            return "/monitor"
        } else {
            return "/"
        }
    }
    return (
        <PageHeader
            title = "Página no encontrada"
            newButton={0}
            importButton={0}
            exportButton={0}
            backButtonRoute={backRouteFunction()}
        />
    );
}
