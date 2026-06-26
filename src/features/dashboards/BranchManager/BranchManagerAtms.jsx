import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faPlus,
  faCircle,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useBranchManagerTheme } from "./components/BranchManagerLayout";
import {
  getBranchAtms,
  toggleAtmActive,
  toggleAtmCapability,
  createAtm,
} from "./branchManagerApi";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

/**
 * BranchManagerAtms.jsx  ("ATM Fleet Management")
 * -----------------------------------------------------------------------
 * مطابقة للصورة المرجعية: 3 كروت إحصائية (Operational / Maintenance /
 * Offline) + جدول الـ ATMs + زرار "Add ATM".
 *
 * ملاحظة هامة: في الصورة فيه عمود "Model" — ده غير موجود في الداتا
 * بتاعتنا أصلاً (الـ ERD معندوش حقل اسمه model)، فاستبدلناه بعرض حقيقي:
 * قدرات الماكينة (سحب/إيداع) + الفئات النقدية المتاحة فيها. لو عايز
 * تضيف حقل "model" فعليًا في الداتا، قولي وأضيفه في mockData.js.
 *
 * "Maintenance" برضو مفيش لها status منفصل في الداتا الحالية — الماكينة
 * إما isActive (تشتغل) أو لأ. سيبت كارت Maintenance بقيمة 0 ثابتة دلوقتي
 * لحد ما نضيف status أوضح في الداتا لو احتجناه.
 * -----------------------------------------------------------------------
 */

export default function BranchManagerAtms() {
  const theme = useBranchManagerTheme();
  const { branchId } = useOutletContext();
  const [atms, setAtms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const refresh = () => {
    if (!branchId) return;
    setLoading(true);
    getBranchAtms(branchId).then((res) => {
      setAtms(res);
      setLoading(false);
    });
  };

  useEffect(refresh, [branchId]);

  const operational = atms.filter((a) => a.isActive).length;
  const offline = atms.filter((a) => !a.isActive).length;

  const handleToggleActive = async (atm) => {
    await toggleAtmActive(atm.atm_id, !atm.isActive);
    refresh();
  };

  const handleToggleCapability = async (atm, field) => {
    await toggleAtmCapability(atm.atm_id, field, !atm[field]);
    refresh();
  };

  const handleAddAtm = async () => {
    setAdding(true);
    try {
      await createAtm({
        branchId,
        allows_withdrawal: true,
        allows_deposit: true,
      });
      refresh();
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: theme.text,
              margin: 0,
            }}
          >
            ATM Fleet Management
          </h1>
          <p style={{ fontSize: 14, color: theme.muted, marginTop: 4 }}>
            {atms.length} ATMs deployed
          </p>
        </div>
        <button
          onClick={handleAddAtm}
          disabled={adding}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 10,
            border: "none",
            backgroundColor: theme.primary,
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            opacity: adding ? 0.7 : 1,
          }}
        >
          <FontAwesomeIcon icon={adding ? faSpinner : faPlus} spin={adding} />{" "}
          Add ATM
        </button>
      </div>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 60,
            color: theme.muted,
          }}
        >
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      ) : (
        <>
          {/* Stat cards */}
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
              label="Operational"
              value={operational}
              color="#16a34a"
            />
            <StatCard
              theme={theme}
              label="Maintenance"
              value={0}
              color="#f59e0b"
            />
            <StatCard
              theme={theme}
              label="Offline"
              value={offline}
              color="#ef4444"
            />
          </div>

          {/* ATMs table */}
          <div
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.borderColor}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: theme.dark ? "#0f172a" : "#f8fafc",
                  }}
                >
                  {[
                    "ATM ID",
                    "السحب",
                    "الإيداع",
                    "الحالة",
                    "الفئات النقدية المتاحة",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "right",
                        padding: "14px 18px",
                        fontSize: 12,
                        color: theme.muted,
                        fontWeight: 600,
                        borderBottom: `1px solid ${theme.borderColor}`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {atms.map((atm) => (
                  <tr
                    key={atm.atm_id}
                    style={{ borderBottom: `1px solid ${theme.borderColor}` }}
                  >
                    <td
                      style={{
                        padding: "14px 18px",
                        fontSize: 14,
                        color: theme.text,
                        fontWeight: 600,
                      }}
                    >
                      ATM{String(atm.atm_id).padStart(3, "0")}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={atm.allows_withdrawal}
                          onChange={() =>
                            handleToggleCapability(atm, "allows_withdrawal")
                          }
                        />
                        <FontAwesomeIcon
                          icon={faArrowUpFromBracket}
                          style={{ color: theme.muted, fontSize: 12 }}
                        />
                      </label>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={atm.allows_deposit}
                          onChange={() =>
                            handleToggleCapability(atm, "allows_deposit")
                          }
                        />
                        <FontAwesomeIcon
                          icon={faArrowDown}
                          style={{ color: theme.muted, fontSize: 12 }}
                        />
                      </label>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={atm.isActive}
                          onChange={() => handleToggleActive(atm)}
                        />
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            color: atm.isActive ? "#16a34a" : "#ef4444",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCircle}
                            style={{ fontSize: 7 }}
                          />
                          {atm.isActive ? "operational" : "offline"}
                        </span>
                      </label>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <div
                        style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                      >
                        {atm.stock.length === 0 ? (
                          <span style={{ fontSize: 12, color: theme.muted }}>
                            —
                          </span>
                        ) : (
                          atm.stock.map((s, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                padding: "3px 8px",
                                borderRadius: 6,
                                backgroundColor: theme.dark
                                  ? "#0f172a"
                                  : "#f1f5f9",
                                color: theme.muted,
                              }}
                            >
                              {s?.amount} ج.م
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {atms.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        padding: 24,
                        textAlign: "center",
                        color: theme.muted,
                        fontSize: 13,
                      }}
                    >
                      لا توجد ماكينات صرف مسجلة على هذا الفرع
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

function StatCard({ label, value, color, theme }) {
  return (
    <div
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.borderColor}`,
        borderRadius: 16,
        padding: "20px 22px",
        flex: 1,
        minWidth: 180,
      }}
    >
      <div style={{ fontSize: 13, color: theme.muted, marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}
