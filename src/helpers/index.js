export function convertDate(date) {
    Date.prototype.isDstObserved && setDstObserved();

    let _d = null;
    let d = (typeof date === 'string' || date instanceof String) ? (
        _d = date.split(/[^0-9]/),
        new Date (_d[0], _d[1]-1, _d[2], _d[3], _d[4], _d[5])
    ) : new Date(date);
    
    return (isNaN(d.getTime()) || !date) ?
        'Invalid date'
        : (
            d.isDstObserved && d.setHours(d.getHours() + 1),
            `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`
        );
}

function setDstObserved(){
    Date.prototype.stdTimezoneOffset = function () {
        let jan = new Date(this.getFullYear(), 0, 1);
        let jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }
    Date.prototype.isDstObserved = function () {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }
}

function converVersionToNum(version){
    return version.split('.').reduce((acc, el, i, arr) => { 
        return acc + (+el)*Math.pow(100, (arr.length - i - 1)*2);
    }, 0)
}
export function sortVersions(a, b){

    let _a = a ? converVersionToNum(a) : 0;
    let _b = b ? converVersionToNum(b) : 0;
    return _a - _b;
}

export function secToDH(sec = 0){
    let h = Math.floor(sec / 3600),
        d;

    h > 24 && (
        d = Math.floor(h/24),
        h = Math.floor(h % 24)
    )
    
    return `${d ? d+'d ' : ''}${h ? h+'h ' : ''}`;
}

export function secToMS(sec = 0){
    const s = sec % 60;
    const m = (sec - s) / 60;
    
    return `${m ? m+'m ' : ''}${s}s`;
}

export function secToHMS(sec = 0){
    const h = Math.floor(sec / 3600),
        m = Math.floor(sec % 3600 / 60),
        s = Math.floor(sec % 3600 % 60);
    return `${h ? h+'h ' : ''}${m ? m+'m ' : ''}${s}s`;
}

export function countItemsByStatus(arr, fieldKey){
    return arr.reduce((acc, el) => {
        let stat = el[fieldKey];
        acc[stat] = (acc[stat] || 0) + 1;
        return acc;
    }, {});
}