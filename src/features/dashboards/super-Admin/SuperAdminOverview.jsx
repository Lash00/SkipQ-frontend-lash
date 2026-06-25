import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCheckCircle,
  faVideo,
  faUsers,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import SuperAdminLayout, {
  useSuperAdminTheme,
} from "./components/SuperAdminLayout";
import useAuth from "../../../contexts/useAuth";
import { getSuperAdminOverview } from "./skipqApi";

/**
 * SuperAdminOverview.jsx  (the "Dashboard" tab)
 * -----------------------------------------------------------------------
 * Matches the reference screenshot layout:
 *   - 4 stat cards in a row
 *   - 2-column row below: a left panel + "Top Performing Branches"
 *
 * Per the requested changes from the screenshot:
 *   - "Total Transactions" and "System Alerts" cards (crossed out in the
 *     reference) are replaced with domain-relevant metrics: Total Cameras
 *     and People Waiting Now.
 *   - "Transaction Trend" chart placeholder (crossed out) is replaced
 *     with a simple "Cameras Status" breakdown card.
 *   - "Top Performing Branches" stays, but now ranks by current queue
 *     load (waiting people) instead of revenue/transactions.
 * -----------------------------------------------------------------------
 */

function StatCard({ icon, label, value, sublabel, sublabelColor, theme }) {
  return (
    <div
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.borderColor}`,
        borderRadius: 16,
        padding: "20px 22px",
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div style={{ fontSize: 13, color: theme.muted, marginBottom: 10 }}>
            {label}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: theme.text }}>
            {value}
          </div>
          {sublabel && (
            <div
              style={{
                fontSize: 12,
                color: sublabelColor || theme.muted,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              {sublabel}
            </div>
          )}
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: theme.dark
              ? "rgba(65,15,199,0.15)"
              : "rgba(65,15,199,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.primary,
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    </div>
  );
}

export default function SuperAdminOverview() {
  const theme = useSuperAdminTheme();
  const { sector } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   let active = true;
  //   setLoading(true);
  //   getSuperAdminOverview(sector).then((res) => {
  //     if (active) {
  //       setData(res);
  //       setLoading(false);
  //     }
  //   });
  //   return () => {
  //     active = false;
  //   };
  // }, [sector]);
  useEffect(() => {
    let active = true;

    setLoading(true);

    getSuperAdminOverview(sector)
      .then((res) => {
        console.log("RESULT", res);

        if (active) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [sector]);
  if (loading || !data) {
    return <div>Loading...</div>;
  } else {
    return (
      // <SuperAdminLayout pageTitle={{ title: "Overview", subtitle: "نظرة عامة على كل الفروع والكاميرات" }}>
      //   {loading || !data ? (
      //     <div style={{ display: "flex", justifyContent: "center", padding: 60, color: theme.muted }}>
      //       <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      //     </div>
      //   ) : (

      <>
        {/* Stat cards row */}
        <div
          style={{
            display: "flex",
            gap: 18,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <StatCard
            theme={theme}
            icon={faBuilding}
            label="Total Branches"
            value={data.totalBranches}
            sublabel={`${data.totalOrganizations} organizations`}
          />
          <StatCard
            theme={theme}
            icon={faCheckCircle}
            label="Active Branches"
            value={data.activeBranches}
            sublabel={`out of ${data.totalBranches}`}
            sublabelColor="#16a34a"
          />
          <StatCard
            theme={theme}
            icon={faVideo}
            label="Total Cameras"
            value={data.totalCameras}
            sublabel={`${data.activeCameras} online now`}
            sublabelColor="#16a34a"
          />
          <StatCard
            theme={theme}
            icon={faUsers}
            label="People Waiting Now"
            value={data.totalWaitingNow}
            sublabel="across all branches"
          />
        </div>

        {/* Bottom row */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
        >
          {/* Cameras status panel */}
          <div
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.borderColor}`,
              borderRadius: 16,
              padding: 22,
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: theme.text,
                margin: "0 0 16px",
              }}
            >
              Cameras Status
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                justifyContent: "center",
                minHeight: 200,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 13, color: theme.muted }}>Online</span>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}
                >
                  {data.activeCameras} / {data.totalCameras}
                </span>
              </div>
              <div
                style={{
                  height: 10,
                  borderRadius: 6,
                  backgroundColor: theme.dark ? "#334155" : "#e2e8f0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${data.totalCameras ? (data.activeCameras / data.totalCameras) * 100 : 0}%`,
                    backgroundColor: "#16a34a",
                    borderRadius: 6,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 13, color: theme.muted }}>
                  Offline
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#ef4444" }}
                >
                  {data.totalCameras - data.activeCameras} / {data.totalCameras}
                </span>
              </div>
            </div>
          </div>

          {/* Top branches by queue load */}
          <div
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.borderColor}`,
              borderRadius: 16,
              padding: 22,
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: theme.text,
                margin: "0 0 16px",
              }}
            >
              Top Performing Branches
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {data.topBranches.length === 0 && (
                <div style={{ color: theme.muted, fontSize: 13 }}>
                  لا توجد بيانات حالياً
                </div>
              )}
              {data.topBranches.map((b, i) => (
                <div
                  key={b.branch_id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom:
                      i !== data.topBranches.length - 1
                        ? `1px solid ${theme.borderColor}`
                        : "none",
                  }}
                >
                  <span style={{ fontSize: 14, color: theme.text }}>
                    {b.branch_name}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: theme.primary,
                    }}
                  >
                    {b.waiting} في الانتظار
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
      // )}
      // </SuperAdminLayout>
    );
  }
}
