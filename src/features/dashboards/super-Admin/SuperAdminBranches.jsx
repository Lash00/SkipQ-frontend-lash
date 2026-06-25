import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faPlus,
  faPenToSquare,
  faXmark,
  faVideo,
  faMoneyBillTransfer,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import SuperAdminLayout, {
  useSuperAdminTheme,
} from "./components/SuperAdminLayout";
import useAuth from "../../../contexts/useAuth";
import {
  getAllBranches,
  createBranch,
  updateBranch,
  getOrganizations,
} from "./skipqApi";
import { SECTORS } from "../../../../data/mockData";

/**
 * SuperAdminBranches.jsx
 * -----------------------------------------------------------------------
 * Per your requested change #2:
 *   - List every branch in the sector
 *   - Edit any branch (name + active status for now — extend as needed)
 *   - Add a new branch under any organization in the sector
 * -----------------------------------------------------------------------
 */

export default function SuperAdminBranches() {
  const theme = useSuperAdminTheme();
  const { sector } = useAuth();

  const [branches, setBranches] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // { mode: "edit" | "create", branch? }

  const refresh = () => {
    setLoading(true);
    Promise.all([getAllBranches(sector), getOrganizations(sector)]).then(
      ([b, o]) => {
        setBranches(b);
        setOrgs(o);
        setLoading(false);
      },
    );
  };

  useEffect(refresh, [sector]);

  return (
    // <SuperAdminLayout pageTitle={{ title: "Branches", subtitle: "إدارة كل الفروع التابعة للقطاع" }}>
    //   <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
    //     <button
    //       onClick={() => setModal({ mode: "create" })}
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         gap: 8,
    //         padding: "10px 18px",
    //         borderRadius: 10,
    //         border: "none",
    //         backgroundColor: theme.primary,
    //         color: "#fff",
    //         fontWeight: 600,
    //         fontSize: 13,
    //         cursor: "pointer",
    //       }}
    //     >
    <>
      {/* <FontAwesomeIcon icon={faPlus} /> إضافة فرع جديد
        </button>
      </div> */}

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
                style={{ backgroundColor: theme.dark ? "#0f172a" : "#f8fafc" }}
              >
                {[
                  "الفرع",
                  "المنظمة",
                  "الموقع",
                  "الحالة",
                  "كاميرات",
                  "مدير الفرع",
                  "",
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
              {branches.map((b) => (
                <tr
                  key={b.branch_id}
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
                    {b.branch_name}
                  </td>
                  <td
                    style={{
                      padding: "14px 18px",
                      fontSize: 13,
                      color: theme.muted,
                    }}
                  >
                    {b.org_abbreviation}
                  </td>
                  <td
                    style={{
                      padding: "14px 18px",
                      fontSize: 13,
                      color: theme.muted,
                    }}
                  >
                    {b.location?.address_details}
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        color: b.isActive ? "#16a34a" : "#ef4444",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCircle}
                        style={{ fontSize: 7 }}
                      />
                      {b.isActive ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "14px 18px",
                      fontSize: 13,
                      color: theme.muted,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faVideo}
                      style={{ marginLeft: 6, color: theme.muted }}
                    />
                    {b.cameraCount}
                  </td>
                  <td
                    style={{
                      padding: "14px 18px",
                      fontSize: 13,
                      color: theme.muted,
                    }}
                  >
                    {b.manager ? (
                      b.manager.email
                    ) : (
                      <span style={{ color: "#f59e0b" }}>بدون مدير</span>
                    )}
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "left" }}>
                    <button
                      onClick={() => setModal({ mode: "edit", branch: b })}
                      style={{
                        border: "none",
                        background: "transparent",
                        color: theme.primary,
                        cursor: "pointer",
                        fontSize: 14,
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <BranchModal
          theme={theme}
          mode={modal.mode}
          branch={modal.branch}
          orgs={orgs}
          sector={sector}
          onClose={() => setModal(null)}
          onSaved={() => {
            setModal(null);
            refresh();
          }}
        />
      )}
    </>
    // </SuperAdminLayout>
  );
}

function BranchModal({ theme, mode, branch, orgs, sector, onClose, onSaved }) {
  const [branchName, setBranchName] = useState(branch?.branch_name || "");
  const [orgId, setOrgId] = useState(branch?.org_id || orgs[0]?.org_id || "");
  const [isActive, setIsActive] = useState(branch ? branch.isActive : true);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (mode === "create") {
        const newId = Date.now();
        await createBranch({
          org_id: Number(orgId),
          branch_name: branchName,
          branch_code: `BR-${newId}`,
          location_id: orgs.find((o) => o.org_id === Number(orgId))
            ?.location_id,
        });
      } else {
        await updateBranch(branch.branch_id, {
          branch_name: branchName,
          isActive,
        });
      }
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme.cardBg,
          borderRadius: 16,
          padding: 28,
          width: 420,
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: theme.text,
            }}
          >
            {mode === "create" ? "إضافة فرع جديد" : "تعديل الفرع"}
          </h3>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              color: theme.muted,
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: theme.text,
            display: "block",
            marginBottom: 6,
          }}
        >
          اسم الفرع
        </label>
        <input
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 10,
            border: `1px solid ${theme.borderColor}`,
            backgroundColor: theme.inputBg,
            color: theme.text,
            marginBottom: 16,
            fontSize: 14,
          }}
        />

        {mode === "create" && (
          <>
            <label
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: theme.text,
                display: "block",
                marginBottom: 6,
              }}
            >
              المنظمة التابعة لها
            </label>
            <select
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 10,
                border: `1px solid ${theme.borderColor}`,
                backgroundColor: theme.inputBg,
                color: theme.text,
                marginBottom: 16,
                fontSize: 14,
              }}
            >
              {orgs.map((o) => (
                <option key={o.org_id} value={o.org_id}>
                  {o.org_name}
                </option>
              ))}
            </select>
          </>
        )}

        {mode === "edit" && (
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span style={{ fontSize: 13, color: theme.text }}>الفرع نشط</span>
          </label>
        )}

        <button
          onClick={handleSave}
          disabled={saving || !branchName}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 10,
            border: "none",
            backgroundColor: theme.primary,
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? <FontAwesomeIcon icon={faSpinner} spin /> : "حفظ"}
        </button>
      </div>
    </div>
  );
}
