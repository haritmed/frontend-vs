import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getEventsByDate, createEvent } from '../../services/EventService'; // Import the EventService
import Sidebar from './Sidebar'
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [date, setDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState('');
    const [comment, setComment] = useState('');
    const [events, setEvents] = useState([]);

    // Fetch events by date
    useEffect(() => {
        fetchEventsByDate(date);
    }, [date]);

    const fetchEventsByDate = (selectedDate) => {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
        getEventsByDate(formattedDate)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    setEvents([]);
                }
            })
            .catch(error => {
                console.error("Error fetching events:", error);
                setEvents([]);
            });
    };

    // Handle form submission to create a new event
    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = {
            title: eventTitle,
            comment: comment,
            eventDate: date.toISOString().split('T')[0], // Send date in 'YYYY-MM-DD' format
        };

        createEvent(newEvent)
            .then(response => {
                setEvents([...events, response.data]); // Add the new event to the list
                setEventTitle('');
                setComment('');
            })
            .catch(error => {
                console.error("Error creating event:", error);
            });
    };

    return (
        <div className="dashboard-container">
            
           <Sidebar/>

            <div className="main-content">
                <div className="calendar-section">
                    <h2>Project Review Calendar</h2>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="calendar"
                    />
                    <p className="selected-date">Selected Date: {date.toDateString()}</p>

                    <div className="event-form">
                        <h3>Add Event</h3>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Event Title" 
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)} 
                                required
                            />
                            <textarea 
                                placeholder="Comment" 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)} 
                                required
                            />
                            <button type="submit">Add Event</button>
                        </form>
                    </div>
                </div>

                <div className="events-container">
                    <h3>Events</h3>
                    {events.length === 0 ? (
                        <p>No events added yet.</p>
                    ) : (
                        events.map((event, index) => (
                            <div key={index} className="event-item">
                                <p><strong>Date:</strong> {event.eventDate}</p>
                                <p><strong>Event:</strong> {event.title}</p>
                                <p><strong>Comment:</strong> {event.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
