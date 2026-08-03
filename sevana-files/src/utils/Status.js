export const STATUS = {
  reported: {
    label: "Reported",
    color: "primary",
  },

  responders_joining: {
    label: "Responders Joining",
    color: "warning",
  },

  responder_on_site: {
    label: "Responder On Site",
    color: "primary",
  },

  first_aid_given: {
    label: "First Aid Given",
    color: "success",
  },

  transport_in_progress: {
    label: "Transporting",
    color: "warning",
  },

  at_veterinary_clinic: {
    label: "At Veterinary Clinic",
    color: "primary",
  },

  under_treatment: {
    label: "Under Treatment",
    color: "warning",
  },

  recovering: {
    label: "Recovering",
    color: "success",
  },

  rescued: {
    label: "Rescued",
    color: "success",
  },

  closed: {
    label: "Closed",
    color: "secondary",
  },
};

export function getStatus(status) {
  return STATUS[status] || STATUS.reported;
}