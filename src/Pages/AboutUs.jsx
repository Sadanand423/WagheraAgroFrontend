import React from "react";
import ClientSay from "../Components/ClientSay/ClientSay";
import ScrollToTop from "../Components/ScrollToTop";
import image from "../assets/images/about-us-small-image.jpeg";
import image2 from "../assets/images/imgae-small.jpeg";
import { FaPaw, FaLeaf, FaUtensils, FaFire } from "react-icons/fa";
import { GiRiver, GiMountainRoad } from "react-icons/gi";
import { MdNaturePeople } from "react-icons/md";
import heroImg from "../assets/images/hero.jpeg";
import aboutImage from "../assets/images/aboutimage.jpeg";

export default function AboutUs() {
  return (
    <div className="text-gray-800">
      <ScrollToTop />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">About Waghera Agro Tourism</h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto">Experience authentic farm life in the heart of Mahabaleshwar</p>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center items-center">
            <img src={image} alt="Landscape" className="w-full max-w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-xl shadow-lg object-cover" />
            <img src={image2} alt="Nature" className="absolute bottom-[-50px] sm:bottom-[-70px] left-1/2 sm:left-[30%] w-[200px] sm:w-[300px] md:w-[380px] border-4 border-white rounded-xl shadow-xl transform -translate-x-1/2 sm:translate-x-0" />
          </div>

          <div className="text-center md:text-left mt-20 sm:mt-28 md:mt-0">
            <h4 className="text-[#a1865e] text-xl sm:text-2xl font-semibold mb-3">―⟡ About Us</h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">Welcome to Waghera Agro Tourism</h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              Nestled in the scenic hills of Mahabaleshwar, Waghera Agro Tourism offers a perfect blend of nature, comfort, and authentic rural experiences. Surrounded by lush greenery and fresh mountain air, our resort is designed for travelers seeking peace and connection with nature.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              From farm-fresh meals to cozy accommodations, every detail is crafted to provide you with a memorable stay. Wake up to birdsong, explore green fields, and enjoy quality time with loved ones around a bonfire under the stars.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#f9f7f4] py-16 px-4 sm:px-6 md:px-24">
        <div className="text-center mb-12">
          <h4 className="text-[#a1865e] text-xl sm:text-2xl font-semibold mb-3">―◇ Why Choose Us</h4>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">What Makes Us Special</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaLeaf className="text-[#a1865e] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Organic Farm Experience</h3>
            <p className="text-gray-600">Experience authentic farm life with organic produce and traditional farming methods</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <GiMountainRoad className="text-[#a1865e] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Scenic Location</h3>
            <p className="text-gray-600">Surrounded by breathtaking hills and valleys of Mahabaleshwar</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaUtensils className="text-[#a1865e] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Farm-Fresh Cuisine</h3>
            <p className="text-gray-600">Enjoy delicious meals prepared with fresh ingredients from our farm</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaPaw className="text-[#a1865e] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Pet Friendly</h3>
            <p className="text-gray-600">Bring your furry friends along for a memorable vacation</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <GiRiver className="text-[#a1865e] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">River Swimming</h3>
            <p className="text-gray-600">Refresh yourself in the natural river flowing through our property</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaFire className="text-[#a1865e] text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Bonfire Nights</h3>
            <p className="text-gray-600">Enjoy cozy evenings around the bonfire with family and friends</p>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="bg-white py-16 px-4 sm:px-6 md:px-24">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div className="order-2 md:order-1">
            <img src={aboutImage} alt="Resort" className="rounded-xl w-full h-[300px] sm:h-[400px] md:h-[500px] shadow-lg object-cover" />
          </div>

          <div className="order-1 md:order-2">
            <h4 className="text-[#a1865e] text-xl sm:text-2xl font-semibold mb-3">―◇ Our Facilities</h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8">Comfort Meets Nature</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#a1865e] text-white p-3 rounded-lg">
                  <MdNaturePeople className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Comfortable Accommodations</h3>
                  <p className="text-gray-600">Well-maintained rooms and tents with modern amenities</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#a1865e] text-white p-3 rounded-lg">
                  <FaUtensils className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Restaurant & Dining</h3>
                  <p className="text-gray-600">Traditional and modern cuisine with farm-fresh ingredients</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#a1865e] text-white p-3 rounded-lg">
                  <GiMountainRoad className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Adventure Activities</h3>
                  <p className="text-gray-600">Trekking, nature walks, and nearby tourist attractions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientSay />
    </div>
  );
}
