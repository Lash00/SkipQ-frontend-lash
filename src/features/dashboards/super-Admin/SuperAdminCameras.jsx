import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faVideo,
  faVideoSlash,
  faChevronDown,
  faChevronUp,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import SuperAdminLayout, {
  useSuperAdminTheme,
} from "./components/SuperAdminLayout";
import useAuth from "../../../contexts/useAuth";
import {
  getAllCameras,
  toggleCameraActive,
  toggleCameraViewActive,
  updateCameraViewTarget,
} from "./skipqApi";
import { viewTargets } from "../../../../data/mockData";

/**
 * SuperAdminCameras.jsx
 * -----------------------------------------------------------------------
 * Replaces the old "Reports" page per your requested change #3.
 *
 * For every branch in the sector, shows:
 *   - each physical camera config (online/offline toggle)
 *   - each "view" that camera produces (what it's looking at), with the
 *     ability to change its target and toggle it on/off individually
 *   - the live "people waiting" count reported by that view
 * -----------------------------------------------------------------------
 */

export default function SuperAdminCameras() {
  const theme = useSuperAdminTheme();
  const { sector } = useAuth();
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  const refresh = () => {
    setLoading(true);
    getAllCameras(sector).then((res) => {
      setCameras(res);
      setLoading(false);
    });
  };

  useEffect(refresh, [sector]);

  const handleToggleCamera = async (cfg) => {
    await toggleCameraActive(cfg.camera_config_id, !cfg.isActive);
    refresh();
  };

  const handleToggleView = async (viewId, isActive) => {
    await toggleCameraViewActive(viewId, !isActive);
    refresh();
  };

  const handleChangeTarget = async (viewId, targetId) => {
    await updateCameraViewTarget(viewId, Number(targetId));
    refresh();
  };

  return (
    // <SuperAdminLayout
    //   pageTitle={{
    //     title: "Camera Config",
    //     subtitle: "كل الكاميرات وأماكن مراقبتها في كل الفروع",
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
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {cameras.map((cfg) => {
            const isOpen = expanded[cfg.camera_config_id];
            const totalWaiting = cfg.views.reduce(
              (s, v) => s + (v.waitingPeopleCount || 0),
              0,
            );

            return (
              <div
                key={cfg.camera_config_id}
                style={{
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.borderColor}`,
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setExpanded((p) => ({
                      ...p,
                      [cfg.camera_config_id]: !p[cfg.camera_config_id],
                    }))
                  }
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: cfg.isActive
                          ? "rgba(22,163,74,0.12)"
                          : "rgba(239,68,68,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: cfg.isActive ? "#16a34a" : "#ef4444",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={cfg.isActive ? faVideo : faVideoSlash}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: theme.text,
                        }}
                      >
                        {cfg.branch_name}
                      </div>
                      <div style={{ fontSize: 12, color: theme.muted }}>
                        {cfg.ipAddress} &middot; {cfg.views.length} مشاهد
                        &middot; <FontAwesomeIcon icon={faUsers} />{" "}
                        {totalWaiting} في الانتظار
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        cursor: "pointer",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={cfg.isActive}
                        onChange={() => handleToggleCamera(cfg)}
                      />
                      <span style={{ fontSize: 12, color: theme.muted }}>
                        {cfg.isActive ? "مفعلة" : "متوقفة"}
                      </span>
                    </label>
                    <FontAwesomeIcon
                      icon={isOpen ? faChevronUp : faChevronDown}
                      style={{ color: theme.muted }}
                    />
                  </div>
                </div>

                {/* Expanded views list */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                    {cfg.views.map((view) => (
                      <div
                        key={view.camera_view_id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "14px 20px",
                          borderBottom: `1px solid ${theme.borderColor}`,
                          backgroundColor: theme.dark ? "#0f172a" : "#f8fafc",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            flex: 1,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 12,
                              color: theme.muted,
                              width: 70,
                            }}
                          >
                            القناة {view.channel_number}
                          </span>
                          <select
                            value={view.target_id}
                            onChange={(e) =>
                              handleChangeTarget(
                                view.camera_view_id,
                                e.target.value,
                              )
                            }
                            style={{
                              padding: "6px 10px",
                              borderRadius: 8,
                              border: `1px solid ${theme.borderColor}`,
                              backgroundColor: theme.inputBg,
                              color: theme.text,
                              fontSize: 13,
                              minWidth: 200,
                            }}
                          >
                            {viewTargets.map((t) => (
                              <option key={t.target_id} value={t.target_id}>
                                {t.target_name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 18,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13,
                              color: theme.text,
                              fontWeight: 600,
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faUsers}
                              style={{ marginLeft: 6, color: theme.muted }}
                            />
                            {view.waitingPeopleCount}
                          </span>
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
                              checked={view.isActive}
                              onChange={() =>
                                handleToggleView(
                                  view.camera_view_id,
                                  view.isActive,
                                )
                              }
                            />
                            <span style={{ fontSize: 12, color: theme.muted }}>
                              {view.isActive ? "نشط" : "متوقف"}
                            </span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
    // </SuperAdminLayout>
  );
}
