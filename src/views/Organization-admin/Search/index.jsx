import React, { useEffect, useRef, useState } from "react";
import Card from "components/card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchIcon from "components/icons/SearchIcon";
import CryptoJS from "crypto-js";
import { RxCross2 } from "react-icons/rx";
import { GetTextFile } from "Api/DocumentApi";
import { GetDateFileData } from "Api/DocumentApi";
import { GetLocationListData } from "Api/LocationApi";
import { GetLocationTextFileData } from "Api/DocumentApi";
import { GetSelectedLocationTextFileData } from "Api/DocumentApi";
import { GetLocationUserTextFileData } from "Api/DocumentApi";
import { GetPerticulerLocationUserData } from "Api/DocumentApi";
import toast from "react-hot-toast";
import { Pagination } from "components/Pagination";
import Loader from "components/Loader";
import { FaRegEye, FaDownload } from "react-icons/fa";

function Search() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [onClick, setOnClick] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [textData, setTextData] = useState();
  const [count, setCount] = useState();
  const [pdfUrl, setPdfUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [islocation, setIsLocation] = useState(false);
  const [location, setLocation] = useState();
  const [locationUser, setLocationUser] = useState();
  const [locationID, setLocationID] = useState();
  const [locationUserID, setLocationUserID] = useState();
  const OrganizationUserID = localStorage.getItem("organizationuserid");
  const OrganizationID = localStorage.getItem("organizationid");
  const modalRef = useRef(null);
  const encryptedData = `${process.env.REACT_APP_LOCAL_FILE_URL}`;
  const secretKey = "alibaba1234@Devops&$%";
  const bytes = CryptoJS?.AES?.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  //Pagination logic
  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  // Function to format date as dd/mm/yyyy
  const formatDate = (date) => {
    const day = date?.getDate();
    const month = date?.getMonth() + 1;
    const year = date?.getFullYear();

    // Ensure leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  useEffect(() => {
    if (startDate && endDate) {
      DateWiseData();
    } else if (islocation) {
      LocationDocumentList();
    } else {
      TextData();
    }
  }, [
    textData === undefined ? textData : "",
    currentPage,
    startDate && endDate ? startDate && endDate : "",
  ]);

  useEffect(() => {
    const data = textData?.map((item, index) => {
      return item?.data;
    });
    setFilteredData(data);
  }, [
    searchTerm || checkInDate || checkOutDate
      ? (searchTerm || checkInDate || checkOutDate) && (textData, currentPage)
      : textData,
  ]);

  const TextData = async () => {
    setLoading(true);
    await GetTextFile({ id: OrganizationUserID })
      .then((res) => {
        console.log("res", res);
        setTextData(res?.responseDataArray);
        setCount(res?.totalDocument);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const DateWiseData = async () => {
    setLoading(true);
    await GetDateFileData({
      id: OrganizationUserID,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    })
      .then(async (res) => {
        setTextData(res?.responseDataArray);
        setCount(res?.totalDocument);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = textData?.map(async (item) => {
          const response = await fetch(
            `${decryptedData}${item?.data?.textFileUrls}`
          );
          const text = await response.text();
          return { ...item?.data, content: text };
        });

        const fetchedData = await Promise.all(promises);
        setData(fetchedData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [
    searchTerm || checkInDate || checkOutDate
      ? (searchTerm || checkInDate || checkOutDate) && textData
      : "",
  ]);

  useEffect(() => {
    setFilteredData(
      data?.filter((item) => {
        const url = `${decryptedData}${item?.textFileUrls}`;
        const InDate = formatDate(checkInDate);
        const OutDate = formatDate(checkOutDate);
        return item?.content
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase() ||
              InDate.toLowerCase() ||
              OutDate.toLowerCase()
          );
      })
    );
  }, [data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setOnClick("");
  };

  const highlightSearchTerm = (text) => {
    if (!(searchTerm || formatDate(checkInDate) || formatDate(checkOutDate))) {
      return text;
    }
    const regex = new RegExp(
      `(${searchTerm || formatDate(checkInDate) || formatDate(checkOutDate)})`,
      "gi"
    );
    return text
      ?.split(regex)
      .map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part
      );
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    if (searchTerm || checkInDate || checkOutDate) {
      try {
        const promises = textData?.map(async (item) => {
          const response = await fetch(
            `${decryptedData}${item?.data?.textFileUrls}`
          );
          const text = await response.text();
          return { ...item?.data, content: text };
        });
        const fetchedData = await Promise.all(promises);
        if (searchTerm) {
          const filteredResults = fetchedData.filter((item) =>
            item?.content?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredData(filteredResults);
          setOnClick(searchTerm);
        } else if (checkInDate) {
          const InDate = formatDate(checkInDate);
          const checkInFilteredResults = fetchedData.filter(
            (item) =>
              item?.content?.toLowerCase().includes("arrival") ||
              item?.content?.toLowerCase().includes(InDate.toLowerCase())
          );
          setFilteredData(checkInFilteredResults);
          setOnClick(checkInDate);
        } else if (checkOutDate) {
          const OutDate = formatDate(checkOutDate);
          const checkOutFilteredResults = fetchedData.filter(
            (item) =>
              item?.content?.toLowerCase().includes("arrival") ||
              item?.content?.toLowerCase().includes(OutDate.toLowerCase())
          );
          setFilteredData(checkOutFilteredResults);
          setOnClick(checkOutDate);
        }
      } catch (error) {
        toast.error("somthing wrong");
      }
    }
  };

  //PDF download functionality
  const onButtonClick = (filename) => {
    const pdfUrl = `${decryptedData}${filename}`;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //PDF view functionality
  const handleView = (filename) => {
    const pdfUrl = `${decryptedData}${filename}`;
    setPdfUrl(pdfUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPdfUrl("");
  };

  const handleOutsideClick = () => {
    if (modalRef.current) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const OrganizationOnClick = () => {
    setIsLocation(false);
    setLocationID();
    setLocationUserID();
    if (startDate && endDate) {
      DateWiseData();
    } else {
      TextData();
    }
  };

  const LocationOnClick = () => {
    setIsLocation(true);
    LocationData();
    LocationDocumentList();
  };

  const LocationData = async () => {
    await GetLocationListData({ id: OrganizationID })
      .then((res) => {
        setLocation(res?.responseDataArray);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const PerticulerLocationUser = async (id) => {
    await GetPerticulerLocationUserData({ id: id })
      .then((res) => {
        setLocationUser(res?.responseDataArray);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const LocationDocumentList = async () => {
    setLoading(true);
    await GetLocationTextFileData({ id: OrganizationID })
      .then((res) => {
        setTextData(res?.responseDataArray);
        setCount(res?.totalDocument);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const SelectedLocationDocumentList = async (id) => {
    setLoading(true);
    await GetSelectedLocationTextFileData({ id: id })
      .then((res) => {
        setTextData(res?.responseDataArray);
        setCount(res?.totalDocument);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const LocationUserDocumentList = async (id) => {
    setLoading(true);
    await GetLocationUserTextFileData({ id: id })
      .then((res) => {
        setTextData(res?.responseDataArray);
        setCount(res?.totalDocument);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  return (
    <div className="mb-4">
      <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-5  mt-8">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-start">
            <label className="mb-2 text-gray-600">Start Date:</label>
            <DatePicker
              isClearable
              className="datepicker-container  "
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              selectsStart
              maxDate={endDate}
              placeholderText="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
              customInput={<CustomInput placeholder="Select Start Date" />}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-2 text-gray-600">End Date:</label>
            <DatePicker
              isClearable
              className="datepicker-container"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              endDate={endDate}
              minDate={startDate}
              selectsEnd
              placeholderText="MM/DD/YYYY"
              dateFormat="MM/dd/yyyy"
              customInput={<CustomInput placeholder="Select End Date" />}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-2 text-gray-600">Check-in Date:</label>
            <DatePicker
              selectsStart
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              startDate={checkInDate}
              dateFormat="MM/dd/yyyy"
              isClearable
              className="datepicker-container"
              placeholderText="MM/DD/YYYY"
              customInput={<CustomInput placeholder="Select Check-in Date" />}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-2 text-gray-600">Check-out Date:</label>
            <DatePicker
              isClearable
              selectsEnd
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              endDate={checkOutDate}
              dateFormat="MM/dd/yyyy"
              className="datepicker-container"
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
            className="mt-2 w-11/12 items-center justify-center rounded-lg rounded-xl border border bg-white/0 p-3 py-2 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:outline-none"
            label="Search"
            size="lg"
            name="search"
            type="search"
            placeholder="Search..."
            style={{ paddingLeft: "60px" }}
            onChange={handleSearch}
            value={searchTerm}
          />

          <button
            className=" ms-3 rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e) => handleSearchClick(e)}
          >
            Search
          </button>
        </div>
      </Card>

      <div className="mb-4 mt-4 flex w-full justify-end overflow-hidden xl:col-span-2">
        <div className="mr-4">
          <button
            className="ms-3 flex rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => OrganizationOnClick()}
          >
            Organization
          </button>
        </div>
        <div className="mr-4">
          <button
            className="ms-3 flex rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => LocationOnClick()}
          >
            Location
          </button>
        </div>
      </div>
      {islocation && (
        <div className="flex w-full justify-end overflow-hidden xl:col-span-2">
          <div className="mr-4">
            <lable className="text-dark mb-2 block text-sm font-bold uppercase tracking-wide dark:text-white">
              Location
            </lable>
            <select
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:ring-blue-500"
              type="text"
              label="Parent location"
              name="locationid"
              value={locationID}
              onChange={(e) => {
                setLocationID(e.target.value);
                setLocationUserID();
                PerticulerLocationUser(e.target.value);
                SelectedLocationDocumentList(e.target.value);
              }}
            >
              <option>Select Location</option>
              {location?.map((item) => {
                return (
                  <>
                    <option value={item?.data?.locationid}>
                      {item?.data?.name}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <div className="mr-8">
            <lable className="text-dark mb-2 block text-sm font-bold uppercase tracking-wide dark:text-white">
              Location User
            </lable>
            <select
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:ring-blue-500"
              type="text"
              label="Parent location"
              name="locationid"
              value={locationUserID}
              onChange={(e) => {
                setLocationUserID(e.target.value);
                LocationUserDocumentList(e.target.value);
              }}
            >
              <option>Select Location</option>
              {locationUser?.map((item) => {
                return (
                  <>
                    <option value={item?.data?.locationuserid}>
                      {item?.data?.firstname}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
      )}

      <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-5  mt-8">
        {loading && (startDate || endDate) ? (
          <div className="item-center text-black flex w-full justify-center font-bold">
            <Loader height={40} width={40} />
          </div>
        ) : (
          <>
            <div className="overflow-x-scroll px-0 pb-2 pt-0">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Sr No", "File Name", "Action"].map((el) => (
                      <th
                        key={el}
                        className="border-blue-gray-50 border-b px-6 py-3 text-left"
                      >
                        <lable
                          variant="small"
                          className="text-blue-gray-400 text-[11px] font-bold uppercase"
                        >
                          {el}
                        </lable>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(startDate && endDate) || onClick ? (
                    currentItems?.length > 0 ? (
                      currentItems?.map((item, index) => {
                        const className = `py-3 px-5 ${
                          index === currentItems.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr index={index}>
                            <td className={className}>
                              {(currentPage - 1) * 10 + index + 1}
                            </td>
                            <td className={className}>
                              <lable
                                variant="small"
                                className="text-blue-gray-600 ml-2 text-xl font-bold font-medium"
                              >
                                {item?.textFileName} /{" "}
                                {/* {item?.fileurl.split("/").pop()} */}
                              </lable>
                              {onClick && (
                                <div className="box h-25 overflow-scroll border-4 p-2">
                                  {highlightSearchTerm(item?.content)}
                                </div>
                              )}
                            </td>
                            <td className={className}>
                              <div className="mb-4 flex gap-2 ">
                                <div
                                  variant="small"
                                  className="flex h-8 w-8 cursor-pointer items-center justify-center bg-[#3e4b5b] hover:bg-[#3e4b5be8] hover:shadow-gray-400"
                                  onClick={() => handleView(item?.fileurl)}
                                  title="All Pdf View"
                                >
                                  <FaRegEye className="h-4 w-4 stroke-white stroke-2" />
                                </div>
                                <div
                                  className="flex h-8 w-8 cursor-pointer items-center justify-center bg-[#3e4b5b] hover:bg-[#3e4b5be8] hover:shadow-gray-400"
                                  onClick={() => onButtonClick(item?.fileurl)}
                                  title="All Pdf Download"
                                >
                                  <FaDownload className="h-4 w-4 stroke-white stroke-2" />
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <div
                                  variant="small"
                                  className="flex h-8 w-8 cursor-pointer items-center justify-center bg-[#3e4b5b] hover:bg-[#3e4b5be8] hover:shadow-gray-400"
                                  onClick={() => handleView(item?.pdfPageUrl)}
                                  title="One Page Pdf View"
                                >
                                  <FaRegEye className="h-4 w-4 stroke-white stroke-2" />
                                </div>
                                <div
                                  className="flex h-8 w-8 cursor-pointer items-center justify-center bg-[#3e4b5b] hover:bg-[#3e4b5be8] hover:shadow-gray-400"
                                  onClick={() =>
                                    onButtonClick(item?.pdfPageUrl)
                                  }
                                  title="One Page Pdf Download"
                                >
                                  <FaDownload className="h-4 w-4 stroke-white stroke-2" />
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div className="item-center text-black flex w-full justify-center font-bold">
                        No Matching Data Found.
                      </div>
                    )
                  ) : (
                    <div className="item-center text-black flex w-full justify-center font-bold">
                      Search Keyword.
                    </div>
                  )}
                </tbody>
              </table>
            </div>
            <div className="my-5">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                count={
                  searchTerm ||
                  checkInDate ||
                  checkOutDate ||
                  (startDate && endDate)
                    ? filteredData?.length
                    : "1"
                }
              />
            </div>
          </>
        )}
      </Card>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-filter"
          ref={modalRef}
        >
          <div className="w-full max-w-3xl rounded-md shadow-md">
            <div className="text-right">
              <button
                variant="text"
                color="black"
                size="xl"
                ripple={false}
                className="left-0 top-0"
                onClick={closeModal}
              >
                <RxCross2 strokeWidth={3.5} className="text-black h-8 w-8" />
              </button>
            </div>
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0`}
              width="100%"
              height="600px"
            ></iframe>
            {/* <div className="mt-4 text-right">
                    <button onClick={closeModal}>Close</button>
                  </div> */}
          </div>
        </div>
      )}
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
