import React from 'react';
import './App.css';
import './Common/Navbar.css';
import './Common/Footer.css';
import CustomerLifetimeCohorts from './components/CustomerLifetimeCohorts';
import GeographicalDistribution from './components/GeographicalDistribution';
import GrowthSalesChart from './components/GrowthSalesChart';
import Navbar from './Common/Nabar'; // Corrected the import path
import Footer from './Common/Footer';
import NewCustomersChart from './components/NewCustomerChart';
import RepeatCustomersChart from './components/RepeatCustomersChart';
import SalesChart from './components/SalesChart';
import ScrollToTop from 'react-scroll-to-top';
import { FaArrowUp } from 'react-icons/fa';

function App() {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <section id="sales-chart">
          <SalesChart />
        </section>
        <section id="growth-sales-chart">
          <GrowthSalesChart />
        </section>
        <section id="new-customers-chart">
          <NewCustomersChart />
        </section>
        <section id="repeat-customers-chart">
          <RepeatCustomersChart />
        </section>
        <section id="geographical-distribution">
          <GeographicalDistribution />
        </section>
        <section id="customer-lifetime-cohorts">
          <CustomerLifetimeCohorts />
        </section>
      </div>
      <Footer />
      <ScrollToTop
        smooth
        component={<FaArrowUp size={30} />} // Increase icon size
        style={{
          backgroundColor: '#ff6347',
          borderRadius: '50%',
          width: '60px', // Increase button size
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          right: '20px',
          bottom: '20px',
          position: 'fixed',
          zIndex: '1000',
        }}
      />
    </>
  );
}

export default App;
