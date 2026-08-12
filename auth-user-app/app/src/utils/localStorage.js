export const saveCurrentUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};

export const removeCurrentUser = () => {
    localStorage.removeItem("currentUser");
};