// Input fields syntax validation utils

export const idPattern           = "^[a-zA-Z0-9\\-_]{3,30}$";
export const namePattern         = "^[A-Za-zÀ-ÿ0-9 \\-.]{3,50}$";
export const descPattern         = /^[A-Za-zÀ-ÿ0-9 .,\\-]{0,100}$/;
export const exDescPattern       = /^[A-Za-zÀ-ÿ0-9 .,\\-]{0,200}$/;
export const rubricPointsPattern = "^\\d+(\\.\\d+)?(?:, ?\\d+(\\.\\d+)?)+$";
export const rubricLabelsPattern = "^[A-Za-z]+(?:, ?[A-Za-z]+)+$";
export const resourcesPattern    = "^[A-Za-zÀ-ÿ0-9 .,\\-]{1,50}$";
export const numericPattern      = "^[0-9]{0,10}$";
export const schoolPattern       = "^[A-Za-zÀ-ÿ0-9 .,\\-]{1,200}$";

export const onInvalidId =
    `
    Solo se permiten letras, números, guiones y guiones bajos.
    Debe tener entre 3 y 30 caracteres.
    `
;
export const onInvalidName =
    `
    Solo se permiten letras, números, espacios, guiones y puntos.
    Debe tener entre 3 y 50 caracteres.
    `
;
export const onInvalidDesc =
    `
    Solo se permiten letras, números, espacios, apóstrofes, guiones, puntos y comas.
    Debe tener entre 0 y 100 caracteres.
    `
;
export const onInvalidExDesc =
    `
    Solo se permiten letras, números, espacios, apóstrofes, guiones, puntos y comas.
    Debe tener entre 0 y 200 caracteres.
    `
;
export const onInvalidRubricPoints =
    `
    Se deben introducir los puntos separados por comas.
    Ejemplos: "0, 5, 10", "0,5".
    No más de 50 caracteres.
    `
;
export const onInvalidRubricLabels =
    `
    Se deben introducir las etiquetas separadas por comas.
    Ejemplos: "Mal, Regular, Bien", "Mal,Bien".
    No más de 300 caracteres.
    `
;
export const onInvalidResources =
    `
    Solo se permiten letras, números, espacios, apóstrofes, guiones, puntos y comas.
    Debe tener entre 1 y 50 caracteres.
    `
;
export const onInvalidNumeric =
    `
    Solo se permiten números enteros.
    `
;
