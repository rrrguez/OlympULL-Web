// Functions that manage the dates in OlympULL

export default function formatDate(dateFromDB) {
    const date = dateFromDB.split("T")[0];
    const formattedDateArray = date.split("-");
    const formattedDate = formattedDateArray[2] + "-" + formattedDateArray[1] + "-" + formattedDateArray[0];

    let time = dateFromDB.split("T")[1];
    time = time.split(".000Z")[0];
    let timeArray = time.split(":");
    time = timeArray[0] + ":" + timeArray[1];

    return formattedDate + ", " + time;
}
