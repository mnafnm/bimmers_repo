const events = [
    { title: "Bethany", start: getDate("YEAR-MONTH-01") },
    {
      title: "Rahul Jamwal",
      start: getDate("YEAR-MONTH-07"),
    },
    {
      title: "William",
      start: getDate("YEAR-MONTH-17"),
    },
    
  ];
  
  function getDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
  
    if (month.length === 1) {
      month = "0" + month;
    }
  
    return dayString.replace("YEAR", year).replace("MONTH", month);
  }
  
  export default events;
  