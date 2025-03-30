export const formatDate = (isoString) => {
  const date = new Date(isoString);

  const formattedDate = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  return formattedDate.replace(" at ", ", ");
};

export const getCurrentUTCTimestamp = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date - offset).toISOString().slice(0, -1) + "Z";
  return localISOTime;
};
