import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileWarning from './components/MobileWarning';
import Home from './pages/Home';
import LessonViewer from './pages/LessonViewer';

// Layout with Navbar for standard pages
const StandardLayout = () => (
  <div className="app-container">
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <MobileWarning />
  </div>
);

// Layout without Navbar for the Viewer (full screen)
const ViewerLayout = () => (
  <div className="app-container">
    <Navbar />
    <Outlet />
    <MobileWarning />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with standard padding and container */}
        <Route element={<StandardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/not-found" element={
            <div className="text-center p-8">
              <h2>ไม่พบหน้าที่ต้องการ</h2>
            </div>
          } />
        </Route>

        {/* Pages that need full screen (Lesson Viewer) */}
        <Route element={<ViewerLayout />}>
          {/* Default to first lesson if not specified */}
          <Route path="/subject/:categoryId/:subjectId" element={<LessonViewer />} />
          <Route path="/subject/:categoryId/:subjectId/lesson/:lessonId" element={<LessonViewer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
