/**
 * skipqApi.js
 * -----------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH FOR ALL NETWORK CALLS
 * -----------------------------------------------------------------------
 * Every screen in the app calls functions from THIS file only — never the
 * mock data directly, and never `fetch` directly inside components.
 *
 * WHEN YOUR JSON-SERVER IS READY:
 *   1. Set BASE_URL below to your real endpoint
 *      (e.g. "http://localhost:3001")
 *   2. Flip USE_MOCK to false
 *   3. Done — every component keeps working with zero changes, because
 *      every function here returns the exact same shape whether it reads
 *      from mockData.js or from a real fetch() call.
 *
 * All functions are `async` and return Promises (with a small artificial
 * delay in mock mode) specifically so the switch to real HTTP calls is a
 * drop-in replacement.
 * -----------------------------------------------------------------------
 */

import {
  accounts,
  users,
  organizations,
  branches,
  atms,
  atmDenominationStock,
  denominations,
  cameraConfigurations,
  cameraViews,
  viewTargets,
  viewTypes,
  services,
  locations,
  governorates,
  SECTORS,
  getOrgsBySector,
  getBranchesByOrg,
  getBranchesBySector,
  getAtmsByBranch,
  getAtmsByOrg,
  getCameraConfigsByBranch,
  getCameraViewsByConfig,
  getBranchManager,
  getLocationById,
  getOrgById,
  getBranchById,
  getUserByAccount,
} from "../../../../data/mockData";

// ---------------------------------------------------------------------
// CONFIG — flip this switch when the real backend is live
// ---------------------------------------------------------------------
export const USE_MOCK = true;
export const BASE_URL = "http://localhost:3001"; // <-- change to your json-server URL

// Small helper to fake network latency in mock mode (keeps loading
// spinners / skeletons looking realistic during development).
const delay = (ms = 350) => new Promise((res) => setTimeout(res, ms));

// A generic fetch wrapper used ONLY once real endpoints exist.
async function httpGet(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
  return res.json();
}
async function httpPost(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `POST ${path} failed (${res.status})`);
  }
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
// AUTH
// =======================================================================

/**
 * POST /auth/login
 * Looks the email up in `accounts`, checks password & status, then
 * returns a normalized session object the AuthContext can store.
 */
