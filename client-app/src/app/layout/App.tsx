import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import Homepage from "../../features/activities/home/Homepage";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/activities" component={ActivityDashboard} />
          <Route exact path="/activities/:id" component={ActivityDetails} />
          <Route exact path="/createActivity" component={ActivityForm} />
        </Switch>
      </Container>
    </>
  );
}

export default observer(App);
