import React, { useState, useEffect, useRef } from "react";
import hero from "./../../assets/images/packageshero.webp";

export const PackagesHero = () => {
  return (
    <>
      <section
        className={`h-[40vh] md:h-[50vh] 3xl:h-[45vh] flex w-full justify-start items-end md:items-center font-nunito px-[5%] md:px-[10%] pt-[15%] md:pt-[8%] pb-[5%] md:pb-0 relative bg-center bg-cover bg-no-repeat`}
        style={{
          backgroundImage: `url(${hero})`
        }}
      >
        <div className=" text-[55px] md:text-[60px] md:leading-[70px] text-left font-extralight text-white">
          <span className="font-extrabold text-theme-green-color">Explore</span>{" "} <br />
          <span className=" text-white">Packages</span>
        </div>
      </section>
    </>
  );
};