export async function loginRequest(email, password) {
  if (!USE_MOCK) {
    return httpPost("/auth/login", { email, password });
  }

  await delay(500);

  const account = accounts.find(
    (a) => a.account_email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (!account) {
    throw new Error("البريد الإلكتروني غير مسجل");
  }
  if (account.password !== password) {
    throw new Error("كلمة المرور غير صحيحة");
  }
  if (account.status_id === 3) {
    throw new Error("هذا الحساب موقوف، يرجى التواصل مع الدعم");
  }
  if (account.status_id === 6) {
    throw new Error("هذا الحساب مقفل");
  }
  if (account.status_id === 4) {
    throw new Error("هذا الحساب لم يتم تفعيله بعد. تحقق من بريدك الإلكتروني");
  }

  const user = getUserByAccount(account);

  // Figure out the role string the frontend router will use to decide
  // which dashboard to redirect to.
  let role = "developer";
  let sector = null;
  let orgId = null;
  let branchId = null;

  if (account.type_id === 11) {
    role = "developer";
  } else if (account.type_id === 1) {
    role = "super_admin";
    sector = account.sector; // "bank" | "civil_registry"
  } else if (account.type_id === 2) {
    role = "branch_manager";
    branchId = account.branch_id;
    const branch = getBranchById(branchId);
    orgId = branch?.org_id ?? null;
    const org = orgId ? getOrgById(orgId) : null;
    sector = org?.sector ?? null;
  }

  const session = {
    token: `mock-token-${account.account_id}-${Date.now()}`,
    account_id: account.account_id,
    email: account.account_email,
    role,
    sector,
    org_id: orgId,
    branch_id: branchId,
    user_name: user?.user_name ?? "User",
  };

  return session;
}

// =======================================================================
// SUPER ADMIN — ORGANIZATIONS
// =======================================================================

/** GET all organizations belonging to the super admin's sector */
export async function getOrganizations(sector) {
  if (!USE_MOCK) return httpGet(`/organizations?sector=${sector}`);
  await delay();
  return getOrgsBySector(sector).map((org) => ({
    ...org,
    location: getLocationById(org.location_id),
    branchCount: getBranchesByOrg(org.org_id).length,
    atmCount:
      sector === SECTORS.BANK ? getAtmsByOrg(org.org_id).length : undefined,
  }));
}

export async function getOrganizationById(orgId) {
  if (!USE_MOCK) return httpGet(`/organizations/${orgId}`);
  await delay();
  const org = getOrgById(orgId);
  if (!org) throw new Error("Organization not found");
  return { ...org, location: getLocationById(org.location_id) };
}

// =======================================================================
// SUPER ADMIN — BRANCHES
// =======================================================================

/** GET every branch across the whole sector (used by Super Admin "Branches" page) */
export async function getAllBranches(sector) {
  if (!USE_MOCK) return httpGet(`/branches?sector=${sector}`);
  await delay();
  return getBranchesBySector(sector).map((branch) => {
    const org = getOrgById(branch.org_id);
    const manager = getBranchManager(branch.branch_id);
    return {
      ...branch,
      org_name: org?.org_name,
      org_abbreviation: org?.org_abbreviation,
      location: getLocationById(branch.location_id),
      manager: manager
        ? {
            account_id: manager.account_id,
            email: manager.account_email,
            status_id: manager.status_id,
          }
        : null,
      cameraCount: getCameraConfigsByBranch(branch.branch_id).length,
      atmCount:
        sector === SECTORS.BANK
          ? getAtmsByBranch(branch.branch_id).length
          : undefined,
    };
  });
}

export async function getBranchDetails(branchId) {
  if (!USE_MOCK) return httpGet(`/branches/${branchId}`);
  await delay();
  const branch = getBranchById(branchId);
  if (!branch) throw new Error("Branch not found");
  const org = getOrgById(branch.org_id);
  const manager = getBranchManager(branchId);
  return {
    ...branch,
    org,
    location: getLocationById(branch.location_id),
    manager,
    atms: org?.sector === SECTORS.BANK ? getAtmsByBranch(branchId) : [],
    cameraConfigs: getCameraConfigsByBranch(branchId),
  };
}

/** POST create a new branch under an organization */
export async function createBranch(payload) {
  if (!USE_MOCK) return httpPost("/branches", payload);
  await delay();
  // mock: just echo back with a fake new id (no real persistence)
  const newId = Math.max(...branches.map((b) => b.branch_id)) + 1;
  const newBranch = { branch_id: newId, isActive: true, ...payload };
  branches.push(newBranch);
  return newBranch;
}

/** PATCH update an existing branch (name, active state, location, etc.) */
export async function updateBranch(branchId, payload) {
  if (!USE_MOCK) return httpPatch(`/branches/${branchId}`, payload);
  await delay();
  const idx = branches.findIndex((b) => b.branch_id === branchId);
  if (idx === -1) throw new Error("Branch not found");
  branches[idx] = { ...branches[idx], ...payload };
  return branches[idx];
}

// =======================================================================
// SUPER ADMIN — MANAGERS  (replaces the old generic "Users" page)
// =======================================================================

/** GET all branch managers in this sector, plus branches with NO manager assigned */
export async function getManagersOverview(sector) {
  if (!USE_MOCK) return httpGet(`/managers?sector=${sector}`);
  await delay();

  const sectorBranches = getBranchesBySector(sector);

  const assigned = sectorBranches
    .map((branch) => {
      const manager = getBranchManager(branch.branch_id);
      if (!manager) return null;
      const org = getOrgById(branch.org_id);
      return {
        account_id: manager.account_id,
        email: manager.account_email,
        status_id: manager.status_id,
        branch_id: branch.branch_id,
        branch_name: branch.branch_name,
        org_name: org?.org_name,
      };
    })
    .filter(Boolean);

  const unassignedBranches = sectorBranches
    .filter((branch) => !getBranchManager(branch.branch_id))
    .map((branch) => {
      const org = getOrgById(branch.org_id);
      return {
        branch_id: branch.branch_id,
        branch_name: branch.branch_name,
        org_name: org?.org_name,
      };
    });

  return { assigned, unassignedBranches };
}

/** POST create + assign a new manager account to a branch with no manager yet */
export async function createBranchManager({ branchId, email, password }) {
  if (!USE_MOCK) return httpPost("/managers", { branchId, email, password });
  await delay();

  if (getBranchManager(branchId)) {
    throw new Error("هذا الفرع لديه مدير بالفعل");
  }

  const newUserId = Math.max(...users.map((u) => u.user_id)) + 1;
  const newAccountId = Math.max(...accounts.map((a) => a.account_id)) + 1;

  users.push({
    user_id: newUserId,
    role_id: 2,
    user_name: email.split("@")[0],
  });

  const newAccount = {
    account_id: newAccountId,
    user_id: newUserId,
    account_email: email,
    password_hash: `hash_${newAccountId}`,
    password,
    status_id: 4, // Pending until the manager first logs in
    type_id: 2,
    role_id: 2,
    branch_id: branchId,
  };
  accounts.push(newAccount);

  return newAccount;
}

// =======================================================================
// SUPER ADMIN — CAMERAS  (replaces the old "Reports" page)
// =======================================================================

/** GET every camera config + its views across the whole sector */
export async function getAllCameras(sector) {
  if (!USE_MOCK) return httpGet(`/cameras?sector=${sector}`);
  await delay();

  const sectorBranchIds = getBranchesBySector(sector).map((b) => b.branch_id);

  return cameraConfigurations
    .filter((cfg) => sectorBranchIds.includes(cfg.branch_id))
    .map((cfg) => {
      const branch = getBranchById(cfg.branch_id);
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
      return {
        ...cfg,
        branch_name: branch?.branch_name,
        views,
      };
    });
}

/** PATCH toggle a camera config's active state */
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

/** PATCH change what a specific camera view is looking at (its target) */
export async function updateCameraViewTarget(cameraViewId, targetId) {
  if (!USE_MOCK)
    return httpPatch(`/camera-views/${cameraViewId}`, { target_id: targetId });
  await delay(200);
  const view = cameraViews.find((v) => v.camera_view_id === cameraViewId);
  if (!view) throw new Error("Camera view not found");
  view.target_id = targetId;
  return view;
}

/** PATCH toggle a camera view active/inactive */
export async function toggleCameraViewActive(cameraViewId, isActive) {
  if (!USE_MOCK)
    return httpPatch(`/camera-views/${cameraViewId}`, { isActive });
  await delay(200);
  const view = cameraViews.find((v) => v.camera_view_id === cameraViewId);
  if (!view) throw new Error("Camera view not found");
  view.isActive = isActive;
  return view;
}

// =======================================================================
// SUPER ADMIN — ATMs (bank sector only)
// =======================================================================

/** GET all ATMs grouped by organization (bank), for the "ATMs" section */
export async function getAtmsBySector() {
  if (!USE_MOCK) return httpGet(`/atms?sector=bank`);
  await delay();

  const bankOrgs = getOrgsBySector(SECTORS.BANK);

  return bankOrgs.map((org) => {
    const orgAtms = getAtmsByOrg(org.org_id).map((atm) => {
      const branch = getBranchById(atm.branch_id);
      const stock = atmDenominationStock
        .filter((s) => s.atm_id === atm.atm_id)
        .map((s) =>
          denominations.find((d) => d.denomination_id === s.denomination_id),
        );
      return { ...atm, branch_name: branch?.branch_name, stock };
    });
    return {
      org_id: org.org_id,
      org_name: org.org_name,
      org_abbreviation: org.org_abbreviation,
      atms: orgAtms,
    };
  });
}

// =======================================================================
// SUPER ADMIN — DASHBOARD OVERVIEW (stat cards)
// =======================================================================

export async function getSuperAdminOverview(sector) {
  if (!USE_MOCK) return httpGet(`/overview?sector=${sector}`);
  await delay();

  const sectorBranches = getBranchesBySector(sector);
  const sectorOrgs = getOrgsBySector(sector);
  const branchIds = sectorBranches.map((b) => b.branch_id);

  const activeBranches = sectorBranches.filter((b) => b.isActive).length;

  const allCameraConfigs = cameraConfigurations.filter((c) =>
    branchIds.includes(c.branch_id),
  );
  const activeCameras = allCameraConfigs.filter((c) => c.isActive).length;

  const allViews = cameraViews.filter((v) =>
    allCameraConfigs.some((c) => c.camera_config_id === v.camera_config_id),
  );
  const totalWaiting = allViews.reduce(
    (sum, v) => sum + (v.waitingPeopleCount || 0),
    0,
  );

  const topBranches = sectorBranches
    .map((b) => {
      const cfgs = getCameraConfigsByBranch(b.branch_id);
      const views = cfgs.flatMap((c) =>
        getCameraViewsByConfig(c.camera_config_id),
      );
      const waiting = views.reduce(
        (s, v) => s + (v.waitingPeopleCount || 0),
        0,
      );
      return { branch_id: b.branch_id, branch_name: b.branch_name, waiting };
    })
    .sort((a, b) => b.waiting - a.waiting)
    .slice(0, 5);

  return {
    totalOrganizations: sectorOrgs.length,
    totalBranches: sectorBranches.length,
    activeBranches,
    totalCameras: allCameraConfigs.length,
    activeCameras,
    totalWaitingNow: totalWaiting,
    topBranches,
  };
}
