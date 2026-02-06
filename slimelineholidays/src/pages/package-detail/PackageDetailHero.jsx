import React, { useState, useEffect, useRef } from "react";
import hero from "./../../assets/images/hero.webp";
import {
  AccomadationIcon,
  TravelTimeIcon,
  TransferModeIcon,
  MealPlanIcon
} from "../../utils/icons";
import { Link } from "react-router-dom";

export const PackageDetailHero = ({data}) => {
  return (
    <>
      <section
        className={`h-[50vh] md:h-[55vh] 3xl:h-[55vh] flex w-full justify-start items-end font-nunito px-[5%] md:px-[10%] pb-[35%] md:pb-[5%] relative bg-center bg-cover bg-no-repeat`}
        style={{
          backgroundImage: `url(${hero})`
        }}
      >
        <div className=" flex flex-col text-[35px] md:text-[60px] text-left font-extralight text-white">
          <span className="font-extrabold text-white">{data.name}</span>{" "}
          <div className=" text-white text-base md:text-lg">
            <Link to="/">Home</Link> {">"}{" "}
            <Link className="ml-2" to="/packages">
              Packages
            </Link>{" "}
            {">"} <span className=" text-[#A9FFA5]"> {data.name}</span>
          </div>{" "}
        </div>

        <div className="absolute hidden w-[90%] md:w-[80%] px-5 p-7 md:p-5 bg-[#F1FFF2] rounded-lg shadow-lg flex flex-col md:flex-row md:items-center justify-between bottom-[-40%] md:bottom-[-10%]">
          <div className=" flex md:w-[20%] items-center  gap-2 mb-5 md:mb-0">
            <span className=" mr-1">
              <AccomadationIcon />
            </span>

            <div className=" flex flex-col justify-start text-theme-green-dark-color font-semibold">
              <span className=" text-sm text-[#000000]">Accomodation</span>
              <span className=" text-[#004610] text-sm font-normal">
                4-5 Star / Botique
              </span>
            </div>
          </div>
          <div className=" flex md:w-[20%] items-center  gap-2 mb-5 md:mb-0">
            <span className=" mr-1">
              <MealPlanIcon />
            </span>

            <div className=" flex flex-col justify-start text-theme-green-dark-color font-semibold">
              <span className=" text-sm text-[#000000]">Meal Plan</span>
              <span className=" text-[#004610] text-sm font-normal">
                Breakfast & Dinner
              </span>
            </div>
          </div>
          <div className=" flex md:w-[25%] items-center  gap-2 mb-5 md:mb-0">
            <span className=" mr-1">
              <TravelTimeIcon />
            </span>

            <div className=" flex flex-col justify-start text-theme-green-dark-color font-semibold">
              <span className=" text-sm text-[#000000]">Travel Time</span>
              <span className=" text-[#004610] text-sm font-normal">
                Airport to Anuradhapura - 4 hours
              </span>
            </div>
          </div>
          <div className=" flex md:w-[25%] items-center   gap-2">
            <span className=" mr-1">
              <TransferModeIcon />
            </span>

            <div className=" flex flex-col justify-start text-theme-green-dark-color font-semibold">
              <span className=" text-sm text-[#000000]">Tansfer Mode</span>
              <span className=" text-[#004610] text-sm font-normal">
                Private Car (Air Conditioned)
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
