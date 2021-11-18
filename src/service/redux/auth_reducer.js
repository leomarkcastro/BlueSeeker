const saveSlot = "Auth"
const ver = "09062021"

const initialState = {
    ver: ver,
    auth: undefined,
    authaccount: undefined
}

/*
async function load_profile(){
    
    let dat = {
        ...initialState
    }

    let check = await db_check(saveSlot)
    let loadSlot = null

    if (check) {
        loadSlot = await db_get(saveSlot)
        dat = {
            ...dat,
            ...loadSlot,
            ver: ver,
        }
    }

    db_set(saveSlot, dat)
        
    
    return dat

}

let _h = (async () => {
    let d = await load_profile()
    for (let key in initialState){
        initialState[key] = d[key]
    }
})
*/

const auth_reducer = (state = initialState, actions) => {

    let ret = null

    // actions should come in the form of objects with { type , value , ... }
    switch (actions.type){

        case 'SET_AUTH':

            ret = {
                ...state,
            }

            ret.auth = actions.value
            ret.authaccount = {
                first_run: false, //
                date_created: Date.now(), //
                date_active: Date.now(), //
                givenname: "Blue Worker", //
                fullname: "Blue Worker", //
                address_line: "", //
                city: "", //
                province: "", //
                zip: "", //
                country: "", //
                work_profile: [], 
                portfolio: [], // ignore
                skills: "", // 
                work_time: "8",
                languages: "", //
                education: [], // ignore
                projects: [], //
              }
            
            return ret
        

        case 'SET_AUTHACCOUNT':

            ret = {
                ...state,
            }

            ret.auth = actions.account
            ret.authaccount = actions.info
            
            return ret

        case 'SET_AUTHINFO':

            ret = {
                ...state,
            }

            ret.authaccount = actions.value
            
            return ret
        
        default:
            return state
    }

    
}

export default auth_reducer