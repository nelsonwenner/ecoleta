import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import axios from 'axios';
import './styles.css';

import Logo from '../../assets/logo.svg';

const CreatePoint = () => {
  const [items, setItems] = useState([]);
  const [cities, setCities] = useState([]);
  const [ufs, setUfs] = useState([]);

  useEffect(() => {
    api.get('/items').then(({ data }) => {
      setItems(data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL_API_STATES}`)
    .then(({ data }) => {
      const ufInitials = data.map((uf) => uf.sigla);
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL_API_CITIES}`)
    .then(({ data }) => {
      const citiesNames = data.map((citie) => citie.nome);
      setCities(citiesNames);
    });
  }, []);

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
        </fieldset>

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
                {ufs.map(uf => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
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

        <fieldset>
          <legend>
            <h2>Collection items</h2>
            <span>Select one or more items below</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.name} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Register collection point</button>
      </form>
    </div>
  )
}

export default CreatePoint;