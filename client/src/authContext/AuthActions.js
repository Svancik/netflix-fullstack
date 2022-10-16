//login
// Pokud jsou přihlašovací údaje ok: status=success, pokud ne tak: status=failure
export const loginStart = () =>({
    type:"LOGIN_START",
});

//při úspěšném loginu nám server (route) vrátí objekt user => vložíme ho do payload
export const loginSuccess = (user) =>({
    type:"LOGIN_SUCCESS",
    payload: user,
});

export const loginFailure = () =>({
    type:"LOGIN_FAILURE",
});


//logout
export const logout = () =>({
    type:"LOGOUT",
});

