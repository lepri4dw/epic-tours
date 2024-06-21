import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAllowed) {
      navigate('/login');
    }
  }, [isAllowed, navigate]);

  return <>{isAllowed ? children : null}</>;
};

export default ProtectedRoute;