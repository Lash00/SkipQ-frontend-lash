import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../themes/themes";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
const navigation = [
  { name: "Home", href: "/" },
  // { name: "Services", href: "/#services" },
  { name: "About", href: "/about" },
];

export default function Navbar({ dark, setDark }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navigate = useNavigate();

  // اقفل الموبايل منيو لو الشاشة كبرت
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleServicesClick() {
    if (location.pathname === "/") {
      // أنا على الهوم أصلاً، اسكرول مباشرة
      document
        .getElementById("services")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // روح للهوم وقوله اسكرول على services
      navigate("/", { state: { scrollTo: "services" } });
    }
  }
  return (
    <header className="relative inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1 gap-3 items-baseline">
          <button
            type="button"
            style={{ backgroundColor: "rgb(65, 15, 199)" }}
            className="text-white rounded-xl border border-transparent shadow-xs font-medium text-sm px-4 py-2.5"
          >
            S
          </button>
          <h1
            className="text-2xl font-bold"
            style={{
              color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
            }}
          >
            Skip Q
          </h1>
        </div>

        {/* Mobile button */}
        <div className="flex lg:hidden">
          {!mobileMenuOpen && (
            <button onClick={() => setMobileMenuOpen(true)}>
              <Bars3Icon
                className="size-6"
                color={dark ? themesMAP["text-light"] : themesMAP["text-dark"]}
              />
            </button>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="font-semibold"
              style={{
                color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
              }}
            >
              {item.name}
            </NavLink>
          ))}
          <button
            onClick={handleServicesClick}
            className="font-semibold btn"
            style={{
              color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
            }}
          >
            Services
          </button>
        </div>

        {/* Right side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
          {/* Dark Mode */}
          <button
            onClick={() =>
              setDark((prev) => {
                localStorage.setItem("isDark", JSON.stringify(!prev));
                return !prev;
              })
            }
          >
            <FontAwesomeIcon
              icon={dark ? faSun : faMoon}
              size="lg"
              style={{
                color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
              }}
            />
          </button>

          {/* يظهر فقط في الهوم */}
          {isHome && (
            <>
              <NavLink
                to="/login"
                className="font-semibold text-[18px] px-4 py-2 rounded-xl"
                style={{
                  color: dark
                    ? themesMAP["text-light"]
                    : themesMAP["text-dark"],
                }}
              >
                Login
              </NavLink>

              <NavLink
                to="/registration-guidelines"
                className="text-white px-4 py-2 rounded-xl text-sm"
                style={{ backgroundColor: "rgb(65, 15, 199)" }}
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <DialogPanel
          className="fixed inset-y-0 right-0 w-full max-w-sm p-6"
          style={{
            backgroundColor: dark
              ? themesMAP["light-main-bg"]
              : themesMAP["dark-main-bg"],
            zIndex: 10,
          }}
        >
          <div className="text-right">
            <button onClick={() => setMobileMenuOpen(false)}>
              <XMarkIcon
                className="size-6"
                color={dark ? themesMAP["text-light"] : themesMAP["text-dark"]}
              />
            </button>
          </div>

          <div className="mt-6">
            {/* Links */}
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="block py-2 font-semibold"
                style={{
                  color: dark
                    ? themesMAP["text-light"]
                    : themesMAP["text-dark"],
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}

            {/* Dark Mode */}
            <button
              className="mt-4 block"
              onClick={() =>
                setDark((prev) => {
                  localStorage.setItem("isDark", JSON.stringify(!prev));
                  return !prev;
                })
              }
            >
              <FontAwesomeIcon
                icon={dark ? faSun : faMoon}
                size="lg"
                style={{
                  color: dark
                    ? themesMAP["text-light"]
                    : themesMAP["text-dark"],
                }}
              />
            </button>

            {/* يظهر فقط في الهوم */}
            {isHome && (
              <>
                <NavLink
                  to="/login"
                  className="block mt-4 font-semibold text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: dark
                      ? themesMAP["text-light"]
                      : themesMAP["text-dark"],
                  }}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/registration-guidelines"
                  className="block mt-4 text-white px-4 py-2 rounded-xl text-sm"
                  style={{ backgroundColor: "rgb(65, 15, 199)" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
