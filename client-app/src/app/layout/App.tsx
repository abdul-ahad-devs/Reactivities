import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Container } from 'semantic-ui-react'
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get<Activity[]>('http://localhost:5000/api/activities');

      setActivities(response.data)
    }
    catch (exception) {
      console.warn('Error fetching data', exception)

    }
  }

  useEffect(() => {
    fetchActivities()

  }, [])

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
}

export default App;
