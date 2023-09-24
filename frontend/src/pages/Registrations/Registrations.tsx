import { ContainerResaleItem } from "components/ResaleItem/ContainerResaleItem";
import { useEffect, useState } from "react";
import RegistrationTable from "components/Registration/RegistrationTable";
import { RegistrationType } from "components/Registration/RegistrationTable";
import { getAllRegistration } from "services/registration.service";
import React from "react";


export const Registration = () => {
  const [registrations, setRegistrations] = useState<RegistrationType[]>([]);

  useEffect(() => {
    const fetchFeedstocks = async () => {
      try {
        const data = await getAllRegistration();
        setRegistrations(data);
      } catch (error: any) {
        console.error("Failed to fetch feedstocks:", error.message);
      }
    };

    fetchFeedstocks();
  }, []);

  return (
    <>
      <ContainerResaleItem sizeForm="800px" heightForm="650px">
        <RegistrationTable registrations={registrations} />
      </ContainerResaleItem>
    </>
  );
};
