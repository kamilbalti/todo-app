// import { act } from "react-dom/test-utils";

import { Set_Data ,Set_Call ,Set_Temp, Set_Sort , Set_Input1, Set_Input2, Set_Num, Set_RealArr, Set_RedoArr, Set_UndoArr, Set_User, Set_User2 } from "./actiontype";

const initialState = {
    realArr: [],
    inputVal: "",
    inputVal2: "",
    num: false,
    undoArr: [],
    redoArr: [],
    sort: false,
    temp: 0,
    user: "loading",
    user2: false,
    call: false,
    data: false,
};


const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case Set_RealArr:
            return{
                ...state,
                realArr: action.payload
        }
        case Set_Num:
            return{
                ...state,
                num: action.payload
            }
            case Set_UndoArr:
            return{
                ...state,
                undoArr: action.payload
            }
            case Set_RedoArr:
            return{
                ...state,
                redoArr: action.payload
            }
        case Set_Sort:
            return{
                ...state,
                sort: action.payload
            }
        case Set_Temp:
            return{
                ...state,
                temp: action.payload
            }
        case Set_Input1:
            return{
                ...state,
                inputVal: action.payload
            }
        case Set_Input2:
            return{
                ...state,
                inputVal2: action.payload
            }
        case Set_User:
            return{
                ...state,
                user: action.payload
            }
        case Set_User2:
            return{
                ...state,
                user2: action.payload
            }
        case Set_Call:
            return{
                ...state,
                call: action.payload
            }
        case Set_Data:
            return{
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}
export default Reducer