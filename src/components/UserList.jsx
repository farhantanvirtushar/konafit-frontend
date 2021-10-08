import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function UserList(props) {
  var users = props.users;
  return (
    <TableContainer component={Paper} sx={{ marginBottom: 5 }}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell aligh="center">Name</TableCell>
            <TableCell align="center">Mobile Number</TableCell>
            <TableCell align="center">Email (Minutes)</TableCell>
            <TableCell align="center">Registration Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.user_id}>
              <TableCell align="center">
                {row.first_name + " " + row.last_name}
              </TableCell>
              <TableCell align="center">{row.mobile_number}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(new Date(row.created_on))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
