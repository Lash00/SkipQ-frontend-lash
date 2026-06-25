import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faMoneyBillTransfer,
  faCircle,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import SuperAdminLayout, {
  useSuperAdminTheme,
} from "./components/SuperAdminLayout";
import { getAtmsBySector } from "./skipqApi";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

/**
 * SuperAdminAtms.jsx
 * -----------------------------------------------------------------------
 * Per your requested change #4: only shown when sector === "bank"
 * (the sidebar already hides this link for the civil-registry sector,
 * and the route guard in the router should redirect away if someone
 * hits this URL directly with the wrong sector).
 *
 * Shows every ATM, grouped by organization/bank, with its branch,
 * deposit/withdrawal capability, and current cash denomination stock.
 * -----------------------------------------------------------------------
 */

export default function SuperAdminAtms() {
  const theme = useSuperAdminTheme();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAtmsBySector().then((res) => {
      setGroups(res);
      setLoading(false);
    });
  }, []);

  return (
    // <SuperAdminLayout
    //   pageTitle={{
    //     title: "ATMs",
    //     subtitle: "كل ماكينات الصرف الآلي لجميع البنوك",
    //   }}
    // >
    <>
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
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {groups.map((g) => (
            <div key={g.org_id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: theme.text,
                    margin: 0,
                  }}
                >
                  {g.org_name}
                </h3>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 100,
                    backgroundColor: theme.dark
                      ? "rgba(65,15,199,0.18)"
                      : "rgba(65,15,199,0.08)",
                    color: theme.primary,
                  }}
                >
                  {g.atms.length} ATM
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 14,
                }}
              >
                {g.atms.map((atm) => (
                  <div
                    key={atm.atm_id}
                    style={{
                      backgroundColor: theme.cardBg,
                      border: `1px solid ${theme.borderColor}`,
                      borderRadius: 14,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          backgroundColor: theme.dark
                            ? "rgba(65,15,199,0.15)"
                            : "rgba(65,15,199,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: theme.primary,
                        }}
                      >
                        <FontAwesomeIcon icon={faMoneyBillTransfer} />
                      </div>
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
                        {atm.isActive ? "نشطة" : "متوقفة"}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: theme.text,
                        marginBottom: 4,
                      }}
                    >
                      ATM #{atm.atm_id}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: theme.muted,
                        marginBottom: 12,
                      }}
                    >
                      {atm.branch_name}
                    </div>

                    <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                      <span
                        style={{
                          fontSize: 12,
                          color: atm.allows_withdrawal
                            ? theme.text
                            : theme.muted,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                        سحب {atm.allows_withdrawal ? "✓" : "✕"}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: atm.allows_deposit ? theme.text : theme.muted,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <FontAwesomeIcon icon={faArrowDown} />
                        إيداع {atm.allows_deposit ? "✓" : "✕"}
                      </span>
                    </div>

                    {atm.stock.length > 0 && (
                      <div
                        style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                      >
                        {atm.stock.map((s, i) => (
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
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* </SuperAdminLayout> */}
    </>
  );
}
