/**
 * mockData.js
 * -----------------------------------------------------------------------
 * SkipQ — Simulation / Mock Data Layer
 * -----------------------------------------------------------------------
 * This file simulates everything that will eventually come from the real
 * JSON-server / backend endpoints. It is built to match the ERD exactly
 * (users, roles, accounts, account_statuses, account_types, organizations,
 * branches, locations, governorates, atms, camera_configurations,
 * camera_views, view_targets, view_types, services, denominations).
 *
 * WHY ONE FILE?
 * Every dashboard screen imports from here. When the real backend is wired
 * up, you only need to replace the functions in `api/skipqApi.js` (which
 * read from this file) with real `fetch` calls to your json-server
 * endpoints — the shape of the data returned stays identical, so no
 * component code needs to change.
 *
 * SECTORS
 * -------
 * Organizations are split into two sectors:
 *   - "bank"           -> has ATMs, branches are bank branches
 *   - "civil_registry"  -> no ATMs, branches are "مكتب سجل مدني"
 *
 * Each sector has its OWN Super Admin account (per your instructions):
 *   - Super Admin (Banking sector)         -> manages ALL bank orgs/branches
 *   - Super Admin (Civil Registry sector)  -> manages ALL civil registry orgs/branches
 *
 * A Branch Admin/Manager only ever manages their OWN single branch
 * (its cameras, its ATM if it's a bank branch, its queue stats).
 * -----------------------------------------------------------------------
 */

// =========================================================================
// 1. LOOKUP TABLES (lookup/enum tables from the ERD)
// =========================================================================

export const accountStatuses = [
  { status_id: 1, status_name: "Active" },
  { status_id: 2, status_name: "Inactive" },
  { status_id: 3, status_name: "Suspended" },
  { status_id: 4, status_name: "Pending" },
  { status_id: 6, status_name: "Locked" },
];

export const accountTypes = [
  { type_id: 1, type_name: "Admin" }, // Super Admin / Org Admin account
  { type_id: 2, type_name: "Manager" }, // Branch Manager account
  { type_id: 11, type_name: "Developer" }, // Developer account
];

export const roles = [
  { role_id: 1, role_name: "Super Admin" },
  { role_id: 2, role_name: "Branch Manager" },
  { role_id: 11, role_name: "Developer" },
];

export const SECTORS = {
  BANK: "bank",
  CIVIL_REGISTRY: "civil_registry",
};

// =========================================================================
// 2. GOVERNORATES & LOCATIONS  (real Egyptian governorates/areas)
// =========================================================================

export const governorates = [
  { governorate_id: 1, name: "القاهرة" },
  { governorate_id: 2, name: "الجيزة" },
  { governorate_id: 3, name: "الإسكندرية" },
  { governorate_id: 4, name: "الدقهلية" },
  { governorate_id: 5, name: "الشرقية" },
  { governorate_id: 6, name: "الإسماعيلية" },
  { governorate_id: 7, name: "بورسعيد" },
  { governorate_id: 8, name: "أسوان" },
  { governorate_id: 9, name: "الأقصر" },
  { governorate_id: 10, name: "سوهاج" },
  { governorate_id: 11, name: "الغربية" },
  { governorate_id: 12, name: "القليوبية" },
];

