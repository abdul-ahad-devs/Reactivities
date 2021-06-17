import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="App">
      <h1>Welcome to Reactivities</h1>
      <ul>
        {
          activities && activities.map((activity: any) => {
            return (
              <li key={activity.id}>{activity.title}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
