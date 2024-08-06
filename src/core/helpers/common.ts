import moment from "moment";
export const formatDate = (date, format?): string => {
  if (date) {
    if (format) {
      return moment(date).utc(true).format(format);
    }
    return moment(date).utc(true).format("DD MMM YYYY");
  } else {
    return "-";
  }
};

export const formatDatetime = (date): string => {
  if (date) {
    return moment(date).utc(true).format("DD MMM YYYY h:mm:ss");
  } else {
    return "-";
  }
};

export const formatInputDate = (date) => {
  if (date) {
    return moment(date).utc(true).format();
  } else {
    return;
  }
};

/**
 *
 * @param value
 * @param keyField
 * @param resultField
 * @param list
 * @param defaultValue
 * @returns
 */
export const getValueFromGlobalQuery = (
  value,
  keyField,
  resultField,
  list,
  defaultValue = ""
): string => {
  if (list.length > 0) {
    const result = list.find(
      (item) => item[keyField]?.toUpperCase() == value?.toUpperCase()
    );

    if (result) {
      return result[resultField];
    }
  }
  return defaultValue;
};

export const getValueFromList = (id, list, defaultValue = ""): string => {
  if (list.length > 0) {
    const lov = list.find((item) => item.lovKey == id);
    if (lov) {
      return lov.lovValue;
    }
  }
  if (id) {
    return id;
  }
  return defaultValue;
};
export const getValueFromListById = (id, list): string => {
  if (list) {
    const lov = list.find((item) => item.lovId == id);
    if (lov) {
      return lov.lovValue;
    }
  }
  if (id) {
    return id;
  }
  return "";
};

export const arrayToStringWithComma = (list, delimeter = "| "): string => {
  let result = "";
  if (Array.isArray(list) && list?.length > 0) {
    list.forEach((element, index) => {
      result += `${element}${list.length - 1 != index ? delimeter : ""}`;
    });
  }

  return result;
};

export const arrayToStringWithComma2 = (list, lov): string => {
  let result = "";
  list.forEach((element, index) => {
    const text = getValueFromList(element, lov);
    result += `${text}${list.length - 1 != index ? ", " : ""}`;
  });
  return result;
};

export const limitText = (text, size = 300): string => {
  if (text?.length > 0) {
    return text.substring(0, size);
  }
  return "";
};
