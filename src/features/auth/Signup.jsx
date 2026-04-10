import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  ArrowRight,
  Loader2,
  Upload,
  Link as LinkIcon,
} from "lucide-react";
import ApplicationSubmitted from "./ApplicationSubmitted";
import useAuth from "../../contexts/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";

export default function CreateOrganizationForm() {
  const { dark } = useOutletContext();
  const [formData, setFormData] = useState({
    abbreviation: "",
    organizationName: "",
    officialEmail: "",
    chiefName: "",
    website: "",
    location: "",
    description: "",
  });
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    setLocationLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          }));
          setLocationLoading(false);
        },
        (err) => {
          console.error(err);
          setLocationLoading(false);
        }
      );
    } else {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitted(true);
    try {
      await signup(formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      setFormData({
        abbreviation: "",
        organizationName: "",
        officialEmail: "",
        chiefName: "",
        website: "",
        location: "",
        description: "",
      });
      setLogoPreview(null);
    }
  };

  // Shared input classes
  const inputCls = `w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
    dark
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-600 focus:border-[rgb(65,15,199)]"
      : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[rgb(65,15,199)]"
  }`;

  const labelCls = `block text-sm font-semibold mb-1 ${
    dark ? "text-gray-300" : "text-gray-700"
  }`;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${
      dark ? "bg-gray-950" : "bg-gray-50"
    }`}>
      {submitted ? (
        <ApplicationSubmitted />
      ) : (
        <div className={`w-full max-w-2xl rounded-3xl shadow-lg p-8 md:p-12 border ${
          dark
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-slate-100"
        }`}>
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="p-4 rounded-full bg-[rgb(65,15,199)]/15">
                <Building2 className="w-10 h-10 text-[rgb(65,15,199)]" />
              </div>

              <label className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-colors ${
                dark
                  ? "border-gray-700 hover:border-gray-600 hover:bg-gray-800 text-gray-300"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}>
                <Upload className="w-5 h-5 text-[rgb(65,15,199)]" />
                <span className="text-sm font-medium">Upload Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>

              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className={`w-12 h-12 rounded-lg object-cover border ${
                    dark ? "border-gray-700" : "border-gray-200"
                  }`}
                />
              )}
            </div>

            <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
              dark ? "text-white" : "text-gray-900"
            }`}>
              Create Your Organization
            </h1>
            <p className={`text-base md:text-lg ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}>
              Join our community and start making an impact
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Organization Name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Organization Name"
                  required
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Abbreviation</label>
                <input
                  type="text"
                  name="abbreviation"
                  value={formData.abbreviation}
                  onChange={handleInputChange}
                  placeholder="Abbreviation (E.G, WHO)"
                  maxLength={10}
                  required
                  className={inputCls}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Official Email</label>
                <input
                  type="email"
                  name="officialEmail"
                  value={formData.officialEmail}
                  onChange={handleInputChange}
                  placeholder="Official Email"
                  required
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Chief Name</label>
                <input
                  type="text"
                  name="chiefName"
                  value={formData.chiefName}
                  onChange={handleInputChange}
                  placeholder="Chief Name"
                  required
                  className={inputCls}
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className={labelCls}>Website</label>
              <div className="relative">
                <LinkIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  dark ? "text-gray-600" : "text-gray-400"
                }`} />
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://organization.com"
                  required
                  className={`${inputCls} pl-12`}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className={labelCls}>Location</label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  required
                  className={`${inputCls} pr-44`}
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={locationLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-[rgb(65,15,199)] hover:bg-[rgb(85,35,219)] text-white text-sm flex items-center gap-2 transition-colors"
                >
                  {locationLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  {locationLoading ? "Getting..." : "Get Location"}
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelCls}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Organization description"
                rows={5}
                required
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-[rgb(65,15,199)] hover:bg-[rgb(85,35,219)] active:bg-[rgb(45,5,179)] active:scale-[0.98] flex items-center justify-center gap-2 transition-all duration-150"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Organization
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className={`text-sm transition-colors ${
                dark
                  ? "text-gray-500 hover:text-gray-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" size="lg" />
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}