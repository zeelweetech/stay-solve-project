import Card from "components/card";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import CryptoJS from "crypto-js";
import UserLocationForm from "views/admin/User/Form/UserLocationForm";
import UserOrganizationForm from "views/admin/User/Form/UserOrganizationForm";
import OrganizationUserCard from "./OrganizationUserCard";
import LocationUserCard from "./LocationUserCard";
import { GetOrganizationListData } from "Api/OrganizationApi";
import { GetLocationListData } from "Api/LocationApi";
import LocationCard from "./LocationCard";
import { GetOrganizationUserListData } from "Api/OrganizationApi";
import { GetLocationUserListData } from "Api/LocationApi";

function IndexOpen({ setOpenUserData, selectedId }) {
  const [modal, setModal] = useState(false);
  const [locationmodal, setLocationModal] = useState(false);
  const [listData, setListData] = useState();
  const [location, setLocation] = useState();
  const [locationCurrentPage, setLocationCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [UserCount, setUserCount] = useState([]);
  const [organizationUser, setOrganizationUser] = useState([]);
  const [orgLoading, setOrgLoading] = useState(false);
  const [organizationUserCurrentPage, setOrganizationUserCurrentPage] =
    useState(1);
  const [locationUser, setLocationUser] = useState([]);
  const [locationUserCount, setLocationUserCount] = useState();
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationUserCurrentPage, setLocationUserCurrentPage] = useState(1);
  const encryptedData = `${process.env.REACT_APP_LOCAL_FILE_URL}`;
  const secretKey = "alibaba1234@Devops&$%";
  const bytes = CryptoJS?.AES?.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    GetSelectData();
  }, [selectedId]);

  const GetSelectData = async () => {
    await GetOrganizationListData(selectedId)
      .then((res) => {
        console.log("res", res);
        const data = res?.orgData?.map((item) => {
          return item;
        })?.[0];
        setListData(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  //Location Logic
  useEffect(() => {
    LocationList();
  }, [location === undefined ? location : "", locationCurrentPage]);

  const LocationList = async (searchTerm) => {
    setLoading(true);
    await GetLocationListData(
      searchTerm
        ? {
            id: selectedId,
            currentPage: locationCurrentPage,
            search: searchTerm,
          }
        : { id: selectedId, currentPage: locationCurrentPage }
    )
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

  // OrganizationUser Logic
  useEffect(() => {
    OrganizationUserList();
  }, [
    organizationUser === undefined ? organizationUser : "",
    organizationUserCurrentPage,
  ]);

  const OrganizationUserList = async (userSearchItem) => {
    setOrgLoading(true);
    await GetOrganizationUserListData(
      userSearchItem
        ? {
            id: selectedId,
            currentPage: organizationUserCurrentPage,
            search: userSearchItem,
          }
        : { id: selectedId, currentPage: organizationUserCurrentPage }
    )
      .then((res) => {
        console.log("res", res);
        setOrganizationUser(res?.responseDataArray);
        setUserCount(res?.totalDocuments === 0 ? 1 : res?.totalDocuments);
        setOrgLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setOrgLoading(false);
      });
  };

  // LocationUser Logic
  useEffect(() => {
    LocationUserList();
  }, [locationUser === undefined ? locationUser : "", locationUserCurrentPage]);

  const LocationUserList = async (locationSearchItem) => {
    setLocationLoading(true);
    await GetLocationUserListData(
      locationSearchItem
        ? {
            id: selectedId,
            currentPage: locationUserCurrentPage,
            search: locationSearchItem,
          }
        : {
            id: selectedId,
            currentPage: locationUserCurrentPage,
          }
    )
      .then((res) => {
        console.log("res", res);
        setLocationUser(res?.responseDataArray);
        setLocationUserCount(res?.totaldocument === 0 ? 1 : res?.totaldocument);
        setLocationLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLocationLoading(false);
      });
  };

  return (
    <div>
      {!modal && !locationmodal && (
        <div>
          <div>
            <button
              className="mt-5 dark:text-white"
              onClick={() => setOpenUserData(false)}
            >
              <IoIosArrowBack
                strokeWidth={2}
                className="h-10 w-10 cursor-pointer"
              />
            </button>
          </div>
          <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center mt-8"></Card>

          <LocationCard
            location={location}
            LocationList={LocationList}
            loading={loading}
            locationCurrentPage={locationCurrentPage}
            setLocationCurrentPage={setLocationCurrentPage}
            count={count}
          />

          <OrganizationUserCard
            setModal={setModal}
            UserCount={UserCount}
            organizationUserCurrentPage={organizationUserCurrentPage}
            orgLoading={orgLoading}
            decryptedData={decryptedData}
            organizationUser={organizationUser}
            setOrganizationUserCurrentPage={setOrganizationUserCurrentPage}
            OrganizationUserList={OrganizationUserList}
          />

          <LocationUserCard
            setLocationModal={setLocationModal}
            locationUser={locationUser}
            locationUserCurrentPage={locationUserCurrentPage}
            setLocationUserCurrentPage={setLocationUserCurrentPage}
            locationLoading={locationLoading}
            locationUserCount={locationUserCount}
            decryptedData={decryptedData}
            LocationUserList={LocationUserList}
          />
        </div>
      )}
      {modal && (
        <UserOrganizationForm
          setModal={setModal}
          secretKey={secretKey}
          OrganizationUserList={OrganizationUserList}
          selectedId={selectedId}
        />
      )}
      {locationmodal && (
        <UserLocationForm
          setLocationModal={setLocationModal}
          LocationUserList={LocationUserList}
          secretKey={secretKey}
          selectedId={selectedId}
        />
      )}
    </div>
  );
}

export default IndexOpen;
