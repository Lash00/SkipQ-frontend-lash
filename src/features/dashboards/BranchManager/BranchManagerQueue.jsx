import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faVideo,
  faVideoSlash,
  faChevronDown,
  faChevronUp,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useBranchManagerTheme } from "./components/BranchManagerLayout";
import {
  getBranchCameras,
  toggleCameraActive,
  toggleCameraViewActive,
  updateCameraViewTarget,
} from "./branchManagerApi";
import { viewTargets } from "../../../../data/mockData";

/**
 * BranchManagerQueue.jsx  ("Queue Management")
 * -----------------------------------------------------------------------
 * نفس فكرة Camera Config بتاعت السوبر أدمن بالظبط، بس مفلترة على فرع
 * المدير بس. المدير بيقدر:
 *   - يشغل/يوقف كاميرا بالكامل
 *   - يفتح الكاميرا ويشوف كل "view" بتاعتها (كل قناة)
 *   - يغير كل view باصة على إيه (شباك 1، شباك 2...)
 *   - يشوف عدد الناس في الانتظار لحظيًا في كل شباك
 * -----------------------------------------------------------------------
 */

export default function BranchManagerQueue() {
  const theme = useBranchManagerTheme();
  const { branchId } = useOutletContext();
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  const refresh = () => {
    if (!branchId) return;
    setLoading(true);
    getBranchCameras(branchId).then((res) => {
      setCameras(res);
      setLoading(false);
    });
  };

  useEffect(refresh, [branchId]);

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
    <>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: theme.text,
            margin: 0,
          }}
        >
          Queue Management
        </h1>
        <p style={{ fontSize: 14, color: theme.muted, marginTop: 4 }}>
          كاميرات الفرع وتحديد كل كاميرا باصة على أنهي شباك
        </p>
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
      ) : cameras.length === 0 ? (
        <div style={{ color: theme.muted, fontSize: 14 }}>
          لا توجد كاميرات مسجلة على هذا الفرع
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
                        كاميرا #{cfg.camera_config_id}
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

                {/* Expanded views */}
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
  );
}
