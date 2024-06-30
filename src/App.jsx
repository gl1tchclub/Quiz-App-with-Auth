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
import UserPage from "./pages/User";
import QuizzesPage from "./pages/AllQuizzes";
import QuizPage from "./pages/Quiz";
import LogoutPage from "./pages/Logout";
import CheckAdminPage from "./pages/CheckAdmin";
import SeedPage from "./pages/SeedUsers";

const App = () => {
  return (
    <>
      <Router>
        <Layout>
            <div className="flex items-center justify-center">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/quizzes" element={<QuizzesPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/checkAuth" element={<CheckAdminPage />} />
                <Route path="/seedBasicUsers" element={<SeedPage />} />
              </Routes>
            </div>
        </Layout>
        <Footer />
      </Router>
    </>
  );
};

export default App;
