import DeveloperCard from "components/DeveloperCard/DeveloperCard"

import vladislavMagidPhoto from "assets/aboutUs/vladislavMagid.png"
import doinaSirbuPhoto from "assets/aboutUs/doinaSirbu.png"
import elviraKhismatullinaPhoto from "assets/aboutUs/elviraKhismatullina.png"
import vladimirGavriliukPhoto from "assets/aboutUs/vladimirGavriliuk.png"
import vladZatoplyaevPhoto from "assets/aboutUs/vladislavZatoplyaev.jpg"
import dimitriDielPhoto from "assets/aboutUs/dimitriDiel.jpg"
import maksymBilousenkoPhoto from "assets/aboutUs/maksymBilousenko.jpg"
import veraArkindPhoto from "assets/aboutUs/veraArkind.jpg"

import { CardContainer } from "./styles"
function AboutUs() {
  return (
    <CardContainer>
      <DeveloperCard
        avatar={dimitriDielPhoto}
        fullName="Dimitri Diel"
        description="fullstack/team leader"
      />
      <DeveloperCard
        avatar={vladislavMagidPhoto}
        fullName="Vladislav Magid"
        description="frontend"
      />
      <DeveloperCard
        avatar={doinaSirbuPhoto}
        fullName="Doina Sirbu"
        description="backend"
      />
      <DeveloperCard
        avatar={elviraKhismatullinaPhoto}
        fullName="Elvira Khismatullina"
        description="frontend"
      />

      <DeveloperCard
        avatar={vladimirGavriliukPhoto}
        fullName="Vladimir Gavriliuk"
        description="backend"
      />
      <DeveloperCard
        avatar={vladZatoplyaevPhoto}
        fullName="Vladislav Zatoplyaev"
        description="frontend"
      />
      <DeveloperCard
        avatar={maksymBilousenkoPhoto}
        fullName="Maksym Bilousenko"
        description="backend"
      />
      <DeveloperCard
        avatar={veraArkindPhoto}
        fullName="Vera Arkind"
        description="backend"
      />
    </CardContainer>
  )
}

export default AboutUs