export const locations = [
  { location_id: 1, governorate_id: 1, latitude: 30.0478, longitude: 31.2336, address_details: "وسط البلد، القاهرة" },
  { location_id: 2, governorate_id: 1, latitude: 30.0916, longitude: 31.33, address_details: "مصر الجديدة، القاهرة" },
  { location_id: 3, governorate_id: 2, latitude: 29.9787, longitude: 31.134, address_details: "الدقي، الجيزة" },
  { location_id: 4, governorate_id: 3, latitude: 31.2005, longitude: 29.918, address_details: "سيدي جابر، الإسكندرية" },
  { location_id: 5, governorate_id: 6, latitude: 30.596, longitude: 32.2717, address_details: "الشيخ زايد، الإسماعيلية" },
  { location_id: 6, governorate_id: 4, latitude: 31.0409, longitude: 31.3785, address_details: "شارع الجيش، المنصورة" },
  { location_id: 7, governorate_id: 5, latitude: 30.5852, longitude: 31.502, address_details: "القومية، الزقازيق" },
  { location_id: 8, governorate_id: 12, latitude: 30.2289, longitude: 31.4765, address_details: "شبرا الخيمة، القليوبية" },
  { location_id: 9, governorate_id: 10, latitude: 26.5591, longitude: 31.6957, address_details: "مدينة ناصر، سوهاج" },
  { location_id: 10, governorate_id: 9, latitude: 25.6872, longitude: 32.6396, address_details: "الكرنك، الأقصر" },
  { location_id: 11, governorate_id: 8, latitude: 24.0889, longitude: 32.8998, address_details: "وسط البلد، أسوان" },
  { location_id: 12, governorate_id: 11, latitude: 30.7865, longitude: 31.0004, address_details: "المركز، طنطا" },
  { location_id: 13, governorate_id: 7, latitude: 31.2653, longitude: 32.3019, address_details: "حي الشرق، بورسعيد" },
];

// =========================================================================
// 3. USERS  (human identity, separate from login credentials)
// =========================================================================

export const users = [
  { user_id: 1, role_id: 11, user_name: "Mostafa - Developer" },
  { user_id: 2, role_id: 1, user_name: "Super Admin - Banking Sector" },
  { user_id: 3, role_id: 1, user_name: "Super Admin - Civil Registry Sector" },
  { user_id: 4, role_id: 2, user_name: "Ahmed Hassan" }, // bank branch mgr
  { user_id: 5, role_id: 2, user_name: "Mona Saeed" }, // bank branch mgr
  { user_id: 6, role_id: 2, user_name: "Khaled Ibrahim" }, // bank branch mgr
  { user_id: 7, role_id: 2, user_name: "Salma Fathy" }, // civil registry mgr
  { user_id: 8, role_id: 2, user_name: "Youssef Adel" }, // civil registry mgr
  { user_id: 9, role_id: 2, user_name: "Nourhan Tarek" }, // civil registry mgr
];

// =========================================================================
// 4. ACCOUNTS  (login credentials table — this is what /login checks)
// =========================================================================
// NOTE: in a real backend, password_hash would be bcrypt etc.
// For the simulation we keep a parallel `password` (plaintext) ONLY so the
// mock login function can compare it. Never do this in production.

