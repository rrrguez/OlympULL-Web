// Function to show the exercise categories in Spanish

export default function translateCategory(category) {
    if (category == 'ABSTRACTION') {
        return "Abstracción";
    } else if (category == 'ALGORITHMS') {
        return "Algoritmos";
    } else if (category == 'LOOPS') {
        return "Bucles";
    } else if (category == 'CONDITIONALS') {
        return "Condicionales";
    } else if (category == 'COMPOSITION') {
        return "Composición";
    } else if (category == 'FUNCTIONS') {
        return "Funciones";
    } else if (category == 'AI') {
        return "Inteligencia Artificial";
    } else if (category == 'PATTERNS RECOGNITION') {
        return "Reconocimiento de patrones";
    } else if (category == 'SEQUENCES') {
        return "Secuencias";
    } else if (category == 'LOOPS AND SEQUENCES') {
        return "Secuencias y bucles";
    } else if (category == 'VARIABLES') {
        return "Variables";
    } else if (category == 'VARIABLES AND FUNCTIONS') {
        return "Variables y funciones";
    } else {
        return "Otro";
    }
}
