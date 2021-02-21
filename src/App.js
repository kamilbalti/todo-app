import React, { useEffect, useState } from "react";
import "./App.css";
import Result from "./result";
import Dropdown from "./dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setInput1, setNum ,setInput2, setRealArr, setRedoArr, setTemp, setUndoArr, setUser, setCall, setData } from "./store/action";
import firebase from "./firebase"

function App() {
  const { data, call, realArr, temp, inputVal, inputVal2, num, undoArr, user } = useSelector((e) => e?.reducer1)
  const [object, setObject] = useState(false);
  const [submitNum, setSubmitNum] = useState(false);
  // const [id, setId] = useState(false);
  const dispatch = useDispatch()
  const uid = user?.uid
  
  useEffect(() => {
    console.log(user, "user");
    firebase.database().ref(`messages/${uid}`)
    .on('value', (res)=>{
      console.log(res?.val(), "res")
      dispatch(setRealArr(res?.val()?.todo))
      dispatch(setUndoArr(res?.val()?.undo))
      dispatch(setRedoArr(res?.val()?.redo))
    })
    let undoArr2 = [...undoArr];
    undoArr2.push(realArr);
  }, []);

  useEffect(() => {
    // dispatch(setData(realArr))
    // dispatch()
  },[call])

  useEffect(() => {
    let object2;
    object2 = { input1: inputVal, input2: inputVal2 };
    setObject(object2);
  }, [inputVal, inputVal2]);


  const submit = () => {
    // setObject({ input1: inputVal, input2: inputVal2 });
    let submitArr = Array.isArray(realArr) ? [...realArr] : [];
    submitArr.push(object);
    firebase.database().ref('messages/'+uid + "/todo").update(submitArr)
    // dispatch(setRealArr(submitArr))
    // dispatch(setTemp(temp+1))
    // setSubmitNum(submitNum + 1);
    dispatch(setInput1(""))
    dispatch(setInput2(""))
    dispatch(setRedoArr([]))
    // setId(id+1)
    // dispatch(setCall(call + 1))
  };


    const update = () => {
    let updateArr = [...realArr];
    updateArr[num].input1 = inputVal;
    updateArr[num].input2 = inputVal2;
    firebase.database().ref('messages/'+uid + "/todo/" + num).update(updateArr[num])
    // dispatch(setRealArr(updateArr))
    // dispatch(setTemp(temp+1))
    dispatch(setInput1(""))
    dispatch(setInput2(""))
    dispatch(setNum(false))
    dispatch(setRedoArr([]))
    // dispatch(setCall(call + 1))
  };


  const onSubmit = (e) => {
    e.preventDefault();
    num || num === 0 ? update() : submit();
    dispatch(setCall(call + 1))
  }


  const logOut = () => {
    let temp2 = firebase.auth().signOut()
    dispatch(setUser(false))
  }


  return (
    <div className="App">
      <div className="text">
        <span>
          <h1>TODO LIST</h1>
          <button onClick={logOut}>Sign Out</button>
        </span>
        <form className="form" onSubmit={onSubmit}>
          <h3>ID Number</h3>
          <input className="input" type="number" value={inputVal}
          onChange={(e) => dispatch(setInput1(e.target.value))}/>
          <h3>Name</h3>
          <input className="input" type="text" value={inputVal2}
          onChange={(a) => dispatch(setInput2(a.target.value))}/>
          {!num && num !== 0 ? (
            <button className="button submit" type="submit">
              Submit</button>
          ) : (
            <button className="button submit" type="submit">
              Update
            </button>
          )}
        </form>
        <Dropdown />
      </div>
        <Result />
    </div>
  );
}

export default App;