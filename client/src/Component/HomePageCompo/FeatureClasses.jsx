

import React from 'react';

export const FeatureClasses = () => {
  const classes = [
    {
      title: 'Inversion Immersion',
      image: 'https://cdn.usegalileo.ai/sdxl10/c0b8c562-2a86-424b-a97f-920d5493f260.png',
    },
    {
      title: 'Hip Hop Yoga',
      image: 'https://cdn.usegalileo.ai/sdxl10/16d69598-1e28-4be5-b9d6-190e17ddcd93.png',
    },
    {
      title: 'Yin & Meditation',
      image: 'https://cdn.usegalileo.ai/sdxl10/51e7ff42-4535-442a-8569-8cc8e553b596.png',
    },
    {
      title: 'Core Power',
      image: 'https://cdn.usegalileo.ai/sdxl10/61c9781b-45e7-4755-81e4-2f0a52827dd5.png',
    },
    {
      title: 'Backbends & Balance',
      image: 'https://cdn.usegalileo.ai/sdxl10/e92568ce-dfd7-4d0b-9da0-e254e10e0362.png',
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-8 bg-[#f9fafb]">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#0e161b] mb-6 text-center sm:text-left">
        🌟 Featured Yoga Classes
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {classes.map((cls, index) => (
          <div
            key={index}
            className="group rounded-xl shadow-md hover:shadow-lg transition bg-white overflow-hidden cursor-pointer"
          >
            <div
              className="w-full aspect-square bg-cover bg-center"
              style={{ backgroundImage: `url(${cls.image})` }}
            />
            <div className="p-3 text-center sm:text-left">
              <p className="text-base font-semibold text-[#0e161b] group-hover:text-[#1890bf] transition">
                {cls.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
