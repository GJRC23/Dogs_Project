import { BrowserRouter, Route } from "react-router-dom";
import Nav from "../../common/components/Nav/Nav";
import Dogs from "../Dogs/Dogs";
import DogDetails from "../DogDetails/DogDetail";
import CreateDog from "../CreateDog/CreateDog";
import Home from "../Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Nav />
        <Route exact path="/" children={<Home />} />
        <Route exact path="/dogs" children={<Dogs />} />
        <Route exact path="/dogs/:id" children={<DogDetails />} />
        <Route exact path="/create/dog" children={<CreateDog />} />
    </BrowserRouter>
  );
}

export default App;