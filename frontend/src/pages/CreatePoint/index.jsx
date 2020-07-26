import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './styles.css';

import Logo from '../../assets/logo.svg';

const CreatePoint = () => {
  return (
    <div className="page-create-point">
      <header>
        <img src={ Logo } alt="Ecollection" />

        <Link to="/"> 
          <FiArrowLeft /> Back to home
        </Link>
      </header>

      <form>
        <h1>Registration of 
          <br/> the collection point
        </h1>

        <fieldset>
          <legend>
            <h2>Data</h2>
          </legend>
        </fieldset>
      </form>
    </div>
  )
}

export default CreatePoint;