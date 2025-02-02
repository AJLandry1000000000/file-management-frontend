import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import PeopleTable from './components/PeopleTable';
import DataTable from './components/DataTable';
import DataTable2 from './components/DataTable2';
import { fetchPeopleData } from './api/api';

const App: React.FC = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const responseData = await fetchPeopleData();
    setData(responseData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>File Upload Application</h1>
      <p>Search for records by a first name or last name substring.</p>

      <p>Upload a file (.csv files only) then view it's contents in the table below. </p>
      <FileUpload onUploadSuccess={fetchData} />
      <hr />
      <p>Select a column to sort the grid.</p>
      {/* <PeopleTable data={data} loading={loading} /> */}
      <DataTable2 data={data} loading={loading} />
    </>
  )
};

export default App
