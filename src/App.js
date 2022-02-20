import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import PageNotFound from "./components/PageNotFound.js";
import PvP from './components/PvP.js';
import PvC from './components/PvC.js';

const App = () => {
  return (
    <div className={classes.App}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path='/pvp' exact element={<PvP />}/>
        <Route path='/pvc' exact element={<PvC />}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
