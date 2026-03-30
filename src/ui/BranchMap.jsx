import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faDirections,
} from "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function BranchMap({ location, dark }) {
  const cardBg = dark
    ? "bg-gray-900 border-gray-700"
    : "bg-white border-gray-200";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  if (!location) return null;

  const lat = location.latitude;
  const lng = location.longitude;
  const address = location.address_details;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`rounded-2xl border overflow-hidden shadow-sm mb-6 ${cardBg}`}
    >
      <div className="h-56 md:h-72 w-full">
        <MapContainer
          center={[lat, lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="px-5 py-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faLocationDot}
            size="lg"
            style={{ color: dark ? "white" : "rgb(65,15,199)" }}
          />
          <span className={`text-sm ${subText}`}>{address}</span>
        </div>

        <div className="flex gap-2">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition hover:opacity-80 ${
              dark
                ? "border-gray-600 text-white"
                : "border-gray-300 text-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faDirections} />
            Directions
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default BranchMap;
