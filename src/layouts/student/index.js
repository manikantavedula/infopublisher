import React, { useLayoutEffect, useState, useMemo, useCallback } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Footer from "examples/Footer";
import { useMaterialUIController } from "context";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { studentActions } from "slices/student";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import StudentTable from "./studentTable";
import { StudentAddModal } from "./modals/studentAddModal";
import { StudentEditModal } from "./modals/studentEditModal";
import { StudentDeleteModal } from "./modals/studentDeleteModal";
import { StudentViewModal } from "./modals/studentViewModal";

function Student() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whichModal, setWhichModal] = useState("");
  const [editModalData, setEditModalData] = useState({});
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(studentActions.getAll());
  }, []);

  const student = useSelector((state) => state.student.data);

  const filteredData = useMemo(() => {
    console.log(searchQuery);

    if (searchQuery.trim() === "") {
      return student;
    }

    const filteredStudent = student.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        item.student_series.join(" ").toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    return filteredStudent;
  }, [searchQuery, student]);

  const searchInputRef = React.useRef(null);

  const onOpenAddModal = () => {
    setIsOpen(true);
    setWhichModal("add");
  };

  const onOpenEditModal = (val) => {
    setIsOpen(true);
    setWhichModal("edit");
    setEditModalData(val);
  };

  const onOpenViewModal = (val) => {
    setIsOpen(true);
    setWhichModal("view");
    setEditModalData(val);
  };

  const onOpenDeleteModal = (val) => {
    setIsOpen(true);
    setWhichModal("delete");
    setEditModalData(val);
  };

  const onCloseEmptyModal = () => {
    setIsOpen(false);
    setWhichModal("");
    setEditModalData({});
  };

  const onCloseAddModal = async (values) => {
    setIsLoading(true);
    console.log(values);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/student/submit-form`,
        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      console.log(response.data);

      setIsOpen(false);
      setWhichModal("");
      dispatch(studentActions.getAll());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const onCloseEditModal = async (values) => {
    setIsLoading(true);
    console.log(values, editModalData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/student/submit-edit-form`,
        {
          ...editModalData,
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      console.log(response.data);

      setIsOpen(false);
      setWhichModal("");
      setEditModalData({});
      dispatch(studentActions.getAll());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const onCloseDeleteModal = async (values) => {
    setIsLoading(true);
    console.log(values, editModalData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/student/submit-delete-form`,
        {
          ...editModalData,
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":
              "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      console.log(response.data);

      setIsOpen(false);
      setWhichModal("");
      setEditModalData({});
      dispatch(studentActions.getAll());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const searchTable = useCallback((event) => {
    console.log(event.target.value, searchInputRef, searchInputRef.current);

    searchInputRef.current?.focus();

    setSearchQuery(event.target.value);
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {isOpen && whichModal === "add" ? (
        <StudentAddModal
          isOpen={isOpen}
          onClose={onCloseAddModal}
          onCloseEmpty={onCloseEmptyModal}
        />
      ) : null}

      {isOpen && whichModal === "edit" ? (
        <StudentEditModal
          isOpen={isOpen}
          onClose={onCloseEditModal}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      {isOpen && whichModal === "view" ? (
        <StudentViewModal
          isOpen={isOpen}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      {isOpen && whichModal === "delete" ? (
        <StudentDeleteModal
          isOpen={isOpen}
          onClose={onCloseDeleteModal}
          onCloseEmpty={onCloseEmptyModal}
          editModalData={editModalData}
        />
      ) : null}

      <MDBox>
        <Grid spacing={12}>
          <MDBox pt={2} px={2} display="flex" justifyContent="flex-end">
            <MDButton color={!darkMode ? "error" : "warning"} onClick={onOpenAddModal}>
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;add new Student
            </MDButton>
          </MDBox>
        </Grid>
      </MDBox>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Student List
                </MDTypography>

                <TextField
                  label="Search this table..."
                  color="success"
                  value={searchQuery}
                  onChange={searchTable}
                  variant="filled"
                  InputProps={
                    !darkMode
                      ? {
                          style: {
                            backgroundColor: "white",
                          },
                        }
                      : { color: "white" }
                  }
                />
              </MDBox>

              <StudentTable
                filtereddata={filteredData}
                onOpenEditModal={onOpenEditModal}
                onOpenDeleteModal={onOpenDeleteModal}
                onOpenViewModal={onOpenViewModal}
              />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Student;
