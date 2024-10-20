import { CardWrapper, AvatarStyles, Name } from "./styles"
import { DeveloperCardProps } from "./types"


const DeveloperCard: React.FC<DeveloperCardProps> = ({ avatar, fullName, description }) => {
  return (
    <CardWrapper>
      <AvatarStyles src={avatar} alt="avatar" />
      <Name>{fullName}</Name>
      <p>{description}</p>
    </CardWrapper>
  )
}
export default DeveloperCard
