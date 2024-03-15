import Card from "components/card";
import React, { useState } from "react";
import { MdBarChart } from "react-icons/md";

import OrgLocationForm from "../Location/Form/OrgLocationForm";
import OrgUserOrganizationForm from "../Users/Form/OrgUserOrganizationForm";
import OrgUserLocationForm from "../Users/Form/OrgUserLocationForm";

function Index() {
  const [modal, setModal] = useState(false);
  const [organizationmodal, setOrganizationmodal] = useState(false);
  const [locationmodal, setLocationModal] = useState(false);

  const handleModalOnclick = () => {
    setModal(true);
  };

  const handleOrgModalOnclick = () => {
    setOrganizationmodal(true);
  };

  const handleModalOnclickLocationUSer = () => {
    setLocationModal(true);
  };

  return (
    <div>
      {!modal && !organizationmodal && !locationmodal && (
        <div>
          <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center mt-8">
            <div className="mb-auto flex items-center justify-between px-6">
              <h2 className="text-lg font-bold text-navy-700 dark:text-white">
                <form className="mx-auto max-w-md">
                  <label
                    for="default-search"
                    className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                      <svg
                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Search Location..."
                      required
                    />
                  </div>
                </form>
              </h2>
              <button
                className="!linear  z-[1] flex items-center justify-center rounded-lg bg-indigo-600 p-2 font-semibold text-white !transition !duration-200 hover:bg-indigo-500  focus-visible:outline-indigo-600"
                onClick={() => handleModalOnclick()}
              >
                ADD LOCATION
              </button>
            </div>
          </Card>
          <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center mt-8">
            <div className="mb-auto flex items-center justify-between px-6">
              <h2 className="text-lg font-bold text-navy-700 dark:text-white">
                <form className="mx-auto max-w-md">
                  <label
                    for="default-search"
                    class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                      <svg
                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Search Organization User..."
                      required
                    />
                  </div>
                </form>
              </h2>
              <button
                className="!linear  z-[1] flex items-center justify-center rounded-lg bg-indigo-600 p-2 font-semibold text-white !transition !duration-200 hover:bg-indigo-500  focus-visible:outline-indigo-600"
                onClick={() => handleOrgModalOnclick()}
              >
                ADD ORGANIZATION USER
              </button>
            </div>
          </Card>
          <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center mt-8">
            <div className="mb-auto flex items-center justify-between px-6">
              <h2 className="text-lg font-bold text-navy-700 dark:text-white">
                <form className="mx-auto max-w-md">
                  <label
                    for="default-search"
                    className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                      <svg
                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Search Organization User..."
                      required
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
          </Card>
        </div>
      )}

      {organizationmodal && (
        <OrgUserOrganizationForm setModal={setOrganizationmodal} />
      )}
      {modal && <OrgLocationForm setModal={setModal} />}
      {locationmodal && (
        <OrgUserLocationForm setLocationModal={setLocationModal} />
      )}
    </div>
  );
}

export default Index;
