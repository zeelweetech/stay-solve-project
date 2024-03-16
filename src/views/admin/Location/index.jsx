import Card from "components/card";
import React, { useEffect, useState } from "react";
import { MdBarChart } from "react-icons/md";
import SearchIcon from "components/icons/SearchIcon";
import LocationTable from "./Table/LocationTable";
import LocationForm from "./Form/LocationForm";
import { GetLocation } from "Api/LocationApi";
import { GetOrganization } from "Api/OrganizationApi";

function Location() {
  const [modal, setModal] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [location, setLocation] = useState();
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [organizationList, setOrganizationList] = useState([]);

  useEffect(() => {
    organizationData();
  }, []);

  useEffect(() => {
    LocationList();
  }, [location === undefined ? location : "", currentPage]);

  const LocationList = async (searchTerm) => {
    setLoading(true);
    await GetLocation(
      searchTerm
        ? { currentPage: currentPage, search: searchTerm }
        : { currentPage: currentPage }
    )
      .then((res) => {
        setLocation(res?.responseDataArray);
        setCount(res?.totalDocuments === 0 ? 1 : res?.totalDocuments);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    LocationList(searchTerm);
  };

  const organizationData = async () => {
    await GetOrganization({ currentPage: "", search: "" })
      .then((res) => {
        console.log("res", res);
        setOrganizationList(res?.orgData);
      })
      .catch((err) => {
        console.log("err", err);
      });
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
              <form class="mx-auto max-w-md">
                <label
                  for="default-search"
                  class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center">
                    <SearchIcon />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Search Location..."
                    required
                    value={searchItem}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </h2>
            <button
              className="!linear  bg-indigo-600 text-white z-[1] flex items-center justify-center rounded-lg p-2 font-semibold !transition !duration-200 hover:bg-indigo-500  focus-visible:outline-indigo-600"
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
            />
          </div>
        </Card>
      )}
      {modal && (
        <LocationForm
          setModal={setModal}
          LocationList={LocationList}
          organizationList={organizationList}
        />
      )}
    </div>
  );
}

export default Location;
