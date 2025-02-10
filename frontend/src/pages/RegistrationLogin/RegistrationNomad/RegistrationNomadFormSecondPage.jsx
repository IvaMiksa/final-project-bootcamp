import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setNomadForm } from "../../../store/slices/generalSlice.js";
import InputField from "../../../components/Input/Input.jsx";
import Button from "../../../components/Button/Button.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid black;
`;

const ContainerUpload = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonUpload = styled.button`
  border: 1px solid black;
  border-radius: 20px;
  padding: 7px;
  background-color: #333232;
  color: white;
  margin-bottom: 20px;
`;

const FormColumns = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const FormLeft = styled.div`
  flex: 1;
  padding: 10px;
`;

const FormRight = styled.div`
  flex: 1;
  padding: 10px;
`;

const RegistrationNomadFormSecondPage = () => {
  const navigate = useNavigate();
  const jobContractRef = useRef();
  const visaPermitRef = useRef();
  const passportIdRef = useRef();
  const incomeProofRef = useRef();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const dispatch = useDispatch();
  const nomadFormData = useSelector((state) => state.general.nomadFormData);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    dispatch(
      setNomadForm({ field: name, value: type === "file" ? files[0] : value })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const combinedData = { ...nomadFormData };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/backend/api/users/auth/registration/validate/nomad/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedData),
        }
      );

      const data = await response.json();
      console.log("Submission Success:", data);

      // navigate to the next page
      if (response.ok) {
        navigate("/nomad-register-success");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormColumns>
          <FormLeft>
            <InputField
              placeholder="GENDER"
              type="text"
              name="gender"
              value={nomadFormData.gender}
              onChange={handleChange}
            />
            <InputField
              placeholder="NATIONALITY"
              type="text"
              name="nationality"
              value={nomadFormData.nationality}
              onChange={handleChange}
            />
            <InputField
              placeholder="DATE OF BIRTH"
              type="text"
              name="dateOfBirth"
              value={nomadFormData.dateOfBirth}
              onChange={handleChange}
            />
            <InputField
              placeholder="STREET NAME"
              type="text"
              name="streetName"
              value={nomadFormData.streetName}
              onChange={handleChange}
            />
            <InputField
              placeholder="HOUSE NUMBER"
              type="text"
              name="houseNumber"
              value={nomadFormData.houseNumber}
              onChange={handleChange}
            />
            <InputField
              placeholder="PHONE NUMBER"
              type="text"
              name="phone_number"
              value={nomadFormData.phone_number}
              onChange={handleChange}
            />
          </FormLeft>

          <FormRight>
            <InputField
              placeholder="CITY"
              type="text"
              name="city"
              value={nomadFormData.city}
              onChange={handleChange}
            />
            <InputField
              placeholder="POSTCODE / ZIP"
              type="text"
              name="postcode"
              value={nomadFormData.postcode}
              onChange={handleChange}
            />
            <InputField
              placeholder="COUNTRY"
              type="text"
              name="country"
              value={nomadFormData.country}
              onChange={handleChange}
            />

            <InputField
              placeholder="EMPLOYMENT TYPE"
              type="text"
              name="employmentType"
              value={nomadFormData.employmentType}
              onChange={handleChange}
            />

            <InputField
              placeholder="JOB TITLE"
              type="text"
              name="jobTitle"
              value={nomadFormData.jobTitle}
              onChange={handleChange}
            />
            <InputField
              placeholder="LINKEDIN PROFILE"
              type="text"
              name="linkedinProfile"
              value={nomadFormData.linkedinProfile}
              onChange={handleChange}
            />
          </FormRight>
        </FormColumns>

        <ContainerUpload>
          <div>
            <ButtonUpload
              onClick={(e) => {
                e.preventDefault();
                jobContractRef.current.click();
              }}
            >
              Upload job contract
            </ButtonUpload>
            <input
              type="file"
              name="uploadContract"
              ref={jobContractRef}
              hidden
              onChange={handleChange}
            />
          </div>
          <div>
            <ButtonUpload
              onClick={(e) => {
                e.preventDefault();
                visaPermitRef.current.click();
              }}
            >
              Upload visa / permit
            </ButtonUpload>
            <input
              type="file"
              name="uploadVisa"
              ref={visaPermitRef}
              hidden
              onChange={handleChange}
            />
          </div>
          <div>
            <ButtonUpload
              onClick={(e) => {
                e.preventDefault();
                passportIdRef.current.click();
              }}
            >
              Upload passport / id
            </ButtonUpload>
            <input
              type="file"
              name="uploadPassport"
              ref={passportIdRef}
              hidden
              onChange={handleChange}
            />
          </div>
          <div>
            <ButtonUpload
              onClick={(e) => {
                e.preventDefault();
                incomeProofRef.current.click();
              }}
            >
              Upload proof of income
            </ButtonUpload>
            <input
              type="file"
              name="uploadIncome"
              ref={incomeProofRef}
              hidden
              onChange={handleChange}
            />
          </div>
        </ContainerUpload>

        {/*<label>
                    <Input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={() => setTermsAccepted(!termsAccepted)}
                    />
                    I HAVE READ AND ACCEPT THE TERMS AND CONDITIONS
                </label>*/}

        <Button type="submit" label={"Submit"} />
      </Form>

      {/* display selected file name */}
      {/*formData.uploadContract && <p>Uploaded File: {formData.uploadContract.name}</p>*/}
    </Container>
  );
};

export default RegistrationNomadFormSecondPage;
