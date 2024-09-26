import { StyledModalWrapper } from "./styles"
import { ModalProps } from "./types"

function Modal({ open, onClose, children }: ModalProps) {
  return (
    <>
      <StyledModalWrapper open={open} onClose={onClose}>
        {children}
      </StyledModalWrapper>
    </>
  )
}

export default Modal
