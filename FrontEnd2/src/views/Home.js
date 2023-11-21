import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";

import events  from "./events";
export default function App() {
  let firstDaty = 1;

  return (
    <div className="App">
      <FullCalendar
        defaultView="dayGridMonth"
        firstDay={firstDaty}
        locale="en"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        themeSystem="Simplex"
        // events={events}
        plugins={[dayGridPlugin]}
      />
    </div>
  );
}
