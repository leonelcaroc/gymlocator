import mainlogo from "../../assets/images/logo_chess_portal.webp";
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

const Home = () => {
  const [isLowerThan75Rem] = useMediaQuery("(max-width: 75rem)");
  const redirectToWebsite = () => {
    window.location.href = "https://web.facebook.com/groups/2273539726042561/";
  };

  return (
    <Flex
      paddingInline="3rem"
      paddingTop="3rem"
      paddingBottom="2rem"
      flexDirection={isLowerThan75Rem ? "column-reverse" : null}
      maxWidth="100rem"
      alignSelf="center"
    >
      <Flex
        maxWidth="45rem"
        alignSelf={isLowerThan75Rem ? "center" : null}
        flexDirection="column"
        justifyContent="center"
      >
        <Box textAlign={isLowerThan75Rem ? "center" : null}>
          <Heading
            as="h1"
            fontFamily="inter.800"
            marginBottom="2.5rem"
            fontSize="clamp(1.8rem, 0.8rem + 5.3333vw, 3.3rem)"
            display="inline"
          >
            The Official Chess Portal of the Philippines
          </Heading>
        </Box>
        <Text
          as="h3"
          fontSize="clamp(0.68rem, -0.1rem + 4.16vw, 1.2rem)"
          paddingInline="0.5rem"
          marginBlock="2.5rem"
        >
          Welcome to{" "}
          <Text as="span" fontWeight="bold">
            Chess Portal PH
          </Text>
          , your official portal for PH chess ratings and tournaments. We are
          passionate about chess, and we understand that tracking and improving
          your chess performance is essential for every chess enthusiast, from
          beginners to grandmasters. Our website is dedicated to providing you
          with a comprehensive and user-friendly platform to explore, analyze,
          and improve your chess ratings in various formats, including Standard,
          Rapid, Blitz, and Fischer Random 960.
        </Text>
        <Flex>
          <Box>
            <Link as="a" href="mailto:chessportalph@gmail.com" isExternal>
              <Button
                rightIcon={<EmailIcon />}
                bgColor="brand.100"
                color="neutral.100"
                width="8rem"
                marginInline="0.5rem"
                _hover={{
                  bgColor: "neutral.300",
                }}
              >
                Email
              </Button>
            </Link>
          </Box>
          <Button
            rightIcon={<ArrowForwardIcon />}
            color="brand.100"
            borderWidth="1px"
            borderColor="brand.100"
            borderStyle="solid"
            width="8rem"
            marginInline="0.5rem"
            _hover={{ bgColor: "brand.100", color: "neutral.100" }}
            onClick={redirectToWebsite}
          >
            Join Us
          </Button>
        </Flex>
      </Flex>
      <Flex flex="1" justifyContent="center" alignItems="center">
        <Box
          height="auto"
          paddingInline="3rem"
          maxWidth="20.813rem"
          minWidth="14.938rem"
          alignSelf={isLowerThan75Rem ? "center" : null}
          marginBottom="3rem"
        >
          <Image
            src={mainlogo}
            alt="Chess Portal PH Logo"
            width="100%"
            maxWidth="100%"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Home;
