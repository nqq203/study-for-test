import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
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

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppWrapper>
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/test" element={<div></div>}>
                <Route path="speaking" element={<SpeakingTest />} />
                <Route path="writing" element={<WritingTest />} />
                <Route path="reading" element={<ReadingTest />} />
                <Route path="listening" element={<ListeningTest />} />
              </Route>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/forgot-password" element={<SignIn />} />
              <Route path="/" element={<SignIn />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppWrapper>
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// const MainContent = styled.main`
//   flex: 1;
//   // Apply necessary padding or margins as needed for your layout
// `;

// function SignInWrapper() {
//   const { isAuthenticated } = useAuth();
//   const token = localStorage.getItem('accessToken');
//   return !!token || isAuthenticated ? <Navigate to="/" /> : <SignIn />;
// }

// function SignUpWrapper() {
//   const { isAuthenticated } = useAuth();
//   const token = localStorage.getItem('accessToken');
//   return !!token || isAuthenticated ? <Navigate to="/" /> : <SignUp />;
// }

// function ForgotPasswordWrapper() {
//   const { isAuthenticated } = useAuth();
//   const token = localStorage.getItem('accessToken');
//   return !!token || isAuthenticated ? <Navigate to="/" /> : <ForgotPassword />;
// }

// function PrivateRoute({ element }) {
//   const { isAuthenticated } = useAuth();
//   const token = localStorage.getItem('accessToken');
//   const RouteElement = element;
//   return !!token || isAuthenticated ? (
//     <RouteElement />
//   ) : (
//     <Navigate to="/sign-in" replace />
//   );
// }