import React, { useState, useEffect } from 'react';
import './AppStyles.css';
import FileUpload from './components/FileUpload';
// import PeopleTable from './components/PeopleTable';
import DataTable from './components/DataTable';
// import DataTable2 from './components/DataTable2';
import SearchBar from './components/SearchBar';
import { fetchPeopleData, fetchLocationData, fetchAffiliationData } from './api/api';
import MenuOptions from './components/MenuOptions';

const App: React.FC = () => {
  const [data, setData] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [affiliationData, setAffiliationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [affiliation, setAffiliation] = useState('');

  const fetchData = async (keyword: string = '', location: string = '', affiliation: string = '') => {
    setKeyword(keyword);
    setLocation(location);
    setAffiliation(affiliation);

    affiliation = affiliation;
    const responseData = await fetchPeopleData(keyword, location, affiliation);
    setData(responseData);
    const locationData = await fetchLocationData(location);
    setLocationData(locationData);
    const affiliationData = await fetchAffiliationData();
    setAffiliationData(affiliationData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (keyword: string) => {
    fetchData(keyword, location, affiliation);
  };

  const handleLocationChange = (location: string) => {
    fetchData(keyword, location, affiliation);
  };

  const handleAffiliationChange = (affiliation: string) => {
    fetchData(keyword, location, affiliation);
  };

  return (
    <>
      <h1 className='header'>File Upload Application</h1>
      <hr />
      <p>Upload a file (.csv files only) then view it's contents in the table below. </p>
      <FileUpload onUploadSuccess={fetchData} />
      <hr />
      <p>Search for records by a first name or last name substring. (case insensitive)</p>
      <SearchBar onSearch={handleSearchChange} />
      <hr />
      <MenuOptions
        locationData={locationData}
        affiliationData={affiliationData}
        onLocationChange={handleLocationChange}
        onAffiliationChange={handleAffiliationChange}
      />

      <hr />
      <p>Select a column to sort the grid.</p>
      <DataTable data={data} loading={loading} />
      <hr />
    </>
  )
};

export default App
