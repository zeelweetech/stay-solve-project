import Card from "components/card";
import React, { useEffect, useState } from "react";
import { MdBarChart } from "react-icons/md";
import OrgLocationForm from "./Form/OrgLocationForm";
import SearchIcon from "components/icons/SearchIcon";
import { GetLocationListData } from "Api/LocationApi";
import LocationTable from "./Table/LocationTable";

function Location() {
  const [modal, setModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [location, setLocation] = useState();
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const OrganizationID = localStorage.getItem("organizationid");

  useEffect(() => {
    LocationList();
  }, [location === undefined ? location : "", currentPage]);

  const LocationList = async () => {
    setLoading(true);
    await GetLocationListData({ id: OrganizationID })
      .then((res) => {
        console.log("res", res);
        setLocation(res?.responseDataArray);
        setCount(res?.totalDocuments === 0 ? 1 : res?.totalDocuments);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  //input search functionality
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = selectedData.filter(
      ({
        name,
        email,
        phone_number,
        address_line1,
        address_line2,
        city,
        state,
        zip_code,
      }) => {
        const searchString =
          `${name} ${email} ${phone_number} ${address_line1} ${address_line2} ${city} ${state} ${zip_code} `.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
      }
    );
    setFilteredUsers(filteredItems);
  };

  const handleModalOnclick = () => {
    setModal(true);
  };

  return (
    <div>
      {!modal && (
        <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center mt-8">
          <div className="mb-auto flex items-center justify-between px-6">
            <h2 className="text-lg font-bold text-navy-700 dark:text-white">
              <form className="mx-auto max-w-md">
                <label
                  for="default-search"
                  className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center">
                    <SearchIcon />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search Location..."
                    required
                    value={searchItem}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </h2>
            <button
              className="!linear  z-[1] flex items-center justify-center rounded-lg bg-indigo-600 p-2 font-semibold text-white !transition !duration-200 hover:bg-indigo-500  focus-visible:outline-indigo-600"
              onClick={() => handleModalOnclick()}
            >
              ADD LOCATION
            </button>
          </div>
          <div className="mt-10">
            <LocationTable
              location={location}
              count={count}
              loading={loading}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setSelectedData={setSelectedData}
              filteredUsers={filteredUsers}
              setFilteredUsers={setFilteredUsers}
              searchItem={searchItem}
            />
          </div>
        </Card>
      )}
      {modal && (
        <OrgLocationForm
          setModal={setModal}
          OrganizationID={OrganizationID}
          LocationList={LocationList}
        />
      )}
    </div>
  );
}

export default Location;
