import Pagination from "react-bootstrap/Pagination";

interface CarbonPaginationProps {
  page: number;
  total: number;
  limit: number;
  setPage: (page: number) => void;
}

const CarbonPagination = ({
  page,
  total,
  limit,
  setPage,
}: CarbonPaginationProps) => {
  const paginationArray = Array.from(
    { length: Math.ceil(total / limit) },
    (_, i) => i + 1
  );

  return (
    <Pagination>
      {paginationArray.map((item) => (
        <Pagination.Item
          key={item}
          active={item === page}
          onClick={() => setPage(item)}
        >
          {item}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default CarbonPagination;
