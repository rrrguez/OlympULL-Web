import { useState } from "react";
import { toast } from "react-toastify";
import ModalHeader from "../layouts/ModalHeader";
//import { importOlympiads } from "../../api/olympiadsApi";

export default function ImportModal({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Selecciona un archivo CSV");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      //await importOlympiads(formData);
      toast.success("Datos importados correctamente");
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Error al importar datos"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <ModalHeader
            title="Importar datos"
            cancelAction={
                (e) => {
                    e.stopPropagation();
                    onClose();
                }
            }
        />

        <div className="modal-body">
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="import-button"
                >
                    {loading ? "Importando..." : "Importar"}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}
