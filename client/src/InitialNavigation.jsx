import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

 export const InitialNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return null; // This component doesn't render anything visible
};
