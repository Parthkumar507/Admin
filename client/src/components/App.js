import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import WelcomePage from "./WelcomePage";
// import HomePage from "./HomePage";

import Header from "../components/Header";
import RolesAndPermission from "./Settings/RolesAndPermission";
import NewUser from "./Settings/NewUser";
import UseAuth from "../Auth/UserAuthentication";
import Layout from "./Layout";
import AddStudent from "../Students/AddStudent";
import Sidebar from "./Sidebar";
import AddEmploye from "../Companies/AddEmploye";
import Logout from "./Logout";
import StudentList from "../Students/ViewStudents";

const App = () => {
  const { authenticated, user } = UseAuth();
  const location = useLocation();

  if (authenticated === undefined) {
    // Authentication status is still loading, you might want to render a loading spinner or similar.
    return <div>Loading...</div>;
  }

  function RequireAuth({ children }) {
    let auth = UseAuth();

    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
  }

  return (
    <React.Fragment>
     {authenticated && (
        <div>
          <Header user={user} />
          <Sidebar user={user} />
        </div>
      )}
      {/* <Layout> */}
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="Students/AddnewStudent"
            element={
              <RequireAuth>
                <AddStudent />
              </RequireAuth>
            }
          />
           <Route
            path="Students/StudentDatabase"
            element={
              <RequireAuth>
                <StudentList />
              </RequireAuth>
            }
          />

          <Route path="/welcome" element={<WelcomePage />} />
          <Route
            path="Settings/RolesandPermission/"
            element={
              <RequireAuth>
                <RolesAndPermission />
              </RequireAuth>
            }
          />
          <Route
            path="Settings/TeamorUsers/"
            element={
              <RequireAuth>
                <NewUser />
              </RequireAuth>
            }
          />

          <Route
            path="Companies/AddNewEmployee"
            element={
              <RequireAuth>
                <AddEmploye />
              </RequireAuth>
            }
          />
          <Route
            path="Logout"
            element={
              <RequireAuth>
                <Logout/>
              </RequireAuth>
            }
          />
        </Routes>
      </main>
      {/* </Layout> */}
    </React.Fragment>
  );
};

export default App;
