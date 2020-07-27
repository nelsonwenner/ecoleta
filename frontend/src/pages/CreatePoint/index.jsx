import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
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

        <fields>
          <legend>
            <h2>Data</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Entity name</label>
            <input 
              type="text"
              name="name"
              id="name"
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input 
                type="email"
                name="email"
                id="email"
              /> 
            </div>

            <div className="field">
              <label htmlFor="email">Whatsapp</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
              /> 
            </div>
          </div>
        </fields>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on map</span>
          </legend>

          <Map center={ [-27.2092052, -49.6401092] } zoom={ 15 }>
            <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <Marker position={ [-27.2092052, -49.6401092] } />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">State (UF)</label>

              <select name="uf" id="uf">
                <option value="0">Select a state</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="city">City</label>
            
            <select name="city" id="city">
              <option value="0">Select a city</option>
            </select>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default CreatePoint;