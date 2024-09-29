import axios from 'axios';
import { useState, useEffect } from 'react';
import SImage from '../Assets/statistic.png';
/* import './dashboard.css'; */

function Dashboard() {
  const [donors, setDonors] = useState([]);
  const [allDonors, setallDonors] = useState([]);
  const [sumDonations, setSumDonations] = useState('');
  /* 
  const [sumTodayDonations, setSumTodayDonations] = useState(''); */

  const fetchDonors = () => {
    axios.get('http://localhost:8091/Donor/getAll').then((responseO) => {
      const response = responseO.data.slice(0, 3);
      const sumDonations = responseO.data.reduce((sum, donor) => sum + parseFloat(donor.amount), 0);
      setallDonors(responseO.data);
      setDonors(response);
      setSumDonations(sumDonations);
      console.log('Fetched Succesfully');
    });
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <>
      <div className="container">
        <div className="dashboard">
          <div className="left"></div>
          <div className="right">
            {/* Box plates at top */}
            <div className="bord">
              <div className="box">
                <img className="boxImage" src={SImage} alt="Stat" />
                <div className="text">
                  <p className="head">Total Donors</p>
                  <p className="paragraph">{allDonors.length.toLocaleString()}</p>
                </div>
              </div>
              <div className="box">
                <img className="boxImage" src={SImage} alt="Stat" />
                <div className="text">
                  <p className="head">Total Donations</p>
                  <p className="paragraph">{sumDonations.toLocaleString()} mL</p>
                </div>
              </div>
              <div className="box">
                <img className="boxImage" src={SImage} alt="Stat" />
                <div className="text">
                  <p className="head">Today's Donations</p>
                  <p className="paragraph">1,346 mL</p>
                </div>
              </div>
            </div>
            {/* Leaderboard  */}
            <div className="leaderboard">
              <h1>Leaderboard</h1>
              <table>
                {donors.length > 0 ? (
                  donors.map((donor, index) => (
                    <tr>
                      <td className="index">{index + 1}</td>
                      <td>{donor.name}</td>
                      <td>{donor.district}</td>
                      <td>{donor.amount} mL</td>
                    </tr>
                  ))
                ) : (
                  <p>No donors available</p>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
