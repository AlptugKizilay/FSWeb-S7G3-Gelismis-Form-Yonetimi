import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import * as Yup from "yup";
import UserList from "./UserList";
import { render } from "react-dom";


const User = () => {
  const [userForms, setUserForms] = useState({
    name: "",
    email: "",
    password: "",
    termsOfService: "",
  });
  const [user, setUser] = useState([]);

  const [userFormErrors, setUserFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    termsOfService: "",
  });
  const [disableButton, setDisableButton] = useState(true);

  const userFormSchema = Yup.object().shape({
    name: Yup.string().required("The name field is required."),
    email: Yup.string()
      .email("Enter valid email.")
      .required("The email field required."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Passwords must be at least 6 characters long."),
   
    termsOfService: Yup.boolean().oneOf([true], "Required"),
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    
    setUserForms({ ...userForms, [e.target.name]: e.target.value });
    Yup.reach(userFormSchema, name)
      .validate(value)
      .then((valid) => {
        setUserFormErrors({ ...userFormErrors, [name]: "" });
      })
      .catch((err) => {
        setUserFormErrors({ ...userFormErrors, [name]: err.errors[0] });
      });
  };
  const checkboxChangeHandler = (e) => {
    setUserForms({ ...userForms, [e.target.name]: e.target.checked });
  };
  useEffect(() => {
    /* console.log(userForms); */
    userFormSchema.isValid(userForms).then((valid) => setDisableButton(!valid));
  }, [userForms]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users" , userForms)
      .then((response) => {
        
        setUser([...user, response.data]);
      })
    ;
  }
  useEffect(()=>{
    console.log("user>>>>>>>>>",user)
  } , [user]);

  return (
    <div>
      <UserList user={user} />
      <br/>

      <Form onSubmit={submitHandler} className="d-flex flex-column bd-highlight mb-3 d-grid gap-3 shadow p-3 mb-5 bg-body rounded">
        <FormGroup className="d-flex flex-column align-items-start ">
          <Label for="name">Name and Surname:</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name and Surname"
            onChange={changeHandler}
            value={userForms.name}
            invalid={userFormErrors.name}
          />
          <FormFeedback>{userFormErrors.name}</FormFeedback>
        </FormGroup>
        <FormGroup className="d-flex flex-column align-items-start ">
          <Label for="user-email">Email:</Label>
          <Input
            type="email"
            name="email"
            id="user-email"
            placeholder="abc@abc.com"
            onChange={changeHandler}
            value={userForms.email}
            invalid={userFormErrors.email}
          />
          <FormFeedback>{userFormErrors.email}</FormFeedback>
        </FormGroup>
        <FormGroup className="d-flex flex-column align-items-start ">
          <Label for="user-pass">Password:</Label>
          <Input
            type="password"
            name="password"
            id="user-pass"
            onChange={changeHandler}
            value={userForms.password}
            invalid={userFormErrors.password}
          />
          <FormFeedback>{userFormErrors.password}</FormFeedback>
        </FormGroup >
        <FormGroup className="d-flex flex-row justify-content-start "> 
          <Label check>Terms of Service:</Label>
          <Input
            type="checkbox"
            name="termsOfService"
            id="termsOfService"
            onChange={checkboxChangeHandler}
            checked={userForms.termsOfService}
            invalid={userFormErrors.termsOfService}
          />
          <FormFeedback>{userFormErrors.termsOfService}</FormFeedback>
        </FormGroup>
        <Button type="submit" color="primary" disabled={disableButton} className="" >
          Save
        </Button>
      </Form>
    </div>
  );
};
export default User;
