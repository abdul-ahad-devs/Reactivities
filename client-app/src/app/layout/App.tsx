import React, { useEffect, useState } from "react";
import { List, Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agents from "../api/agent";
import { v4 as uuid } from 'uuid';
import Loading from "./Loading";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  // FUNCTION TO GET ALL ACTIVITIES FROM DATABASE
  const fetchActivities = async () => {
    setLoading(true)
    try {
      const response = await agents.Activities.list();
      const activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity)
      })
      setActivities(activities);
    } catch (exception) {
      console.warn("Error fetching data", exception);
    }
    finally {
      setLoading(false)
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

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agents.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
      }).finally(() => {
        setSubmitting(false)
      })
    } else {
      activity.id = uuid();
      agents.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false)
      }).finally(() => {
        setSubmitting(false)
      })
    }
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true)
    agents.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false)
    })
  }

  // THIS USEEFFECT IS RESPONSIBLE FOR FETCHING ACTIVITES FROM BACKEND
  useEffect(() => {
    fetchActivities();
  }, []);

  if (isLoading) {
    return <Loading inverted={true} content="Loading App" />
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelActivity={handleCancelSelectedActivity}
          editMode={editMode}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={isSubmitting}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
        />
      </Container>
    </>
  );
}

export default App;
