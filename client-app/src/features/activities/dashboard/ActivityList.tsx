import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import ActivityListItem from './ActivityListItem';

const ActivityList = () => {

    const { activityStore } = useStore();

    const { activitiesByDate, groupedActivities } = activityStore;


    if (activitiesByDate.length === 0) {
        return (
            <Segment>
                <Item.Group divided>
                    <Item.Content>
                        <h3 style={{ textAlign: 'center' }}>No Activities to display...</h3>
                    </Item.Content>
                </Item.Group>
            </Segment>
        )
    }

    return (
        <>
            {
                groupedActivities.map(([group, activities]) => (
                    <Fragment key={group}>
                        <Header sub color="teal">
                            {group}
                        </Header>
                        {activities.map(activity => {
                            return (
                                <ActivityListItem key={activity.id} activity={activity} />
                            )
                        })}
                    </Fragment>
                ))}
        </>
    );

}

export default observer(ActivityList);