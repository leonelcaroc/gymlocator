import {
  Td,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  useMediaQuery,
} from "@chakra-ui/react";
import DataBody from "./DataBody";

const DataTable = ({ isLoading, isFetching, ratingData }) => {
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");
  const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <TableContainer
      border="1px solid #d6d6d6"
      borderRadius="5px"
      whiteSpace="normal"
    >
      <Table variant="simple" colorScheme="teal" width="100%" borderColor="red">
        <Thead>
          <Tr id="data-head">
            {!isLargerThan1300 && <Th />}
            {isLargerThan1200 && <Th>Local ID</Th>}
            {isLargerThan900 && <Th>Title</Th>}
            <Th>Surname</Th>
            <Th>Name</Th>
            {isLargerThan1200 && <Th>Gender</Th>}
            {isLargerThan1300 && (
              <>
                <Th>Fed</Th>
                <Th>Standard</Th>
                <Th>Rapid</Th>
                <Th>Blitz</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {!isLoading &&
            !isFetching &&
            ratingData?.length !== 0 &&
            ratingData?.map((player) => (
              <DataBody
                isFetching={isFetching}
                isLoading={isLoading}
                player={player}
                key={player._id}
              />
            ))}
          {ratingData?.length === 0 && (
            <Tr>
              <Td colSpan="9" textAlign="center">
                No Results Found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
