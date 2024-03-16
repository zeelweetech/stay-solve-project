import Card from "components/card";
import SearchIcon from "components/icons/SearchIcon";
import React, { useEffect, useState } from "react";
import LocationUserTable from "../Table/LocationUserTable";

function LocationUserCard({
  setLocationModal,
  locationUser,
  locationUserCurrentPage,
  setLocationUserCurrentPage,
  locationLoading,
  locationUserCount,
  decryptedData,
  LocationUserList,
}) {
  const [locationSearchItem, setLocationSearchItem] = useState("");
  const [locationfilteredUsers, setLocationFilteredUsers] = useState([]);

  useEffect(() => {
    const data = locationUser?.map((item, index) => ({
      fileurl: item?.data?.fileurl,
      firstname: item?.data?.firstname,
      username: item?.data?.username,
      lastname: item?.data?.lastname,
      email: item?.data?.email,
      mobile_number: item?.data?.mobile_number,
      password: item?.data?.password,
      is_verified: item?.data?.is_verified,
      organizationid: item?.data?.organizationid,
      organizationuserid: item?.data?.organizationuserid,
      parent_location: item?.parent_location,
      _id: item?.data?._id,
      locationuserid: item?.data?.locationuserid,
      locationid: item?.data?.locationid,
    }));
    setLocationFilteredUsers(data);
  }, [locationUser]);

  const handleLocationInputChange = (e) => {
    const locationSearchItem = e.target.value;
    setLocationSearchItem(locationSearchItem);
    LocationUserList(locationSearchItem);
  };

  const handleModalOnclickLocationUSer = () => {
    setLocationModal(true);
  };
  return (
    <div>
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
                  placeholder="Search Loc User..."
                  required
                  value={locationSearchItem}
                  onChange={handleLocationInputChange}
                />
              </div>
            </form>
          </h2>
          <button
            className="!linear  z-[1] flex items-center justify-center rounded-lg bg-indigo-600 p-2 font-semibold text-white !transition !duration-200 hover:bg-indigo-500  focus-visible:outline-indigo-600"
            onClick={() => handleModalOnclickLocationUSer()}
          >
            ADD LOCATION USER
          </button>
        </div>
        <div className="mt-10">
          <LocationUserTable
            locationLoading={locationLoading}
            locationUserCurrentPage={locationUserCurrentPage}
            setLocationUserCurrentPage={setLocationUserCurrentPage}
            locationUserCount={locationUserCount}
            decryptedData={decryptedData}
            locationfilteredUsers={locationfilteredUsers}
          />
        </div>
      </Card>
    </div>
  );
}

export default LocationUserCard;
