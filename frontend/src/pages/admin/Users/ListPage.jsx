import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";
import PageHeader from "../../../components/layouts/PageHeader";
import ImportModal from "../../../components/modals/ImportModal";
import UsersList from "../../../components/Users/List";
import { importUsers, exportUsers } from "../../../api/usersApi";

export default function UsersListPage() {
    const [importOpen, setImportOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const exportUsersFunction = async () => {
        try {
            const res = await exportUsers();

            const blob = new Blob([res.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "users.csv";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <Container>
            <PageHeader
                title="Gestión de usuarios"
                newButton={1}
                importButton={1}
                exportButton={1}
                newButtonText="Nuevo usuario"
                newButtonRoute="/admin/users/new"
                importButtonOnClick={() => setImportOpen(true)}
                exportButtonOnClick={exportUsersFunction}
                backButtonRoute="/admin"
            />

            <UsersList refreshKey={refreshKey}/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importUsers}
                title="Importar usuarios"
                successMessage="Usuarios importados con éxito"
                onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
        </Container>
    );
}
