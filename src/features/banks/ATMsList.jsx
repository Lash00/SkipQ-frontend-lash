import { useState, useMemo } from "react";
import SearchBar from "../../ui/SearchBar";
import ATMCard from "./component/ATMCard";
import { useOutletContext } from "react-router-dom";
import LocationPermissionModal from "../../ui/LocationPermissionModal";

const ATMS_BASE = [
  {
    id: 1,
    name: "ATM - بجوار المدينة الجامعية",
    area: "أسيوط - الجامعة",
    bills: [50, 100, 200, 500],
    services: ["Deposit", "Withdraw"],
    lat: 27.1783,
    lng: 31.1859,
  },
  {
    id: 2,
    name: "ATM - بجوار مسجد عمر مكرم",
    area: "أسيوط - وسط البلد",
    bills: [100, 200, 500],
    services: ["Deposit", "Withdraw"],
    lat: 27.1894,
    lng: 31.1734,
  },
  {
    id: 3,
    name: "ATM - أمام محطة قطار أسيوط",
    area: "أسيوط - المحطة",
    bills: [50, 100, 200],
    services: ["Withdraw"],
    lat: 27.1962,
    lng: 31.1701,
  },
  {
    id: 4,
    name: "ATM - شارع الجمهورية",
    area: "أسيوط - الجمهورية",
    bills: [50, 100, 200, 500],
    services: ["Deposit", "Withdraw"],
    lat: 27.2015,
    lng: 31.1823,
  },
];

const MAX_DISTANCE = 500000; // meters

function getDistanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(meters) {
  return meters >= 1000
    ? `${(meters / 1000).toFixed(1)}km`
    : `${Math.round(meters)}m`;
}

export default function ATMList({ bankName = "National Bank of Egypt" }) {
  const [searchName, setSearchName] = useState("");
  const [maxDistance, setMaxDistance] = useState(MAX_DISTANCE);
  const [sortOrder, setSortOrder] = useState("asc");
  const [userLocation, setUserLocation] = useState(null);       // { lat, lng } once granted
  const [modalVisible, setModalVisible] = useState(true);       // show modal on mount
  const [locationLoading, setLocationLoading] = useState(false);

  const { dark } = useOutletContext();

  const pageBg = dark ? "bg-gray-950" : "bg-gray-50";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  // Called when user clicks "Allow Location Access"
  const handleAllow = () => {
    if (!navigator.geolocation) {
      setModalVisible(false);
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationLoading(false);
        setModalVisible(false);
      },
      () => {
        // Permission denied or error — close modal gracefully
        setLocationLoading(false);
        setModalVisible(false);
      }
    );
  };

  // Called when user clicks "Skip for now"
  const handleSkip = () => {
    setModalVisible(false);
  };

  // Enrich ATMs with real distances if we have location, otherwise use index-based fallback
  const atmsWithDistance = useMemo(() => {
    return ATMS_BASE.map((atm) => {
      const distanceM = userLocation
        ? Math.round(
            getDistanceMeters(userLocation.lat, userLocation.lng, atm.lat, atm.lng)
          )
        : atm.id * 300; // placeholder until location is known
      return { ...atm, distanceM, distance: formatDistance(distanceM) };
    });
  }, [userLocation]);

  const filtered = useMemo(() => {
    const list = atmsWithDistance.filter(
      (a) =>
        a.distanceM <= maxDistance &&
        a.name.toLowerCase().includes(searchName.toLowerCase())
    );
    // spread to avoid mutating original array before sorting
    return [...list].sort((a, b) =>
      sortOrder === "desc" ? b.distanceM - a.distanceM : a.distanceM - b.distanceM
    );
  }, [atmsWithDistance, maxDistance, searchName, sortOrder]);

  return (
    <>
      <LocationPermissionModal
        dark={dark}
        visible={modalVisible}
        onAllow={handleAllow}
        onSkip={handleSkip}
        locationLoading={locationLoading}
      />

      <div className={`min-h-screen ${pageBg} px-4 py-10`}>
        <div className="w-[90%] mx-auto space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <h1 className={`text-lg font-bold ${textColor}`}>
              ATM Machines –&nbsp;
              <span className="text-[rgb(65,15,199)]">{bankName}</span>
            </h1>
          </div>

          <SearchBar
            dark={dark}
            searchName={searchName}
            setSearchName={setSearchName}
            maxDistance={maxDistance}
            setMaxDistance={setMaxDistance}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            maxPossibleDistance={MAX_DISTANCE}
          />

          {filtered.length > 0 ? (
            filtered.map((atm) => <ATMCard key={atm.id} atm={atm} dark={dark} />)
          ) : (
            <div className={`text-center py-20 text-sm ${subText}`}>
              No ATMs found within {formatDistance(maxDistance)}.
            </div>
          )}
        </div>
      </div>
    </>
  );
}