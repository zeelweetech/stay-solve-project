import Loader from "components/Loader";
import { Pagination } from "components/Pagination";
import React, { useEffect } from "react";

function UserLocationTable({
  locationLoading,
  locationCount,
  locationfilteredUsers,
  locationUserCurrentPage,
  setLocationUserCurrentPage,
  setLocationSelectedData,
  setLocationFilteredUsers,
  locationUser,
  decryptedData,
}) {
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
      parent_organization: item?.parent_organization,
      _id: item?.data?._id,
      locationuserid: item?.data?.locationuserid,
      locationid: item?.data?.locationid,
    }));
    setLocationSelectedData(data);
    setLocationFilteredUsers(data);
  }, [locationUser]);

  return (
    <div>
      {locationLoading ? (
        <div className="item-center text-black flex w-full justify-center font-bold">
          <Loader height={40} width={40} />
        </div>
      ) : (
        <>
          <div className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Picture",
                    "First Name",
                    "User Name",
                    "Last Name",
                    "Email",
                    "Phone Number",
                    "Location",
                    "Parent Organization",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-blue-gray-50 border-b px-6 py-3 text-left"
                    >
                      <lable
                        variant="small"
                        className="text-blue-gray-400 text-[16px] font-bold uppercase"
                      >
                        {el}
                      </lable>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {locationfilteredUsers?.length > 0 ? (
                  locationfilteredUsers.map(
                    (
                      {
                        fileurl,
                        firstname,
                        username,
                        lastname,
                        email,
                        mobile_number,
                        parent_location,
                        parent_organization,
                      },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === locationfilteredUsers.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={key}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {
                                  <img
                                    src={`${decryptedData}${fileurl}`}
                                    alt="decryptedData"
                                    style={{ width: 100, height: 100 }}
                                  />
                                }
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {firstname}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {username}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {lastname}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {email}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 mb-1 block text-[16px] font-medium"
                              >
                                {mobile_number}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 mb-1 block text-[16px] font-medium"
                              >
                                {parent_location}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 mb-1 block text-[16px] font-medium"
                              >
                                {parent_organization}
                              </lable>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <div className="item-center text-black flex w-full justify-center font-bold">
                    No Data Found!
                  </div>
                )}
              </tbody>
            </table>
          </div>
          <div className="my-5">
            <Pagination
              currentPage={locationUserCurrentPage}
              setCurrentPage={setLocationUserCurrentPage}
              count={locationCount}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default UserLocationTable;
