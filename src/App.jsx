// CSS
// import "./App.css";
import "./index.css";

// Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components

import Footer from "./components/Footer";
import Layout from "./components/Layout";

// Pages
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ApiInfoPage from "./pages/ApiPage";
import UserPage from "./pages/User";

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          {/* <section className="mx-auto h-screen"> */}
            <div className="flex items-center justify-center">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/info" element={<ApiInfoPage />} />
                <Route path="/quizzes" element={<></>} />
                <Route path="/user" element={<UserPage />} />
              </Routes>
            </div>
          {/* </section> */}
        </Layout>
        <Footer />
      </Router>
    </>
  );
};

export default App;
