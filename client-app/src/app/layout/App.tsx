import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { Route, Switch, useLocation } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import Homepage from "../../features/activities/home/Homepage";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {

  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={Homepage} />
      <Route path="/(.+)" render={() => {
        return (
          <><NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route exact path="/activities/:id" component={ActivityDetails} />
                <Route key={location.key} exact path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              </Switch>
            </Container></>
        );
      }} />

    </>
  );
}

export default observer(App);
