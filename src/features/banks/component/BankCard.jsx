import { Link } from "react-router-dom";

function BankCard({ bank, onClick }) {
  return (
    <Link
      to={`/banks/${bank.org_name}/atms`}
      onClick={() => onClick?.(bank)}
      className="group relative bg-white border border-blue-100 rounded-2xl cursor-pointer overflow-hidden
                 transition-all duration-300 ease-out
                 hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-xl hover:shadow-blue-100 hover:border-blue-300"
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative flex items-center gap-4 p-5">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                        bg-blue-100 text-blue-600
                        group-hover:bg-blue-600 group-hover:text-white
                        transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <path d="M12 12v4M10 14h4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 text-[15px] truncate mb-1.5">
            {bank.org_name}
          </h3>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1 text-slate-400 text-xs">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
              {bank.atms} ATMs available
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default BankCard;