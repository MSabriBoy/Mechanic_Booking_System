import ROLES from "./roles";

const INITIAL_USER_FORM = {
  name: "",
  email: "",
  password: "",
  role: ROLES.STAFF,
  isActive: true,
};

export default INITIAL_USER_FORM;