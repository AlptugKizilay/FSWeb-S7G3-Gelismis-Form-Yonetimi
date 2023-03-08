import React, { useEffect, useState } from "react";
import {
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    FormFeedback,
  } from "reactstrap";

  const User = () => {
  const [userForms, setUserForms] = useState({
    name: "",
    email: "",
    password: "",
    termsOfService: "",
  });
  const changeHandler = (e) =>{
    const { name, value } = e.target;
    
    setUserForms({...userForms, [e.target.name]: e.target.value})
    

  }
  const checkboxChangeHandler = (e) => {
    setUserForms({...userForms, [e.target.name]: e.target.checked})
  }
  useEffect(() =>{
    console.log( userForms)
  } ,[userForms]);

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="name">Name and Surname</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name and Surname"
             onChange={changeHandler}
            /*value={userForm.name} */
                       
          />
        </FormGroup>
        <FormGroup>
          <Label for="user-email">email</Label>
          <Input
            type="email"
            name="email"
            id="user-email"
            placeholder="abc@abc.com"
             onChange={changeHandler}
            /*value={userForm.name} */
                       
          />
        </FormGroup>
        <FormGroup>
          <Label for="user-pass">Password</Label>
          <Input
            type="password"
            name="password"
            id="user-pass"
            
            onChange={changeHandler}
           /*  value={userForm.name} */
                       
          />
        </FormGroup>
        <FormGroup check>
          <Label check>Terms of Service</Label>
          <Input
            type="checkbox"
            name="termsOfService"
            id="termsOfService"
             onChange={checkboxChangeHandler}
            /*checked={userForm.above18} */
            
          />
    
        </FormGroup>
        <Button type="submit" color="primary">
                    Save
                </Button>
               
      
        
      </Form>
    </div>
  );
};
export default User;
