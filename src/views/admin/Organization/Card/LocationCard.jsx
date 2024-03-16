import Card from "components/card";
import SearchIcon from "components/icons/SearchIcon";
import React, { useEffect, useState } from "react";
import LocationCardTable from "../Table/LocationCardTable";

function LocationCard({
  location,
  LocationList,
  loading,
  locationCurrentPage,
  setLocationCurrentPage,
  count,
}) {
  const [searchItem, setSearchItem] = useState("");
  const [selectedData, setSelectedData] = useState();
  const [filteredUsers, setFilteredUsers] = useState();

  useEffect(() => {
    const data = location?.map((item, index) => ({
      name: item?.data?.name,
      username: item?.data?.username,
      email: item?.data?.email,
      phone_number: item?.data?.phone_number,
      address_line1: item?.data?.address_line1,
      address_line2: item?.data?.address_line2,
      city: item?.data?.city,
      state: item?.data?.state,
      zip_code: item?.data?.zip_code,
      _id: item?.data?._id,
      verify_code: item?.data?.verify_code,
      createdAt: item?.data?.createdAt,
      notes: item?.data?.notes,
      organizationid: item?.data?.organizationid,
      parent_organization: item?.parent_organization,
      locationid: item?.data?.locationid,
    }));
    setSelectedData(data);
    setFilteredUsers(data);
  }, [location]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    LocationList(searchTerm);
  };

  return (
    <div>
      <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center mt-8">
        <div className="mb-auto flex items-center justify-between px-6">
          <h2 className="text-lg font-bold text-navy-700 dark:text-white">
            <form class="mx-auto max-w-md">
              <p>Location</p>
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
        </div>
        <div className="mt-10">
          <LocationCardTable
            loading={loading}
            filteredUsers={filteredUsers}
            locationCurrentPage={locationCurrentPage}
            setLocationCurrentPage={setLocationCurrentPage}
            count={count}
          />
        </div>
      </Card>
    </div>
  );
}

export default LocationCard;