export const accounts = [
  {
    account_id: 1,
    user_id: 1,
    account_email: "dev@skipq.com",
    password_hash: "hash_dev_123",
    password: "Dev@12345",
    status_id: 1,
    type_id: 11,
    role_id: 11,
  },
  {
    account_id: 2,
    user_id: 2,
    account_email: "superadmin.banks@skipq.com",
    password_hash: "hash_sb_123",
    password: "Bank@SuperAdmin1",
    status_id: 1,
    type_id: 1,
    role_id: 1,
    sector: SECTORS.BANK,
  },
  {
    account_id: 3,
    user_id: 3,
    account_email: "superadmin.civilregistry@skipq.com",
    password_hash: "hash_sc_123",
    password: "Civil@SuperAdmin1",
    status_id: 1,
    type_id: 1,
    role_id: 1,
    sector: SECTORS.CIVIL_REGISTRY,
  },

  // ---- Bank branch managers (3) ----
  {
    account_id: 4,
    user_id: 4,
    account_email: "ahmed.hassan@nbe.skipq.com",
    password_hash: "hash_bm1_123",
    password: "Branch@123",
    status_id: 1,
    type_id: 2,
    role_id: 2,
    branch_id: 1,
  },
  {
    account_id: 5,
    user_id: 5,
    account_email: "mona.saeed@banquemisr.skipq.com",
    password_hash: "hash_bm2_123",
    password: "Branch@123",
    status_id: 1,
    type_id: 2,
    role_id: 2,
    branch_id: 2,
  },
  {
    account_id: 6,
    user_id: 6,
    account_email: "khaled.ibrahim@cib.skipq.com",
    password_hash: "hash_bm3_123",
    password: "Branch@123",
    status_id: 1,
    type_id: 2,
    role_id: 2,
    branch_id: 3,
  },

  // ---- Civil registry branch managers (3) ----
  {
    account_id: 7,
    user_id: 7,
    account_email: "salma.fathy@civilreg.skipq.com",
    password_hash: "hash_cm1_123",
    password: "Branch@123",
    status_id: 1,
    type_id: 2,
    role_id: 2,
    branch_id: 6,
  },
  {
    account_id: 8,
    user_id: 8,
    account_email: "youssef.adel@civilreg.skipq.com",
    password_hash: "hash_cm2_123",
    password: "Branch@123",
    status_id: 1,
    type_id: 2,
    role_id: 2,
    branch_id: 7,
  },
  {
    account_id: 9,
    user_id: 9,
    account_email: "nourhan.tarek@civilreg.skipq.com",
    password_hash: "hash_cm3_123",
    password: "Branch@123",
    status_id: 4, // Pending — hasn't logged in / activated yet (newly created manager)
    type_id: 2,
    role_id: 2,
    branch_id: 8,
  },
];

// =========================================================================
// 5. ORGANIZATIONS  (banks have ATMs, civil registry does not)
// =========================================================================

export const organizations = [
  // ---- Banks ----
  {
    org_id: 1,
    account_id: 2, // owned/managed by the Banking Super Admin
    location_id: 1,
    sector: SECTORS.BANK,
    org_name: "البنك الأهلي المصري",
    org_name_en: "National Bank of Egypt",
    org_abbreviation: "NBE",
    org_social_link: "https://www.nbe.com.eg",
    org_picture: "bank_logo_nbe.png",
    org_description: "أقدم وأكبر بنك تجاري في مصر",
    isActive: true,
  },
  {
    org_id: 2,
    account_id: 2,
    location_id: 4,
    sector: SECTORS.BANK,
    org_name: "بنك مصر",
    org_name_en: "Banque Misr",
    org_abbreviation: "BM",
    org_social_link: "https://www.banquemisr.com",
    org_picture: "bank_logo_bm.png",
    org_description: "أحد أكبر البنوك الرائدة في مصر",
    isActive: true,
  },
  {
    org_id: 3,
    account_id: 2,
    location_id: 3,
    sector: SECTORS.BANK,
    org_name: "البنك التجاري الدولي",
    org_name_en: "Commercial International Bank",
    org_abbreviation: "CIB",
    org_social_link: "https://www.cibeg.com",
    org_picture: "bank_logo_cib.png",
    org_description: "البنك الرائد في القطاع الخاص بمصر",
    isActive: true,
  },
  {
    org_id: 4,
    account_id: 2,
    location_id: 6,
    sector: SECTORS.BANK,
    org_name: "بنك QNB الأهلي",
    org_name_en: "QNB Alahli",
    org_abbreviation: "QNB",
    org_social_link: "https://www.qnbalahli.com",
    org_picture: "bank_logo_qnb.png",
    org_description: "جزء من مجموعة QNB، أحد أكبر البنوك بالمنطقة",
    isActive: true,
  },
  {
    org_id: 5,
    account_id: 2,
    location_id: 5,
    sector: SECTORS.BANK,
    org_name: "البنك العربي الأفريقي الدولي",
    org_name_en: "Arab African International Bank",
    org_abbreviation: "AAIB",
    org_social_link: "https://www.aaib.com",
    org_picture: "bank_logo_aaib.png",
    org_description: "بنك إقليمي بحضور دولي قوي",
    isActive: true,
  },

  // ---- Civil Registry ----
  {
    org_id: 6,
    account_id: 3, // owned/managed by the Civil Registry Super Admin
    location_id: 8,
    sector: SECTORS.CIVIL_REGISTRY,
    org_name: "مصلحة الأحوال المدنية - القليوبية",
    org_name_en: "Civil Registry Authority - Qalyubia",
    org_abbreviation: "CRA-QLB",
    org_social_link: null,
    org_picture: "civil_registry_logo.png",
    org_description: "الجهة المسؤولة عن إصدار وتحديث الوثائق المدنية",
    isActive: true,
  },
  {
    org_id: 7,
    account_id: 3,
    location_id: 9,
    sector: SECTORS.CIVIL_REGISTRY,
    org_name: "مصلحة الأحوال المدنية - سوهاج",
    org_name_en: "Civil Registry Authority - Sohag",
    org_abbreviation: "CRA-SOH",
    org_social_link: null,
    org_picture: "civil_registry_logo.png",
    org_description: "الجهة المسؤولة عن إصدار وتحديث الوثائق المدنية",
    isActive: true,
  },
];

