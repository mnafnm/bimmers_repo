import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  clearEventsFromDB,
  fetchSavedEvents,
  saveEventsToDB,
} from "../utils/internalDB";
import Help from "../components/Help";

const getCalendarEventColor = (event) => {
  let color;
  switch (event.eventType) {
    case "Service":
      color = "black";
      break;
    case "Diagnostic":
      color = "green";
      break;
    case "Repair":
      color = "red";
      break;
    default:
      color = "blue"; // Default color if none of the options are selected
  }
  return color;
};

export default function App() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    eventType: "",
    make: "",
    model: "",
    color: "",
    vehicleColor: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      const savedEvents = await fetchSavedEvents();

      setCalendarEvents(savedEvents);
    };

    fetchCalendarEvents();
  }, []);

  useEffect(() => {
    const storeUpdatedEvents = async () => {
      await saveEventsToDB(calendarEvents);
    };
    storeUpdatedEvents();
  }, [calendarEvents]);

  const openPopup = (arg) => {
    setSelectedDate(arg.dateStr);
    setIsModalOpen(true);
  };

  const closePopup = () => {
    setIsModalOpen(false);
    setSelectedDate("");
    // Reset form data and close popup
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      make: "",
      model: "",
      color: "",
      eventType: "",
      vehicleColor: "",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const color = getCalendarEventColor(formData);

    const newEvent = {
      id: `event-${Math.random()}`,
      title: formData.title,
      start: formData.startDate ? formData.startDate : selectedDate,
      end: formData.endDate,
      make: formData.make,
      model: formData.model,
      eventType: formData.eventType,
      color: color, // Assign the color based on the selected event type
      vehicleColor: formData.vehicleColor,
    };

    setCalendarEvents([...calendarEvents, newEvent]);

    closePopup();
  };

  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleEdit = () => {
    const color = getCalendarEventColor(formData);
    // Find the event by ID in calendarEvents array
    const editedEvents = calendarEvents.map((event) => {
      if (event.id === selectedEventId) {
        return {
          ...event,
          title: formData.title,
          start: formData.startDate,
          end: formData.endDate,
          make: formData.make,
          model: formData.model,
          color,
          eventType: formData.eventType,
          vehicleColor: formData.vehicleColor,
        };
      }
      return event;
    });
    setCalendarEvents(editedEvents);

    setSelectedEventId(null);
    closePopup();
  };

  const handleDelete = () => {
    // Filter out the event with the selectedEventId
    const filteredEvents = calendarEvents.filter(
      (event) => event.id !== selectedEventId
    );
    setCalendarEvents(filteredEvents);
    closePopup();
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo?.event || {};
    setSelectedEventId(event.id);

    const color = getCalendarEventColor(event.extendedProps);

    // Extract event details and set the form data
    setFormData({
      title: event.title || "",
      startDate: event.start ? event.start.toISOString().split("T")[0] : "",
      endDate: event.end ? event.end.toISOString().split("T")[0] : "",
      make: event.extendedProps?.make || "",
      model: event.extendedProps?.model || "",
      color,
      eventType: event.extendedProps?.eventType || "",
      vehicleColor: event.extendedProps.vehicleColor,
    });
    // Open the popup window
    openPopup({});
  };
  const colors = [
    { name: 'Repair', value: '#FF0000' },
    { name: 'Diagnostic', value: '#00FF00' },
    { name: 'Service', value: '#000000' }
   ];
  return (
    <div className="App">
      <Modal
        open={isModalOpen}
        onClose={closePopup}
        aria-labelledby="event-form-title"
        aria-describedby="event-form"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 300,
            maxWidth: 400,
          }}
        >
          <h2 id="event-form-title">Add Event</h2>
          <form onSubmit={handleFormSubmit} id="event-form">
            <TextField
              label="Customer Name"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            {/* Vehicle information fields */}
            <TextField
              label="Make"
              name="make"
              value={formData.make}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Vehicle Color"
              name="vehicleColor"
              value={formData.vehicleColor}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate || selectedDate}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Select
              label="Event Type"
              name="eventType" 
              value={formData.eventType}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value={"Service"}>Service</MenuItem>
              <MenuItem value={"Diagnostic"}>Diagnostic</MenuItem>
              <MenuItem value={"Repair"}>Repair</MenuItem>
            </Select>

            {/* Form submission and close buttons */}
            <Button variant="contained" color="primary" type="submit">
              Add Event
            </Button>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="contained"
            color="primary" onClick={closePopup}>
              Close
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              Delete
            </Button>
                      </form>
        </Box>
      </Modal>

      {/* color instructions */}
      <div className="color-box absolute left-5 top-1/3 ">
        <h2 className="text-left font-medium underline mb-2">Colors</h2>
      <ul className="">
      {colors.map((color, index) => (
        <li className="text-left font-bold" key={index}>
          <span style={{ color: color.value }}>{color.name}</span>
        </li>
      ))}
    </ul>
      </div>
      {/* FullCalendar component */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dateClick={openPopup}
        events={calendarEvents}
        eventClick={handleEventClick}
      />
      <div
        style={{
          margin: 20,
          flex: 1,
          textAlign: "right",
        }}
      >
        <button
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: "grey",
            color: "white",
          }}
          onClick={() => {
            window.location.reload();
            clearEventsFromDB();
          }}
        >
          Clear All Calendar Data
        </button>
      </div>

      <Help link="https://drive.google.com/file/d/1M2L-TiC87MWXwcCgK8VnVQ8NMVQ6p_sO/view?usp=drive_link" />
    </div>
  );
}
