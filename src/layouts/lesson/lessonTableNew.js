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
import {
  IconEye,
  IconSlideshow,
  IconEditCircle,
  IconEdit,
  IconTrash,
  IconVideo,
} from "@tabler/icons";

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
  onOpenVideoModal,
}) {
  const [rows, setRows] = useState([]);

  const [columns] = useState([
    { Header: "s.no", accessor: "sno", align: "left" },
    { Header: "lesson", accessor: "lesson", align: "left" },
    { Header: "Lesson Name", accessor: "lessonname", align: "left" },
    { Header: "Main/Part", accessor: "mainorpart", align: "left" },
    { Header: "Part No", accessor: "partno", align: "left" },
    { Header: "action", accessor: "action", align: "right" },
  ]);

  useEffect(() => {
    console.log(filtereddata);
  }, [filtereddata]);

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
        mainorpart: <LessonModule name={`${v.type}`} />,
        partno: <LessonModule name={`${v.part_no === null ? "-" : v.part_no}`} />,
        lessonname: (
          <LessonModule
            name={`${
              v.type === "main"
                ? "-"
                : filtereddata.filter(
                    (w) =>
                      w.id == v.lesson_id &&
                      w.series === v.series &&
                      w.standard === v.standard &&
                      w.subject === v.subject
                  )[0].name
            }`}
          />
        ),
        action: (
          <>
            {v.type === "part" && v.live_video_id !== null ? (
              <Tooltip title="Live Video" placement="top">
                <IconButton
                  color="primary"
                  type="button"
                  onClick={() =>
                    onOpenVideoModal({
                      ...v,
                      videoType: "live",
                      lessonIdName: filtereddata.filter(
                        (w) =>
                          w.id == v.lesson_id &&
                          w.series === v.series &&
                          w.standard === v.standard &&
                          w.subject === v.subject
                      )[0].name,
                    })
                  }
                >
                  <IconVideo size="24px" />
                </IconButton>
              </Tooltip>
            ) : null}

            {v.type === "part" && v.animation_video_id !== null ? (
              <Tooltip title="Animation Video" placement="top">
                <IconButton
                  color="primary"
                  type="button"
                  onClick={() =>
                    onOpenVideoModal({
                      ...v,
                      videoType: "animation",
                      lessonIdName: filtereddata.filter(
                        (w) =>
                          w.id == v.lesson_id &&
                          w.series === v.series &&
                          w.standard === v.standard &&
                          w.subject === v.subject
                      )[0].name,
                    })
                  }
                >
                  <IconSlideshow size="24px" />
                </IconButton>
              </Tooltip>
            ) : null}

            <Tooltip title="View" placement="top">
              <IconButton color="primary" type="button" onClick={() => onOpenViewModal(v)}>
                <IconEye size="24px" />
              </IconButton>
            </Tooltip>

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
            <StyledTableCell align="left">Main or Part</StyledTableCell>
            <StyledTableCell align="left">Part No</StyledTableCell>
            <StyledTableCell align="left">Lesson Id</StyledTableCell>
            {/* <StyledTableCell align="left">Series</StyledTableCell> */}
            <StyledTableCell align="right">Action</StyledTableCell>
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
                <StyledTableCell align={columns[2].align}>{row.mainorpart}</StyledTableCell>
                <StyledTableCell align={columns[3].align}>{row.partno}</StyledTableCell>
                <StyledTableCell align={columns[4].align}>{row.lessonname}</StyledTableCell>
                {/* <StyledTableCell align={columns[2].align}>{row.series}</StyledTableCell> */}
                <StyledTableCell align={columns[5].align}>{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
