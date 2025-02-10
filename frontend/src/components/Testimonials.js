import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    image: "/boy_profile_pic_1.jpg",
    name: "Tharindu Dasantha",
    comment: "This platform made event management so easy and efficient.",
    rating: 5,
  },
  {
    id: 2,
    image: "/girl_profile_pic_1.jpg",
    name: "Dilini Prasadika",
    comment: "I love how simple it is to create and manage event performance.",
    rating: 2,
  },
  {
    id: 3,
    image: "/boy_profile_pic_2.jpg",
    name: "Janith Lakshan",
    comment: "The analytics feature helps me track event performance.",
    rating: 6,
  },
  {
    id: 4,
    image: "/girl_profile_pic_2.jpg",
    name: "Saduni Theshadi",
    comment: "A must have platform for a organizing successful event.",
    rating: 3,
  },
  {
    id: 5,
    image: "/boy_profile_pic_3.jpg",
    name: "Achala Kalhara",
    comment: "The user interface is clean and creative.",
    rating: 5,
  },
  {
    id: 6,
    image: "/girl_profile_pic_3.jpg",
    name: "Uththara Ramanayka",
    comment: "This platform has transformed the way I manage my events.",
    rating: 4,
  },
];

const Testimonials = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [starAnimationIndex, setStarAnimationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setStarAnimationIndex(0); // Reset star animation when switching to a new testimonial
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (starAnimationIndex < 7) {
      const timeout = setTimeout(() => {
        setStarAnimationIndex((prev) => prev + 1);
      }, 300); // Add delay to stars filling in

      return () => clearTimeout(timeout);
    }
  }, [starAnimationIndex]);

  const getVisibleTestimonials = () => {
    return [
      testimonials[visibleIndex % testimonials.length],
      testimonials[(visibleIndex + 1) % testimonials.length],
      testimonials[(visibleIndex + 2) % testimonials.length],
    ];
  };

  return (
    <div id="testimonials-section" className="pt-10 pb-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Testimonials
      </h2>

      <div className="flex justify-center">
        <div className="flex gap-6 transition-transform duration-500 ease-in-out">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`flex flex-col items-center text-center bg-white p-10 rounded-lg shadow-md transform transition-all duration-500 ease-in-out ${
                index === 1
                  ? "scale-100 bg-[#dcfce7] shadow-lg"
                  : "scale-90 opacity-80"
              }`}
              style={{ width: "300px", position: "relative" }}
            >
              <div
                className={`w-24 h-24 rounded-full overflow-hidden border-4 ${
                  index === 1 ? "border-green-500" : "border-gray-300"
                } transition-all duration-500`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 mt-2">{testimonial.comment}</p>
              <div className="flex mt-3">
                {[...Array(7)].map((_, starIndex) =>
                  starIndex <
                  Math.min(
                    testimonial.rating, // Ensure we don’t exceed the actual rating
                    index === 1 ? starAnimationIndex : 7 // Animate only when prioritized
                  ) ? (
                    <FaStar
                      key={starIndex}
                      className="text-yellow-500 text-lg transition-all duration-500"
                    />
                  ) : (
                    <FaRegStar
                      key={starIndex}
                      className="text-yellow-500 text-lg transition-all duration-500"
                    />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
