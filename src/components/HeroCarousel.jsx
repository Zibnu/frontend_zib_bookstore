import Slider from "react-slick";
import Hero2 from "../assets/images/newHero.png";
import Hero1 from "../assets/images/HeroReading.png";

const HeroCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplayspeed: 500,
  };

  const slides = [
    {
      img: Hero1,
      alt: "Diskon Up To 70%",
    },
    {
      img: Hero2 ,
      alt: "Pre Order New Book",
    },
  ];

  return (
    <div className="w-full mx-auto mt-6 px-4">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="bg-[#D6E6D3] rounded-2xl flex justify-center items-center overflow-hidden">
              <img
                src={slide.img}
                alt={slide.alt}
                className="w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[400px] object-cover rounded-2xl transition-all duration-200"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default HeroCarousel;
