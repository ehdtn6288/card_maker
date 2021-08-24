import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./app.css";
import CardAdd from "./components/card_add/card_add";

import CardEdit from "./components/card_edit/card_edit";
import CardPreview from "./components/card_preview/card_preview";
import Login from "./components/login";
import Prac from "./components/prac";

import firebase from "./firebase";

function App() {
  const [user, setUser] = useState({});
  const [text, setText] = useState([]);

  const [login, setLogin] = useState();

  const updateText = (newData, cardId) => {
    firebase.database().ref(`cards/${user.name}/${cardId}`).set(newData);
  };

  const addCard = (text, age, imgUrl) => {
    firebase
      .database()
      .ref(`cards/${user.name}`)
      .push()
      .set({ text, age, imgUrl });
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
        user &&
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
                console.log("SETTTT!!!!!!");
                console.log(texts);
              } else {
                setText([]);
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
  const onDelete = (key) => {
    firebase.database().ref(`cards/${user.name}/${key}`).remove();
  };
  return (
    <BrowserRouter>
      <div>USER : {user.name}</div>
      <Switch>
        <Route exact path="/login">
          {login ? <Redirect to="/" /> : <Login firebase={firebase} />}
        </Route>

        <Route exact path="/">
          {login ? (
            <>
              <button onClick={logout}>Logout</button>
              <div>
                {firebase.auth().currentUser && firebase.auth().currentUser.uid}
              </div>
              <div>
                <CardAdd addCard={addCard} />
              </div>

              <div className="main">
                {text &&
                  text.map((item) => (
                    <CardEdit
                      key={item.cardId}
                      card={item}
                      update={updateText}
                      onDelete={onDelete}
                    />
                  ))}
              </div>
              <div>
                {text &&
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
