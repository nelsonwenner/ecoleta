import React,{ useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import './styles.css';

const Success = () => {
  const history = useHistory();
  
  useEffect(() => {
    setTimeout(() => {
      history.push('/');
    }, 3000);
  }, [history]);
  
  return (
    <div className="body-success">
      <div className="page-success">
        <main className="message">
          <FiCheckCircle />
          <span>Registration Completed</span>
        </main>
      </div>
    </div>
  )
}

export default Success;