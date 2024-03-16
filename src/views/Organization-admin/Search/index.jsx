import React, { useState } from "react";
import Card from "components/card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchIcon from "components/icons/SearchIcon";
import MiniCalendar from "components/calendar/MiniCalendar";

function Search() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startDate1, setStartDate1] = useState();
  const [endDate1, setEndDate1] = useState();
  

  const handleSearch = () => {
    //
  };

  return (
    <div className="mb-4">
      <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-5  mt-8">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-start">
            <label className="mb-2 text-gray-600">Start Date:</label>
            <DatePicker
              className="datepicker-container  "
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              placeholderText="MM/DD/YYYY"
              customInput={<CustomInput placeholder="Select Start Date" />}
             
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-2 text-gray-600">End Date:</label>
            <DatePicker
              className="datepicker-container"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              endDate={endDate}
              startDate={startDate}
              minDate={startDate}
              placeholderText="MM/DD/YYYY"
              customInput={<CustomInput placeholder="Select End Date" />}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-2 text-gray-600">Check-in Date:</label>
            <DatePicker
              className="datepicker-container"
              selected={startDate1}
              onChange={(date) => setStartDate1(date)}
              startDate={startDate1}
              placeholderText="MM/DD/YYYY"
              customInput={<CustomInput placeholder="Select Check-in Date" />}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-2 text-gray-600">Check-out Date:</label>
            <DatePicker
              className="datepicker-container"
              selected={endDate1}
              onChange={(date) => setEndDate1(date)}
              endDate={endDate1}
              startDate={startDate1}
              minDate={startDate1}
              placeholderText="MM/DD/YYYY"
              customInput={<CustomInput placeholder="Select Check-out Date" />}
            />
          </div>
        </div>
        <div className="relative mt-5 w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400 " />
          </div>
          <input
            className="w-11/12 rounded-lg border py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none"
            label="Search"
            size="lg"
            name="search"
            type="search"
            placeholder="Search..."
            style={{ paddingLeft: "60px" }}
          />

          <button className=" ms-3 rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Search
          </button>
        </div>
      </Card>
      <Card className="mt-4 rounded-xl bg-white p-6 shadow-md">
        {data?.length > 0 ? (
          data?.map((item, index) => <div key={index}>{item}</div>)
        ) : (
          <div className="text-center">No Data Found</div>
        )}
      </Card>
    </div>
  );
}

const CustomInput = ({ value, onClick, placeholder }) => (
  <input
    className="datepicker-input rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
    onClick={onClick}
    value={value ? value : placeholder}
    readOnly
  />
);

export default Search;
