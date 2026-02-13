// زوز ابقي حمل المكتبه دي
// pnpm add swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import themesMAP from "../../../themes/themes";

export default function ImageSlider({ dark }) {
  return (
    <div
      className="p-6 w-full lg:max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8"
      style={{
        minHeight: "90vh",
        backgroundColor: dark
          ? themesMAP["light-main-bg"]
          : themesMAP["dark-main-bg"],
      }}
    >
      <div className="text-center w-full mb-7">
        <h1 className="text-4xl">Explore SkipQ Features</h1>
      </div>
      <Swiper
        // المميزات المطلوبة
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        pagination={{
          el: ".my-custom-pagination", // ← النقاط هتروح هنا
          clickable: true,
        }}
        // أزرار السابق والتالي
        navigation
        // النقاط
        // pagination={{ clickable: true }}
        // تشغيل تلقائي كل 3 ثواني
        autoplay={{ delay: 2000 }}
        // Loop (لما نوصل لآخر صورة نرجع للأولى)
        loop={true}
        // عدد الصور المعروضة (1 صورة في المرة)
        slidesPerView={1}
        // المسافة بين الصور
        spaceBetween={30}
        // التأثير عند الانتقال
        effect="cube" // أو "fade" أو "cube" أو "flip"
        // السرعة
        speed={600}
        className="h-48 sm:h-64 md:h-96 lg:h-[600px] rounded-lg custom-swiper pb-12"
      >
        <SwiperSlide>
          <img
            src="/images/1.png"
            alt="Slide 1"
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="/images/2.png"
            alt="Slide 2"
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="/images/3.png"
            alt="Slide 3"
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="/images/4.png"
            alt="Slide 4"
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="/images/5.png"
            alt="Slide 5"
            className="w-full h-full object-fill rounded-lg"
          />
        </SwiperSlide>
      </Swiper>
      <div className="my-custom-pagination mt-6"></div>
    </div>
  );
}
