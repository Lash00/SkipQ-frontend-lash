import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MapPin, Clock, Users } from "lucide-react";

function BranchInfoBox({ branch, dark, is_Active }) {
  const isActive = is_Active;

  const card = `rounded-xl border p-5 flex flex-col gap-4 h-full pb-5
    ${dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`;

  const sub = dark ? "text-gray-400" : "text-gray-500";
  const primary = dark ? "text-white" : "text-gray-900";
  const divider = dark ? "border-gray-700" : "border-gray-100";

  return (
    <div className="flex flex-col justify-center  rounded-xl shadow-xl ">
      <div className={card}>
        <div>
          <div
            className={`border-t pt-3 mb-3 ms-2 flex items-center gap-2 ${divider}`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: isActive ? "#22c55e" : "#ef4444" }}
            />
            <span
              className={`text-sm font-medium ${
                isActive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isActive ? "Active" : "Not Active"}
            </span>
          </div>
          <p className={`text-base  font-semibold ${primary}`}>
            <FontAwesomeIcon
              icon={faLocationDot}
              size="lg"
              style={{ color: "gray" }}
            />
            {branch?.branch_name}
          </p>
        </div>

        <div className="flex items-center gap-2 ms-1">
          <Clock className={`w-4 h-4 flex-shrink-0 ${sub}`} />
          <span className={`text-sm ${sub}`}>9:00 AM – 5:00 PM</span>
        </div>

        <div className="flex items-center gap-2 ms-1">
          <Users className={`w-4 h-4 flex-shrink-0 ${sub}`} />
          <span className={`text-sm ${sub}`}>Average wait: 15–20 minutes</span>
        </div>
      </div>
    </div>
  );
}

export default BranchInfoBox;
