import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axios from "axios";

import {
  Autocomplete,
  Box,
  Button,
  TextField,
} from "@mui/material";
import _ from "lodash";
import ParticipantTable from "../../Components/Tables/ParticipantTable";
import DeleteDialog from "../../Components/Dialog/DeleteDialog";
import ConfirmDialog from "../../Components/Dialog/ConfirmDialog";
import UploadParticipantDialog from "../../Components/Dialog/UploadParticipantDialog";

const Participants = () => {
  const {
    setCreateProject,
    createdProjectId,
    getProject,
    getAllProjects,
    projects,
    sendEmail,
    getUsersByProjId,
    users,
    deleteUsers,
    emailList,
  } = useAppContext();

  const options = [];
  _.map(projects, (project) => {
    const { projDetails } = project;
    options.push(`${project._id}: ${projDetails.title}`);
  });

  const [projectId, setProjectId] = useState(options[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [formData, setFormData] = useState(emailList);

  // const [formData, setFormData] = useState({
  //   email: [],
  //   emailLink: [],
  // });

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setCreateProject(projectId?.split(":")[0]);
    await getProject(projectId.split(":")[0]);
    await getUsersByProjId(projectId.split(":")[0]);
    setIsLoading(false);
  };

  const readCSV = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/projects/participants/${id}`);
      return data.results;
    } catch (error) {
      if (error.response.status !== 401) {
        console.log(error.response.data.msg);
      }
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const participants = await readCSV(projectId.split(":")[0]);
    console.log(participants);
    const registerPromises = participants.map((element) => {
      return registerUser({
        email: element.Email,
        password: "123456",
        projId: projectId.split(":")[0],
      });
    });
    try {
      // Wait for all promises to resolve
      const results = await Promise.all(registerPromises);
      await getUsersByProjId(projectId.split(":")[0]);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // get projects name and id
    getAllProjects();
    // must set to the selected project so when admin upload will be to the correct project
    setCreateProject(projectId?.split(":")[0]).then(() => {
      getProject(createdProjectId);
    });
  }, []);

  useEffect(() => {
    setFormData(emailList);
  }, [emailList]);

  const registerUser = async (currentUser) => {
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      console.log(response);
      if (response.status === 201) {
        console.log(`successfully registered.`);
      } else {
        console.log(`Error registering`);
      }
    } catch (error) {
      console.log(error.response); //if got error this is return
      const { data } = error.response;
      return data.msg;
    }
  };

  const handleDelete = async () => {
    rowsSelected.forEach((user) => {
      deleteUsers(user);
    });
    setDeleteOpen(false);
    setIsLoading(true);
    await getUsersByProjId(createdProjectId);
    setIsLoading(false);
  };

  const handleConfirm = async () => {
    const emails = rowsSelected.map(id => {
      const user = users.find(user => user._id === id);
      return user?.email;
    });
    
    emails.forEach((email) => {
      sendEmail(email)
    })
    setSendOpen(false);
  };


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
        data={users}
        setRowsSelected={setRowsSelected}
        projectId={projectId}
        setDeleteOpen={setDeleteOpen}
        setUploadOpen={setUploadOpen}
        setSendOpen={setSendOpen}
        isLoading={isLoading}
      />
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleDelete={handleDelete}
        id={rowsSelected.toString()}
        text={`The participant(s) (${rowsSelected.length} selected) will be permanently deleted from the storage`}
        header="Delete Participant(s)?"
      />
      <ConfirmDialog
        open={sendOpen}
        setOpen={setSendOpen}
        handleConfirm={handleConfirm}
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
