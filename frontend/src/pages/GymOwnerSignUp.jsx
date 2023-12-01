import { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import GymSignUpDetails from "./GymSignUpDetails";
import GymSignUpInfo from "./GymSignUpInfo";
import GymSignUpPermit from "./GymSignUpPermit";
import gym from "../assets/images/background.webp";

const apiUrl =
  import.meta.env.MODE === "production"
    ? "https://gymlocator.co/api"
    : "http://localhost:5000/api";

const GymOwnerSignUp = () => {
  const [state, setState] = useState("details");
  const [signUpForm, setForm] = useState({});

  // const apiUrl =
  // import.meta.env.MODE === "production"
  //   ? "https://gymlocator.co/api"
  //   : "http://localhost:5000/api";

  // const apiUrl = import.meta.env.MODE;
  // const apiUrl = import.meta.env.DEV;
  // const apiUrl = import.meta.env.PROD;
  // const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  // const apiUrl = import.meta.env.VITE_API_DEV_URL;

  // console.log(apiUrl);

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

export default GymOwnerSignUp;
