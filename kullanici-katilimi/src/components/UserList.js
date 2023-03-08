import axios from "axios";
import { useState } from "react";
import { Card, CardBody, CardTitle, CardText, CardSubtitle } from "reactstrap";

const UserList = ({ user }) => {
  console.log("2222222", user);

  /* axios
    .get("https://reqres.in/api/users")
    .then((response) => {
       
    }) */

  return (
    <div class="shadow p-3 mb-5 bg-body rounded" >
        <h2 >USERS</h2>
    <div class="d-flex p-2 bd-highlight flex-wrap d-grid gap-2">
      {user.map((e, index) => {
        return (
          <Card
            body
            color="warning"
            outline
            style={{
              width: "18rem",
            }}
            key={e.id}
            className="shadow-sm p-3 mb-5 bg-body rounded"
            
          >
            <CardBody>
              <CardTitle tag="h5">{e.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {e.email}
              </CardSubtitle>
            </CardBody>
          </Card>
        );
      })}
    </div>
    </div>
  );
};
export default UserList;
