import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import axios from 'axios';
import './styles.css';

import Dropzone from '../../components/Dropzone';
import Logo from '../../assets/logo.svg';

const CreatePoint = () => {
  const [items, setItems] = useState([]);
  const [cities, setCities] = useState([]);
  const [ufs, setUfs] = useState([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const [initialPosition, setInitialPosition] = useState([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);

  const [selectedFile, setSelectedFile] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: ""
  });

  useEffect(() => {
    api.get('/items').then(({ data }) => {
      setItems(data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL_API_IBGE}`)
    .then(({ data }) => {
      const ufInitials = data.map((uf) => uf.sigla);
      setUfs(ufInitials);
    });
  }, []);
  
  useEffect(() => {
    if (selectedUf === '0') { return; }

    axios.get(`${process.env.REACT_APP_URL_API_IBGE}/${selectedUf}/municipios`)
    .then(({ data }) => {
      const citiesNames = data.map((city) => city.nome);
      setCities(citiesNames);
    });
  }, [selectedUf]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setSelectedPosition([latitude, longitude]);
      setInitialPosition([latitude, longitude]);
    });
  }, [selectedPosition])

  const handlerSelectUf = (event) => {
    const currentUf = event.target.value;
    setSelectedUf(currentUf);
  }

  const handlerSelectCity = (event) => {
    const currentCity = event.target.value;
    setSelectedCity(currentCity);
  }

  const handlerMapClick = (event) => {
    setSelectedPosition([
      Number(event.latlng.lat),
      Number(event.latlng.lng),
    ]);
  }

  const handlerInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value});
  }

  const handlerSelectItem = (id) => {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  }
  
  const handlerSubmit = async (event) => {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const [latitude, longitude] = selectedPosition;
    const uf = selectedUf;
    const city = selectedCity;
    const items = selectedItems;
    
    const data = new FormData();
    
    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', items.join(','));
    data.append("image", selectedFile);

    await api.post('/points', data);
  } 

  return (
    <div className="page-create-point">
      <header>
        <img src={ Logo } alt="Ecollection" />

        <Link to="/"> 
          <FiArrowLeft /> Back to home
        </Link>
      </header>

      <form onSubmit={ handlerSubmit }>
        <h1>Registration of 
          <br/> the collection point
        </h1>

        <Dropzone onFileUpload={ setSelectedFile } />

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
              onChange={ handlerInputChange }
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input 
                type="email"
                name="email"
                id="email"
                onChange={ handlerInputChange }
              /> 
            </div>

            <div className="field">
              <label htmlFor="email">Whatsapp</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={ handlerInputChange }
              /> 
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on map</span>
          </legend>
          
          <Map center={ initialPosition } zoom={ 15 } onClick={ handlerMapClick }>
            <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <Marker position={ selectedPosition } />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">State (UF)</label>

              <select 
                name="uf" 
                id="uf" 
                value={ selectedUf } 
                onChange={ handlerSelectUf }
              >
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
            
            <select 
              name="city" 
              id="city"
              value={ selectedCity }
              onChange={ handlerSelectCity }
            >
              <option value="0">Select a city</option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
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
              <li 
                key={item.id} 
                onClick={ () => handlerSelectItem(item.id) }
                className={ selectedItems.includes(item.id) ? 'selected' : '' }
              >
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