import React, { useState } from "react";
// import { IconButton, Typography } from "@material-tailwind/react";
// import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
// import { HiArrowSmRight } from "react-icons/hi";

export function Pagination({ currentPage, setCurrentPage, count }) {
  const totalPages = Math.ceil(count / 10);

  const next = () => {
    if (currentPage === totalPages) return;

    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="ml-2 flex items-center gap-8">
      <button
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <HiArrowLeft strokeWidth={2} className="h-5 w-5 cursor-pointer" />
      </button>
      <lable color="gray" className="font-normal">
        Page{" "}
        <strong className="text-gray-900 dark:text-white">{currentPage}</strong>{" "}
        of{" "}
        <strong className="text-gray-900 dark:text-white">{totalPages}</strong>
      </lable>
      <button
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <HiArrowRight strokeWidth={2} className="h-5 w-5 cursor-pointer" />
      </button>
    </div>
  );
}
