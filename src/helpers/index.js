export function convertDate(date) {
    let _d = null;
    const d = (typeof date === 'string' || date instanceof String) ? (
        _d = date.split(/[^0-9]/),
        new Date (_d[0], _d[1]-1, _d[2], _d[3], _d[4], _d[5])
    ) : new Date(date);
    
    return (isNaN(d.getTime()) || !date) ?
        'Invalid date'
        : `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}