import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface IProps {
  paramID: string;
  countNumberOfPage: number;
  pages: { param: string; startIndex: number; endIndex: number }[];
  data: any;
  route: string;
  onPageChange: (page: number) => void; // New prop
}

function Pagination({
  paramID,
  route,
  countNumberOfPage,
  onPageChange,
}: IProps) {
  const router = useRouter();

  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= countNumberOfPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)} // Pass the page number to onPageChange
          className={`px-[12px] py-[4px] border-r-[1px] ${
            paramID === i.toString() ? "bg-blue-200 text-blue-600" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
    router.push(`${route}/${page}`);
  };

  useEffect(() => {
    const handleNextPage = () => {
      onPageChange(parseInt(paramID));
    };
    handleNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreviousPage = () => {
    const previousPage = parseInt(paramID) - 1;
    if (previousPage >= 1) {
      handlePageChange(previousPage);
    }
  };

  const handleNextPage = () => {
    const nextPage = parseInt(paramID) + 1;
    if (nextPage <= countNumberOfPage) {
      handlePageChange(nextPage);
    }
  };

  return (
    <div
      className={`w-[100%] flex justify-center items-center pb-[40px]`}
      style={{
        display: countNumberOfPage <= 1 ? "none" : "",
      }}
    >
      <div className="border-[1px] rounded-md font-[14px]">
        <button
          className={`px-[12px] py-[4px] border-r-[1px] ${
            paramID === "1" ? "text-slate-300 pointer-events-none" : ""
          }`}
          onClick={handlePreviousPage} // Call handlePreviousPage function
        >
          Previous
        </button>

        {renderPagination()}

        <button
          className={`px-[12px] py-[4px] ${
            paramID === countNumberOfPage.toString()
              ? "pointer-events-none text-slate-300"
              : ""
          }`}
          onClick={handleNextPage} // Call handleNextPage function
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
