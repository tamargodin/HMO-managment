

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from 'recharts';

// const CovidGraph = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8585/api/covid/active-cases-last-month');
//         const result = response.data;

//         // Transforming object into array of objects
//         const transformedData = Object.entries(result).map(([date, cases]) => ({
//           date,
//           cases,
//         }));

//         setData(transformedData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();

 
  

//   }, []);

//   return (
//     <>
//     <div>
//       <h1>Active Cases per Day Last Month</h1>
//       <LineChart width={1000} height={300} data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="cases" stroke="#8884d8" />
//       </LineChart>
//     </div>
//     <div>
// <h1>{num} members are not vaccined</h1>
//     </div>
//     </>
//   );
// };

// export default CovidGraph;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CovidGraph = () => {
  const [data, setData] = useState([]);
  const [num, setNum] = useState(0); // Assuming num represents the count of unvaccinated members

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8585/api/covid/active-cases-last-month');
        const result = response.data;
console.log(response.data);
        // Transforming object into array of objects
        const transformedData = Object.entries(result).map(([date, cases]) => ({
          date,
          cases,
        }));

        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Fetch data for the count of unvaccinated members
    const fetchUnvaccinatedCount = async () => {
      try {
        // Make API call to fetch the count of unvaccinated members
        // Replace 'http://localhost:8585/api/unvaccinated-count' with your actual API endpoint
        const response = await axios.get(' http://localhost:8585/api/clients/nonVaccinatedCount');
        console.log(response.data);
        const count = response.data; // Assuming the response contains a property 'count' representing the number of unvaccinated members
        setNum(count);
      } catch (error) {
        console.error('Error fetching unvaccinated count:', error);
      }
    };

    fetchUnvaccinatedCount();

  }, []);

  return (
    <>
    <div>
      <h1>Active Cases per Day Last Month</h1>
      <LineChart width={1000} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="#8884d8" />
      </LineChart>
    </div>
    <div>
      {/* <h2>{num>2&& {num} members are not vaccinated}</h2> */}
    </div>
    </>
  );
};

export default CovidGraph;
