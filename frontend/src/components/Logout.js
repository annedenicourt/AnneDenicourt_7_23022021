function Logout() {
    alert (" Vous êtes déconnecté ");
    localStorage.clear();

    return (
        window.location.href = '/'
        )
}

export default Logout