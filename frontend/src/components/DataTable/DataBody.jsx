import { Td, Tr, Text, useMediaQuery } from "@chakra-ui/react";
import ExpandableButton from "../ExpandableButton/ExpandableButton";
import ExpandableSection from "./ExpandableSection";
import useOpenController from "../../hooks/useOpenController";

const DataBody = ({ player, isLoading, isFetching }) => {
  const { isOpen, toggle } = useOpenController(false);
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");
  const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Tr
        id="data-row"
        bgColor="gray.300"
        _hover={{ bgColor: "accent.400", color: "neutral.100" }}
        onClick={toggle}
        cursor={!isLargerThan1300 ? "pointer" : null}
      >
        {!isLargerThan1300 && (
          <Td>
            <ExpandableButton isOpen={isOpen} toggle={toggle} />
          </Td>
        )}

        {isLargerThan1200 && <Td>{player.ID_No}</Td>}
        {isLargerThan900 && (
          <Td>
            <Text
              fontWeight="bold"
              className={
                player.TITLE.toLowerCase() === "gm" ||
                player.TITLE.toLowerCase() === "wgm"
                  ? "gm-title"
                  : player.TITLE.toLowerCase() === "im" ||
                    player.TITLE.toLowerCase() === "wim"
                  ? "im-title"
                  : player.TITLE.toLowerCase() === "fm" ||
                    player.TITLE.toLowerCase() === "wfm"
                  ? "fm-title"
                  : player.TITLE.toLowerCase() === "cm" ||
                    player.TITLE.toLowerCase() === "wcm"
                  ? "cm-title"
                  : player.TITLE.toLowerCase() === "nm" ||
                    player.TITLE.toLowerCase() === "wnm"
                  ? "nm-title"
                  : player.TITLE.toLowerCase() === "agm" ||
                    player.TITLE.toLowerCase() === "wagm"
                  ? "agm-title"
                  : player.TITLE.toLowerCase() === "aim" ||
                    player.TITLE.toLowerCase() === "waim"
                  ? "aim-title"
                  : player.TITLE.toLowerCase() === "afm" ||
                    player.TITLE.toLowerCase() === "wafm"
                  ? "afm-title"
                  : player.TITLE.toLowerCase() === "acm" ||
                    player.TITLE.toLowerCase() === "wacm"
                  ? "acm-title"
                  : null
              }
            >
              {player.TITLE}
            </Text>
          </Td>
        )}
        <Td>{player.SURNAME}</Td>
        <Td>{player.NAME}</Td>
        {isLargerThan1200 && (
          <Td>{player.SEX.toLowerCase() === "f" ? "Female" : "Male"}</Td>
        )}
        {isLargerThan1300 && (
          <>
            <Td>{player.Fed}</Td>
            <Td>{player.STD_}</Td>
            <Td>{player.Rapid}</Td>
            <Td>{player.Blitz}</Td>
          </>
        )}
      </Tr>
      {!isLargerThan1300 && isOpen && (
        <ExpandableSection
          isLargerThan1200={isLargerThan1200}
          isLargerThan900={isLargerThan900}
          player={player}
        />
      )}
    </>
  );
};

export default DataBody;
