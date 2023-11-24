import { Flex, useMediaQuery } from "@chakra-ui/react";
import FooterNav from "../../components/FooterNav/FooterNav";
import "./footer.module.css";

const Footer = () => {
  const [isLowerThan55Rem] = useMediaQuery("(max-width: 55rem)");

  return (
    <Flex
      bgColor="neutral.300"
      justifyContent={isLowerThan55Rem ? "center" : "space-between"}
      alignItems="center"
      paddingInline="1rem"
      height="2.6rem"
    >
      <Flex
        alignItems="center"
        fontSize="clamp(0.6rem, -0.0737rem + 3.3684vw, 1rem)"
      >
        Chess Portal PH © Copyright 2023, Inc. All rights reserved.
      </Flex>
      {!isLowerThan55Rem && (
        <Flex height="full">
          <FooterNav buttonName="Home" route="/" />
          <FooterNav buttonName="Ratings" route="/ratings" />
          {/* <FooterNav buttonName="About" />
          <FooterNav buttonName="Contact Us" />
          <FooterNav buttonName="FAQs" /> */}
        </Flex>
      )}
    </Flex>
  );
};

export default Footer;
