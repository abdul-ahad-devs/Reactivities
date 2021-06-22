import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  // FUNCTION TO GET ALL ACTIVITIES FROM DATABASE
  const fetchActivities = async () => {
    try {
      const response = await axios.get<Activity[]>(
        "http://localhost:5000/api/activities"
      );

      setActivities(response.data);
    } catch (exception) {
      console.warn("Error fetching data", exception);
    }
  };

  // THIS HANDLER CONTAINS THE SELECTED ACTIVITY OR NULL
  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  // THIS HANDLER HIDES THE SELECTED ACTIVITY FROM DOM
  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  };

  // THIS HANDLER IS RESPONSIBLE FOR SHOWING FORM
  const handleFormOpen = (id?: string) => {
    // ?: optional parameter
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  };

  // THIS HANDLER IS RESPONSIBLE FOR HIDING FORM
  const handleFormClose = () => {
    setEditMode(false);
  };

  // THIS USEEFFECT IS RESPONSIBLE FOR FETCHING ACTIVITES FROM BACKEND
  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
        />
      </Container>
    </>
  );
}

export default App;
