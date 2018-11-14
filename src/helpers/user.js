export const cloneUser = (user = {}) => {
    return user.pro ? {
        ...user,
        pro: { ...user.pro }
    } : {
        ...user
    }
} 

export const checkPro = (user, changedInfo) => {
    if (!changedInfo) return;
    console.log('[checkPro]');
    let changedFields = {};
    let d, new_d;
    for (let key in changedInfo){
        
        user.pro.hasOwnProperty(key) ? (
            user.pro[key] !== changedInfo[key] && (
                changedFields[key] = user.pro[key],
                user.pro[key] = changedInfo[key]
            )
        ) : user.hasOwnProperty(key) 
            && (
                key === 'dateOfBirth' ? (
                    d = new Date(user[key]),
                    new_d = new Date(changedInfo[key]),
                    !(d.getDate() === new_d.getDate() 
                        && d.getFullYear() === new_d.getFullYear() 
                        && d.getMonth() === new_d.getMonth())
                            && (
                                changedFields[key] = user[key],
                                user[key] = changedInfo[key]
                            )
                ) : (
                    user[key] !== changedInfo[key] && (
                        changedFields[key] = user[key],
                        user[key] = changedInfo[key]
                    )
                )
            )
        
    }
    return changedFields;
};

export const checkNotPro = (user, changedInfo) => {
    if (!changedInfo) return;
    console.log('[checkNotPro]');
    let changedFields = {};
    user.pro = {};
    for (let key in changedInfo){
        
        user.hasOwnProperty(key) ? (
            user[key] !== changedInfo[key] && (
                changedFields[key] = user[key],
                user[key] = changedInfo[key]
            )
        ) : (
            changedFields[key] = "",
            user.pro[key] = changedInfo[key]
        );
        
    }

    return changedFields;
};

export const checkForLocation = (user, changedFields) => {
    const {location = null} = user;

    if (changedFields.hasOwnProperty('location')){
        let prevLocation = JSON.parse(location) ? JSON.parse(location) : {};
        for (let key in prevLocation){
            changedFields.location 
                ? (changedFields.location[key] !== prevLocation[key] && (changedFields[key] = prevLocation[key]) )
                : ( changedFields[key] = "" )
        }
    }
};