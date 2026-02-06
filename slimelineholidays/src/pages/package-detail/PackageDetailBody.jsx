import {
  Accordion,
  AccordionBody,
  AccordionHeader
} from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import { CorectIcon, WrongIcon } from "../../utils/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

export const PackageDetailBody = ({ data }) => {
  const [section, setSection] = useState("itinerary");

  const [formData, setFormData] = useState({
    tour: data.name,
    name: "",
    email: "",
    mobile: "",
    livingCountry: "",
    nationality: "",
    destination: "",
    arrivalDate: null,
    departureDate: null,
    adults: "",
    children: "",
    flightStatus: "",
    holidayReason: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation
  const validate = () => {
    const newErrors = {};
    const {
      name,
      email,
      mobile,
      livingCountry,
      nationality,
      destination,
      arrivalDate,
      departureDate,
      adults
    } = formData;

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!mobile) newErrors.mobile = "Mobile number is required";
    if (!livingCountry) newErrors.livingCountry = "Living country is required";
    if (!nationality) newErrors.nationality = "Nationality is required";
    if (!destination) newErrors.destination = "Destination is required";
    if (!arrivalDate) newErrors.arrivalDate = "Arrival date is required";
    if (!departureDate) newErrors.departureDate = "Departure date is required";
    if (!adults) newErrors.adults = "Adults field is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const response = await fetch(`${apiUrl}/enquiries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert("Form submitted successfully!");
          setFormData({
            tour: data.name,
            name: "",
            email: "",
            mobile: "",
            livingCountry: "",
            nationality: "",
            destination: "",
            arrivalDate: null,
            departureDate: null,
            adults: "",
            children: "",
            flightStatus: "",
            holidayReason: "",
            message: ""
          });
        } else {
          alert("Failed to submit the form. Try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error occurred while submitting the form.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section className="px-[5%] md:px-[10%] w-full bg-white flex flex-col md:flex-row md:justify-between md:items-start justify-center items-center md:py-[4%] pt-[20%] md:pt-[3%] font-nunito">
        <div className="flex flex-col md:w-[60%]">
          {/* Section Toggle */}
          <div className="flex items-center justify-between md:justify-start w-full md:gap-10">
            {["itinerary", "inclusion", "summary"].map((item) => (
              <div
                key={item}
                onClick={() => setSection(item)}
                className={`rounded-lg text-base ${
                  section === item && "bg-theme-green-color"
                } text-theme-green-middle-color p-3 w-[32%] md:w-auto text-center md:px-10 font-bold border border-theme-green-color hover:bg-theme-green-color transition-colors duration-300 ease-in-out cursor-pointer`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </div>
            ))}
          </div>
          {/* Dynamic Content */}
          {section === "summary" && <Summary data={data} />}
          {section === "inclusion" && <Inclusion data={data} />}
          {section === "itinerary" && <Itinerary data={data} />}
        </div>

        <div className=" mt-5 md:mt-0  mb-5 md:mb-0 flex flex-col md:w-[38%]">
          <div className=" flex w-full items-start justify-center ">
            <div className=" w-full flex items-center justify-center flex-col bg-theme-green-color py-5 ">
              <span className=" text-theme-green-middle-color text-sm md:text-base font-bold">
                No of Days
              </span>
              <span className=" text-theme-green-middle-color text-[50px] leading-[56px] font-bold">
                {data.days}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col w-full bg-[#D3FFD1] p-5 pt-10 items-center">
            <div className=" flex items-center justify-center text-[30px]">
              <span className=" text-black font-bold ">Get </span>
              &nbsp;a Quote
            </div>

            <div className="mt-6 w-full text-left text-theme-green-middle-color font-medium text-base">
              Personal Details
            </div>

            <div className=" w-full flex-col gap-1 mt-5">
              <span className=" text-base font-light">Name</span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
                className="w-full p-2 focus:outline-none border border-[#008B02]"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>
            <div className=" w-full flex-col gap-1 mt-2">
              <span className=" text-base font-light">Email</span>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({ ...errors, email: "" });
                }}
                className="w-full p-2 focus:outline-none border border-[#008B02]"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>

            <MobileNumberInput
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
            <CountryDropdown
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
            <NationalityDropdown
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />

            <div className=" w-full text-left text-theme-green-middle-color font-medium text-base mt-10">
              Personal Details
            </div>
            <UseCountryDropdown
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
            <ArrivalDatePicker
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
            <DepartureDatePicker
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />

            <div className=" flex w-full items-start justify-between mt-2">
              <div className=" w-[49%] flex-col gap-1 mt-2">
                <span className=" text-base font-light">No of Travellers</span>
                <input
                  type="number"
                  placeholder="Adults"
                  value={formData.adults}
                  onChange={(e) => {
                    setFormData({ ...formData, adults: e.target.value });
                    setErrors({ ...errors, adults: "" });
                  }}
                  className="w-full p-2 border focus:outline-none border-[#008B02]"
                />
                {errors.adults && (
                  <span className="text-red-500">{errors.adults}</span>
                )}
              </div>
              <div className=" w-[49%] flex-col gap-1 mt-2">
                <span className=" text-base font-light">&nbsp;</span>
                <input
                  type="number"
                  placeholder="Children"
                  value={formData.children}
                  onChange={(e) =>
                    setFormData({ ...formData, children: e.target.value })
                  }
                  className="w-full p-2 border focus:outline-none border-[#008B02]"
                />
              </div>
            </div>

            <div className=" w-full text-left text-theme-green-middle-color font-medium text-base mt-6">
              Other Details
            </div>

            <FlightDropdown
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
            <HolidayDropdown
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />

            <div className=" w-full flex-col gap-1 mt-5">
              <span className=" text-base font-light">Message</span>
              <textarea
                type="text"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-2 focus:outline-none border border-[#008B02]"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="p-2 w-fit px-16 border border-[#038B06] text-[#038B06] mt-5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#038B06] border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

const NationalityDropdown = ({ formData, setFormData, errors, setErrors }) => {
  const [countries, setCountries] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState(null);

  // Fetch countries and create nationalities
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,demonyms,flags");
        const data = await response.json();

        const formattedNationalities = data
          .map((country) => {
            const nationality =
              country.demonyms?.eng?.m || `${country.name.common} Citizen`;
            return {
              value: nationality,
              label: nationality
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setCountries(formattedNationalities);
        if (formattedNationalities.length > 0 && !formData.nationality) {
          const defaultNationality = formattedNationalities[0];
          setSelectedNationality(defaultNationality);
          setFormData({
            ...formData,
            nationality: defaultNationality.value
          });
        } else if (formData.nationality) {
          const current = formattedNationalities.find(c => c.value === formData.nationality);
          if (current) setSelectedNationality(current);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="w-full mt-5">
      <label className="block text-gray-700 font-medium mb-2">
        Nationality
      </label>
      <Select
        value={selectedNationality}
        onChange={(selected) => {
          setSelectedNationality(selected);
          setFormData({ ...formData, nationality: selected?.value || "" });
          setErrors({ ...errors, nationality: "" });
        }}
        options={countries}
        isSearchable
        placeholder="Select your nationality"
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#008B02",
            "&:hover": {
              borderColor: "#008B02"
            },
            boxShadow: "none"
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999
          })
        }}
      />
      {errors.nationality && (
        <span className="text-red-500">{errors.nationality}</span>
      )}
    </div>
  );
};
const UseCountryDropdown = ({ formData, setFormData, errors, setErrors }) => {
  const [countries, setCountries] = useState(["Sri Lanka", "Moldives", "UAE"]);
  const [selectedTravelCountry, setSelectedTravelCountry] = useState("");

  return (
    <div className="w-full  mt-5">
      <label className="block text-gray-700 font-medium mb-2">
        Destination
      </label>
      <select
        value={formData.destination}
        onChange={(e) => {
          setFormData({ ...formData, destination: e.target.value });
          setErrors({ ...errors, destination: "" });
        }}
        className="block w-full p-3 border border-[#008B02]  bg-white text-gray-700 focus:outline-none focus:border-green-500"
      >
        <option value="" disabled>
          Select Tour Country
        </option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      {errors.destination && (
        <span className="text-red-500">{errors.destination}</span>
      )}
    </div>
  );
};
const FlightDropdown = ({ formData, setFormData, errors, setErrors }) => {
  const [flights, setFlights] = useState(["Booked", "Not yet Booked"]);
  const [selectedFlight, setSelectedFlight] = useState("");

  return (
    <div className="w-full  mt-5">
      <label className="block text-gray-700 font-medium mb-2">My Flights</label>
      <select
        value={formData.flightStatus}
        onChange={(e) =>
          setFormData({ ...formData, flightStatus: e.target.value })
        }
        className="block w-full p-3 border border-[#008B02]  bg-white text-gray-700 focus:outline-none focus:border-green-500"
      >
        <option value="" disabled>
          Select Flight
        </option>
        {flights.map((flight, index) => (
          <option key={index} value={flight}>
            {flight}
          </option>
        ))}
      </select>
    </div>
  );
};
const HolidayDropdown = ({ formData, setFormData, errors, setErrors }) => {
  const [reasons, setreasons] = useState([
    "Honeymoon",
    "Anniversary",
    "Family Holiday",
    "Birthday Celebration",
    "Other"
  ]);
  const [selectedReason, setSelectedReason] = useState("");

  return (
    <div className="w-full  mt-5">
      <label className="block text-gray-700 font-medium mb-2">
        Holiday Reason
      </label>
      <select
        value={formData.holidayReason}
        onChange={(e) =>
          setFormData({ ...formData, holidayReason: e.target.value })
        }
        className="block w-full p-3 border border-[#008B02]  bg-white text-gray-700 focus:outline-none focus:border-green-500"
      >
        <option value="" disabled>
          Select Reason
        </option>
        {reasons.map((reason, index) => (
          <option key={index} value={reason}>
            {reason}
          </option>
        ))}
      </select>
    </div>
  );
};

const CountryDropdown = ({ formData, setFormData, errors, setErrors }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Fetch country list from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
        const data = await response.json();

        const formattedCountries = data
          .map((country) => ({
            value: country.name.common,
            label: country.name.common
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setCountries(formattedCountries);
        if (formattedCountries.length > 0 && !formData.livingCountry) {
          const defaultCountry = formattedCountries[0];
          setSelectedCountry(defaultCountry);
          setFormData({
            ...formData,
            livingCountry: defaultCountry.value
          });
        } else if (formData.livingCountry) {
          const current = formattedCountries.find(c => c.value === formData.livingCountry);
          if (current) setSelectedCountry(current);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="w-full mt-5">
      <label className="block text-gray-700 font-medium mb-2">
        Living Country
      </label>
      <Select
        value={selectedCountry}
        onChange={(selected) => {
          setSelectedCountry(selected);
          setFormData({ ...formData, livingCountry: selected?.value || "" });
          setErrors({ ...errors, livingCountry: "" });
        }}
        options={countries}
        isSearchable
        placeholder="Select a country"
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "#008B02",
            "&:hover": {
              borderColor: "#008B02"
            },
            boxShadow: "none"
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999
          })
        }}
      />
      {errors.livingCountry && (
        <span className="text-red-500">{errors.livingCountry}</span>
      )}
    </div>
  );
};

const MobileNumberInput = ({ formData, setFormData, errors, setErrors }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,flags");
        const data = await response.json();

        const formattedCountries = data
          .map((country) => ({
            label: country.name.common,
            value: country.name.common,
            code:
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : ""),
            flag: country.flags.svg
          }))
          .filter((country) => country.code)
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(formattedCountries);
        if (formattedCountries.length > 0) {
          setSelectedCountry(formattedCountries[0]);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const customOption = ({ data, innerRef, innerProps }) => (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
    >
      <img src={data.flag} alt={data.label} className="w-6 h-4 mr-2 rounded-sm" />
      <span>{data.label} ({data.code})</span>
    </div>
  );

  const customSingleValue = ({ data }) => (
    <div className="flex items-center justify-start m-0 p-0 h-full">
      <img src={data.flag} alt={data.label} className="w-5 h-4 mr-1.5 rounded-sm flex-shrink-0" />
      <span className="text-sm leading-tight">{data.code}</span>
    </div>
  );

  return (
    <div className="w-full mt-3">
      <label className="block text-base font-light mb-1">Mobile</label>
      <div className="flex items-center bg-white border border-[#008B02] overflow-hidden">
        {/* Dropdown with Flag using react-select */}
        <div className="w-[100px] md:w-[120px] flex-shrink-0 border-r-2 border-theme-green-color flex items-center">
          <Select
            value={selectedCountry}
            onChange={(selected) => {
              setSelectedCountry(selected);
            }}
            options={countries}
            components={{
              Option: customOption,
              SingleValue: customSingleValue
            }}
            isSearchable={true}
            placeholder="Code"
            className="react-select-container"
            classNamePrefix="react-select"
            menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
            menuPosition="fixed"
            onMenuOpen={() => {
              // Focus the search input when menu opens
              setTimeout(() => {
                const input = document.querySelector('.react-select-container .react-select__input input');
                if (input) input.focus();
              }, 0);
            }}
            styles={{
              control: (base, state) => ({
                ...base,
                border: "none",
                boxShadow: "none",
                minHeight: "38px",
                height: "38px",
                backgroundColor: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  border: "none"
                }
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 6px",
                margin: 0,
                display: "flex",
                alignItems: "center",
                height: "100%",
                overflow: "visible"
              }),
              input: (base) => ({
                ...base,
                margin: 0,
                padding: "2px 0",
                color: "#333"
              }),
              indicatorsContainer: (base) => ({
                ...base,
                padding: "0 4px"
              }),
              singleValue: (base, state) => ({
                ...base,
                margin: 0,
                padding: 0,
                display: state.isFocused ? "none" : "flex",
                alignItems: "center",
                lineHeight: "1",
                overflow: "visible"
              }),
              indicatorSeparator: () => ({
                display: "none"
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 99999
              }),
              menu: (base) => ({
                ...base,
                zIndex: 99999,
                marginTop: "4px",
                minWidth: "350px",
                width: "max-content"
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: "300px",
                overflowY: "auto",
                padding: "4px 0"
              })
            }}
          />
        </div>

        {/* Mobile Number Input */}
        <input
          type="tel"
          placeholder={selectedCountry ? `${selectedCountry.code} 555-0123` : "555-0123"}
          value={formData.mobile}
          onChange={(e) => {
            setFormData({ ...formData, mobile: e.target.value });
            setErrors({ ...errors, mobile: "" });
          }}
          className="flex-1 p-2 text-gray-700 focus:outline-none border-l-2 border-theme-green-color"
        />
      </div>
      {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}
    </div>
  );
};

const ArrivalDatePicker = ({ formData, setFormData, errors, setErrors }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-full  mt-5">
      <label className="block text-gray-700 font-medium mb-2">
        Arrival Date
      </label>
      <div className="relative w-full">
        {/* Datepicker Input */}
        <DatePicker
          selected={formData.arrivalDate}
          onChange={(date) => {
            setFormData({ ...formData, arrivalDate: date });
            setErrors({ ...errors, arrivalDate: "" });
          }}
          placeholderText="Select date"
          className="w-full p-3 pr-10 border border-[#008B02]       focus:outline-none focus:border-green-500 text-gray-700"
        />

        {/* Calendar Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 10h5v5H7zm10-7V2h-2v1H9V2H7v1H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-2zm2 16H5V8h14zm-9-7h5v5h-5z" />
          </svg>
        </div>
      </div>
      {errors.arrivalDate && (
        <span className="text-red-500">{errors.arrivalDate}</span>
      )}
    </div>
  );
};
const DepartureDatePicker = ({ formData, setFormData, errors, setErrors }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-full  mt-5">
      <label className="block text-gray-700 font-medium mb-2">
        Departure Date
      </label>
      <div className="relative w-full">
        {/* Datepicker Input */}
        <DatePicker
          selected={formData.departureDate}
          onChange={(date) => {
            setFormData({ ...formData, departureDate: date });
            setErrors({ ...errors, departureDate: "" });
          }}
          placeholderText="Select date"
          className="w-full p-3 pr-10 border border-[#008B02]       focus:outline-none focus:border-green-500 text-gray-700"
        />

        {/* Calendar Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 10h5v5H7zm10-7V2h-2v1H9V2H7v1H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-2zm2 16H5V8h14zm-9-7h5v5h-5z" />
          </svg>
        </div>
      </div>
      {errors.departureDate && (
        <span className="text-red-500">{errors.departureDate}</span>
      )}
    </div>
  );
};

const Summary = ({ data }) => {
  return (
    <div className="mt-5 flex flex-col p-4 border border-theme-green-color w-full">
      <div className="text-black font-bold text-[20px] mb-3">Summary</div>
      <span className="text-base text-black mb-3">
        {data.summary?.description}
      </span>
      <div className="text-theme-green-middle-color font-bold text-[20px] mb-3 mt-10">
        Activities Covered
      </div>
      {data.summary.activities.map((activity, index) => (
        <div key={index} className="w-full flex items-center gap-2">
          <span className="w-3 h-3 bg-theme-green-color rounded-full"></span>
          <span className="text-base text-black">{activity}</span>
        </div>
      ))}
      <div className="text-theme-green-middle-color font-bold text-[20px] mb-3 mt-6">
        Locations Covered
      </div>
      {data.summary.locations.map((location, index) => (
        <div key={index} className="w-full flex items-center gap-2">
          <span className="w-3 h-3 bg-theme-green-color rounded-full"></span>
          <span className="text-base text-black">{location}</span>
        </div>
      ))}
    </div>
  );
};

const Inclusion = ({ data }) => {
  return (
    <div className="mt-5 flex flex-col p-4 border border-theme-green-color w-full">
      <div className="text-theme-green-middle-color font-bold text-[20px] mb-3">
        Inclusions
      </div>
      <div className=" flex flex-col w-full gap-2">
        {data.inclusion.included.map((item, index) => (
          <div key={index} className="w-full flex items-center gap-2">
            <span>
              <CorectIcon className="w-1" />
            </span>
            <span className="text-base text-black">{item}</span>
          </div>
        ))}
      </div>
      <div className="text-theme-green-middle-color font-bold text-[20px] mb-3 mt-10">
        Exclusions
      </div>
      <div className=" flex flex-col w-full gap-2">
        {data.inclusion.excluded.map((item, index) => (
          <div key={index} className="w-full flex items-center gap-2">
            <span>
              <WrongIcon />
            </span>
            <span className="text-base text-black">{item}</span>
          </div>
        ))}
      </div>

      <div className="text-theme-green-middle-color font-bold text-[20px] mb-3 mt-10">
        Booking information
      </div>
      <div className=" flex flex-col w-full gap-2">
        <div className="w-full flex items-start gap-2">
          <span>
            <CorectIcon />
          </span>
          <span className="text-base text-black">
            {data.inclusion.booking_information}
          </span>
        </div>
      </div>

      <div className="text-theme-green-middle-color font-bold text-[20px] mb-3 mt-10">
        Cancellation Policy
      </div>
      <div className=" flex flex-col w-full gap-2">
        <div className="w-full flex items-start gap-2">
          <span>
            <CorectIcon />
          </span>
          <span className="text-base text-black">
            {data.inclusion.cancellation_policy}
          </span>
        </div>
      </div>
    </div>
  );
};

const Itinerary = ({ data }) => {
  const [open, setOpen] = useState([1]);

  const handleOpen = (value) => {
    if (open.includes(value)) {
      // If it's already open, close it by filtering it out
      setOpen(open.filter((item) => item !== value));
    } else {
      // Otherwise, add it to the list of open accordions
      setOpen([...open, value]);
    }
  };

  return (
    <div className="mt-5 flex flex-col p-2 font-nunito border border-theme-green-color w-full">
      {data.itinerary.map((day, index) => (
        <Accordion
          key={index}
          open={open.includes(index + 1)}
          className="mb-3 font-nunito"
        >
          <AccordionHeader
            onClick={() => handleOpen(index + 1)}
            className="border-none w-full p-5 bg-[#D3FFD1]"
          >
            <div className="flex items-center justify-between w-full">
              <span className="w-[95%] text-black 3xl:text-lg text-base font-nunito font-medium">
                {day.day}
              </span>
              <span className="w-[5%] 3xl:text-lg text-[26px] font-semibold">
                {open.includes(index + 1) ? "+" : "-"}
              </span>
            </div>
          </AccordionHeader>
          <AccordionBody className="p-2 bg-white mt-4">
            <div className="flex flex-col relative w-full gap-2 items-start">
              <div className="text-black font-nunito text-base font-normal">
                {day.details?.map((detail, i) => {
                  return <p key={i} className="mb-3">{detail}</p>;
                })}
              </div>
              <div className="w-full overflow-hidden">
                <img src={day.image} className="object-cover w-full" alt="" />
              </div>
              {day.activities.map((activity, i) => {
                return (
                  <div key={i}>
                    <div className="text-black font-nunito font-bold text-base mb-2 mt-6">
                      {activity.title}
                    </div>
                    <div className="flex flex-col w-full gap-1">
                      {activity.list_items.map((item, index) => (
                        <div
                          key={index}
                          className="w-full flex items-center gap-2"
                        >
                          <span className="w-3 h-3 bg-theme-green-color rounded-full"></span>
                          <div className="text-black font-nunito text-base font-normal">
                            {item}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};