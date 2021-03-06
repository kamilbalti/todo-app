import React from "react";
import firebase from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setCall,
  setInput1,
  setInput2,
  setNum,
  setRealArr,
  setRedoArr,
  setTemp,
  setUndoArr,
} from "./store/action";

const Result = () => {
  const { user, realArr, call, undoArr, redoArr, sort, temp } = useSelector(
    (i) => i?.reducer1
  );
  const dispatch = useDispatch();
  const uid = user?.uid;

  const edit = (index) => {
    dispatch(setInput1(realArr[index].input1));
    dispatch(setInput2(realArr[index].input2));
    dispatch(setNum(index));
    dispatch(setCall(call + 1));
  };

  const del = (index) => {
    const deleteArr = realArr.filter((item2, index2) => index2 != index);
    // dispatch(setRealArr(realArr.filter((item2, index2) => index2 !== index)))
    firebase
      .database()
      .ref("messages/" + uid + "/todo")
      .set(deleteArr);
    // dispatch(setRealArr(deleteArr))
    // dispatch(setTemp(temp + 1))
    dispatch(setRedoArr([]));
    // dispatch(setCall(call + 1))
  };

  const undo = () => {
    dispatch(setInput1(""));
    dispatch(setInput2(""));
    dispatch(setNum(false));
    let redoArr2 = [...redoArr];
    redoArr2.push(undoArr[undoArr.length - 1]);
    firebase
      .database()
      .ref("messages/" + uid)
      .update({
        todo: undoArr[undoArr?.length - 2],
        undo: undoArr?.filter((item, index) => index < undoArr?.length - 1),
        redo: redoArr2,
      })
      .then(() => {})
      .catch((err) => {
        console.log(err, "error");
      });
    // undoArr2.pop();
    // dispatch(setRealArr(undoArr[undoArr.length - 2]))
    // dispatch(setRedoArr(redoArr2))
    // let undoArr2 = [...undoArr];
    // dispatch(setUndoArr(undoArr2))
    // dispatch(setCall(call + 1))
  };

  const redo = () => {
    dispatch(setInput1(""));
    dispatch(setInput2(""));
    dispatch(setNum(false));
    // dispatch(setRealArr(redoArr[redoArr?.length - 1]))
    firebase
      .database()
      .ref("messages/" + uid + "/todo")
      .update(undoArr[undoArr.length - 2]);
    // let undoArr2 = [...undoArr];
    // undoArr2.push(redoArr[redoArr?.length - 1]);
    // dispatch(setUndoArr(undoArr2))
    // let redoArr2 = [...redoArr];
    // redoArr2.pop();
    // dispatch(setRedoArr(redoArr2))
    // dispatch(setCall(call + 1))
  };

  const sorter = (a, b) => {
    switch (sort) {
      case "name":
        return a?.input2?.localeCompare(b?.input2);
      case "id":
        return a?.input1 - b?.input1;
      default:
        return 0;
    }
  };

  return (
    <div className="text">
      {realArr?.sort(sorter)?.map((item, index) => (
        <p key={index}>
          {index + 1 + " )"}
          &nbsp; &nbsp; &nbsp;
          {item?.input1}
          &nbsp; &nbsp; &nbsp;
          {item?.input2}
          <button className="button edit" onClick={() => edit(index)}>
            Edit
          </button>
          <button className="button edit" onClick={() => del(index)}>
            Delete
          </button>
        </p>
      ))}
      <div className="buttons">
        <button
          className="button"
          onClick={() => undo()}
          disabled={undoArr?.length < 2}
        >
          undo
        </button>
        <button
          className="button"
          onClick={() => redo()}
          disabled={!redoArr?.length}
        >
          redo
        </button>
      </div>
    </div>
  );
};

export default Result;
