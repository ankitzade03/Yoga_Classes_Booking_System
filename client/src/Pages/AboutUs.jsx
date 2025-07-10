
import React from 'react';

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-20 py-6">
        <div className="w-full max-w-5xl">
          {/* Banner Section */}
          <div
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[220px] mb-6"
            style={{
              backgroundImage:
                'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0) 25%), url("https://cdn.usegalileo.ai/sdxl10/e1297de0-75de-4df9-aa04-ee9d246fcd48.png")',
            }}
          >
            <div className="p-4">
              <p className="text-white text-2xl sm:text-3xl font-bold">About Us</p>
            </div>
          </div>

          {/* Intro */}
          <p className="text-[#1C160C] text-base text-center leading-relaxed px-2 sm:px-4 mb-6">
            We are a community of yoga teachers, students, and seekers. We believe that yoga is for everybody and that the practice is inclusive, accessible, and transformational. We are committed to offering a variety of classes, events, and trainings that support you on your journey to self-discovery and well-being. We invite you to join us just as you are.
          </p>

          {/* Our Story */}
          <h2 className="text-[#1C160C] text-xl sm:text-2xl font-bold px-2 sm:px-4 pt-6 pb-3">Our Story</h2>
          <p className="text-[#1C160C] text-base leading-relaxed px-2 sm:px-4 mb-4">
            Tranquil Yoga was founded in 2015 by Jane Doe, a yoga teacher and mindfulness coach. Jane’s vision was to create a space where people could come together to practice, learn, and grow...
          </p>

          {/* Our Mission */}
          <h2 className="text-[#1C160C] text-xl sm:text-2xl font-bold px-2 sm:px-4 pt-6 pb-3">Our Mission</h2>
          <p className="text-[#1C160C] text-base leading-relaxed px-2 sm:px-4 mb-4">
            Our mission is to make yoga accessible to all and to create a space where people can connect, heal, and thrive...
          </p>

          {/* Our Values */}
          <h2 className="text-[#1C160C] text-xl sm:text-2xl font-bold px-2 sm:px-4 pt-6 pb-3">Our Values</h2>
          <div className="px-2 sm:px-4 grid grid-cols-1 sm:grid-cols-[30%_1fr] gap-y-4 border-t border-[#E9DFCE] pt-4">
            {/* Value 1 */}
            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:gap-x-6 border-b border-[#E9DFCE] py-4">
              <p className="text-[#A18249] text-sm font-semibold sm:w-[30%]">Inclusivity</p>
              <p className="text-[#1C160C] text-sm">
                We believe yoga is for everybody and that the practice should be inclusive, accessible, and welcoming to all.
              </p>
            </div>

            {/* Value 2 */}
            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:gap-x-6 border-b border-[#E9DFCE] py-4">
              <p className="text-[#A18249] text-sm font-semibold sm:w-[30%]">Wellness</p>
              <p className="text-[#1C160C] text-sm">
                We are committed to helping people cultivate physical health, emotional well-being, and spiritual growth.
              </p>
            </div>

            {/* Value 3 */}
            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:gap-x-6 py-4">
              <p className="text-[#A18249] text-sm font-semibold sm:w-[30%]">Integrity</p>
              <p className="text-[#1C160C] text-sm">
                We are dedicated to upholding ethical standards, transparency, and honesty in our actions and practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
