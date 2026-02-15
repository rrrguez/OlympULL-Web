// Function to show the user types in Spanish

export default function translateUserType(userType) {
    if (userType == 'ADMIN') {
        return "Administrador";
    } else if (userType == 'MONITOR') {
        return "Monitor";
    } else if (userType == 'ORGANIZER') {
        return "Organizador";
    } else if (userType == 'PARTICIPANT') {
        return "Participante";
    } else {
        return "Otro";
    }
}
