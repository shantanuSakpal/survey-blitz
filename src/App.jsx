import './stylesheets/index.css'
import CreateForms from "./pages/create_forms";
import Navbar from "./components/Navbar_2";

function App() {
    return (
        <div className="page-container" id="page">
            {/*<Navbar/>*/}
            <CreateForms/>
        </div>
    );
}

export default App;
