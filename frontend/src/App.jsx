import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Switch } from "react-browser-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
