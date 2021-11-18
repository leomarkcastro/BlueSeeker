const saveSlot = "Jobs"
const ver = "09062021"

const initialState = {
    ver: ver,
    job_data: {},
    current_page: "xxx", 
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

const jobdata_reducer = (state = initialState, actions) => {

    let ret = null

    // actions should come in the form of objects with { type , value , ... }
    switch (actions.type){

        case 'SET_JOBDATA':

            ret = {
                ...state,
            }

            ret.job_data = actions.value
            
            return ret

        case 'SET_CURRENTPAGE':

            ret = {
                ...state,
            }

            ret.current_page = actions.value
            
            return ret
        
        default:
            return state
    }

    
}

export default jobdata_reducer