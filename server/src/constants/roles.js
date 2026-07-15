const ROLES = Object.freeze({
  ADMIN: "admin",
  MANAGER: "manager",
  STAFF: "staff",
});

const ROLE_VALUES = Object.freeze(Object.values(ROLES));

export { ROLES, ROLE_VALUES };