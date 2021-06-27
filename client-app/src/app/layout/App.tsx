import { useEffect } from "react";
import {  Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Loading from "./Loading";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";

function App() {

  const { activityStore } = useStore();

  // THIS USEEFFECT IS RESPONSIBLE FOR FETCHING ACTIVITES FROM BACKEND
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <Loading inverted={true} content="Loading App" />
  }

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
