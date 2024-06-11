import { Route, Routes, BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth, AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SpeakingTest from './pages/SpeakingTest';
import WritingTest from './pages/WritingTest';
import ReadingTest from './pages/ReadingTest';
import ListeningTest from './pages/ListeningTest';
import DashBoard from './pages/Dashboard';
import TestList from './pages/TestList';
import Test from './pages/Test';
import Header from './components/Header';
import Instructor from './pages/Instructor';
import InstructorCreate from './pages/InstructorCreate';
import Resources from './pages/Resources';
import Oauth from './pages/Oauth2';

const queryClient = new QueryClient();

function App() {
  const auth = useAuth();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppWrapper>
          {auth.isAuthenticated && <Header />}
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/test-list" element={<TestList />} />
            <Route path="/test/:testId" element={<Test />} />
            <Route path="/test/">
              <Route path="speaking/:testId/:sectionId" element={<SpeakingTest />} />
              <Route path="writing/:testId/:sectionId" element={<WritingTest />} />
              <Route path="reading/:testId/:sectionId" element={<ReadingTest />} />
              <Route path="listening/:testId/:sectionId" element={<ListeningTest />} />
            </Route>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/instructor" element={<Instructor />} />
            <Route path="/instructor/create" element={<InstructorCreate />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/oauth2" element={<Oauth />} />
          </Routes>
        </AppWrapper>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;