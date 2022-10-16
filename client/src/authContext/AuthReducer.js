const AuthReducer = (state, action) =>{
    //action type jsou data z AuthActions a mohou tedy být: "LOGIN_START" "LOGIN_SUCCESS" "LOGIN_FAILURE"
    switch (action.type){
        // níže je returnován obj {} Initial State
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            };

        case "LOGIN_SUCCESS":
            return {
                //z AuthActions dáváme jako payload obj usera který nám vrací server / route
                user: action.payload,
                isFetching: false,
                error: false
            };
            
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: true,
                error: true
            };

        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false
            };
    }
}

export default AuthReducer;