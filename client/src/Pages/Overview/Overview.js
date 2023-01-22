import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useEffect } from "react";

import { Autocomplete, Box, Button, TextField } from "@mui/material";
import _ from "lodash";

import OverviewTable from "../../Components/Tables/OverviewTable";

const Overview = () => {
  const {
    projects,
    getProject,
    getUsersByProjId,
    setCreateProject,
    users,
    getAllProjects,
  } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const currentProjId = sessionStorage.getItem("projId");
  const sections = JSON.parse(sessionStorage.getItem("sections"));

  const options = [];
  _.map(projects, (project) => {
    const { projDetails } = project;
    options.push(`${project._id}: ${projDetails.title}`);
  });
  const [projectId, setProjectId] = useState(currentProjId);

  const displayData = [];
  _.map(users, (user) => {
    const dict = {};
    dict["_id"] = user["_id"];
    _.map(user?.userResponse, (arr) => {
      for (const [key, value] of Object.entries(arr)) {
        dict[key] = value;
      }
    });
    displayData.push(dict);
  });

  const handleOnClick = async () => {
    // filter according to project id
    setIsLoading(true);
    setCreateProject(projectId?.split(":")[0]);
    sessionStorage.setItem("projId", projectId);
    await getProject(projectId.split(":")[0]).then((proj) => {
      const { data, sections, projDetails } = proj;
      sessionStorage.setItem("data", JSON.stringify(data));
      sessionStorage.setItem("sections", JSON.stringify(sections));
      sessionStorage.setItem("role", projDetails.roles["0"]["role"])
    });
    await getUsersByProjId(projectId.split(":")[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllProjects();
    setCreateProject(projectId?.split(":")[0]);
    getProject(projectId?.split(":")[0]).then((proj) => {
      const { data, sections, projDetails } = proj;
      sessionStorage.setItem("data", JSON.stringify(data));
      sessionStorage.setItem("sections", JSON.stringify(sections));
      sessionStorage.setItem("role", projDetails.roles["0"]["role"])
    });
    getUsersByProjId(projectId?.split(":")[0]);
  }, []);

  return (
    <div>
      <script>{(document.title = "Overview")}</script>
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
          onClick={handleOnClick}
        >
          Search
        </Button>
      </Box>
      <OverviewTable
        data={displayData}
        projectId={projectId}
        sections={sections}
      />
    </div>
  );
};

export default Overview;

const data = [
  {
    _id: 1,
    option1_rank: 7,
    option2_rank: 8,
    option3_rank: 5,
    option4_rank: 8,
    best_q1: 8,
    best_q2: 2,
    best_q3: 5,
    best_q4: 3,
    best_q5: 2,
  },
  {
    _id: 2,
    option1_rank: 4,
    option2_rank: 2,
    option3_rank: 1,
    option4_rank: 7,
    best_q1: 5,
    best_q2: 3,
    best_q3: 2,
    best_q4: 7,
    best_q5: 8,
  },
  {
    _id: 3,
    option1_rank: 4,
    option2_rank: 2,
    option3_rank: 1,
    option4_rank: 7,
    best_q1: 5,
    best_q2: 3,
    best_q3: 2,
    best_q4: 7,
    best_q5: 8,
  },
  {
    _id: 4,
    option1_rank: 7,
    option2_rank: 8,
    option3_rank: 5,
    option4_rank: 8,
    best_q1: 8,
    best_q2: 2,
    best_q3: 5,
    best_q4: 3,
    best_q5: 2,
  },
  {
    _id: 5,
    option1_rank: 4,
    option2_rank: 2,
    option3_rank: 1,
    option4_rank: 7,
    best_q1: 5,
    best_q2: 3,
    best_q3: 2,
    best_q4: 7,
    best_q5: 8,
  },
];
