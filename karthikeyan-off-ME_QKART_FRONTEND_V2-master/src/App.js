import Register from "./components/Register";
import Login from "./components/Login";
import ipConfig from "./ipConfig.json";
import Checkout from "./components/Checkout"
import Products from "./components/Products";
import Thanks from "./components/Thanks";

import { Switch,Route } from "react-router-dom";
export const config = {
  endpoint: `https://qkart-frontend-oi2j.onrender.com`,
};

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes> */}
      <Switch>
        <Route path="/" exact>
          <Products />
        </Route>
        <Route path="/register" exact>

          <Register />
        </Route>
        <Route path="/login" exact>
          <Login /></Route>
        <Route path="/checkout" exact>
          <Checkout />
        </Route>
        <Route path="/thanks" exact>
          <Thanks />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
