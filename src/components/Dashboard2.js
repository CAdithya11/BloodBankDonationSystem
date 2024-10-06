import './dashboard2.css';

import statistic from '../Assets/statistic.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidemenu from './Sidemenu';
import TopBanner from './TopBanner';

function Dashboard2() {
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
      <div className="D-main">
        <Sidemenu />
        {
          <div className="Aappointments">
            <TopBanner />
            {
              <div className="D-counts-main">
                <div className="D-counts">
                  <div className="D-counts-box">
                    <img src={statistic} alt="static" />
                    <div className="D-box-info">
                      <p>Total Donors</p>
                      <p>{allDonors.length.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="D-counts-box">
                    <img src={statistic} alt="static" />
                    <div className="D-box-info">
                      <p>Total Donations</p>
                      <p>{sumDonations.toLocaleString()} mL</p>
                    </div>
                  </div>
                  <div className="D-counts-box">
                    <img src={statistic} alt="static" />
                    <div className="D-box-info">
                      <p>Today's Donations</p>
                      <p>10,456 mL</p>
                    </div>
                  </div>
                </div>
              </div>
            }

            <div className="D-leaderboard">
              <h1>Leaderboard</h1>
              <table>
                {donors.length > 0 ? (
                  donors.map((donor, index) => (
                    <tr>
                      <td className="D-index">{index + 1}</td>
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
        }
      </div>
    </>
  );
}

export default Dashboard2;
