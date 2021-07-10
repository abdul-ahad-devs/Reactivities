import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import Loading from '../../../app/layout/Loading';

const ActivityDashboard = () => {

    const { activityStore } = useStore();

    const { loadActivities, activityRegistry } = activityStore;

    // THIS USEEFFECT IS RESPONSIBLE FOR FETCHING ACTIVITES FROM BACKEND
    useEffect(() => {
        if (activityRegistry.size === 0) {
            loadActivities();
        }
    }, [activityRegistry.size, loadActivities]);

    if (activityStore.loadingInitial) {
        return <Loading inverted={true} content="Loading App" />
    }

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                <h2> Filters go there</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);