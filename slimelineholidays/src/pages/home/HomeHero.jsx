import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import hero from "./../../assets/images/hero.webp";
import { CalanderNewIcon, DurationIcon, LocationIcon } from "../../utils/icons";
import { EnquireModal } from "./EnquireModal";

export const HomeHero = () => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select Tour Country");
  const [open, setOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(
    "Select Tour Duration"
  );
  const [startDate, setStartDate] = useState(null);

  const countryDropdownRef = useRef(null);
  const durationDropdownRef = useRef(null);

  const countries = ["Sri Lanka", "India", "Maldives"];
  const durations = Array.from(
    { length: 14 },
    (_, i) => `${i + 1} day${i + 1 > 1 ? "s" : ""}`
  );

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryDropdownOpen(false);
      }
      if (
        durationDropdownRef.current &&
        !durationDropdownRef.current.contains(event.target)
      ) {
        setIsDurationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    setIsDurationDropdownOpen(false);
  };

  return (
    <>
      <section
        className={`h-[50vh] md:h-[55vh] 3xl:h-[45vh] flex w-full justify-start items-end font-nunito px-[5%] md:px-[10%] pb-[30%] md:pb-[5%] relative bg-center bg-cover bg-no-repeat`}
        style={{
          backgroundImage: `url(${hero})`
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[55px] md:text-[60px] text-left font-extralight text-white"
        >
          <span className="font-extrabold text-theme-green-color">Explore</span>{" "}
          <span className="font-extrabold text-white">the</span>{" "}
          <br className="" /> Island with Us
        </motion.div>

        <div className="absolute w-[90%] md:w-[80%] px-5 pb-7 md:p-5 bg-white rounded-lg shadow-lg flex flex-col md:flex-row md:items-center justify-between bottom-[-40%] md:bottom-[-10%]">
          {/* Country Dropdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative py-5 border-b md:py-0 md:border-none "
            ref={countryDropdownRef}
          >
            <label
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="cursor-pointer text-theme-green-dark-color font-semibold flex items-center gap-2"
            >
              <span className="mr-1">
                <LocationIcon />
              </span>{" "}
              {selectedCountry}
            </label>
            <AnimatePresence>
              {isCountryDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bg-white border border-gray-300 shadow-lg mt-2 w-[200px] rounded-lg z-10"
                >
                  <ul>
                    {countries.map((country, index) => (
                      <li
                        key={index}
                        onClick={() => handleCountrySelect(country)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {country}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Duration Dropdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative py-5 border-b md:py-0 md:border-none "
            ref={durationDropdownRef}
          >
            <label
              onClick={() => setIsDurationDropdownOpen(!isDurationDropdownOpen)}
              className="cursor-pointer text-theme-green-dark-color font-semibold flex items-center gap-2"
            >
              <span className="mr-1">
                <DurationIcon />
              </span>{" "}
              {selectedDuration}
            </label>
            <AnimatePresence>
              {isDurationDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bg-white border border-gray-300 shadow-lg mt-2 w-[200px] rounded-lg z-10"
                >
                  <ul>
                    {durations.map((duration, index) => (
                      <li
                        key={index}
                        onClick={() => handleDurationSelect(duration)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {duration}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Inline Date Picker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative py-5 border-b md:py-0 md:border-none "
          >
            <label
              htmlFor="date-picker"
              className="cursor-pointer text-theme-green-dark-color font-semibold flex items-center gap-2"
            >
              <span className="mr-1">
                <CalanderNewIcon />
              </span>
              {startDate ? startDate.toLocaleDateString() : "Select Start Date"}
            </label>
          </motion.div>

          <motion.button
            onClick={() => setOpen((pre) => !pre)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-theme-green-middle-color px-16 py-3 rounded-md shadow-md hover:bg-green-700 text-base text-theme-green-color"
          >
            Get a Quote
          </motion.button>
        </div>
      </section>
      <DatePicker
        id="date-picker"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="hidden "
        withPortal
        placeholderText="Select a date"
      />

      <EnquireModal
        selectedCountry={selectedCountry}
        selectedDuration={selectedDuration}
        startDate={startDate}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
