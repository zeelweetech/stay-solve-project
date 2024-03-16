import React, { useState } from "react";
import LocationCard from "./OrgCard/LocationCard";
import OrganizationUserCard from "./OrgCard/OrganizationUserCard";
import LocationUserCard from "./OrgCard/LocationUserCard";
import OrgUserLocationForm from "../Users/Form/OrgUserLocationForm";
import OrgUserOrganizationForm from "../Users/Form/OrgUserOrganizationForm";
import OrgLocationForm from "../Location/Form/OrgLocationForm";

function Index() {
  const [modal, setModal] = useState(false);
  const [organizationmodal, setOrganizationmodal] = useState(false);
  const [locationmodal, setLocationModal] = useState(false);

  return (
    <div>
      {!modal && !organizationmodal && !locationmodal && (
        <div>
          <LocationCard modal={modal} setModal={setModal} />
          <OrganizationUserCard
            organizationmodal={organizationmodal}
            setOrganizationmodal={setOrganizationmodal}
          />
          <LocationUserCard
            locationmodal={locationmodal}
            setLocationModal={setLocationModal}
          />
        </div>
      )}
      {modal && <OrgLocationForm setModal={setModal} />}
      {organizationmodal && (
        <OrgUserOrganizationForm setModal={setOrganizationmodal} />
      )}
      {locationmodal && (
        <OrgUserLocationForm setLocationModal={setLocationModal} />
      )}
    </div>
  );
}

export default Index;
