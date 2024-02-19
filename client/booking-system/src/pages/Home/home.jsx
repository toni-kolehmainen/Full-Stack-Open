// Aiemmin hakemasi paikat 

// filerit arvostelu, hinta, sijainti
// mainos arvo, drive in

import { useEffect, useState } from 'react';
import LeafletMap from '../../components/leaflet_map';
/**
 * This component renders a Home site of the project
 *
 * @returns {ReactNode} A React element that renders the home site
 */
function Home() {

  return (
    <div className="Home">
      
      <LeafletMap/>
    </div>
  );
}

export default Home;