import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faPlus,
  faXmark,
  faCircle,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import SuperAdminLayout, {
  useSuperAdminTheme,
} from "./components/SuperAdminLayout";
import useAuth from "../../../contexts/useAuth";
import { getManagersOverview, createBranchManager } from "./skipqApi";

/**
 * SuperAdminManagers.jsx
 * -----------------------------------------------------------------------
 * Replaces the old generic "Users" page per your requested change #1.
 *
 * Two sections:
 *   1. "Branch Managers" — every branch that already has a manager
 *      account, with their email + account status.
 *   2. "Branches Without a Manager" — branches that need one. The Super
 *      Admin creates the email + password here, and is expected to send
 *      those credentials to the manager themselves (the new account is
 *      created with status "Pending" until the manager's first login).
 * -----------------------------------------------------------------------
 */

const statusLabel = { 1: "نشط", 4: "بانتظار التفعيل", 3: "موقوف", 6: "مقفل" };
const statusColor = { 1: "#16a34a", 4: "#f59e0b", 3: "#ef4444", 6: "#ef4444" };

export default function SuperAdminManagers() {
  const theme = useSuperAdminTheme();
  const { sector } = useAuth();

  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalBranch, setModalBranch] = useState(null);
  const [createdCreds, setCreatedCreds] = useState(null);

  const refresh = () => {
    setLoading(true);
    getManagersOverview(sector).then((res) => {
      setOverview(res);
      setLoading(false);
    });
  };

  useEffect(refresh, [sector]);

  return (
    // <SuperAdminLayout
    //   pageTitle={{
    //     title: "Managers",
    //     subtitle: "مديرو الفروع وإضافة حسابات جديدة",
    //   }}
    // >
    <>
      {loading || !overview ? (
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
          {/* ---- Assigned managers ---- */}
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: theme.text,
              marginBottom: 12,
            }}
          >
            مديرو الفروع ({overview.assigned.length})
          </h3>
          <div
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.borderColor}`,
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 32,
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: theme.dark ? "#0f172a" : "#f8fafc",
                  }}
                >
                  {["البريد الإلكتروني", "الفرع", "المنظمة", "الحالة"].map(
                    (h) => (
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
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {overview.assigned.map((m) => (
                  <tr
                    key={m.account_id}
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
                      {m.email}
                    </td>
                    <td
                      style={{
                        padding: "14px 18px",
                        fontSize: 13,
                        color: theme.muted,
                      }}
                    >
                      {m.branch_name}
                    </td>
                    <td
                      style={{
                        padding: "14px 18px",
                        fontSize: 13,
                        color: theme.muted,
                      }}
                    >
                      {m.org_name}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          color: statusColor[m.status_id] || theme.muted,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCircle}
                          style={{ fontSize: 7 }}
                        />
                        {statusLabel[m.status_id] || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
                {overview.assigned.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: 24,
                        textAlign: "center",
                        color: theme.muted,
                        fontSize: 13,
                      }}
                    >
                      لا يوجد مديرو فروع بعد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ---- Unassigned branches ---- */}
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: theme.text,
              marginBottom: 12,
            }}
          >
            فروع بدون مدير ({overview.unassignedBranches.length})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {overview.unassignedBranches.map((b) => (
              <div
                key={b.branch_id}
                style={{
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.borderColor}`,
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 600, color: theme.text }}
                  >
                    {b.branch_name}
                  </div>
                  <div style={{ fontSize: 12, color: theme.muted }}>
                    {b.org_name}
                  </div>
                </div>
                <button
                  onClick={() => setModalBranch(b)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "none",
                    backgroundColor: theme.primary,
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} /> إضافة مدير
                </button>
              </div>
            ))}
            {overview.unassignedBranches.length === 0 && (
              <div style={{ color: theme.muted, fontSize: 13 }}>
                كل الفروع لديها مدير ✅
              </div>
            )}
          </div>
        </>
      )}

      {modalBranch && (
        <AddManagerModal
          theme={theme}
          branch={modalBranch}
          onClose={() => setModalBranch(null)}
          onCreated={(creds) => {
            setModalBranch(null);
            setCreatedCreds(creds);
            refresh();
          }}
        />
      )}

      {createdCreds && (
        <CredsModal
          theme={theme}
          creds={createdCreds}
          onClose={() => setCreatedCreds(null)}
        />
      )}
    </>
    // </SuperAdminLayout>
  );
}

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#";
  let out = "";
  for (let i = 0; i < 12; i++)
    out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function AddManagerModal({ theme, branch, onClose, onCreated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(generatePassword());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setSaving(true);
    setError("");
    try {
      await createBranchManager({
        branchId: branch.branch_id,
        email,
        password,
      });
      onCreated({ email, password, branch_name: branch.branch_name });
    } catch (err) {
      setError(err.message);
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
          width: 440,
          border: `1px solid ${theme.borderColor}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
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
            إضافة مدير فرع
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
        <p style={{ fontSize: 13, color: theme.muted, margin: "0 0 20px" }}>
          الفرع: {branch.branch_name}
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: theme.text,
            display: "block",
            marginBottom: 6,
          }}
        >
          البريد الإلكتروني للمدير
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="manager@example.com"
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

        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: theme.text,
            display: "block",
            marginBottom: 6,
          }}
        >
          كلمة مرور مؤقتة (سيتم إرسالها للمدير)
        </label>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 10,
              border: `1px solid ${theme.borderColor}`,
              backgroundColor: theme.inputBg,
              color: theme.text,
              fontSize: 14,
              fontFamily: "monospace",
            }}
          />
          <button
            onClick={() => setPassword(generatePassword())}
            style={{
              padding: "0 14px",
              borderRadius: 10,
              border: `1px solid ${theme.borderColor}`,
              backgroundColor: "transparent",
              color: theme.text,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            توليد جديد
          </button>
        </div>

        <button
          onClick={handleCreate}
          disabled={saving || !email}
          style={{
            width: "100%",
            padding: 12,
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
          {saving ? <FontAwesomeIcon icon={faSpinner} spin /> : "إنشاء الحساب"}
        </button>
      </div>
    </div>
  );
}

function CredsModal({ theme, creds, onClose }) {
  const [copied, setCopied] = useState(false);

  const copyAll = () => {
    navigator.clipboard?.writeText(
      `Email: ${creds.email}\nPassword: ${creds.password}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
        <h3
          style={{
            margin: "0 0 6px",
            fontSize: 18,
            fontWeight: 700,
            color: theme.text,
          }}
        >
          تم إنشاء الحساب ✅
        </h3>
        <p style={{ fontSize: 13, color: theme.muted, margin: "0 0 18px" }}>
          ابعت البيانات دي للمدير بتاع <strong>{creds.branch_name}</strong> —
          الحساب هيكون "بانتظار التفعيل" لحد أول تسجيل دخول.
        </p>
        <div
          style={{
            backgroundColor: theme.dark ? "#0f172a" : "#f8fafc",
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            fontFamily: "monospace",
            fontSize: 13,
            color: theme.text,
          }}
        >
          <div>Email: {creds.email}</div>
          <div>Password: {creds.password}</div>
        </div>
        <button
          onClick={copyAll}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: `1px solid ${theme.borderColor}`,
            backgroundColor: "transparent",
            color: theme.text,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <FontAwesomeIcon icon={faCopy} />{" "}
          {copied ? "تم النسخ!" : "نسخ البيانات"}
        </button>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            backgroundColor: theme.primary,
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          تم
        </button>
      </div>
    </div>
  );
}
