import React, { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [inputVal, setInputVal] = useState("");
  const [inputVal2, setInputVal2] = useState("");
  const [realArr, setRealArr] = useState([]);
  const [undoArr, setUndoArr] = useState([]);
  const [redoArr, setredoArr] = useState([]);
  const [temp, setTemp] = useState(0);
  const [num, setNum] = useState(false);
  const [undoNum, setUndoNum] = useState(false)
  const [redoNum, setRedoNum] = useState(false)
  const [object, setObject] = useState(false)
  const [submitNum, setSubmitNum] = useState(false)
  // const [input, setInput] = useState(false)
  // const [checked, setChecked] = useState(false)
  const [tempNum, setTempNum] = useState(false)
  
  useEffect(() => {
    setRedoNum(true)
    setUndoNum(true)
    setTempNum(temp)
    let undoArr2 = [...undoArr];
    undoArr2.push(realArr);
    setUndoArr(undoArr2);
  }, [temp]);
  

  useEffect(() => {
    let object2;
    object2 = {input1: inputVal, input2: inputVal2}
    setObject(object2)
  }, [inputVal, inputVal2]);
  

  const submit = () => {
    setObject({input1: inputVal, input2: inputVal2})
    let submitArr = [...realArr];
    submitArr.push(object);
    setRealArr(submitArr);
    setTemp(temp + 1);
    setSubmitNum(submitNum+1)
    setInputVal("");
    setInputVal2("");
  };


  const edit = (index) => {
    setInputVal(realArr[index].input1);
    setInputVal2(realArr[index].input2);
    setNum(index);
  };


  const del = (index) => {
    setRealArr(realArr.filter((item2, index2) => index2 !== index));
    setTemp(temp + 1);
  };


  const update = () => {
    let updateArr = [...realArr];
    updateArr[num].input1 = inputVal;
    updateArr[num].input2 = inputVal2;
    setRealArr(updateArr);
    setTemp(temp + 1);
    setInputVal("");
    setInputVal2("");
    setNum(false);
  };
  

  const undo = () => {
    setTempNum(false)
    setUndoNum(undoNum+1)
    setInputVal("")
    setNum(false)
    let redoArr2 = [...redoArr];
    redoArr2.push(undoArr[undoArr.length - 1]);
    setRealArr(undoArr[undoArr.length-2])
    setredoArr(redoArr2);
    let undoArr2 = [...undoArr];
    undoArr2.pop();
    setUndoArr(undoArr2);
  };


  const redo = () => {
    setTempNum(false)
    setRedoNum(redoNum + 1)
    setInputVal("")
    setNum(false)
    setRealArr(redoArr[redoArr?.length - 1]);
    let undoArr2 = [...undoArr];
    if (redoArr[redoArr?.length - 1])
    undoArr2.push(redoArr[redoArr?.length - 1]);
    setUndoArr(undoArr2);
    let redoArr2 = [...redoArr];
    redoArr2.pop();
    setredoArr(redoArr2);
  };

  
  useEffect(()=>{
    
  },[redoNum, undoNum])


  const onSubmit = (e) => {
    e.preventDefault();
    num || num === 0 ?
    update()
    :
    submit();
  };


  // const check = () => {
  //   if(checked === false){
  //     setChecked(true)
  //     realArr?.input1.sort((a,b) => {
  //       if(a < b)
  //       return 1
  //       else 
  //       return -1
  //     })
  //     console.log(realArr?.input1)
  //   }
  //   else{
  //     setChecked(false)
  //   }
  // }


  return (
    <div className="App">
      <div className="text">
        <h1>TODO LIST</h1>
        <form className="form" onSubmit={onSubmit}>
          <h3>ID Number</h3>
          <input className="input" type="text" value={inputVal} 
          onChange={(e) => setInputVal(e.target.value)}/>
          <h3>Name</h3>
          <input className="input" type="text" value={inputVal2} 
          onChange={(a) => setInputVal2(a.target.value)}/>
          {!num && num !== 0 ? (
            <button className="button submit" type="submit">Submit</button>
          ) : (
            <button className="button submit" type="submit">Update</button>
          )}
        </form>
        {realArr.map((item, index) => (
          <p key={index}>
            {item?.input1}
            &nbsp; &nbsp; &nbsp;
            {item?.input2}
            <button className="button edit" onClick={() => edit(index)}>Edit</button>
            <button className="button edit" onClick={() => del(index)}>Delete</button>
          </p>
        ))}
      </div>
      <div className="buttons">
        <button className="button" onClick={() => undo()} disabled={undoArr?.length < 2}>
          undo
        </button>
        <button className="button" onClick={() => redo()} disabled={!redoArr?.length}>
          redo
        </button>
        {/* <form>
          <label>
          <input type="radio" name="sort" onClick={() => check()} onChange={() => check()}
          checked={checked} value={input}/>sort</label>
        </form> */}
      </div>
    </div>
  );
}

export default App;