import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import themesMAP from "../../../themes/themes";
// import themesMAP from "../../../themes/themes";
const navigation = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#" },
  { name: "About", href: "#" },
];

export default function Navbar({ dark, setDark }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="relative  inset-x-0 top-0 z-50  ">
      <nav className="flex items-center justify-between p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Logo */}
        <div className="flex lg:flex-1 gap-3 items-baseline">
          {/* <a href="#">
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8"
              alt="logo"
            />
          </a> */}
          <button
            type="button"
            className={`text-white rounded-xl bg-brand box-border border border-transparent bg-blue-700 hover:bg-blue-600 focus:ring-blue-300 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none`}
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
          {mobileMenuOpen || (
            <button onClick={() => setMobileMenuOpen(true)}>
              <Bars3Icon
                className="size-6"
                color={dark ? themesMAP["text-light"] : themesMAP["text-dark"]}
              />
            </button>
          )}
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-semibold "
              style={{
                color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
              }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Login */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          <button onClick={() => setDark(!dark)}>
            <FontAwesomeIcon
              icon={dark ? faSun : faMoon}
              className="text-black"
              size="lg"
              style={{
                color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
              }}
            />
          </button>
          <a
            href="#"
            className="font-semibold text-[22px]"
            style={{
              color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
            }}
          >
            Log in →
          </a>
          <button
            type="button"
            className={`text-white rounded-xl bg-brand box-border border border-transparent bg-blue-700 hover:bg-blue-600 focus:ring-blue-300 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none`}
          >
            Sing up
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <DialogPanel
          className="fixed inset-y-0 right-0 w-full max-w-sm p-6"
          style={{
            backgroundColor: dark
              ? themesMAP["light-main-bg"]
              : themesMAP["dark-main-bg"],
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
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2"
                style={{
                  color: dark
                    ? themesMAP["text-light"]
                    : themesMAP["text-dark"],
                }}
              >
                {item.name}
              </a>
            ))}
            <button onClick={() => setDark(!dark)}>
              <FontAwesomeIcon icon={dark ? faSun : faMoon} />
            </button>
            <a
              href="#"
              className="block mt-4"
              style={{
                color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
              }}
            >
              Log in
            </a>
            <button
              type="button"
              className="mt-4 rounded-xl text-white bg-brand box-border border border-transparent bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Sing up
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
