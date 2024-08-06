import type { IBadgeColor } from "@/schema/IBadeColor";
import { getValueFromList } from "./common";
import { getMediaPath } from "./assets";
import { getLatestOrganizationFromStringPath } from "@/helpers/common";

interface IBadgeHtml {
  backgroundColor: string;
  textColor: string;
  text: any;
  tooltipText?: string;
}

const badgeHtml = (value: IBadgeHtml) => {
  return `<span class="badge h-100 my-auto p-2" style="background-color: ${value.backgroundColor}; color: ${value.textColor}" >${value.text}</span>`;
};

const badgeHtmlLatestOrganization = (
  value: IBadgeHtml,
  isNoStyle?: boolean
) => {
  if (isNoStyle) {
    return `
    <div
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-custom-class="custom-tooltip"
      title="${value.tooltipText}"
    >
      ${value.text}
    </div>
    `;
  }
  return `
  <div
    class="badge fs-7 lh-sm text-start text-wrap mb-1"
    style="background-color: ${value.backgroundColor}; color: ${value.textColor}"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    data-bs-custom-class="custom-tooltip"
    title="${value.tooltipText}"
  >
    ${value.text}
  </div>
  `;
};

export const getTenantColor = (tenantKey, listOfTenant) => {
  let tenantColor: IBadgeColor = {
    textColor: "#8d51e0",
    backgroundColor: "#f0e5ff",
  };

  if (tenantKey?.includes("T2181")) {
    tenantColor = {
      textColor: "#8d51e0",
      backgroundColor: "#f0e5ff",
    };
  } else if (tenantKey?.includes("T2191")) {
    tenantColor = {
      textColor: "#fb6400",
      backgroundColor: "#ffeee2",
    };
  } else if (tenantKey?.includes("T2197")) {
    tenantColor = {
      textColor: "#216bb3",
      backgroundColor: "#e4ecf9",
    };
  } else if (tenantKey?.includes("T2210")) {
    tenantColor = {
      textColor: "#237b4b",
      backgroundColor: "#e4f7cf",
    };
  } else if (tenantKey?.includes("T2021")) {
    tenantColor = {
      textColor: "#0b81a7",
      backgroundColor: "#acebff",
    };
  } else if (tenantKey == "tooltip") {
    return badgeHtml({
      backgroundColor: "#FFFFFF",
      textColor: "#216bb3",
      text: "More",
    });
  }
  return badgeHtml({
    backgroundColor: tenantColor.backgroundColor,
    textColor: tenantColor.textColor,
    text: getValueFromList(tenantKey, listOfTenant),
  });
};

export const getRepositoryStatusColor = (
  repositoryStatus,
  listOfRepositoryStatus?
) => {
  let tenantColor: IBadgeColor = {
    textColor: "#8D51E0",
    backgroundColor: "#F0E5FF",
  };

  if (repositoryStatus == "NEW") {
    tenantColor = {
      textColor: "#8D51E0",
      backgroundColor: "#F0E5FF",
    };
  } else if (repositoryStatus == "DRAFT") {
    tenantColor = {
      textColor: "#D0A306",
      backgroundColor: "#FFFAE9",
    };
  } else if (repositoryStatus == "REGISTERED") {
    tenantColor = {
      textColor: "#237B4B",
      backgroundColor: "#E4F7CF",
    };
  } else if (repositoryStatus == "OBSOLETE") {
    tenantColor = {
      textColor: "#CB2131",
      backgroundColor: "#FFE9EB",
    };
  }

  return badgeHtml({
    backgroundColor: tenantColor.backgroundColor,
    textColor: tenantColor.textColor,
    text: getValueFromList(repositoryStatus, listOfRepositoryStatus ?? []),
  });
};

