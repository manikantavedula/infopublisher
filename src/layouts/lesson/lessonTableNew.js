import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box, Button, Typography, Tooltip, IconButton } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { IconEye, IconEditCircle, IconEdit, IconTrash } from "@tabler/icons";

function LessonModule({ name }) {
  return (
    <Typography display="block" variant="h6" fontSize={"16px"} fontWeight={400}>
      {name}
    </Typography>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(17, 25, 54)",
    color: "#fff",
    padding: "16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function LessonTableNew({
  filtereddata,
  onOpenEditModal,
  onOpenDeleteModal,
  onOpenViewModal,
}) {
  const [rows, setRows] = useState([]);

  const [columns] = useState([
    { Header: "s.no", accessor: "sno", align: "left" },
    { Header: "lesson", accessor: "lesson", align: "left" },
    { Header: "action", accessor: "action", align: "center" },
  ]);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  useEffect(() => {
    let row = [];
    console.log(filtereddata);

    if (filtereddata && filtereddata !== null) {
      row = filtereddata.map((v, i) => ({
        sno: (
          <Typography color="text" variant="h6" fontSize={"16px"} fontWeight={400}>
            {i + 1}
          </Typography>
        ),
        lesson: <LessonModule name={`${v.name}`} />,
        action: (
          <>
            <Tooltip title="Edit" placement="top">
              <IconButton color="primary" type="button" onClick={() => onOpenEditModal(v)}>
                <IconEditCircle size="24px" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete" placement="top">
              <IconButton color="primary" type="button" onClick={() => onOpenDeleteModal(v)}>
                <IconTrash size="24px" />
              </IconButton>
            </Tooltip>
          </>
        ),
      }));
    }

    setRows(row);
  }, [filtereddata]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 700, boxShadow: "none" }} size="small" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">S.No</StyledTableCell>
            <StyledTableCell align="left">Lesson</StyledTableCell>
            {/* <StyledTableCell align="left">Series</StyledTableCell> */}
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <StyledTableRow key={row.lesson}>
                <StyledTableCell component="th" scope="row" align={columns[0].align}>
                  {row.sno}
                </StyledTableCell>
                <StyledTableCell align={columns[1].align}>{row.lesson}</StyledTableCell>
                {/* <StyledTableCell align={columns[2].align}>{row.series}</StyledTableCell> */}
                <StyledTableCell align={columns[2].align}>{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
