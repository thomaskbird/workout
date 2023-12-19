import moment from "moment/moment";
import config from "@app/config/sites";

const formatDate = (dateTimeStamp: Date): string => {
  return moment(dateTimeStamp).format(config.momentFormat);
}

export default formatDate;
