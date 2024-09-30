import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import React, { useState, useRef, ChangeEvent } from "react"
import { Alert } from "@mui/material"
import { AppDispatch } from "store/store"

import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import InputHidden from "components/InputHidden/InputHidden"

import {
  InputContainer,
  ButtonContainer,
  PageWrapper,
  AddProductContainer,
  PageName,
} from "./styles"
import axios from "axios"

function AddProductAdmin() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(2, "Title should contain minimum 2 symbols")
      .max(20, "Title should contain maximum 20 symbols"),
    price: Yup.number()
      .required("Last name field is required")
      .min(0.1, "Price cant be less then 0,1 eur"),
    productCode: Yup.string().required("Product code is required"),
    minQuantity: Yup.string().required("Min quantity is required"),
    description: Yup.string()
      .required("Description is required")
      .max(1000, "Max 1000 symbols"),
    photoLink: Yup.string().required("Phone number is required"),
  })

  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      productCode: "",
      minQuantity: "",
      description: "",
      photoLink: "",
    },
    validationSchema,
    validateOnChange: false,

    onSubmit: (values, helpers) => {
      // тут логина при нажатии кнопки "Создать товар"
      helpers.resetForm()
      setModalOpen(true)
    },
  })

  //! ЗАГРУЗКА ФОТО НА СЕРВЕР
  const hostUrl = "/api/files/upload "
  const [selectedImg, setSelectedImg] = useState()
  const [uploadedImg, setUploadedImg] = useState()

  // вместо any было ChangeEvent<HTMLInputElement>
  const handleChange = (event: any) => {
    console.log(event.target.files)
    setSelectedImg(event.target.files[0])
  }
  const filePicker = useRef<HTMLInputElement>(null)
  // const filePicker = React.RefObject<HTMLInputElement>
  const handlePick = () => {
    {
      filePicker.current && filePicker.current.click()
    }
    // filePicker.current.click()
  }
  const handleUpload = async () => {
    if (!selectedImg) {
      alert("Please select img")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedImg)

    const response = await axios.post(
      hostUrl,
      {
        body: formData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    const data = response.data
    setUploadedImg(data)
  }

  return (
    <PageWrapper>
      <PageName>Add NEW product</PageName>
      <AddProductContainer onSubmit={formik.handleSubmit}>
        <InputContainer>
          <Input
            id="title-id"
            name="title"
            type="text"
            label="Title*"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors.title}
          />
          <Input
            id="price-id"
            name="price"
            type="number"
            label="Price*"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.errors.price}
          />
          <Input
            id="product-code-id"
            name="productCode"
            type="text"
            label="Product code*"
            value={formik.values.productCode}
            onChange={formik.handleChange}
            error={formik.errors.productCode}
          />
          <Input
            id="min-quantity-id"
            name="minQuantity"
            type="text"
            label="Min quantity*"
            value={formik.values.minQuantity}
            onChange={formik.handleChange}
            error={formik.errors.minQuantity}
          />

          <Input
            id="description-id"
            name="description"
            type="text"
            label="Description*"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.errors.description}
          />




          <Button onClick={handlePick} buttonName="Choose img"></Button>
          <InputHidden
            type="file"
            onChange = {handleChange}
            accept="image/*,.png,.jpg,.bmp,.gif"
            ref={filePicker}
          />
          {/* <input
            type="file"
            onChange={handleChange}
            accept="image/*,.png,.jpg,.bmp,.gif"
            ref={filePicker}
          /> */}




        </InputContainer>
        <ButtonContainer>
          <Button
            disabled={!formik.dirty || formik.isSubmitting}
            buttonName="Add product to DB"
            type="submit"
          />
        </ButtonContainer>

        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <Alert severity="success">Successful</Alert>
        </Modal>
      </AddProductContainer>
    </PageWrapper>
  )
}

export default AddProductAdmin
