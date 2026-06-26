import { useBranchManagerTheme } from "./components/BranchManagerLayout";

/**
 * BranchManagerSettings.jsx
 * -----------------------------------------------------------------------
 * Placeholder بسيط — كمّله بعدين بالحاجات اللي عايزها (تغيير الباسورد،
 * بيانات الحساب، إلخ). موجود هنا بس عشان رابط "Settings" في السايدبار
 * يفتح صفحة حقيقية مش 404.
 * -----------------------------------------------------------------------
 */

export default function BranchManagerSettings() {
  const theme = useBranchManagerTheme();

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: theme.text, margin: 0 }}>Settings</h1>
        <p style={{ fontSize: 14, color: theme.muted, marginTop: 4 }}>إعدادات الحساب الخاصة بمدير الفرع</p>
      </div>

      <div
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.borderColor}`,
          borderRadius: 16,
          padding: 22,
          color: theme.muted,
          fontSize: 14,
        }}
      >
        قريبًا — صفحة الإعدادات قيد التطوير.
      </div>
    </>
  );
}
