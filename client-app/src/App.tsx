import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Header } from 'semantic-ui-react'

import './App.css';
function App() {

  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/activities');

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
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {
          activities && activities.map((activity: any) => {
            return (
              <List.Item key={activity.id}>{activity.title}</List.Item>
            )
          })
        }
      </List>
    </div>
  );
}

export default App;
