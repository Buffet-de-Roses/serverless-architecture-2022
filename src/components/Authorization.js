/* eslint-disable indent */

function canRead(user) {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
}

function canEdit(user) {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
}

function canDelete(user) {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
}

function checkAuthorization(user, allowedRoles) {
    if (!user) return false;
    for (const role of allowedRoles) {
        if (user.roles[role]) {
            return true;
        }
    }
    return false;
}

export {
    canDelete,
    canRead,
    canEdit,
    checkAuthorization
};