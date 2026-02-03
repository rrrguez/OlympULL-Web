// Functions related to olympiads

export default function getOlympiadStatus(start, stop) {
    const now = new Date();
    const startDate = new Date(start);
    const stopDate = new Date(stop);

    if (now < startDate) {
        return (
            "pending"
        );
    }

    if (now >= startDate && now <= stopDate) {
        return (
            "active"
        );
    }

    return (
        "finished"
    );
}
