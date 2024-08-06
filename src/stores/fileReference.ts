import ApiService from "@/core/services/ApiService";
import type { IReport } from "@/schema/IReport";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { string } from "yup";

export interface IDownloadRequest {
  FileNumber?: string;
  ModulId?: string;
  ModulName?: string;
  ModulCode?: string;
  FileCategory?: string;
  FileNameExtention?: string;
  Timestamp?: string;
}
export const useFileReferenceStore = defineStore("file-reference", () => {
  const loading = ref<boolean>(false);
  const loadingDownload = ref<boolean>(false);

  const url = import.meta.env.VITE_APP_API_URL + "/FileReference/";
  const urlReport = import.meta.env.VITE_APP_API_URL + "/r3/report/getreport";
  const fileList = ref<any>({});
  const regexPattern = /[/\\?%*:|"<>]/g;

  const getFileList = async (moduleId, moduleName) => {
    loading.value = true;

    return await ApiService.query(url + "FileList", {
      params: {
        ModulId: moduleId,
        ModulName: moduleName,
      },
    })
      .then(({ data }) => {
        return data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const downloadFile = async (params: IDownloadRequest) => {
    loadingDownload.value = true;

    await axios({
      url: url + "DownloadFile",
      // params: params, //deprecated
      method: "POST",
      responseType: "blob",
      data: {
        fileNumber: params.FileNumber,
        modulId: params.ModulId,
        modulName: params.ModulName,
      },
    })
      .then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;

        if (params.FileNameExtention) {
          link.setAttribute(
            "download",
            params.FileNameExtention.replace(regexPattern, "-")
          );
        } else if (params.ModulName) {
          link.setAttribute("download", params.ModulName.toString());
        } else {
          link.setAttribute("download", "document_name");
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        loadingDownload.value = false;

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        loadingDownload.value = false;
      });
  };

  const downloadMultipleFile = async (params: IDownloadRequest) => {
    loadingDownload.value = true;

    await axios({
      url: url + "DownloadMultiFile",
      // params: params, //deprecated
      method: "POST",
      responseType: "blob",
      data: {
        modulId: params.ModulId,
        modulName: params.ModulName,
      },
    })
      .then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");

        link.href = url;

        if (params.FileNameExtention) {
          link.setAttribute(
            "download",
            params.FileNameExtention.replace(regexPattern, "-") + ".zip"
          );
        } else {
          link.setAttribute("download", "document.zip");
        }

        document.body.appendChild(link);
        link.click();

        loadingDownload.value = false;
      })
      .catch(() => {
        loadingDownload.value = false;
      });
  };

  const downloadTemplateRequirement = async (params: IDownloadRequest) => {
    loadingDownload.value = true;

    const formData = new FormData();
    formData.append("modulCode", params.ModulCode?.toString() ?? "");

    await axios({
      url: url + "DownloadTemplate",
      data: formData,
      method: "POST",
      responseType: "blob",
    })
      .then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;

        if (params.FileNameExtention) {
          link.setAttribute(
            "download",
            params.FileNameExtention.replace(regexPattern, "-")
          );
        } else if (params.ModulName) {
          link.setAttribute("download", params.ModulName.toString());
        } else {
          link.setAttribute("download", "document_name");
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        loadingDownload.value = false;

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        loadingDownload.value = false;
      });
  };

  const importDataRequirement = async (
    params: IDownloadRequest,
    files: any
  ) => {
    loading.value = true;
    const formData = new FormData();
    formData.append("modulUid", params.ModulId?.toString() ?? "");
    files.forEach((e) => {
      formData.append("file", e.raw);
    });
    const res = await axios({
      url: url + "ImportData?moduleCode=" + params.ModulCode?.toString() ?? "",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        console.log("Error importDataRequirement", err);
      })
      .finally(() => {
        loading.value = false;
      });

    return res;
  };

  const interfaceToDB = async (params: IDownloadRequest) => {
    loading.value = true;

    const payload = {
      moduleUid: params.ModulId,
      moduleCode: params.ModulCode,
    };
    const res = await axios({
      url: url + "InterfaceToDB",
      method: "POST",
      data: payload,
    })
      .then(({ data }) => {
        return data;
      })
      .finally(() => {
        loading.value = false;
      });
    return res;
  };

  const uploadRegulFiles = async (
    regulUid,
    files: any,
    fileCategory: string
  ): Promise<any[]> => {
    loading.value = true;
    const formData = new FormData();
    formData.append("moduleId", regulUid);
    formData.append("moduleName", "REPO");
    formData.append("fileCategory", fileCategory);
    files.forEach((e) => {
      formData.append("fileUpload", e);
    });
    return await axios({
      url: url + "MultiFileUpload",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => {
        return data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const multiFileUpload = async (
    moduleId: string,
    moduleName: string,
    files: Array<any>,
    fileCategory: string
  ): Promise<any[]> => {
    loading.value = true;
    const formData = new FormData();
    formData.append("moduleId", moduleId);
    formData.append("moduleName", moduleName);
    formData.append("fileCategory", fileCategory);
    files.forEach((e) => {
      formData.append("fileUpload", e);
    });
    return await axios({
      url: url + "MultiFileUpload",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => {
        return data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const removeFiles = async (files: Array<any>): Promise<boolean> => {
    loading.value = true;
    return await ApiService.post(url + "DeleteMultiFile", files)
      .then(({ data }) => {
        return true;
      })
      .finally(() => (loading.value = false));
  };

  const getReport = (report: IReport) => {
    loadingDownload.value = true;
    return axios({
      url:
        urlReport +
        `?reportName=${report.reportName}&reportOutputType=${report.reportOutputType}&reportParam=${report.reportParam}`,
      method: "POST",
      responseType: "blob",
      data: report,
    })
      .then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${report.reportName}.${report.reportOutputType}`
        );

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .finally(() => {
        loadingDownload.value = false;
      });
  };

  const importData = async (
    moduleId: string,
    moduleName: string,
    fileCategory: string,
    files: any
  ) => {
    loading.value = true;
    const formData = new FormData();
    formData.append("moduleId", moduleId);
    formData.append("moduleName", moduleName);
    formData.append("fileCategory", fileCategory);
    files.forEach((e) => {
      formData.append("fileUpload", e);
    });
    return await axios({
      url: url + "MultiFileUpload",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => {
        return data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const downloadTemplate = async (params: IDownloadRequest) => {
    loadingDownload.value = true;
    const formData = new FormData();
    formData.append("modulCode", params.ModulCode?.toString() ?? "");
    await axios({
      url: url + "DownloadTemplate",
      data: formData,
      method: "POST",
      responseType: "blob",
    })
      .then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;

        if (params.FileNameExtention) {
          link.setAttribute(
            "download",
            (params.ModulName ?? "template") +
              "." +
              params.FileNameExtention.replace(regexPattern, "-")
          );
        } else if (params.ModulName) {
          link.setAttribute("download", params.ModulName.toString());
        } else {
          link.setAttribute("download", "document_name");
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        loadingDownload.value = false;

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        loadingDownload.value = false;
      });
  };

  const uploadPermitFiles = async (
    permitRepoUid,
    files: any,
    fileCategory: string
  ): Promise<any[]> => {
    loading.value = true;
    const formData = new FormData();
    formData.append("moduleId", permitRepoUid);
    formData.append("moduleName", "PR");
    formData.append("fileCategory", fileCategory);
    files.forEach((e) => {
      formData.append("fileUpload", e);
    });
    return await axios({
      url: url + "MultiFileUpload",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(({ data }) => {
        return data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
    fileList,
    loading,
    getFileList,
    downloadFile,
    downloadTemplateRequirement,
    downloadMultipleFile,
    importDataRequirement,
    interfaceToDB,
    uploadRegulFiles,
    removeFiles,
    getReport,
    multiFileUpload,
    uploadPermitFiles,
    importData,
    downloadTemplate,
  };
});
