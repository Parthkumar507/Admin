import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const resp = await fetch('http://localhost:8000/check-auth', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (resp.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          Navigate('/login'); // Redirect to the login page if not authenticated
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        setAuthenticated(false);
        Navigate('/login'); // Redirect to the login page in case of an error
      }
    };

    checkAuthentication();
  }, [history]);

  return { authenticated };
};

export default useAuth;