// =========================================================================
// 6. BRANCHES  (each org has 1+ branches; a branch belongs to ONE org)
// =========================================================================

export const branches = [
  // ---- Bank branches ----
  { branch_id: 1, branch_code: "BR-NBE-001", org_id: 1, location_id: 1, branch_name: "الأهلي - فرع وسط البلد", isActive: true },
  { branch_id: 2, branch_code: "BR-BM-001", org_id: 2, location_id: 4, branch_name: "بنك مصر - فرع سيدي جابر", isActive: true },
  { branch_id: 3, branch_code: "BR-CIB-001", org_id: 3, location_id: 3, branch_name: "CIB - فرع الدقي", isActive: true },
  { branch_id: 4, branch_code: "BR-QNB-001", org_id: 4, location_id: 6, branch_name: "QNB الأهلي - فرع المنصورة", isActive: true },
  { branch_id: 5, branch_code: "BR-AAIB-001", org_id: 5, location_id: 5, branch_name: "AAIB - فرع الإسماعيلية", isActive: false },

  // ---- Civil registry branches ----
  { branch_id: 6, branch_code: "BR-CRA-QLB-001", org_id: 6, location_id: 8, branch_name: "سجل مدني القليوبية - شبرا الخيمة", isActive: true },
  { branch_id: 7, branch_code: "BR-CRA-SOH-001", org_id: 7, location_id: 9, branch_name: "سجل مدني سوهاج - مدينة ناصر", isActive: true },
  { branch_id: 8, branch_code: "BR-CRA-SOH-002", org_id: 7, location_id: 10, branch_name: "سجل مدني سوهاج - فرع الأقصر", isActive: true },
  // Branch with NO manager yet — used for the "Add Manager" flow
  { branch_id: 9, branch_code: "BR-CRA-QLB-002", org_id: 6, location_id: 12, branch_name: "سجل مدني القليوبية - فرع طنطا", isActive: true },
];

// =========================================================================
// 7. ATMs  (banks only — civil registry branches never have ATMs)
// =========================================================================

export const denominations = [
  { denomination_id: 1, amount: 20 },
  { denomination_id: 2, amount: 50 },
  { denomination_id: 3, amount: 100 },
  { denomination_id: 4, amount: 200 },
];

export const atms = [
  { atm_id: 1, branch_id: 1, location_id: 1, isActive: true, allows_withdrawal: true, allows_deposit: true },
  { atm_id: 2, branch_id: 1, location_id: 1, isActive: true, allows_withdrawal: true, allows_deposit: false },
  { atm_id: 3, branch_id: 2, location_id: 4, isActive: true, allows_withdrawal: true, allows_deposit: true },
  { atm_id: 4, branch_id: 3, location_id: 3, isActive: false, allows_withdrawal: false, allows_deposit: false },
  { atm_id: 5, branch_id: 3, location_id: 3, isActive: true, allows_withdrawal: true, allows_deposit: true },
  { atm_id: 6, branch_id: 4, location_id: 6, isActive: true, allows_withdrawal: true, allows_deposit: false },
  { atm_id: 7, branch_id: 5, location_id: 5, isActive: true, allows_withdrawal: true, allows_deposit: true },
];