export const getAppReviewColor = (activityStatus, listOfActivityStatus?) => {
  let activityStatusColor: IBadgeColor = {
    textColor: "#8D51E0",
    backgroundColor: "#F0E5FF",
  };

  if (activityStatus == "NEW") {
    activityStatusColor = {
      textColor: "#8D51E0",
      backgroundColor: "#F0E5FF",
    };
  } else if (activityStatus == "DRAFT") {
    activityStatusColor = {
      textColor: "#D0A306",
      backgroundColor: "#FFFAE9",
    };
  } else if (activityStatus == "REVIEWED") {
    activityStatusColor = {
      textColor: "#FB6400",
      backgroundColor: "#FFEEE2",
    };
  } else if (activityStatus == "DIRECTLY APPLICABLE") {
    activityStatusColor = {
      textColor: "#237B4B",
      backgroundColor: "#E4F7CF",
    };
  } else if (activityStatus == "DIRECTLY APPLICABLE INFO") {
    activityStatusColor = {
      textColor: "#2A5D5D",
      backgroundColor: "#C1EAEA",
    };
  } else if (activityStatus == "NOT APPLICABLE") {
    activityStatusColor = {
      textColor: "#3F4254",
      backgroundColor: "#D1D5EC",
    };
  } else if (activityStatus == "OBSOLETE") {
    activityStatusColor = {
      textColor: "#CB2131",
      backgroundColor: "#FFE9EB",
    };
  }

  return badgeHtml({
    backgroundColor: activityStatusColor.backgroundColor,
    textColor: activityStatusColor.textColor,
    text: getValueFromList(activityStatus ?? "NEW", listOfActivityStatus ?? []),
  });
};

export const getComplianceAssessmentColor = (
  complianceAssessmentKey,
  listOfComplianceAssessment?
) => {
  let activityStatusColor: IBadgeColor = {
    textColor: "#8D51E0",
    backgroundColor: "#F0E5FF",
  };

  if (complianceAssessmentKey == "NEW") {
    activityStatusColor = {
      textColor: "#8D51E0",
      backgroundColor: "#F0E5FF",
    };
  } else if (complianceAssessmentKey == "DRAFT") {
    activityStatusColor = {
      textColor: "#D0A306",
      backgroundColor: "#FFFAE9",
    };
  } else if (complianceAssessmentKey == "REVIEWED") {
    activityStatusColor = {
      textColor: "#FB6400",
      backgroundColor: "#FFEEE2",
    };
  } else if (complianceAssessmentKey == "SENT FOR VALIDATION") {
    activityStatusColor = {
      textColor: "#216BB3",
      backgroundColor: "#E4ECF9",
    };
  } else if (complianceAssessmentKey == "REASSESSMENT") {
    activityStatusColor = {
      textColor: "#B54800",
      backgroundColor: "#FFDEC8",
    };
  } else if (complianceAssessmentKey == "COMPLY") {
    activityStatusColor = {
      textColor: "#237B4B",
      backgroundColor: "#E4F7CF",
    };
  } else if (complianceAssessmentKey == "NOT COMPLY") {
    activityStatusColor = {
      textColor: "#3F4254",
      backgroundColor: "#D1D5EC",
    };
  } else if (complianceAssessmentKey == "OBSOLETE") {
    activityStatusColor = {
      textColor: "#CB2131",
      backgroundColor: "#FFE9EB",
    };
  } else if (complianceAssessmentKey == "INPROGRESS") {
    activityStatusColor = {
      textColor: "#0B81A7",
      backgroundColor: "#ACEBFF",
    };
  }

  return badgeHtml({
    backgroundColor: activityStatusColor.backgroundColor,
    textColor: activityStatusColor.textColor,
    text: getValueFromList(
      complianceAssessmentKey ?? "NEW",
      listOfComplianceAssessment ?? []
    ),
  });
};

