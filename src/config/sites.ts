type SiteTypes = {
  dateTimeFormat: string;
  momentFormat: string;
  momentFormatWoTimestamp: string;
  dayFormat: string;
};

const config: SiteTypes = {
  dateTimeFormat: "y-MM-dd HH:mm:ss",
  momentFormat: "YYYY-MM-DD hh:mm:ss",
  momentFormatWoTimestamp: "YYYY-MM-DD",
  dayFormat: "ddd",
};

export default config;
