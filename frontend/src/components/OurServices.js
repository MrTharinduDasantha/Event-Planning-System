import { useEffect, useState } from "react";

const services = [
  {
    id: 1,
    icon: "/add_icon.png",
    name: "Add Event",
    description: "Easily create and add new events.",
  },
  {
    id: 2,
    icon: "/edit_icon.png",
    name: "Edit Event",
    description: "Modify event details as needed.",
  },
  {
    id: 3,
    icon: "/delete_icon.png",
    name: "Delete Event",
    description: "Remove events that are no longer needed.",
  },
  {
    id: 4,
    icon: "/view_icon.png",
    name: "View Event",
    description: "Explore all available events.",
  },
  {
    id: 5,
    icon: "/analysis_icon.png",
    name: "Analysis Event",
    description: "Get insights into your event trends.",
  },
  {
    id: 6,
    icon: "/login_icon.png",
    name: "Login",
    description: "Login to manage your events.",
  },
  {
    id: 7,
    icon: "/register_icon.png",
    name: "Register",
    description: "Create a new account as admin or user.",
  },
];

const OurServices = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getVisibleServices = () => {
    return [
      services[visibleIndex % services.length],
      services[(visibleIndex + 1) % services.length],
      services[(visibleIndex + 2) % services.length],
    ];
  };
  return (
    <div id="services-section" className="py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Services
      </h2>

      <div className="flex justify-center">
        <div className="flex gap-6 transition-transform duration-500 ease-in-out">
          {getVisibleServices().map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 ${
                index === 1
                  ? "scale-100 bg-[#dcfce7] shadow-lg"
                  : "scale-90 opacity-80"
              }`}
              style={{ width: "250px" }}
            >
              <img
                src={service.icon}
                alt={service.name}
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {service.name}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
