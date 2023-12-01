import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
//   const history = useHistory();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const resp = await fetch('/check-auth', {
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
        //   history.push('/login'); // Redirect to the login page if not authenticated
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        setAuthenticated(false);
        // history.push('/login'); // Redirect to the login page in case of an error
      }
    };

    checkAuthentication();
  }, [history]);

  return { authenticated };
};

export default useAuth;
