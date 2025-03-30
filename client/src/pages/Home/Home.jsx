import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

// * Lazy load components for better performance
const TaskPage = lazy(() => import("../subpages/Tasks/Tasks"));
const Notification = lazy(() => import("../subpages/Notification/Notification"));

const Home = () => {
  return (
    <main>
      <Sidebar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="" element={<TaskPage />} />
          <Route path="notification" element={<Notification />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default Home;
