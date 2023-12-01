import { useState } from "react";
import { Center } from "@chakra-ui/react";
import GymSignUpDetails from "./GymSignUpDetails";
import GymSignUpInfo from "./GymSignUpInfo";
import GymSignUpPermit from "./GymSignUpPermit";
import gym from "../assets/images/background.webp";

const GymOwnerSignup = () => {
  const [state, setState] = useState("details");
  const [signUpForm, setForm] = useState({});

  return (
    <Center
      minHeight="100vh"
      width="100%"
      backgroundImage={`url(${gym})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      {state === "details" && (
        <GymSignUpDetails
          setState={setState}
          setForm={setForm}
          signUpForm={signUpForm}
        />
      )}
      {state === "info" && (
        <GymSignUpInfo
          setState={setState}
          setForm={setForm}
          signUpForm={signUpForm}
        />
      )}
      {state === "permit" && (
        <GymSignUpPermit
          setState={setState}
          setForm={setForm}
          signUpForm={signUpForm}
        />
      )}
    </Center>
  );
};

export default GymOwnerSignup;
