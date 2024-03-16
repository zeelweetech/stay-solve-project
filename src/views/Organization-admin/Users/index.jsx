import Card from "components/card";
import React, { useEffect, useState } from "react";
import OrgUserOrganizationForm from "./Form/OrgUserOrganizationForm";
import OrgUserLocationForm from "./Form/OrgUserLocationForm";
import SearchIcon from "components/icons/SearchIcon";
import CryptoJS from "crypto-js";
import { GetOrganizationUserListData } from "Api/OrganizationApi";
import UserOrganizationTable from "./Table/UserOrganizationTable";
import { GetLocationUserListData } from "Api/LocationApi";
import UserLocationTable from "./Table/UserLocationTable";

function Index() {
  const [modal, setModal] = useState(false);
  const [locationmodal, setLocationModal] = useState(false);
  const [organizationUser, setOrganizationUser] = useState([]);
  const [count, setCount] = useState();
  const [orgLoading, setOrgLoading] = useState(false);
  const [organizationUserCurrentPage, setOrganizationUserCurrentPage] =
    useState(1);
  const [orgSelectedData, setOrgSelectedData] = useState();
  const [userSearchItem, setUserSearchItem] = useState("");
  const [organizationfilteredUsers, setOrganizationFilteredUsers] = useState(
    []
  );
  const [locationUser, setLocationUser] = useState([]);
  const [locationCount, setLocationCount] = useState();
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationSelectedData, setLocationSelectedData] = useState();
  const [locationfilteredUsers, setLocationFilteredUsers] = useState([]);
  const [locationSearchItem, setLocationSearchItem] = useState("");
  const [locationUserCurrentPage, setLocationUserCurrentPage] = useState(1);
  const encryptedData = `${process.env.REACT_APP_LOCAL_FILE_URL}`;
  const secretKey = "alibaba1234@Devops&$%";
  const bytes = CryptoJS?.AES?.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  const OrganizationID = localStorage.getItem("organizationid");

  //Organization logic
  useEffect(() => {
    OrganizationUserList();
  }, [
    organizationUser === undefined ? organizationUser : "",
    organizationUserCurrentPage,
  ]);

  const OrganizationUserList = async () => {
    setOrgLoading(true);
    await GetOrganizationUserListData({
      id: OrganizationID,
    })
      .then((res) => {
        console.log("res", res);
        setOrganizationUser(res?.responseDataArray);
        setCount(res?.totalDocuments === 0 ? 1 : res?.totalDocuments);
        setOrgLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setOrgLoading(false);
      });
  };

  const handleUserInputChange = (e) => {
    const userSearchItem = e.target.value;
    setUserSearchItem(userSearchItem);

    const OrganizationfilteredItems = orgSelectedData.filter(
      ({ firstname, username, lastname, email, mobile_number }) => {
        const searchString =
          `${firstname} ${username} ${lastname} ${email} ${mobile_number} }`.toLowerCase();
        return searchString.includes(userSearchItem.toLowerCase());
      }
    );
    setOrganizationFilteredUsers(OrganizationfilteredItems);
  };

  const handleModalOnclick = () => {
    setModal(true);
  };

  //LocationUser logic
  useEffect(() => {
    LocationUserList();
  }, [locationUser === undefined ? locationUser : "", locationUserCurrentPage]);

  const LocationUserList = async () => {
    setLocationLoading(true);
    await GetLocationUserListData({
      id: OrganizationID,
    })
      .then((res) => {
        console.log("res", res);
        setLocationUser(res?.responseDataArray);
        setLocationCount(res?.totaldocument === 0 ? 1 : res?.totaldocument);
        setLocationLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLocationLoading(false);
      });
  };

  const handleLocationInputChange = (e) => {
    const locationSearchItem = e.target.value;
    setLocationSearchItem(locationSearchItem);

    const LocationfilteredItems = locationSelectedData.filter(
      ({
        firstname,
        username,
        lastname,
        email,
        mobile_number,
        parent_organization,
      }) => {
        const searchString =
          `${firstname} ${username} ${lastname} ${email} ${mobile_number} ${parent_organization} }`.toLowerCase();
        return searchString.includes(locationSearchItem.toLowerCase());
      }
    );
    setLocationFilteredUsers(LocationfilteredItems);
  };

  const handleModalOnclickLocationUSer = () => {
    setLocationModal(true);
  };

  return (
    <div>
      {!modal && !locationmodal && (
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
              <UserOrganizationTable
                orgLoading={orgLoading}
                count={count}
                organizationfilteredUsers={organizationfilteredUsers}
                organizationUserCurrentPage={organizationUserCurrentPage}
                setOrganizationUserCurrentPage={setOrganizationUserCurrentPage}
                setOrgSelectedData={setOrgSelectedData}
                setOrganizationFilteredUsers={setOrganizationFilteredUsers}
                organizationUser={organizationUser}
                decryptedData={decryptedData}
                userSearchItem={userSearchItem}
              />
            </div>
          </Card>

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
              <UserLocationTable
                locationLoading={locationLoading}
                locationCount={locationCount}
                locationfilteredUsers={locationfilteredUsers}
                locationUserCurrentPage={locationUserCurrentPage}
                setLocationUserCurrentPage={setLocationUserCurrentPage}
                setLocationSelectedData={setLocationSelectedData}
                setLocationFilteredUsers={setLocationFilteredUsers}
                locationUser={locationUser}
                decryptedData={decryptedData}
                locationSearchItem={locationSearchItem}
              />
            </div>
          </Card>
        </div>
      )}

      {modal && (
        <OrgUserOrganizationForm
          setModal={setModal}
          secretKey={secretKey}
          OrganizationUserList={OrganizationUserList}
          OrganizationID={OrganizationID}
        />
      )}
      {locationmodal && (
        <OrgUserLocationForm
          setLocationModal={setLocationModal}
          LocationUserList={LocationUserList}
          secretKey={secretKey}
          OrganizationID={OrganizationID}
        />
      )}
    </div>
  );
}

export default Index;