export const atmDenominationStock = [
  { atm_id: 1, denomination_id: 3 },
  { atm_id: 1, denomination_id: 4 },
  { atm_id: 2, denomination_id: 2 },
  { atm_id: 3, denomination_id: 4 },
  { atm_id: 5, denomination_id: 3 },
  { atm_id: 6, denomination_id: 4 },
  { atm_id: 7, denomination_id: 3 },
];

// =========================================================================
// 8. CAMERAS  (camera_configuration -> camera_view -> service)
// =========================================================================

export const viewTypes = [
  { type_id: 1, type_name: "ATM Front" },
  { type_id: 3, type_name: "Lobby Overview" },
  { type_id: 4, type_name: "Entrance" },
  { type_id: 6, type_name: "Teller Area" },
  { type_id: 9, type_name: "Exit" },
];

export const viewTargets = [
  { target_id: 1, type_id: 1, target_name: "كاميرا ATM الأمامية" },
  { target_id: 2, type_id: 3, target_name: "كاميرا صالة الانتظار" },
  { target_id: 3, type_id: 4, target_name: "كاميرا المدخل الرئيسي" },
  { target_id: 4, type_id: 6, target_name: "كاميرا منطقة الموظفين" },
  { target_id: 5, type_id: 9, target_name: "كاميرا الخروج" },
];

export const cameraConfigurations = [
  { camera_config_id: 1, branch_id: 1, username: "cam_nbe_01", password_hash: "camhash_01", ipAddress: "192.168.10.11", isActive: true },
  { camera_config_id: 2, branch_id: 1, username: "cam_nbe_02", password_hash: "camhash_02", ipAddress: "192.168.10.12", isActive: true },
  { camera_config_id: 3, branch_id: 2, username: "cam_bm_01", password_hash: "camhash_03", ipAddress: "192.168.11.11", isActive: true },
  { camera_config_id: 4, branch_id: 3, username: "cam_cib_01", password_hash: "camhash_04", ipAddress: "192.168.12.11", isActive: false },
  { camera_config_id: 5, branch_id: 4, username: "cam_qnb_01", password_hash: "camhash_05", ipAddress: "192.168.13.11", isActive: true },
  { camera_config_id: 6, branch_id: 6, username: "cam_crqlb_01", password_hash: "camhash_06", ipAddress: "192.168.20.11", isActive: true },
  { camera_config_id: 7, branch_id: 6, username: "cam_crqlb_02", password_hash: "camhash_07", ipAddress: "192.168.20.12", isActive: true },
  { camera_config_id: 8, branch_id: 7, username: "cam_crsoh_01", password_hash: "camhash_08", ipAddress: "192.168.21.11", isActive: true },
  { camera_config_id: 9, branch_id: 8, username: "cam_crsoh_02", password_hash: "camhash_09", ipAddress: "192.168.21.12", isActive: false },
];

