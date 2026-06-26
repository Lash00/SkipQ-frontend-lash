/**
 * branchManagerApi.js
 * -----------------------------------------------------------------------
 * كل الـ "calls" بتاعة داش بورد مدير الفرع بتعدي من هنا بس — بالظبط زي
 * skipqApi.js بتاع السوبر أدمن. الفرق الوحيد: كل دالة هنا بتفلتر تلقائي
 * على branch_id بتاع المدير اللي عامل لوجين، فمدير الفرع مستحيل يشوف
 * أو يعدل حاجة بره فرعه.
 *
 * لما الباك إند الحقيقي يخلص، تحول كل دالة هنا لـ fetch بنفس الطريقة
 * اللي عملناها في skipqApi.js (USE_MOCK flag).
 * -----------------------------------------------------------------------
 */

import {
  branches,
  organizations,
  atms,
  atmDenominationStock,
  denominations,
  cameraConfigurations,
  cameraViews,
  viewTargets,
  viewTypes,
  services,
  locations,
  getBranchById,
  getOrgById,
  getLocationById,
  getCameraConfigsByBranch,
  getCameraViewsByConfig,
  getAtmsByBranch,
  SECTORS,
} from "../../../../data/mockData";

export const USE_MOCK = true;
export const BASE_URL = "http://localhost:8000"; // غيرها لرابط الباك إند الحقيقي بتاعك

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

async function httpGet(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
  return res.json();
}
async function httpPatch(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PATCH ${path} failed (${res.status})`);
  return res.json();
}

// =======================================================================
// نظرة عامة على الفرع (Dashboard)
// =======================================================================

export async function getBranchOverview(branchId) {
  if (!USE_MOCK) return httpGet(`/branches/${branchId}/overview`);
  await delay();

  const branch = getBranchById(branchId);
  if (!branch) throw new Error("Branch not found");

  const org = getOrgById(branch.org_id);
  const cfgs = getCameraConfigsByBranch(branchId);
  const allViews = cfgs.flatMap((c) =>
    getCameraViewsByConfig(c.camera_config_id),
  );
  const activeCameras = cfgs.filter((c) => c.isActive).length;
  const totalWaiting = allViews.reduce(
    (s, v) => s + (v.waitingPeopleCount || 0),
    0,
  );

  const branchAtms =
    org?.sector === SECTORS.BANK ? getAtmsByBranch(branchId) : [];
  const operational = branchAtms.filter((a) => a.isActive).length;
  const offline = branchAtms.filter((a) => !a.isActive).length;

  return {
    branch,
    org,
    location: getLocationById(branch.location_id),
    sector: org?.sector,
    totalCameras: cfgs.length,
    activeCameras,
    totalWaiting,
    atmStats: {
      total: branchAtms.length,
      operational,
      maintenance: 0, // مفيش حالة "maintenance" منفصلة في الداتا الحالية — كل ATM إما active أو لأ
      offline,
    },
  };
}

// =======================================================================
// Queue Management  (كاميرات الفرع بس)
// =======================================================================

export async function getBranchCameras(branchId) {
  if (!USE_MOCK) return httpGet(`/branches/${branchId}/cameras`);
  await delay();

  return getCameraConfigsByBranch(branchId).map((cfg) => {
    const views = getCameraViewsByConfig(cfg.camera_config_id).map((view) => {
      const target = viewTargets.find((t) => t.target_id === view.target_id);
      const type = target
        ? viewTypes.find((t) => t.type_id === target.type_id)
        : null;
      const service = services.find(
        (s) => s.camera_view_id === view.camera_view_id,
      );
      return { ...view, target, type, service };
    });
    return { ...cfg, views };
  });
}

export async function toggleCameraActive(cameraConfigId, isActive) {
  if (!USE_MOCK) return httpPatch(`/cameras/${cameraConfigId}`, { isActive });
  await delay(200);
  const cfg = cameraConfigurations.find(
    (c) => c.camera_config_id === cameraConfigId,
  );
  if (!cfg) throw new Error("Camera not found");
  cfg.isActive = isActive;
  return cfg;
}

export async function toggleCameraViewActive(cameraViewId, isActive) {
  if (!USE_MOCK)
    return httpPatch(`/camera-views/${cameraViewId}`, { isActive });
  await delay(200);
  const view = cameraViews.find((v) => v.camera_view_id === cameraViewId);
  if (!view) throw new Error("Camera view not found");
  view.isActive = isActive;
  return view;
}

export async function updateCameraViewTarget(cameraViewId, targetId) {
  if (!USE_MOCK)
    return httpPatch(`/camera-views/${cameraViewId}`, { target_id: targetId });
  await delay(200);
  const view = cameraViews.find((v) => v.camera_view_id === cameraViewId);
  if (!view) throw new Error("Camera view not found");
  view.target_id = targetId;
  return view;
}

// =======================================================================
// ATMs (بنوك بس — مفيش ATMs لفروع السجل المدني)
// =======================================================================

export async function getBranchAtms(branchId) {
  if (!USE_MOCK) return httpGet(`/branches/${branchId}/atms`);
  await delay();

  return getAtmsByBranch(branchId).map((atm) => {
    const stock = atmDenominationStock
      .filter((s) => s.atm_id === atm.atm_id)
      .map((s) =>
        denominations.find((d) => d.denomination_id === s.denomination_id),
      );
    return { ...atm, stock };
  });
}

export async function toggleAtmActive(atmId, isActive) {
  if (!USE_MOCK) return httpPatch(`/atms/${atmId}`, { isActive });
  await delay(200);
  const atm = atms.find((a) => a.atm_id === atmId);
  if (!atm) throw new Error("ATM not found");
  atm.isActive = isActive;
  return atm;
}

export async function toggleAtmCapability(atmId, field, value) {
  // field: "allows_withdrawal" | "allows_deposit"
  if (!USE_MOCK) return httpPatch(`/atms/${atmId}`, { [field]: value });
  await delay(200);
  const atm = atms.find((a) => a.atm_id === atmId);
  if (!atm) throw new Error("ATM not found");
  atm[field] = value;
  return atm;
}

/** إضافة ATM جديد لنفس الفرع بتاع المدير */
export async function createAtm({
  branchId,
  allows_withdrawal,
  allows_deposit,
}) {
  if (!USE_MOCK)
    return httpPatch(`/branches/${branchId}/atms`, {
      allows_withdrawal,
      allows_deposit,
    });
  await delay();
  const branch = getBranchById(branchId);
  const newId = Math.max(...atms.map((a) => a.atm_id)) + 1;
  const newAtm = {
    atm_id: newId,
    branch_id: branchId,
    location_id: branch?.location_id,
    isActive: true,
    allows_withdrawal,
    allows_deposit,
  };
  atms.push(newAtm);
  return newAtm;
}
