import themesMAP from "../../../themes/themes";

export default function Landing({ dark }) {
  // p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8

  return (
    <div
      className="p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8 "
      style={{
        minHeight: "90vh",
        backgroundColor: dark
          ? themesMAP["light-main-bg"]
          : themesMAP["dark-main-bg"],
      }}
    >
      <div className="grid lg:grid-cols-2 lx:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
        <div className="flex justify-center   flex-col">
          <h1
            className="text-5xl font-bold md:text-6xl lg:text-6xl xl:text-7xl"
            style={{
              color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
            }}
          >
            Skip the Queue, Save Your Time
          </h1>
          <p
            className="text-xl text-[#64748b]"
            style={{ width: "70%" }}
            // style={{
            //   color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
            // }}
          >
            Real-time crowd monitoring across branches. Check wait times before
            you go and make smarter choices about where and when to visit.
          </p>
          <div className="w-full mt-4">
            <button
              type="button"
              className={`text-white me-3 rounded-xl bg-brand box-border border border-transparent bg-blue-700 hover:bg-blue-600 focus:ring-blue-300 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none`}
            >
              Check Services
            </button>
            <button
              type="button"
              style={{
                color: dark ? themesMAP["text-light"] : themesMAP["text-dark"],
                border: "2px solid",
                borderColor: dark
                  ? themesMAP["text-light"]
                  : themesMAP["text-dark"],
              }}
              className={`rounded-xl bg-brand box-border border-black-400 hover:bg-blue-800 focus:ring-blue-600 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none`}
            >
              Learn More
            </button>
          </div>
        </div>
        <div>
          <img
            src="/images/landing.png"
            alt="network error "
            className="rounded-lg "
          />
        </div>
      </div>
    </div>
  );
}
