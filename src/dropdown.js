import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { setCall, setRealArr, setSort } from "./store/action";

const Dropdown = () => {
  const { user, realArr } = useSelector((a) => a?.reducer1);
  const [search, setSearch] = useState("");
  const [searchArr, setSearchArr] = useState("");
  const dispatch = useDispatch();
  const [checkNum, setCheckNum] = useState(true);
  const [checkNum2, setCheckNum2] = useState(false);
  // const [checkSearch, setCheckSearch] = useState(true)
  const [checkArr, setCheckArr] = useState(true);
  const uid = user?.uid;

  const searching = (a) => {
    setSearch(a);
    setCheckNum(false);
  };

  const check = (e) => {
    dispatch(setSort(e));
    setCheckNum2(checkNum2 + 1);
  };

  useEffect(() => {
    let checkArr = [...realArr];
    firebase
      .database()
      .ref("messages/" + uid + "/todo")
      .update(checkArr);
  }, [checkNum2]);

  useEffect(() => {
    if (search !== "") {
      dispatch(
        setRealArr(
          realArr?.filter(
            (item3, index3) =>
              realArr[index3]?.input1.includes(search) ||
              realArr[index3]?.input2.includes(search)
          )
        )
      );
    }
    if (search === "" && checkArr !== false && checkNum === false) {
      setCheckNum(true);
      dispatch(setRealArr(checkArr));
    }
  }, [search]);

  useEffect(() => {
    let searchArr2 = [...searchArr];
    searchArr2.push(search.length);
    setSearchArr(searchArr2);
    // setCheckSearch(searchArr.length-1)
  }, [search]);
  // console.log(searchArr, "searchArr", checkSearch, "checkSearch")

  useEffect(() => {
    if (!checkNum) {
      setCheckArr(Array.isArray(realArr) ? [...realArr] : []);
    }
  }, [checkNum]);

  return (
    <div className="text">
      <label>Search</label>
      &nbsp; &nbsp;
      <input
        className="search"
        type="text"
        placeholder="search here"
        value={search}
        onChange={(a) => searching(a.target.value)}
      />
      &nbsp; &nbsp;
      <label>sort by</label>
      &nbsp; &nbsp;
      <select onChange={(e) => check(e.target.value)}>
        <option name="sort" value={"none"}>
          none
        </option>
        <option name="sort" value={"name"}>
          Name
        </option>
        <option name="sort" value={"id"}>
          Id
        </option>
      </select>
    </div>
  );
};

export default Dropdown;
