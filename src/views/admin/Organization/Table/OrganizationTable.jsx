import Loader from "components/Loader";
import { Pagination } from "components/Pagination";
import React, { useEffect, useState } from "react";

function OrganizationTable({
  organization,
  count,
  loading,
  currentPage,
  setCurrentPage,
  setOpenUserData,
  setSelectedId,
  setSelectedData,
}) {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const data = organization?.map((item, index) => ({
      name: item?.name,
      username: item?.username,
      email: item?.email,
      phone_number: item?.phone_number,
      address_line1: item?.address_line1,
      address_line2: item?.address_line2,
      city: item?.city,
      state: item?.state,
      zip_code: item?.zip_code,
      _id: item?._id,
      verify_code: item?.verify_code,
      createdAt: item?.createdAt,
      notes: item?.notes,
      organizationid: item?.organizationid,
    }));
    setSelectedData(data);
    setFilteredUsers(data);
  }, [organization]);

  const handleOnClick = (id) => {
    setSelectedId(id);
    setOpenUserData(true);
  };

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
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-blue-gray-50 border-b px-6 py-3 text-left"
                    >
                      <label
                        // variant="small"
                        className="text-blue-gray-900 text-[16px] font-bold uppercase"
                      >
                        {el}
                      </label>
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
                        organizationid,
                      },
                      key
                    ) => {
                      const className = `py-3 px-6 ${
                        key === filteredUsers.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr
                          key={key}
                          className="cursor-pointer hover:bg-gray-200"
                          onClick={(e) => handleOnClick(organizationid)}
                        >
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {/* <Avatar src={img} alt={name} size="sm" /> */}
                              <label
                                // variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {name}
                              </label>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <label
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {username}
                              </label>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <label
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {email}
                              </label>
                            </div>
                          </td>
                          <td className={className}>
                            {/* <div className="w-10/12"> */}
                            <div className="flex items-center gap-4">
                              <label
                                variant="small"
                                className="text-blue-gray-600 mb-1 block text-[16px] font-medium"
                              >
                                {phone_number}
                              </label>
                            </div>
                            {/* </div> */}
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <label
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {address_line1}
                              </label>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <label
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {address_line2 ? address_line2 : "-"}
                              </label>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <label
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {city}
                              </label>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <label
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {state}
                              </label>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <label
                                variant="small"
                                className="text-blue-gray-600 text-[16px] font-medium"
                              >
                                {zip_code}
                              </label>
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
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              count={count}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default OrganizationTable;
