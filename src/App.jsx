// CSS
// import "./App.css";
import "./index.css";

// Packages
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Navbar from "./components/Nav";
import Footer from "./components/Footer";

// Forms
import RegisterForm from "./pages/Register";

// Pages
import HomePage from "./pages/Home";


const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <section className="container mx-auto h-screen">
            <div className=" flex items-center justify-center">
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route
                  path="/login"
                  element={
                    <>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      ></div>
                    </>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <>
                      <RegisterForm />
                    </>
                  }
                />
                <Route
                  path="/quizzes"
                  element={
                    <>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        Quizzes
                      </div>
                    </>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        Users
                      </div>
                    </>
                  }
                />
                <Route
                  path="/user"
                  element={
                    <>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        User
                      </div>
                    </>
                  }
                />
              </Routes>
            </div>
          </section>
          <Footer />
        </Layout>
      </Router>
    </>
  );
};
const Layout = ({ children }) => {
  const location = useLocation();

  //Define paths navbar should be displayed on i.e. not login or register
  const navPaths = ["/", "/quizzes", "/users", "/user"];

  return (
    <>
      {navPaths.includes(location.pathname) && <Navbar />}
      <div className="content">{children}</div>
    </>
  );
};
export default App;
