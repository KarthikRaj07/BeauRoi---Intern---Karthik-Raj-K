import { useState } from 'react';
import ResultPage from './Components/ResultPage';
import UserInput from './Components/UserInput';
import Header from './Components/Header';
import { Home } from './Components/home';

function App() {
  const [formData, setFormData] = useState(null);
  const [user, setUser] = useState(null); // State to store authenticated user
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

  const handleLogout = () => {
    setUser(null);
    setFormData(null);
    setIsAuthenticated(false); // Reset authentication status
  };

  return (
    <>
      {!isAuthenticated ? (
        <Home onAuthSuccess={(user) => { setUser(user); setIsAuthenticated(true); }} />
      ) : (
        <>
          {user && <Header onLogout={handleLogout} />}
          <div>
            {formData ? (
              <ResultPage data={formData} />
            ) : (
              <UserInput onSubmit={setFormData} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;