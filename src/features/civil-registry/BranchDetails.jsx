import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import BranchMap from "../../ui/BranchMap";
import ServicesList from "./components/ServicesList";
import ServiceModal from "./components/ServiceModal";
import BranchInfoBox from "./components/BranchInfoBox";

const BASE_URL = "http://localhost:8000";

function BranchDetails() {
  const { dark } = useOutletContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [branch, setBranch] = useState(null);
  const [location, setLocation] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchService, setSearchService] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const branchRes = await axios.get(`${BASE_URL}/branch?branch_id=${id}`);
        setBranch(branchRes.data[0]);

        const locationRes = await axios.get(
          `${BASE_URL}/location?location_id=${branchRes.data[0].location_id}`,
        );
        setLocation(locationRes.data[0]);

        const servicesRes = await axios.get(`${BASE_URL}/services`);
        setServices(servicesRes.data);
      } catch (err) {
        setError("Failed to load branch details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  const filteredServices = services.filter((s) =>
    s.service_name.toLowerCase().includes(searchService.toLowerCase()),
  );

  const pageBg = dark ? "bg-gray-950" : "bg-gray-50";
  const textColor = dark ? "text-white" : "text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${pageBg}`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
          className="w-10 h-10 rounded-full border-4 border-[rgb(65,15,199)] border-t-transparent"
        />
      </div>
    );
  }

  if (error || !branch) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${pageBg}`}
      >
        <p className="text-red-500">{error || "Branch not found"}</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-8 md:px-10 lg:px-20 ${pageBg} transition-colors duration-300`}
    >
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1
          className={`text-2xl md:text-3xl font-extrabold tracking-tight ${textColor}`}
        >
          {branch.branch_name}
        </h1>
        <p className={`text-sm mt-1 ${subText}`}>{branch.branch_code}</p>
      </motion.div>

      {/* Map + Info Box — 2/3 | 1/3 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="col-span-2">
          <BranchMap location={location} dark={dark} />
        </div>
        <div className="col-span-1">
          <BranchInfoBox
            branch={branch}
            dark={dark}
            is_Active={branch.isActive}
          />
        </div>
      </div>

      {/* Services List */}
      <ServicesList
        services={filteredServices}
        searchService={searchService}
        setSearchService={setSearchService}
        onSelectService={setSelectedService}
        dark={dark}
      />

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          dark={dark}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}

export default BranchDetails;
