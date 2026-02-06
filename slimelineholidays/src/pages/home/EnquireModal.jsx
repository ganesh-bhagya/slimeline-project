import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { CloseIcon } from "../../utils/icons";
import Loader from "../../components/ui/Loader";

export const EnquireModal = ({
  open,
  setOpen,
  startDate,
  selectedCountry,
  selectedDuration
}) => {
  // Helper function to calculate departure date
  const calculateDepartureDate = (startDate, duration) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (parseInt(duration) || 0));
    return date;
  };
  // const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    livingCountry: "",
    nationality: "",
    destination: selectedCountry,
    arrivalDate: startDate || null,
    departureDate: startDate
      ? calculateDepartureDate(startDate, selectedDuration)
      : null,
    adults: "",
    children: "",
    flightStatus: "",
    holidayReason: "",
    message: ""
  });

  // Synchronize departureDate whenever startDate or selectedDuration changes
  useEffect(() => {
    if (startDate && selectedDuration !== undefined) {
      setFormData((prevData) => ({
        ...prevData,
        arrivalDate: startDate || null,
        departureDate: calculateDepartureDate(startDate, selectedDuration)
      }));
    }
  }, [startDate, selectedDuration]);

  const [errors, setErrors] = useState({});

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
    // if (!nationality) newErrors.nationality = "Nationality is required";
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
            name: "",
            email: "",
            mobile: "",
            livingCountry: "",
            nationality: "",
            destination: selectedCountry,
            arrivalDate: startDate || null,
            departureDate: startDate
              ? calculateDepartureDate(startDate, selectedDuration)
              : null,
            adults: "",
            children: "",
            flightStatus: "",
            holidayReason: "",
            message: ""
          });
          setOpen(false);
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
      <Dialog open={open} onClose={setOpen} className="relative z-[100]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="md:px-14 px-5 py-10 font-nunito relative transform overflow-hidden bg-[#F1FFF2] text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div
                onClick={() => setOpen(false)}
                className=" cursor-pointer absolute right-5 top-5"
              >
                <CloseIcon />
              </div>
              <div className=" w-full flex flex-col items-center ">
                <div className="w-full text-center text-[30px]">
                  <span className=" font-bold">Enquire </span>Now
                </div>
                <div className="w-full text-center text-base">
                  Place your enquire below and we will get back to you in few
                  minutes
                </div>

                <div className=" flex w-full  flex-wrap justify-between items-start mt-10 ">
                  <div className="w-full md:w-[49%] flex-col gap-1 mb-5 md:mb-0 ">
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

                  <div className="w-full md:w-[49%] flex-col gap-1 mb-5 md:mb-0 ">
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
                  <div className="w-full md:w-[49%] ">
                    <ArrivalDatePicker
                      formData={formData}
                      setFormData={setFormData}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  </div>
                  <div className="w-full md:w-[49%] ">
                    <DepartureDatePicker
                      formData={formData}
                      setFormData={setFormData}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  </div>
                  <div className="w-full md:w-[49%] ">
                    <CountryDropdown
                      formData={formData}
                      setFormData={setFormData}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  </div>
                  <div className="w-full md:w-[49%] ">
                    <UseCountryDropdown
                      formData={formData}
                      setFormData={setFormData}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  </div>
                  <div className="w-full md:w-[49%] ">
                    <MobileNumberInput
                      formData={formData}
                      setFormData={setFormData}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  </div>

                  <div className=" flex w-full md:w-[49%] items-start justify-between mt-2">
                    <div className=" w-[49%] flex-col gap-1 mt-2">
                      <span className=" text-base font-light">
                        No of Travellers
                      </span>
                      <input
                        type="number"
                        placeholder="Adults"
                        value={formData.adults}
                        onChange={(e) => {
                          setFormData({ ...formData, adults: e.target.value });
                          setErrors({ ...errors, adults: "" });
                        }}
                        className="w-full p-2  border focus:outline-none border-[#008B02]"
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
                        className="w-full p-2  border focus:outline-none border-[#008B02]"
                      />
                    </div>
                  </div>
                  <div className=" w-full flex-col gap-1 mt-5">
                    <span className=" text-base font-light">Message</span>
                    <textarea
                      type="text"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full p-2 focus:outline-none border border-[#008B02]"
                    />
                  </div>
                </div>

                <div className=" w-full flex justify-end">
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
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
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
                height: "100%"
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
                lineHeight: "1"
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

const CountryDropdown = ({ formData, setFormData, errors, setErrors }) => {
  const [countries, setCountries] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch country list from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await response.json();

        const formattedCountries = data
          .map((country) => ({
            value: country.name.common,
            label: country.name.common
          }))
          .sort((a, b) => a.label.localeCompare(b.label)); // Sort alphabetically

        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="w-full mt-3">
      <label className="block text-base font-light mb-1">Living Country</label>
      <Select
        value={selectedOption}
        onChange={(selected) => {
          setSelectedOption(selected);
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

const UseCountryDropdown = ({ formData, setFormData, errors, setErrors }) => {
  const [countries, setCountries] = useState(["Sri Lanka", "Moldives", "UAE"]);
  const [selectedTravelCountry, setSelectedTravelCountry] = useState("");

  return (
    <div className="w-full mt-3">
      <label className="block text-base font-light mb-1">Destination</label>
      <select
        value={formData.destination}
        onChange={(e) => {
          setFormData({ ...formData, destination: e.target.value });
          setErrors({ ...errors, destination: "" });
        }}
        className="block w-full p-2 border border-[#008B02]  bg-white text-gray-700 focus:outline-none focus:border-green-500"
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

const ArrivalDatePicker = ({ formData, setFormData, errors, setErrors }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-full mt-3">
      <label className="block text-base font-light mb-1">Arrival Date</label>
      <div className="relative w-full">
        {/* Datepicker Input */}
        <DatePicker
          selected={formData.arrivalDate}
          onChange={(date) => {
            setFormData({ ...formData, arrivalDate: date });
            setErrors({ ...errors, arrivalDate: "" });
          }}
          value={formData.arrivalDate}
          placeholderText="Select date"
          className="w-full p-2 px-5 border border-[#008B02]       focus:outline-none focus:border-green-500 text-gray-700"
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
    <div className="w-full mt-3">
      <label className="block text-base font-light mb-1">Departure Date</label>
      <div className="relative w-full">
        {/* Datepicker Input */}
        <DatePicker
          selected={formData.departureDate}
          onChange={(date) => {
            setFormData({ ...formData, departureDate: date });
            setErrors({ ...errors, departureDate: "" });
          }}
          placeholderText="Select date"
          className="w-full p-2 px-5 border border-[#008B02]       focus:outline-none focus:border-green-500 text-gray-700"
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
