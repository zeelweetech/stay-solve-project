import Card from "components/card";
import SearchIcon from "components/icons/SearchIcon";
import React, { useEffect, useState } from "react";
import OrganizationUserTable from "../Table/OrganizationUserTable";

function OrganizationUserCard({
  setModal,
  organizationUserCurrentPage,
  orgLoading,
  UserCount,
  decryptedData,
  organizationUser,
  setOrganizationUserCurrentPage,
  OrganizationUserList,
}) {
  const [userSearchItem, setUserSearchItem] = useState("");
  const [organizationfilteredUsers, setOrganizationFilteredUsers] = useState(
    []
  );

  useEffect(() => {
    const data = organizationUser?.map((item, index) => ({
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
      parent_organization: item?.parent_organization,
      _id: item?.data?._id,
    }));
    setOrganizationFilteredUsers(data);
  }, [organizationUser]);

  const handleUserInputChange = (e) => {
    const userSearchItem = e.target.value;
    setUserSearchItem(userSearchItem);
    OrganizationUserList(userSearchItem);
  };

  const handleModalOnclick = () => {
    setModal(true);
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
                  placeholder="Search Org User..."
                  required
                  value={userSearchItem}
                  onChange={handleUserInputChange}
                />
              </div>
            </form>
          </h2>
          <button
            className="!linear  z-[1] flex items-center justify-center rounded-lg bg-indigo-600 p-2 font-semibold text-white !transition !duration-200 hover:bg-indigo-500  focus-visible:outline-indigo-600"
            onClick={() => handleModalOnclick()}
          >
            ADD ORGANIZATION USER
          </button>
        </div>
        <div className="mt-10">
          <OrganizationUserTable
            organizationUserCurrentPage={organizationUserCurrentPage}
            orgLoading={orgLoading}
            UserCount={UserCount}
            setOrganizationUserCurrentPage={setOrganizationUserCurrentPage}
            organizationfilteredUsers={organizationfilteredUsers}
            decryptedData={decryptedData}
          />
        </div>
      </Card>
    </div>
  );
}

export default OrganizationUserCard;
