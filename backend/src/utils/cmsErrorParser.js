export function parseCmsError(raw) {
    if (!raw) return null;

    // Se cogen las últimas dos líneas
    const lastTwoLines = raw.trim().split("\n").slice(-2).join("\n");

    let friendlyMessage = lastTwoLines;

    // FileNotFoundError → archivos faltantes
    if (lastTwoLines.includes("FileNotFoundError")) {
        friendlyMessage = "Falta un archivo requerido en uno de los ejercicios (input/output). Comprueba los nombres de los contenidos de los ZIP.";
    }
    // Usuario no encontrado
    else if (/User .* not found in database/.test(lastTwoLines)) {
        const match = lastTwoLines.match(/User (.*) not found in database/);
        const username = match ? match[1] : "";
        friendlyMessage = `El usuario ${username} no existe en la base de datos. Selecciona "Importar participantes" antes de importar o actualizar la olimpiada.`;
    }
    // Concurso ya existe
    else if (/Contest .* already exists in database/.test(lastTwoLines)) {
        const match = lastTwoLines.match(/Contest (.*) already exists in database/);
        const contestName = match ? match[1] : "";
        friendlyMessage = `La olimpiada ${contestName} ya ha sido importada en CMS. Selecciona "Actualizar olimpiada" para modificar sus datos.`;
    }

    else {
        console.log(lastTwoLines)
        friendlyMessage = "Error al importar o actualizar. Comprueba que la olimpiada tiene ejercicios y participantes asignados."
    }

    return friendlyMessage;
}
