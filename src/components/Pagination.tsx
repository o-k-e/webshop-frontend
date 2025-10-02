interface Props {
    currentPage: number;
    totalPages: number;
    setPage: (page: number) => void;
  }
  
  const Pagination = ({ currentPage, totalPages, setPage }: Props) => {
    return (
      <div className="flex justify-center items-center gap-4 pt-20">
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 rounded bg-[#f0dadacc] hover:bg-[#953733cc] hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:opacity-80 cursor-pointer"
        >
          « Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 rounded bg-[#f0dadacc] hover:bg-[#953733cc] hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:opacity-80disabled:opacity-80 cursor-pointer"
        >
          Next »
        </button>
      </div>
    );
  };
  
  export default Pagination;