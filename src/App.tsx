import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from 'components/LandingPage';
import SessionPage from 'components/SessionPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/session/:sessionId" element={<SessionPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
