interface stateType {
    auth : boolean,
    user ?: string,
    haveFaceData?: number
}
interface actionType {
    type:string,
    [propsName:string]:any
}
const initState={
    auth:false
};
export function Reducer(state:stateType=initState, action:actionType){
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {...state,...action.data};
        default: return state
    }
}



//Constants
const USER_STATE_CHANGE="user_state_change";




//ActionCreators   存储所有操作或者查询redux的action
interface changeUserType{
    user?:string,
    eMail?:string,
    haveFaceData?:number
}
export function changeUserState(data:changeUserType){
    return async (dispatch: (arg0: any) => void)=>{
        dispatch({type:USER_STATE_CHANGE,data:data})
    }
}