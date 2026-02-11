import { Container } from "react-bootstrap";
import UsersList from "../../components/Users/List";
import PageHeader from "../../components/layouts/PageHeader";
import { toast } from "react-toastify";
import { useState } from "react";
import ImportModal from "../../components/modals/ImportModal";
import { importUsers, exportUsers } from "../../api/usersApi";

export default function AdminUsersPage() {
    const [importOpen, setImportOpen] = useState(false);

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

            <UsersList/>

            <ImportModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={importUsers}
                title="Importar usuarios"
                successMessage="Usuarios importados con éxito"
            />
        </Container>
    );
}
