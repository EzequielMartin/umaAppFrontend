import React from "react";

const SkeletonUmaCard = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-4 pb-5">
      <div className="max-w-sm w-64 h-96 rounded overflow-hidden shadow-lg bg-gray-100 text-gray-900 p-6 dark:bg-gray-900 dark:text-gray-300 animate-pulse">
        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
          <svg
            className="w-12 h-12 text-gray-400 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
            />
          </svg>
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-xl mb-2"></h2>
          <div className=" text-base text-gray-700 dark:text-gray-200">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"
          ></button>
          <button
            type="button"
            className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default SkeletonUmaCard;
