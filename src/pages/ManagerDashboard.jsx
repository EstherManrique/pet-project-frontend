import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
import ManagerReservationsTable from "../components/Manager/ManagerReservationsTable";
import { Container } from "react-bootstrap";

const ManagerDashboard = () => {
  // const { user } = useSelector((state) => state.auth);
  /*
  {
    "_id": "62369f99ce459cad94e651db",
    "name": "Admin",
    "email": "admin@petspa.com.mx",
    "roles": [
        {
            "_id": "6236819646843b765d65e1a6",
            "name": "Administrator"
        }
    ],
    "store": {
        "_id": "6236827c46843b765d65e1ce",
        "name": "PS Narvarte",
        "address": "Uxmal # 240",
        "email": "psnarvarte@petspa.com.mx",
        "phone": 4455668800,
        "location": "19.392829010422073, -99.15453071614867",
        "createdAt": "2022-03-20T01:25:16.905Z",
        "updatedAt": "2022-03-20T01:25:16.905Z"
    },

}
  */

  // console.log(user);
  return (
    <div className="mt-5" style={{
      minHeight: '90vh'
    }}>
      <Container>
        <h2 className="mb-4">Manage Reservations</h2>
        <ManagerReservationsTable />
      </Container>
    </div>
  );
};

export default ManagerDashboard;
