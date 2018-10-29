export function convertDate(date) {
    let d = new Date(date);

    return (isNaN(d.getTime())) ?
        'Invalid date'
        : `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
}