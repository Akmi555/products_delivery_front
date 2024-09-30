import { InputProps } from "./types"
import { StyledInput } from "./styles"

function InputHidden({ type, onChange, accept,ref }: InputProps) {
  return <StyledInput type={type} onChange={onChange} accept={accept} ref={ref}/>
}

export default InputHidden
