import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import DiscussionDetail from './components/DiscussionDetail';
import ForumList from './components/Forum/ForumList';
import LoginForm from './components/Authendication/Login';
import CreateCourse from './fullscreen';
import Home from './components/Home';
import Settings from './components/Setting';
import CourseForm from './components/Courses/CourseForm';
import Profile from './components/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/courses/:courseId" element={<ForumList />} />
        <Route path="/discussions/:id" element={<DiscussionDetail />} /> {/* Detailed discussion page */}
        <Route path="/courseform" element={<CreateCourse />} /> {/* Detailed discussion page */}
        <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/mycourses" element={<CourseForm />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/createcourse" element={<CreateCourse />} />
              {/* Redirect any other route to home after login */}
              <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