// begin::Corrective action plan
export const getCorrectiveActionPlanColor = (
  correctiveActionPlanKey,
  listOfComplianceAssessment?
) => {
  let activityStatusColor: IBadgeColor = {
    textColor: "#8D51E0",
    backgroundColor: "#F0E5FF",
  };

  if (correctiveActionPlanKey == "NEW") {
    activityStatusColor = {
      textColor: "#8D51E0",
      backgroundColor: "#F0E5FF",
    };
  } else if (correctiveActionPlanKey == "DRAFT") {
    activityStatusColor = {
      textColor: "#D0A306",
      backgroundColor: "#FFFAE9",
    };
  } else if (correctiveActionPlanKey == "REVIEWED") {
    activityStatusColor = {
      textColor: "#FB6400",
      backgroundColor: "#FFEEE2",
    };
  } else if (correctiveActionPlanKey == "SENT FOR VALIDATION") {
    activityStatusColor = {
      textColor: "#216BB3",
      backgroundColor: "#E4ECF9",
    };
  } else if (correctiveActionPlanKey == "COMPLY") {
    activityStatusColor = {
      textColor: "#B54800",
      backgroundColor: "#E4F7CF",
    };
  } else if (correctiveActionPlanKey == "NOT COMPLY") {
    activityStatusColor = {
      textColor: "#3F4254",
      backgroundColor: "#D1D5EC",
    };
  } else if (correctiveActionPlanKey == "OBSOLETE") {
    activityStatusColor = {
      textColor: "#CB2131",
      backgroundColor: "#FFE9EB",
    };
  } else if (correctiveActionPlanKey == "COMPLETED") {
    activityStatusColor = {
      textColor: "#237B4B",
      backgroundColor: "#E4F7CF",
    };
  }

  return badgeHtml({
    backgroundColor: activityStatusColor.backgroundColor,
    textColor: activityStatusColor.textColor,
    text: getValueFromList(
      correctiveActionPlanKey ?? "NEW",
      listOfComplianceAssessment ?? []
    ),
  });
};

export const getEvidenceColor = (compTaskCount, taskCount) => {
  let activityStatusColor: IBadgeColor = {
    textColor: "#237B4B",
    backgroundColor: "#E4F7CF",
  };

  if (compTaskCount != 0 && compTaskCount == taskCount) {
    activityStatusColor = {
      textColor: "#237B4B",
      backgroundColor: "#E4F7CF",
    };
  } else {
    activityStatusColor = {
      textColor: "#CB2131",
      backgroundColor: "#FFE9EB",
    };
  }

  return badgeHtml({
    backgroundColor: activityStatusColor.backgroundColor,
    textColor: activityStatusColor.textColor,
    text: `${compTaskCount}/${taskCount}`,
  });
};
// end::Corrective action plan

export const getRiskAssessmentColor = (
  riskAssessmentStatus,
  listOfRiskAssessment?
) => {
  let activityStatusColor: IBadgeColor = {
    textColor: "#8D51E0",
    backgroundColor: "#F0E5FF",
  };

  if (riskAssessmentStatus == "NEW") {
    activityStatusColor = {
      textColor: "#8D51E0",
      backgroundColor: "#F0E5FF",
    };
  } else if (riskAssessmentStatus == "DRAFT") {
    activityStatusColor = {
      textColor: "#D0A306",
      backgroundColor: "#FFFAE9",
    };
  } else if (riskAssessmentStatus == "COMPLY") {
    activityStatusColor = {
      textColor: "#237B4B",
      backgroundColor: "#E4F7CF",
    };
  } else if (riskAssessmentStatus == "NOT COMPLY") {
    activityStatusColor = {
      textColor: "#3F4254",
      backgroundColor: "#D1D5EC",
    };
  } else if (riskAssessmentStatus == "OBSOLETE") {
    activityStatusColor = {
      textColor: "#CB2131",
      backgroundColor: "#FFE9EB",
    };
  } else if (riskAssessmentStatus == "INPROGRESS") {
    activityStatusColor = {
      textColor: "#0B81A7",
      backgroundColor: "#ACEBFF",
    };
  }

  return badgeHtml({
    backgroundColor: activityStatusColor.backgroundColor,
    textColor: activityStatusColor.textColor,
    text: getValueFromList(
      riskAssessmentStatus ?? "NEW",
      listOfRiskAssessment ?? []
    ),
  });
};

