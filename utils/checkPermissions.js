import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser) => {
  if (requestUser.role === "admin") return;
  throw new UnAuthenticatedError("Not authorized to enter this route");
};

export default checkPermissions;
