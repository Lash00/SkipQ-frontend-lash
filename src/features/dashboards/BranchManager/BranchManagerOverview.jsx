import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faUsers,
  faMoneyBillTransfer,
  faSpinner,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useBranchManagerTheme } from "./components/BranchManagerLayout";
import { getBranchOverview } from "./branchManagerApi";
import { SECTORS } from "../../../../data/mockData";

/**
 * BranchManagerOverview.jsx  ("Dashboard")
 * -----------------------------------------------------------------------
 * نظرة عامة على الفرع بتاع المدير بس: كاميرات، عدد الناس في الانتظار
 * دلوقتي، وكروت ATMs لو الفرع بنكي.
 * -----------------------------------------------------------------------
 */

export default function BranchManagerOverview() {
  const theme = useBranchManagerTheme();
  const { branchId } = useOutletContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!branchId) return;
    setLoading(true);
    getBranchOverview(branchId).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [branchId]);

  if (loading || !data) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 60, color: theme.muted }}>
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: theme.text, margin: 0 }}>Overview</h1>
        <p style={{ fontSize: 14, color: theme.muted, marginTop: 4 }}>
          {data.branch.branch_name} &middot; {data.org?.org_name}
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "flex", gap: 18, marginBottom: 24, flexWrap: "wrap" }}>
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
          value={data.totalWaiting}
          sublabel="في كل الشبابيك"
        />
        {data.sector === SECTORS.BANK && (
          <StatCard
            theme={theme}
            icon={faMoneyBillTransfer}
            label="ATMs"
            value={data.atmStats.total}
            sublabel={`${data.atmStats.operational} operational`}
            sublabelColor="#16a34a"
          />
        )}
      </div>

      {/* Branch info card */}
      <div
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.borderColor}`,
          borderRadius: 16,
          padding: 22,
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 700, color: theme.text, margin: "0 0 14px" }}>
          بيانات الفرع
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: theme.muted, fontSize: 14 }}>
          <FontAwesomeIcon icon={faLocationDot} />
          {data.location?.address_details}
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: theme.muted }}>كود الفرع</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{data.branch.branch_code}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: theme.muted }}>الحالة</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: data.branch.isActive ? "#16a34a" : "#ef4444" }}>
              {data.branch.isActive ? "نشط" : "غير نشط"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ icon, label, value, sublabel, sublabelColor, theme }) {
  return (
    <div
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.borderColor}`,
        borderRadius: 16,
        padding: "20px 22px",
        flex: 1,
        minWidth: 200,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, color: theme.muted, marginBottom: 10 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: theme.text }}>{value}</div>
          {sublabel && (
            <div style={{ fontSize: 12, color: sublabelColor || theme.muted, marginTop: 6, fontWeight: 600 }}>
              {sublabel}
            </div>
          )}
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: theme.dark ? "rgba(65,15,199,0.15)" : "rgba(65,15,199,0.08)",
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
