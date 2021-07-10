import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Image, Button, Grid } from 'semantic-ui-react';
import Loading from '../../../app/layout/Loading';
import { useStore } from '../../../app/store/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

const ActivityDetails = () => {

    const { activityStore } = useStore();

    const { selectedActivity, loadActivity, loadingInitial } = activityStore;

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
    }, [id, loadActivity])

    if (loadingInitial || !selectedActivity) {
        return <Loading />
    }
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={selectedActivity} />
                <ActivityDetailedInfo activity={selectedActivity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    )

}

export default observer(ActivityDetails);