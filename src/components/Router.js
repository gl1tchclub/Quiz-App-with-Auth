import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import components to go in pages here


const Router = () => {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  style={{
                    display: "flex",
                    height: "80vh",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h1 style={{ margin: "100px" }}>
                    Welcome to the ARC Global Championship
                  </h1>
                  <h3>Seed the database to get started</h3>
                </div>
              </>
            }
          ></Route>
          <Route
            path="/colosseums"
            element={
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CreateColosseumForm />
                  <UpdateColosseumForm />
                </div>
                <ColosseumsTable />
              </>
            }
          />
          <Route
            path="/events"
            element={
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CreateEventForm />
                  <UpdateEventForm />
                </div>
                <EventsTable />
              </>
            }
          />
          <Route
            path="/participants"
            element={
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CreateParticipantForm />
                  <UpdateParticipantForm />
                </div>
                <ParticipantsTable />
              </>
            }
          />
          <Route
            path="/animals"
            element={
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CreateAnimalForm />
                  <UpdateAnimalForm />
                </div>
                <AnimalsTable />
              </>
            }
          />
        </Routes>
      </Router>
    );
  };