export const getRiskAssessmentLevelColor = (riskAssessmentLevel) => {
  const riskLevelColor = {
    text: "Low",
    textColor: "#064824",
    iconName: "ic-risk-assessment-low.svg",
  };

  if (riskAssessmentLevel >= 15) {
    riskLevelColor.text = "High";
    riskLevelColor.textColor = "#CB2131";
    riskLevelColor.iconName = "ic-risk-assessment-high.svg";
  } else if (riskAssessmentLevel >= 10) {
    riskLevelColor.text = "Moderate to High";
    riskLevelColor.textColor = "#FB6400";
    riskLevelColor.iconName = "ic-risk-assessment-moderate-high.svg";
  } else if (riskAssessmentLevel >= 5) {
    riskLevelColor.text = "Moderate";
    riskLevelColor.textColor = "#D0A306";
    riskLevelColor.iconName = "ic-risk-assessment-moderate.svg";
  } else if (riskAssessmentLevel >= 4) {
    riskLevelColor.text = "Low to Moderate";
    riskLevelColor.textColor = "#237B4B";
    riskLevelColor.iconName = "ic-risk-assessment-low-moderate.svg";
  } else if (riskAssessmentLevel >= 1) {
    riskLevelColor.text = "Low";
    riskLevelColor.textColor = "#064824";
    riskLevelColor.iconName = "ic-risk-assessment-low.svg";
  }

  return `<inline-svg class="me-4" src="${getMediaPath(
    "icons/main/" + riskLevelColor.iconName
  )}"/>  <span class="fw-bold" style="color:${riskLevelColor.textColor}"> ${
    riskLevelColor.text
  }</span>`;
};

export const getPermitRepositoryStatusColor = (status, listOfstatus?) => {
  let tenantColor: IBadgeColor = {
    textColor: "#8D51E0",
    backgroundColor: "#F0E5FF",
  };

  if (status == "NEW") {
    tenantColor = {
      textColor: "#8D51E0",
      backgroundColor: "#F0E5FF",
    };
  } else if (status == "DRAFT") {
    tenantColor = {
      textColor: "#D0A306",
      backgroundColor: "#FFFAE9",
    };
  } else if (status == "ACTIVE") {
    tenantColor = {
      textColor: "#237B4B",
      backgroundColor: "#E4F7CF",
    };
  } else if (status == "NOT OBTAINED") {
    tenantColor = {
      textColor: "#3F4254",
      backgroundColor: "#D1D5EC",
    };
  } else if (status == "EXPIRED") {
    tenantColor = {
      textColor: "#FB6400",
      backgroundColor: "#FFEEE2",
    };
  } else if (status == "OBSOLETE") {
    tenantColor = {
      textColor: "#CB2131",
      backgroundColor: "#FFE9EB",
    };
  }

  return badgeHtml({
    backgroundColor: tenantColor.backgroundColor,
    textColor: tenantColor.textColor,
    text: getValueFromList(status, listOfstatus ?? []),
  });
};