export const cameraViews = [
  { camera_view_id: 1, camera_config_id: 1, target_id: 1, channel_number: 1, isActive: true, stream_url: "rtsp://192.168.10.11:554/stream1", waitingPeopleCount: 4 },
  { camera_view_id: 2, camera_config_id: 2, target_id: 2, channel_number: 1, isActive: true, stream_url: "rtsp://192.168.10.12:554/stream1", waitingPeopleCount: 9 },
  { camera_view_id: 3, camera_config_id: 3, target_id: 2, channel_number: 1, isActive: true, stream_url: "rtsp://192.168.11.11:554/stream1", waitingPeopleCount: 2 },
  { camera_view_id: 4, camera_config_id: 4, target_id: 3, channel_number: 1, isActive: false, stream_url: "rtsp://192.168.12.11:554/stream1", waitingPeopleCount: 0 },
  { camera_view_id: 5, camera_config_id: 5, target_id: 2, channel_number: 1, isActive: true, stream_url: "rtsp://192.168.13.11:554/stream1", waitingPeopleCount: 6 },
  { camera_view_id: 6, camera_config_id: 6, target_id: 2, channel_number: 1, isActive: true, stream_url: "rtsp://192.168.20.11:554/stream1", waitingPeopleCount: 11 },
  { camera_view_id: 7, camera_config_id: 7, target_id: 4, channel_number: 1, isActive: true, stream_url: "rtsp://192.168.20.12:554/stream1", waitingPeopleCount: 0 },
  { camera_view_id: 8, camera_config_id: 8, target_id: 2, channel_number: 1, isActive: true, stream_url: "rtsp://192.168.21.11:554/stream1", waitingPeopleCount: 5 },
  { camera_view_id: 9, camera_config_id: 9, target_id: 5, channel_number: 1, isActive: false, stream_url: "rtsp://192.168.21.12:554/stream1", waitingPeopleCount: 0 },
];

export const services = [
  { service_id: 1, camera_view_id: 1, service_name: "ATM Queue Detection", isActive: true },
  { service_id: 2, camera_view_id: 2, service_name: "Queue Detection", isActive: true },
  { service_id: 3, camera_view_id: 3, service_name: "Queue Detection", isActive: true },
  { service_id: 4, camera_view_id: 4, service_name: "Entrance Counter", isActive: false },
  { service_id: 5, camera_view_id: 5, service_name: "Queue Detection", isActive: true },
  { service_id: 6, camera_view_id: 6, service_name: "Queue Detection", isActive: true },
  { service_id: 7, camera_view_id: 7, service_name: "Staff Activity Monitor", isActive: true },
  { service_id: 8, camera_view_id: 8, service_name: "Queue Detection", isActive: true },
  { service_id: 9, camera_view_id: 9, service_name: "Exit Counter", isActive: false },
];

// =========================================================================
// 9. DERIVED HELPERS — used heavily by the dashboard screens
// =========================================================================

export const getOrgsBySector = (sector) =>
  organizations.filter((o) => o.sector === sector);

export const getBranchesByOrg = (orgId) =>
  branches.filter((b) => b.org_id === orgId);

export const getBranchesBySector = (sector) => {
  const orgIds = getOrgsBySector(sector).map((o) => o.org_id);
  return branches.filter((b) => orgIds.includes(b.org_id));
};

export const getAtmsByBranch = (branchId) =>
  atms.filter((a) => a.branch_id === branchId);

export const getAtmsByOrg = (orgId) => {
  const branchIds = getBranchesByOrg(orgId).map((b) => b.branch_id);
  return atms.filter((a) => branchIds.includes(a.branch_id));
};

export const getCameraConfigsByBranch = (branchId) =>
  cameraConfigurations.filter((c) => c.branch_id === branchId);

export const getCameraViewsByConfig = (configId) =>
  cameraViews.filter((v) => v.camera_config_id === configId);

export const getServiceByCameraView = (viewId) =>
  services.find((s) => s.camera_view_id === viewId);

export const getViewTargetById = (targetId) =>
  viewTargets.find((t) => t.target_id === targetId);

export const getBranchManager = (branchId) =>
  accounts.find((a) => a.branch_id === branchId && a.type_id === 2);

export const getLocationById = (locationId) =>
  locations.find((l) => l.location_id === locationId);

export const getGovernorateById = (govId) =>
  governorates.find((g) => g.governorate_id === govId);

export const getOrgById = (orgId) => organizations.find((o) => o.org_id === orgId);

export const getBranchById = (branchId) => branches.find((b) => b.branch_id === branchId);

export const getUserByAccount = (account) => users.find((u) => u.user_id === account.user_id);
