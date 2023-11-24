import { Tr, Td, Text } from "@chakra-ui/react";

const ExpandableSection = ({ isLargerThan1200, isLargerThan900, player }) => {
  return (
    <>
      <Tr id="data-expandable" whiteSpace="nowrap">
        <Td
          colSpan={isLargerThan1200 ? "3" : "2"}
          style={{ borderRight: "1px solid #CBD5E0" }}
        >
          {!isLargerThan1200 && <Text>Local ID:</Text>}
          {!isLargerThan900 && <Text>Title:</Text>}
          {!isLargerThan1200 && <Text>Gender:</Text>}
          <Text>Fed:</Text>
          <Text>Standard:</Text>
          <Text>Rapid:</Text>
          <Text>Blitz:</Text>
        </Td>
        <Td colSpan={isLargerThan900 ? "3" : "1"} textAlign="center">
          {!isLargerThan1200 && (
            <Text>{player.ID_No ? player.ID_No : "n/a"}</Text>
          )}
          {!isLargerThan900 && (
            <Text
              margin="auto"
              maxWidth="4rem"
              fontWeight={player.TITLE.length !== 0 ? "bold" : "normal"}
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
                  : "n/a"
              }
            >
              {player.TITLE ? player.TITLE : "n/a"}
            </Text>
          )}
          {!isLargerThan1200 && (
            <Text>
              {player.SEX.toLowerCase() === "f"
                ? "Female"
                : player.SEX.toLowerCase() === ""
                ? "Male"
                : "n/a"}
            </Text>
          )}

          <Text>{player.Fed ? player.Fed : "n/a"}</Text>
          <Text>{player.STD_ ? player.STD_ : "n/a"}</Text>
          <Text>{player.Rapid ? player.Rapid : "n/a"}</Text>
          <Text>{player.Blitz ? player.Blitz : "n/a"}</Text>
        </Td>
      </Tr>
    </>
  );
};

export default ExpandableSection;
