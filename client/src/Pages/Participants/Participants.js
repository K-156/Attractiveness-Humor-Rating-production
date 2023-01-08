import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

import { Autocomplete, Box, Button, TextField } from "@mui/material";
import _ from "lodash";
import ParticipantTable from "../../Components/Tables/ParticipantTable";
import DeleteDialog from "../../Components/Dialog/DeleteDialog";
import ConfirmDialog from "../../Components/Dialog/ConfirmDialog";
import UploadParticipantDialog from "../../Components/Dialog/UploadParticipantDialog";

const options = [
  "-sk_ggAkhr: Jobify",
  "foQNPuACMl: more than one profile",
  "o-hNaDM7zK: csv",
  "HA4Ys4EpND: Jobify",
];

const Participants = () => {
  const { setCreateProject, createdProjectId, getProject, readCSV, participants } =
    useAppContext();
  const [projectId, setProjectId] = useState(options[0]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [formData, setFormData] = useState({
    email: [],
    emailLink: [],
  });

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);

  const handleSearch = () => {
    // filter according to project id
  };

  const handleUpload = () => {};

  useEffect(() => {
    // must set to the selected project so when admin upload will be to the correct project
    setCreateProject("v1UXczCoJx").then(() => {
      getProject(createdProjectId);
    });
    readCSV("v1UXczCoJx")
  }, []);

  return (
    <div>
      <script>{(document.title = "Participants")}</script>
      <Box sx={{ display: "flex" }}>
        <Autocomplete
          options={options}
          sx={{ width: 250, mr: 3 }}
          value={projectId}
          renderInput={(params) => (
            <TextField {...params} label="Project" size="small" />
          )}
          onChange={(event, value) => {
            if (value) {
              setProjectId(value);
            }
          }}
        />
        <Button
          variant="contained"
          className="customButton-green"
          sx={{ px: 3 }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <ParticipantTable
        data={testing}
        setRowsSelected={setRowsSelected}
        projectId={projectId}
        setDeleteOpen={setDeleteOpen}
        setUploadOpen={setUploadOpen}
        setSendOpen={setSendOpen}
      />
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        // handleDelete={}
        id={rowsSelected.toString()}
        text={`The participant(s) (${rowsSelected.length} selected) will be permanently deleted from the storage`}
        header="Delete Participant(s)?"
      />
      <ConfirmDialog
        open={sendOpen}
        setOpen={setSendOpen}
        // handleConfirm={}
        id={rowsSelected.toString()}
        text={`Are you sure you want to send the email to the selected participants (${rowsSelected.length} selected)?`}
        header="Send Email?"
      />
      <UploadParticipantDialog
        open={uploadOpen}
        setOpen={setUploadOpen}
        formData={formData}
        setFormData={setFormData}
        handleUpload={handleUpload}
      />
    </div>
  );
};

export default Participants;

var today = new Date();
var dd = String(today.getDate());
var mm = String(today.getMonth() + 1);
var yyyy = today.getFullYear();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

today = dd + "/" + mm + "/" + yyyy + " " + time;

const testing = [
  {
    _id: 1,
    name: "Alan",
    email: "alan@gmail.com",
    dateAdded: today,
    IPAddress: "123.34.67",
    start: today,
    end: today,
    role: "employer",
  },
  {
    _id: 2,
    name: "Betty",
    email: "betty@gmail.com",
    dateAdded: today,
    IPAddress: "123.34.67",
    start: today,
    end: today,
    role: "employer",
  },
  {
    _id: 3,
    name: "Charles",
    email: "charles@gmail.com",
    dateAdded: today,
    IPAddress: "123.34.67",
    start: today,
    end: today,
    role: "job seeker",
  },
  {
    _id: 4,
    name: "Daniel",
    email: "daniel@gmail.com",
    dateAdded: today,
    IPAddress: "123.34.67",
    start: today,
    end: today,
    role: "employer",
  },
  {
    _id: 5,
    name: "Emily",
    email: "emily@gmail.com",
    dateAdded: today,
    IPAddress: "123.34.67",
    start: today,
    end: today,
    role: "employer",
  },
  {
    _id: 6,
    name: "Fanny",
    email: "fanny@gmail.com",
    dateAdded: today,
    IPAddress: "123.34.67",
    start: today,
    end: today,
    role: "employer",
  },
  {
    _id: 7,
    name: "Gerald",
    email: "gerald@gmail.com",
    dateAdded: today,
    IPAddress: "123.34.67",
    start: today,
    end: today,
    role: "job seeker",
  },
];