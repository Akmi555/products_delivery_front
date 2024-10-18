import ProgrammerCard from "components/ProgrammerCard/ProgrammerCard"
import {
  vladislavMagid,
  doinaSirbu,
  elviraKhismatullina,
  dimitriDiel,
  vladimirGavriliuk,
  maksymBilousenko,
} from "./types"
import { CardContainer } from "./styles"
function AboutUs() {
  return (
    <CardContainer>
      <ProgrammerCard userData={vladislavMagid} />
      <ProgrammerCard userData={doinaSirbu} />
      <ProgrammerCard userData={elviraKhismatullina} />
      <ProgrammerCard userData={dimitriDiel} />
      <ProgrammerCard userData={vladimirGavriliuk} />
      <ProgrammerCard userData={maksymBilousenko} />
    </CardContainer>
  )
}
// test coment
export default AboutUs
