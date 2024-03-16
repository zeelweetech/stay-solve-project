import Loader from "components/Loader";
import { Pagination } from "components/Pagination";
import React from "react";

function LocationUserCardTable({
  locationLoading,
  locationUserCurrentPage,
  setLocationUserCurrentPage,
  locationUserCount,
  decryptedData,
  locationfilteredUsers,
  locationSearchItem,
}) {
  const locationindexOfLastItem = locationUserCurrentPage * 10;
  const locationindexOfFirstItem = locationindexOfLastItem - 10;
  const locationcurrentItems = locationfilteredUsers?.slice(
    locationindexOfFirstItem,
    locationindexOfLastItem
  );

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
                {locationcurrentItems?.length > 0 ? (
                  locationcurrentItems.map(
                    (
                      {
                        fileurl,
                        firstname,
                        username,
                        lastname,
                        email,
                        mobile_number,
                        parent_location,
                      },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === locationcurrentItems.length - 1
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
              count={
                locationSearchItem
                  ? locationfilteredUsers?.length
                  : locationUserCount
              }
            />
          </div>
        </>
      )}
    </div>
  );
}

export default LocationUserCardTable;
