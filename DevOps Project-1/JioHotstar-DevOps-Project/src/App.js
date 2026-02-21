import './App.css';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Genre from './components/Genre';
import Language from './components/Language';
import Nav from './components/Nav';
import NavBar from './components/NavBar';
import Platforms from './components/Platforms';
import Row from './components/Row';
import requests from './request';

function App() {
  return (
    <>
   <div className='rel'>
   <div className="nnn">
          <Nav/>
        </div>
     
      <div className="aaa">
        
  
  <div className='first'>
    
          <NavBar/>
  </div>
  
   <div className='second'>
  
    <div className='stick'>
      
     <Banner/>
    </div>
    <div className='lg'>
    <img src="https://img10.hotstar.com/image/upload/f_auto,h_148/sources/r1/cms/prod/2300/1744205492300-t" alt="" />
            <h3>TATA IPL 2025 • 13m • Cricket </h3>
            <p>Gujarat Titans silenced the Chinnaswamy stadium as they ticked all the boxes against Royal Challengers Bengaluru in TATA IPL 2025 </p>
            <h3>Sports | Highlights </h3>
            <button className='btn'>Subscribe to Watch</button>
            <button className='bb btn'>+</button>
    </div>
    <div className='z'>
            
      <Row title="Latest releases" fetchUrl={requests.fetchActionMovies} />
      <Row title="Free-Newly Added" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="Disney Movies" fetchUrl={requests.fetchDocumentaries}/>
      <Platforms/>
      <Language/>
      <Genre/>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
      <Row title="Romantic Movies" fetchUrl={requests.fetchRomanceMovies}/>
      <Row title="Populer Movies" fetchUrl={requests.fetchDoc}/>
      <Footer/>
    </div>
    
    
   </div>
      </div>
   </div>
    </>
  );
}

export default App;
