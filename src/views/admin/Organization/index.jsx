import Card from "components/card";
import React, { useEffect, useState } from "react";
import { MdBarChart } from "react-icons/md";
import OrganizationForm from "./Form/OrganizationForm";
import { GetOrganization } from "Api/OrganizationApi";
import OrganizationTable from "./Table/OrganizationTable";
import SearchIcon from "components/icons/SearchIcon";

function Organization() {
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [organization, setOrganization] = useState();
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [openUserData, setOpenUserData] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    OrganizationList();
  }, [organization === undefined ? organization : "", currentPage]);

  const OrganizationList = async (searchTerm) => {
    setLoading(true);
    await GetOrganization(
      searchTerm
        ? { currentPage: currentPage, search: searchTerm }
        : { currentPage: currentPage }
    )
      .then((res) => {
        console.log("res", res);
        setOrganization(res?.orgData);
        setCount(res?.totalDocument === 0 ? 1 : res?.totalDocument);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    OrganizationList(searchTerm);
  };

  const handleModalOnclick = () => {
    setModal(true);
  };

  return (
    <div>
      {!modal && (
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
                    placeholder="Search Organization..."
                    required
                    value={searchItem}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </h2>
            <button
              className="!linear  bg-indigo-600 text-white z-[1] flex items-center justify-center rounded-lg p-2 font-semibold !transition !duration-200 hover:bg-indigo-500  focus-visible:outline-indigo-600"
              onClick={() => handleModalOnclick()}
            >
              ADD ORGANIZATION
            </button>
          </div>
          <div className="mt-10">
            <OrganizationTable
              organization={organization}
              count={count}
              loading={loading}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setOpenUserData={setOpenUserData}
              setSelectedId={setSelectedId}
              setSelectedData={setSelectedData}
            />
          </div>
        </Card>
      )}
      {modal && (
        <OrganizationForm
          setModal={setModal}
          OrganizationList={OrganizationList}
        />
      )}
    </div>
  );
}

export default Organization;
