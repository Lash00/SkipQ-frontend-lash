import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./components/SearchBar";
import BranchList from "./components/BranchList";
import Pagination from "./components/Pagination";
import LocationPermissionModal from "./components/LocationPermissionModal";

const BASE_URL = "http://localhost:8000";
const PAGE_SIZE = 10;

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function CivilRegistry() {
  const { dark } = useOutletContext();
  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxDistance, setMaxDistance] = useState(null);

  const [userLocation, setUserLocation] = useState(null);
  // ← المودال يفضل مفتوح طول ما بنستنى الـ GPS
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);

  // ---------------------------------------------------------------------------
  // Fetch من json-server
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [branchRes, locationRes] = await Promise.all([
          axios.get(`${BASE_URL}/branch`),
          axios.get(`${BASE_URL}/location`),
        ]);
        setBranches(branchRes.data);
        setLocations(locationRes.data);
      } catch (err) {
        setError(
          "Failed to load branches. Make sure json-server is running on port 8000.",
        );
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ---------------------------------------------------------------------------
  // Location handlers
  // المودال مش بيتقفل عند الضغط على Allow —
  // بس بيتحول لـ loading state جوه المودال نفسه
  // بيتقفل بس لما الـ GPS يرجع (نجاح أو فشل)
  // ---------------------------------------------------------------------------
  const handleAllowLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setShowLocationModal(false);
      return;
    }

    // ← خلي المودال مفتوح وبس غير حالته لـ loading
    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationLoading(false);
        setShowLocationModal(false); // ← اتقفل بعد ما جاب اللوكيشن
      },
      () => {
        // رفض أو timeout
        setLocationLoading(false);
        setShowLocationModal(false); // ← اتقفل حتى لو فشل
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true },
    );
  }, []);

  const handleSkipLocation = useCallback(() => {
    setShowLocationModal(false);
  }, []);

  // ---------------------------------------------------------------------------
  // Enrich branches بالمسافة
  // ---------------------------------------------------------------------------
  const enrichedBranches = useMemo(() => {
    return branches.map((branch) => {
      const loc = locations.find((l) => l.location_id === branch.location_id);
      let distance = null;
      if (loc && userLocation) {
        distance = getDistanceKm(
          userLocation.lat,
          userLocation.lng,
          loc.latitude,
          loc.longitude,
        );
      } else if (loc) {
        distance = branch.branch_id * 10; // pseudo-distance لما مفيش GPS
      }
      return { ...branch, distance, location: loc };
    });
  }, [branches, locations, userLocation]);

  const maxPossibleDistance = useMemo(() => {
    const distances = enrichedBranches
      .map((b) => b.distance)
      .filter((d) => d !== null);
    if (distances.length === 0) return 2000;
    return Math.ceil(Math.max(...distances) / 10) * 10;
  }, [enrichedBranches]);

  // بيتحدد مرة واحدة لما الداتا تيجي
  useEffect(() => {
    if (enrichedBranches.length > 0 && maxDistance === null) {
      setMaxDistance(maxPossibleDistance);
    }
  }, [enrichedBranches, maxPossibleDistance, maxDistance]);

  // ---------------------------------------------------------------------------
  // Filter → Sort → Paginate
  // ← مش بنرجع [] لو maxDistance = null
  // ---------------------------------------------------------------------------
  const filtered = useMemo(() => {
    return enrichedBranches.filter((branch) => {
      const matchesName = branch.branch_name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesDistance =
        maxDistance === null ||
        branch.distance === null ||
        branch.distance <= maxDistance;
      return matchesName && matchesDistance;
    });
  }, [enrichedBranches, searchName, maxDistance]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.distance === null && b.distance === null) return 0;
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;
      return sortOrder === "asc"
        ? a.distance - b.distance
        : b.distance - a.distance;
    });
  }, [filtered, sortOrder]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchName, maxDistance, sortOrder]);

  const pageBg = dark ? "bg-gray-950" : "bg-gray-50";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  return (
    <>
      {/* ← بنبعت locationLoading للمودال عشان يعرض الـ spinner جوه */}
      <LocationPermissionModal
        dark={dark}
        visible={showLocationModal}
        onAllow={handleAllowLocation}
        onSkip={handleSkipLocation}
        locationLoading={locationLoading}
      />

      <div
        className={`min-h-screen px-4 py-8 md:px-10 lg:px-20 ${pageBg} transition-colors duration-300`}
      >
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-70 transition ${textColor}`}
        >
          ← Back
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1
            className={`text-2xl md:text-3xl font-extrabold tracking-tight ${textColor}`}
          >
            Civil Registry — Branches
          </h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <p className={`text-sm ${subText}`}>
              {sorted.length} branch{sorted.length !== 1 ? "es" : ""} found
            </p>
            {userLocation && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[rgb(65,15,199)]/10 text-[rgb(65,15,199)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(65,15,199)]" />
                Sorted by your location
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* SearchBar */}
        <SearchBar
          dark={dark}
          searchName={searchName}
          setSearchName={setSearchName}
          maxDistance={maxDistance ?? maxPossibleDistance}
          setMaxDistance={setMaxDistance}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          maxPossibleDistance={maxPossibleDistance}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm"
          >
            {error}
          </motion.div>
        )}

        <BranchList branches={paginated} dark={dark} loading={loading} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          dark={dark}
        />
      </div>
    </>
  );
}

export default CivilRegistry;

// ***********************************************************************
// عشان لما نغير و نستعمل ال  api

// import { useOutletContext, useNavigate } from "react-router-dom";
// import { useState, useEffect, useCallback, useMemo } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import SearchBar from "./components/SearchBar";
// import BranchList from "./components/BranchList";
// import Pagination from "./components/Pagination";
// import LocationPermissionModal from "./components/LocationPermissionModal";

// // ← غير دول لما تشيل json-server
// const BASE_URL = "http://localhost:5001/api";
// const ORG_ID = 2;
// const PAGE_SIZE = 10;

// // ← مش محتاجها خالص — السيرفر بيحسبها
// // function getDistanceKm(...) { ... }  // احذفها

// function CivilRegistry() {
//   const { dark } = useOutletContext();
//   const navigate = useNavigate();

//   const [branches, setBranches] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);  // ← جديد: السيرفر بيبعت التوتال
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [searchName, setSearchName] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [userLocation, setUserLocation] = useState(null);
//   const [showLocationModal, setShowLocationModal] = useState(true);
//   const [locationLoading, setLocationLoading] = useState(false);

//   // ---------------------------------------------------------------------------
//   // ← الفرق الكبير: fetchBranches بتاخد lat/lng وبتبعتهم للسيرفر
//   // مش محتاج تجيب locations منفصلة — السيرفر بيعمل كل حاجة
//   // ---------------------------------------------------------------------------
//   const fetchBranches = useCallback(async (lat, lng, page = 1) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await axios.get(
//         `${BASE_URL}/organizations/${ORG_ID}/branches/nearby`,
//         {
//           params: {
//             latitude: lat,
//             longitude: lng,
//             page,
//             limit: PAGE_SIZE,
//           },
//         }
//       );

//       // ← شكل الـ response: { status, message, data: { branches: [...] } }
//       const { branches, total } = res.data.data;
//       setBranches(branches);
//       setTotalCount(total || branches.length);

//     } catch (err) {
//       setError("Failed to load branches.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ---------------------------------------------------------------------------
//   // Location handlers — نفس اللي عندك بالظبط
//   // ---------------------------------------------------------------------------
//   const handleAllowLocation = useCallback(() => {
//     if (!navigator.geolocation) {
//       setShowLocationModal(false);
//       return;
//     }
//     setLocationLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const lat = pos.coords.latitude;
//         const lng = pos.coords.longitude;
//         setUserLocation({ lat, lng });
//         setLocationLoading(false);
//         setShowLocationModal(false);
//         fetchBranches(lat, lng, 1); // ← fetch بعد ما ياخد اللوكيشن
//       },
//       () => {
//         setLocationLoading(false);
//         setShowLocationModal(false);
//         // لو رفض، fetch بـ Cairo default
//         fetchBranches(30.0444, 31.2357, 1);
//       },
//       { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
//     );
//   }, [fetchBranches]);

//   const handleSkipLocation = useCallback(() => {
//     setShowLocationModal(false);
//     fetchBranches(30.0444, 31.2357, 1); // ← fetch بـ default
//   }, [fetchBranches]);

//   // Re-fetch لما يتغير الـ page
//   useEffect(() => {
//     if (!showLocationModal) {
//       const lat = userLocation?.lat ?? 30.0444;
//       const lng = userLocation?.lng ?? 31.2357;
//       fetchBranches(lat, lng, currentPage);
//     }
//   }, [currentPage]);

//   // ---------------------------------------------------------------------------
//   // ← مش محتاج enrichedBranches ولا Haversine
//   // السيرفر بيبعت distance جاهزة في كل branch
//   // ---------------------------------------------------------------------------
//   const filtered = useMemo(() => {
//     return branches.filter((branch) =>
//       branch.branch_name.toLowerCase().includes(searchName.toLowerCase())
//     );
//   }, [branches, searchName]);

//   const sorted = useMemo(() => {
//     return [...filtered].sort((a, b) => {
//       if (a.distance == null && b.distance == null) return 0;
//       if (a.distance == null) return 1;
//       if (b.distance == null) return -1;
//       return sortOrder === "asc"
//         ? a.distance - b.distance
//         : b.distance - a.distance;
//     });
//   }, [filtered, sortOrder]);

//   // ← Pagination: السيرفر بيعمله، مش احنا
//   const totalPages = Math.ceil(totalCount / PAGE_SIZE);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchName, sortOrder]);

//   const pageBg = dark ? "bg-gray-950" : "bg-gray-50";
//   const textColor = dark ? "text-white" : "text-gray-900";
//   const subText = dark ? "text-gray-400" : "text-gray-500";

//   return (
//     <>
//       <LocationPermissionModal
//         dark={dark}
//         visible={showLocationModal}
//         onAllow={handleAllowLocation}
//         onSkip={handleSkipLocation}
//         locationLoading={locationLoading}
//       />

//       <div className={`min-h-screen px-4 py-8 md:px-10 lg:px-20 ${pageBg} transition-colors duration-300`}>
//         <motion.button
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           onClick={() => navigate(-1)}
//           className={`flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-70 transition ${textColor}`}
//         >
//           ← Back
//         </motion.button>

//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-6"
//         >
//           <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${textColor}`}>
//             Civil Registry — Branches
//           </h1>
//           <div className="flex items-center gap-3 mt-1 flex-wrap">
//             <p className={`text-sm ${subText}`}>
//               {sorted.length} branch{sorted.length !== 1 ? "es" : ""} found
//             </p>
//             {userLocation && (
//               <motion.span
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[rgb(65,15,199)]/10 text-[rgb(65,15,199)]"
//               >
//                 <span className="w-1.5 h-1.5 rounded-full bg-[rgb(65,15,199)]" />
//                 Sorted by your location
//               </motion.span>
//             )}
//           </div>
//         </motion.div>

//         <SearchBar
//           dark={dark}
//           searchName={searchName}
//           setSearchName={setSearchName}
//           sortOrder={sortOrder}
//           setSortOrder={setSortOrder}
//         />

//         {error && (
//           <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
//             {error}
//           </div>
//         )}

//         {/* ← sorted مش paginated — لأن السيرفر بيعمل الـ pagination */}
// //         <BranchList branches={sorted} dark={dark} loading={loading} />

// //         <Pagination
// //           currentPage={currentPage}
// //           totalPages={totalPages}
// //           onPageChange={setCurrentPage}
// //           dark={dark}
// //         />
// //       </div>
// //     </>
// //   );
// // }
// // export default CivilRegistry;
