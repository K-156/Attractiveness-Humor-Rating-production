import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axios from "axios";

import _ from "lodash";
import ParticipantTable from "../../Components/Tables/ParticipantTable";
import DeleteDialog from "../../Components/Dialog/DeleteDialog";
import ConfirmDialog from "../../Components/Dialog/ConfirmDialog";
import UploadParticipantDialog from "../../Components/Dialog/UploadParticipantDialog";
import SearchBar from "../../Components/SearchBar/SearchBar";

const Participants = () => {
  const {
    setCreateProject,
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

  // persist data in session storage if user hits refresh
  const currentProjId = sessionStorage.getItem("projId");

  const [projectId, setProjectId] = useState(currentProjId);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [formData, setFormData] = useState(emailList);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setCreateProject(projectId?.split(":")[0]);
    sessionStorage.setItem("projId", projectId);
    await getProject(projectId.split(":")[0]);
    await getUsersByProjId(projectId.split(":")[0]);
    setIsLoading(false);
  };

  const readCSV = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/projects/participants/${id}`);
      return data.data;
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
        name: element.Name,
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
    getAllProjects();
    if (currentProjId !== undefined) {
      setCreateProject(currentProjId?.split(":")[0]);
      getProject(currentProjId?.split(":")[0]);
      getUsersByProjId(currentProjId?.split(":")[0]);
    } else {
      setCreateProject(projectId?.split(":")[0]);
      getProject(projectId?.split(":")[0]);
      getUsersByProjId(projectId?.split(":")[0]);
    }
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
    await getProject(projectId.split(":")[0]);
    await getUsersByProjId(projectId.split(":")[0]);
    setIsLoading(false);
  };

  const handleConfirm = async () => {
    const selectedUsers = rowsSelected.map((id) => {
      const user = users.find((user) => user._id === id);
      return user;
    });

    selectedUsers.forEach((user) => {
      sendEmail({
        email: user.email,
        name: user.name,
        otp: user.otp,
        projId: user.projId,
        type: "start",
      });
    });
    setSendOpen(false);
  };

  return (
    <div>
      <script>{(document.title = "Participants")}</script>
      <SearchBar
        handleSearch={handleSearch}
        handleSearchChange={(event, value) => {
          if (value) {
            setProjectId(value);
          }
        }}
        projectId={projectId}
        options={options}
      />
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
