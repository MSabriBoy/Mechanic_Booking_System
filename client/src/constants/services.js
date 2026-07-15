const SERVICES = Object.freeze([
  {
    value: "general_service",
    label: "General Service",
  },
  {
    value: "oil_change",
    label: "Oil Change",
  },
  {
    value: "brake_service",
    label: "Brake Service",
  },
  {
    value: "engine_repair",
    label: "Engine Repair",
  },
  {
    value: "tyre_service",
    label: "Tyre Service",
  },
  {
    value: "battery_service",
    label: "Battery Service",
  },
  {
    value: "ac_service",
    label: "AC Service",
  },
  {
    value: "other",
    label: "Other",
  },
]);

export const getServiceLabel = (value) => {
  return (
    SERVICES.find((service) => service.value === value)?.label ??
    value
  );
};

export default SERVICES;