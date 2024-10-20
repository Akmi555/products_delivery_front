import { CardWrapper, AvatarStyles, Name, Description } from "./styles"
import { DeveloperCardProps } from "./types"


const DeveloperCard: React.FC<DeveloperCardProps> = ({ avatar, fullName, description }) => {
  return (
    <CardWrapper>
      <AvatarStyles src={avatar} alt="avatar" />
      <Name>{fullName}</Name>
      <Description>{description}</Description>
    </CardWrapper>
  )
}
export default DeveloperCard
