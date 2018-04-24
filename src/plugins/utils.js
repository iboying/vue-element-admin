export default {
  getDateTimeArray(date) {
    if (!date) return date;
    const dateTimeArray = (new Date(date)).toJSON().slice(0, -5).split('T');
    const dateArray = dateTimeArray[0].split('-');
    const timeArray = dateTimeArray[1].split(':');
    return dateArray.concat(timeArray);
  },
  dateString(dateStr) {
    if (!dateStr) return dateStr;
    return this.getDateTimeArray(dateStr).slice(0, 3).join('-');
  },
  timeString(dateStr) {
    if (!dateStr) return dateStr;
    return this.getDateTimeArray(dateStr).slice(3).join(':');
  },
  dateTimeString(dateStr) {
    if (!dateStr) return dateStr;
    return (new Date(dateStr)).toJSON()
      .slice(0, -8)
      .split('T')
      .join(' ');
  },
};
