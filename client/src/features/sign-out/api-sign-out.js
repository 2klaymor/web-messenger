export function signOut(shouldRedirect = true) {
    localStorage.removeItem('accessToken');

    if (shouldRedirect) {
        window.location.href = '/signin';
    }
}