import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./app.css";
import signGoogle from "./auth_google";
import CardEdit from "./components/card_edit";
import CardPreview from "./components/card_preview";
import Login from "./components/login";
import Prac from "./components/prac";

import firebase from "./firebase";

function App() {
  const [user, setUser] = useState({});
  const [text, setText] = useState({ text: "", age: "" });
  const [login, setLogin] = useState(true);
  const history = useHistory();

  const onChange = (e) => {
    const inputName = e.target.name;
    const newText = e.target.value;
    updateText(inputName, newText);
  };

  const updateText = (newData, cardId) => {
    firebase.database().ref(`cards/${user.name}/${cardId}`).set(newData);
  };

  const addCard = (e) => {
    e.preventDefault();
    console.log(e.target[0].value, "1111");
    const text = e.target[0].value;
    const age = e.target[1].value;
    firebase.database().ref(`cards/${user.name}`).push().set({ text, age });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("로그아웃");
        console.log(firebase.auth().currentUser);
        setUser({});
        console.log(login);
        setLogin(false);
      });
  };

  useEffect(() => {
    console.log(login);
    console.log(user);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        setUser({ name: user.displayName });
        setLogin(true);
        console.log(user.displayName, "----------uid");
        email &&
          firebase
            .database()
            .ref(`cards/${user.displayName}`)
            .on("value", (data) => {
              if (data.val()) {
                console.log(data.val(), "ggkkgkgkgk");
                const datas = data.val();
                console.log(Object.keys(datas).map((key) => datas[key]));
                const texts = Object.keys(datas).map((key) => {
                  datas[key]["cardId"] = key;
                  return datas[key];
                });
                setText(texts);
                console.log(texts);
              }
            });
      } else {
        console.log("로그아웃됨!!");
        setLogin(false);
        setUser({ name: "정보없음" });
        console.log(login);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div>USER : {user.name}</div>
      <Switch>
        <Route exact path="/login">
          {login ? (
            <Redirect to="/" />
          ) : (
            <Login firebase={firebase} signGoogle={signGoogle} />
          )}
        </Route>
        <Route exact path="/">
          {login ? (
            <>
              <button onClick={logout}>Logout</button>
              <div>
                {firebase.auth().currentUser && firebase.auth().currentUser.uid}
              </div>
              <form
                onSubmit={addCard}
                onChange={(e) => console.log(e.target.key)}
              >
                <input type="text" name="text" />
                <input type="text" name="age" />
                <button type="submit">추가</button>
              </form>
              <div className="main">
                {text.length > 1 &&
                  text.map((item) => (
                    <CardEdit
                      key={item.cardId}
                      card={item}
                      update={updateText}
                    />
                  ))}
              </div>
              <div>
                {text.length > 1 &&
                  text.map((item) => (
                    <CardPreview key={item.cardId} card={item} />
                  ))}
              </div>
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/prac">
          <Prac />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
