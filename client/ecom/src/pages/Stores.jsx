
// kartta
// filter, search
// get location
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import './stores/store.css'
import L from 'leaflet';
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from 'react'
const variants = {
  open: { opacity: 1, x: 0, height:"1000px", width:"1000px" },
  closed: { opacity: 1, x: 0, height:"250px", width:"250px" },
}

const position = [60.192, 24.946]

function Stores() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="store-window" style={{}}>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className='map'
        style={{ height: "250px", width: "250px" }}
        whileHover={{ height: "500px", width: "500px", transition: { duration: 0.5 }, }}
      >
        <MapContainer  style={{ "zIndex": "1", height: "100%", minHeight: "100%", "width": "100%" }} center={position} zoom={10} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </motion.div>
    </div>
  )
}

export default Stores