import { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useEffect } from "react";

import _ from "lodash";

import OverviewTable from "../../Components/Tables/OverviewTable";
import SearchBar from "../../Components/SearchBar/SearchBar";

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
      sessionStorage.setItem("role", projDetails.roles["0"]?.["role"])
    });
    getUsersByProjId(projectId?.split(":")[0]);
  }, []);

  return (
    <div>
      <script>{(document.title = "Overview")}</script>
      <SearchBar 
        handleSearch={handleOnClick}
        handleSearchChange={(event, value) => {
          if (value) {
            setProjectId(value);
          }
        }}
        projectId={projectId}
        options={options}
      />
      <OverviewTable
        data={displayData}
        projectId={projectId}
        sections={sections}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Overview;