export const getObtainingProcessColor = (
  obtainingProcessStatus,
  listOfObtainingProcessStatus?
) => {
  let obtainingProcessStatusColor: IBadgeColor = {
    textColor: "#8D51E0",
    backgroundColor: "#F0E5FF",
  };
  if (obtainingProcessStatus == "NEW") {
    obtainingProcessStatusColor = {
      textColor: "#8D51E0",
      backgroundColor: "#F0E5FF",
    };
  } else if (obtainingProcessStatus == "DRAFT") {
    obtainingProcessStatusColor = {
      textColor: "#D0A306",
      backgroundColor: "#FFFAE9",
    };
  } else if (obtainingProcessStatus == "REGISTERED") {
    obtainingProcessStatusColor = {
      textColor: "#237B4B",
      backgroundColor: "#E4F7CF",
    };
  } else if (obtainingProcessStatus == "CLOSED") {
    obtainingProcessStatusColor = {
      textColor: "#3F4254",
      backgroundColor: "#D1D5EC",
    };
  }
  return badgeHtml({
    backgroundColor: obtainingProcessStatusColor.backgroundColor,
    textColor: obtainingProcessStatusColor.textColor,
    text: getValueFromList(
      obtainingProcessStatus ?? "NEW",
      listOfObtainingProcessStatus ?? []
    ),
  });
};
export const getObligationPermitColor = (
  obtainingProcessStatus,
  listOfObtainingProcessStatus?
) => {
  let obtainingProcessStatusColor: IBadgeColor = {
    textColor: "#8D51E0",
    backgroundColor: "#F0E5FF",
  };
  if (obtainingProcessStatus == "NEW") {
    obtainingProcessStatusColor = {
      textColor: "#8D51E0",
      backgroundColor: "#F0E5FF",
    };
  } else if (obtainingProcessStatus == "DRAFT") {
    obtainingProcessStatusColor = {
      textColor: "#D0A306",
      backgroundColor: "#FFFAE9",
    };
  } else if (obtainingProcessStatus == "REGISTERED") {
    obtainingProcessStatusColor = {
      textColor: "#237B4B",
      backgroundColor: "#E4F7CF",
    };
  } else if (obtainingProcessStatus == "SENT FOR VALIDATION") {
    obtainingProcessStatusColor = {
      textColor: "#216BB3",
      backgroundColor: "#E4ECF9",
    };
  } else if (obtainingProcessStatus == "COMPLETE") {
    obtainingProcessStatusColor = {
      textColor: "#2A5D5D",
      backgroundColor: "#C1EAEA",
    };
  }
  return badgeHtml({
    backgroundColor: obtainingProcessStatusColor.backgroundColor,
    textColor: obtainingProcessStatusColor.textColor,
    text: getValueFromList(
      obtainingProcessStatus ?? "NEW",
      listOfObtainingProcessStatus ?? []
    ),
  });
};

export const getPermitRiskAssessmentColor = (status, listOfstatus?) => {
  let tenantColor: IBadgeColor = {
    textColor: "#8D51E0",
    backgroundColor: "#F0E5FF",
  };

  if (status == "NEW") {
    tenantColor = {
      textColor: "#8D51E0",
      backgroundColor: "#F0E5FF",
    };
  } else if (status == "DRAFT") {
    tenantColor = {
      textColor: "#D0A306",
      backgroundColor: "#FFFAE9",
    };
  } else if (status == "ACTIVE") {
    tenantColor = {
      textColor: "#237B4B",
      backgroundColor: "#E4F7CF",
    };
  } else if (status == "NOT OBTAINED") {
    tenantColor = {
      textColor: "#3F4254",
      backgroundColor: "#D1D5EC",
    };
  } else if (status == "EXPIRED") {
    tenantColor = {
      textColor: "#FB6400",
      backgroundColor: "#FFEEE2",
    };
  } else if (status == "OBSOLETE") {
    tenantColor = {
      textColor: "#CB2131",
      backgroundColor: "#FFE9EB",
    };
  }

  return badgeHtml({
    backgroundColor: tenantColor.backgroundColor,
    textColor: tenantColor.textColor,
    text: getValueFromList(status, listOfstatus ?? []),
  });
};

export const getLatestOrganizationColor = (
  organizationStringPath: string,
  isNoStyle?: boolean
) => {
  if (organizationStringPath) {
    return badgeHtmlLatestOrganization(
      {
        backgroundColor: "#e4ecf9",
        textColor: "#216bb3",
        text: getLatestOrganizationFromStringPath(organizationStringPath),
        tooltipText: organizationStringPath ?? "",
      },
      isNoStyle
    );
  }
};
