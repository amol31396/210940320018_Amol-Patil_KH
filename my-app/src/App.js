import React, { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
  return (
    <>
      <MyComponent />
    </>
  );
}

function MyComponent() {
  const [MESSAGE, setMESSAGE] = useState("");
  const [list, setList] = useState([]);
  const addMsg = async () => {
    if (MESSAGE == "") {
      alert("Write Message 1st");
      return
    }
    const url = "http://localhost:4000/addMsg";
    const msg = {
      MESSAGE: MESSAGE
    };

    await axios.post(url, msg);

    const newList = [msg, ...list];
    setList(newList);

    setMESSAGE("")
  };

  const handleMsg = (event) => {
    setMESSAGE(event.target.value);
  };

  const showMsg = async () => {
    const url = "http://localhost:4000/showMsg";
    const result = await fetch(url);
    const list = await result.json();

    const newList = [...list];
    setList(newList);
  };

  useEffect(() => showMsg(), []);

  return (
    <div className="container-sm">
      <div className="row bg-dark text-light">
        <h1>
          MyChatApp <sub>by Amol Patil_210940320018</sub>
        </h1>
      </div>
      <div className="row mt-2 mb-2">
        <div className="col-sm-11">
          <input
            type="textarea"
            value={MESSAGE}
            onChange={handleMsg}
            placeholder="Lets chat here"
            className="form-control input-lg"
            style={{ height: 125 }}
          />
        </div>
        <div className="col-sm-1">
          <input
            type="button"
            value="send"
            onClick={addMsg}
            placeholder="Send"
            className="btn btn-outline-secondary"
            style={{ height: 125, width: 75 }}
          />
        </div>
      </div>
      {list.map((item, index) => (
        <div key={index} className="alert alert-dark border">
          {item.MESSAGE}
        </div>
      ))}
    </div>
  );
}
