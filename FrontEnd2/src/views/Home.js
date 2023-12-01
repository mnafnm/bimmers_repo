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

export default function App() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    eventType: "",
    make: "",
    model: "",
    color: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const openPopup = (arg) => {
    setSelectedDate(arg.dateStr);
    setIsModalOpen(true);
  };

  const closePopup = () => {
    setIsModalOpen(false);
    setSelectedDate("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: `event-${Math.random()}`,
      title: formData.title,
      start: formData.startDate,
      end: formData.endDate,
      make: formData.make,
      model: formData.model,
      color: formData.color
    };

    let color;
    switch (formData.eventType) {
      case 'Service':
        color = 'black';
        break;
      case 'Diagnostic':
        color = 'green';
        break;
      case 'Repair':
        color = 'red';
        break;
      default:
        color = 'blue'; // Default color if none of the options are selected
    }

    const nextEvent = {
      id: `event-${Math.random()}`,
      title: formData.title,
      start: formData.startDate,
      end: formData.endDate,
      make: formData.make,
      model: formData.model,
      color: color // Assign the color based on the selected event type
    };
    setCalendarEvents([...calendarEvents, newEvent,nextEvent]);

    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      make: "",
      model: "",
      color: ""
    });

    closePopup();
  };

  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleEdit = () => {
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
          color: formData.color
        };
      }
      return event;
    });
    setCalendarEvents(editedEvents);

    // Reset form data and close popup
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      make: "",
      model: "",
      color: ""
    });
    setSelectedEventId(null);
    closePopup();
  };

  const handleDelete = () => {
    // Filter out the event with the selectedEventId
    const filteredEvents = calendarEvents.filter(
      (event) => event.id !== selectedEventId
    );
    setCalendarEvents(filteredEvents);
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    // Extract event details and set the form data
    setFormData({
      title: event.title || "",
      startDate: event.start ? event.start.toISOString().split('T')[0] : "",
      endDate: event.end ? event.end.toISOString().split('T')[0] : "",
      make: event.extendedProps.make || "",
      model: event.extendedProps.model || "",
      color: event.extendedProps.color || "",
      eventType: event.extendedProps.eventType || ""
    });
    // Open the popup window
    openPopup({});
  };

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
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleFormChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
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
                <Button variant="contained" color="secondary" onClick={handleDelete}>
                  Delete
                </Button>              
              <Button variant="outlined" onClick={closePopup}>
              Close
            </Button>
          </form>
        </Box>
      </Modal>

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
    </div>
  );
}
