import { CardWrapper } from "./styles";
function ProgrammerCard({ userData }) {
    const { fullName, programmerAvatar, description} = userData;
    return (
        <CardWrapper>
            <img className="programmerAvatar" src={programmerAvatar} alt="Avatar" />
            <p className="card-item">{fullName}</p>
            <p className="card-item">{description}</p>
        </CardWrapper>
    )
}
export default ProgrammerCard