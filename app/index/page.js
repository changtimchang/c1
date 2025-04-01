"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (page = 1) => {
    try {
      const response = await fetch(`/api/data?page=${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.totalPages);
      setError(null);
      setCurrentPage(page);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Failed to fetch data');
    }
  };

  // 컴포넌트가 마운트될 때 처음 데이터를 가져옵니다.
  React.useEffect(() => {
    fetchData(currentPage);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchData(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchData(currentPage - 1);
    }
  };
  return (
    <div>
      <h1>PostgreSQL Data</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={fetchData}>Fetch Data</Button>
      <table style={{ marginTop: '20px', border: '1px solid black', width: '100%' }}>
        <thead>
          <tr>
            <th>id</th>
            <th>Temp</th>
            <th>v1</th>
            <th>v2</th>
            <th>porosity</th>
            <th>soltime</th>
            <th>coldshut</th>
            <th>filltime</th>
            <th>lastair</th>
            <th>velocity</th>
            <th>quality</th>
            {/* 테이블의 다른 열을 추가합니다. */}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className='gap-2'>
              <td>{item.id}</td>
              <td>{item.Temp}</td>
              <td>{item.v1}</td>
              <td>{item.v2}</td>
              <td>{item.porosity}</td>
              <td>{item.soltime}</td>
              <td>{item.coldshut}</td>
              <td>{item.filltime}</td>
              <td>{item.lastair}</td>
              <td>{item.velocity}</td>
              <td>{item.quality}</td>
              {/* 다른 열의 데이터를 추가합니다. */}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Home;