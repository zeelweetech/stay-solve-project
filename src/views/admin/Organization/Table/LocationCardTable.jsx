import Loader from "components/Loader";
import { Pagination } from "components/Pagination";
import React from "react";

function LocationCardTable({
  loading,
  filteredUsers,
  locationCurrentPage,
  setLocationCurrentPage,
  count,
}) {
  return (
    <div>
      {loading ? (
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
                    "Name",
                    "UserName",
                    "Email",
                    "Phone Number",
                    "Address1",
                    "Address2",
                    "City",
                    "State",
                    "Zip Code",
                    "Organization",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-blue-gray-50 border-b px-6 py-3 text-left"
                    >
                      <lable
                        variant="small"
                        className="text-blue-gray-900 text-[16px] font-bold uppercase"
                      >
                        {el}
                      </lable>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.length > 0 ? (
                  filteredUsers?.map(
                    (
                      {
                        name,
                        username,
                        email,
                        phone_number,
                        address_line1,
                        address_line2,
                        city,
                        state,
                        zip_code,
                        parent_organization,
                      },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === filteredUsers.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr
                          key={key}
                          // className="cursor-pointer hover:bg-gray-200"
                        >
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {/* <Avatar src={img} alt={name} size="sm" /> */}
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {name}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {/* <Avatar src={img} alt={name} size="sm" /> */}
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
                                {phone_number}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {address_line1}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {address_line2 ? address_line2 : "-"}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <lable
                              variant="small"
                              className="text-blue-gray-600 text-[16px] font-medium"
                            >
                              {city}
                            </lable>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {state}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {zip_code}
                              </lable>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <lable
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {parent_organization}
                              </lable>
                            </div>
                          </td>
                          {/* <td className={`relative ${className} hover-cell`}>
                            <div
                              className="hover:text-edit h-10 w-10 p-2  "
                              onClick={() => {
                                setLocationModel(true);
                                setEditData(
                                  selectedData?.filter((item) => {
                                    return item?.locationid === locationid;
                                  })?.[0]
                                );
                              }}
                            >
                              <PencilSquareIcon />
                            </div>
                          </td> */}
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
              currentPage={locationCurrentPage}
              setCurrentPage={setLocationCurrentPage}
              count={count}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default LocationCardTable;
