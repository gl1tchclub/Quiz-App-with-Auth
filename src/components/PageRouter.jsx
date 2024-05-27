import { BrowserRouter as Routes, Route } from "react-router-dom";
// import components to go in pages here


const PageRoutes = () => {
    return (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  style={{
                    display: "flex",
                    height: "80vh",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h1 style={{ margin: "100px" }}>
                    Welcome to the Quiz App
                  </h1>
                  <h3>Click to get started</h3>
                </div>
              </>
            }
          ></Route>
          <Route
            path="/quizzes"
            element={
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  Quizzes
                </div>
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  Users
                </div>
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  User
                </div>
              </>
            }
          />
        </Routes>
    );
  };
  export default PageRoutes;