import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../forms/ActivityForm'
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import Loading from '../../../app/layout/Loading';

const ActivityDashboard = () => {

    const { activityStore } = useStore();

    const { selectedActivity, editMode } = activityStore;

    // THIS USEEFFECT IS RESPONSIBLE FOR FETCHING ACTIVITES FROM BACKEND
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) {
        return <Loading inverted={true} content="Loading App" />
    }


    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                {selectedActivity && !editMode && <ActivityDetails />}
                {editMode && <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);