import React, { useEffect, useState } from "react";
import LocationCard from "./OrgCard/LocationCard";
import OrganizationUserCard from "./OrgCard/OrganizationUserCard";
import LocationUserCard from "./OrgCard/LocationUserCard";
import OrgUserLocationForm from "../Users/Form/OrgUserLocationForm";
import OrgUserOrganizationForm from "../Users/Form/OrgUserOrganizationForm";
import OrgLocationForm from "../Location/Form/OrgLocationForm";
import { GetOrganizationListData } from "Api/OrganizationApi";
import { GetLocationListData } from "Api/LocationApi";
import { GetOrganizationUserListData } from "Api/OrganizationApi";
import { GetLocationUserListData } from "Api/LocationApi";
import CryptoJS from "crypto-js";
import Card from "components/card";

function Index() {
  const [modal, setModal] = useState(false);
  const [organizationmodal, setOrganizationmodal] = useState(false);
  const [locationmodal, setLocationModal] = useState(false);
  const [listData, setListData] = useState();
  const [location, setLocation] = useState([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [locationCurrentPage, setLocationCurrentPage] = useState(1);
  const [organizationUser, setOrganizationUser] = useState([]);
  const [userCount, setUserCount] = useState();
  const [organizationUserCurrentPage, setOrganizationUserCurrentPage] =
    useState(1);
  const [orgLoading, setOrgLoading] = useState(false);
  const [locationUser, setLocationUser] = useState([]);
  const [locationUserCount, setLocationUserCount] = useState();
  const [locationUserCurrentPage, setLocationUserCurrentPage] = useState(1);
  const [locationLoading, setLocationLoading] = useState(false);
  const OrganizationID = localStorage.getItem("organizationid");
  const encryptedData = `${process.env.REACT_APP_LOCAL_FILE_URL}`;
  const secretKey = "alibaba1234@Devops&$%";
  const bytes = CryptoJS?.AES?.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    GetSelectData();
  }, [OrganizationID]);

  const GetSelectData = async () => {
    await GetOrganizationListData(OrganizationID)
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

  //location logic
  useEffect(() => {
    LocationList();
  }, [location === undefined ? location : "", locationCurrentPage]);

  const LocationList = async () => {
    setLoading(true);
    await GetLocationListData({
      id: OrganizationID,
    })
      .then((res) => {
        console.log("res", res);
        setLocation(res?.responseDataArray);
        setCount(res?.totalDocuments);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  //OrganizationUser logic
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
        setUserCount(res?.totalDocuments);
        setOrgLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setOrgLoading(false);
      });
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
        setLocationUserCount(res?.totaldocument);
        setLocationLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLocationLoading(false);
      });
  };

  return (
    <div>
      {!modal && !organizationmodal && !locationmodal && (
        <div>
          <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center mt-8"></Card>
          <LocationCard
            modal={modal}
            setModal={setModal}
            location={location}
            count={count}
            loading={loading}
            locationCurrentPage={locationCurrentPage}
            setLocationCurrentPage={setLocationCurrentPage}
          />
          <OrganizationUserCard
            organizationmodal={organizationmodal}
            setOrganizationmodal={setOrganizationmodal}
            organizationUser={organizationUser}
            userCount={userCount}
            organizationUserCurrentPage={organizationUserCurrentPage}
            setOrganizationUserCurrentPage={setOrganizationUserCurrentPage}
            orgLoading={orgLoading}
            decryptedData={decryptedData}
          />
          <LocationUserCard
            locationmodal={locationmodal}
            setLocationModal={setLocationModal}
            locationUser={locationUser}
            locationUserCount={locationUserCount}
            locationUserCurrentPage={locationUserCurrentPage}
            setLocationUserCurrentPage={setLocationUserCurrentPage}
            locationLoading={locationLoading}
            decryptedData={decryptedData}
          />
        </div>
      )}
      {modal && (
        <OrgLocationForm
          setModal={setModal}
          LocationList={LocationList}
          OrganizationID={OrganizationID}
        />
      )}
      {organizationmodal && (
        <OrgUserOrganizationForm
          setModal={setOrganizationmodal}
          OrganizationUserList={OrganizationUserList}
          OrganizationID={OrganizationID}
          secretKey={secretKey}
        />
      )}
      {locationmodal && (
        <OrgUserLocationForm
          setLocationModal={setLocationModal}
          LocationUserList={LocationUserList}
          OrganizationID={OrganizationID}
          secretKey={secretKey}
        />
      )}
    </div>
  );
}

export default Index;
