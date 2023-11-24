import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Icon,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import SideNavButton from "./SideNavButton";
import { HamburgerIcon } from "@chakra-ui/icons";

const SideNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Box padding="0.5rem">
        <Icon
          as={HamburgerIcon}
          w={8}
          h={8}
          color="#fff"
          cursor="pointer"
          ref={btnRef}
          onClick={onOpen}
        />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" />
          <DrawerHeader fontSize="1.5rem">Chess Portal PH</DrawerHeader>
          <DrawerBody>
            <VStack spacing="0rem">
              <SideNavButton
                buttonName="Home"
                route="/"
                closeSideNav={() => {
                  onClose();
                }}
              />
              <SideNavButton
                buttonName="Ratings"
                route="/ratings"
                closeSideNav={() => {
                  onClose();
                }}
              />
              {/* <SideNavButton
                buttonName="Contact us"
                route="/contactus"
                closeSideNav={() => {
                  onClose();
                }}
              /> */}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideNav;
