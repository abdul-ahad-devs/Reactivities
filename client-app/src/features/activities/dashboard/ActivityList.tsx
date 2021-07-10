import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Item, Segment, Button, Label } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';

const ActivityList = () => {

    const { activityStore } = useStore();

    const { activitiesByDate, loading, deleteActivity } = activityStore;

    const [target, setTarget] = useState('');

    const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

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
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => {
                    return (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">
                                    {activity.title}
                                </Item.Header>
                                <Item.Meta>
                                    {activity.date}
                                </Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Label basic content={activity.category} />
                                    <Button as={NavLink} to={`activities/${activity.id}`} floated="right" content="view" color="blue" />
                                    <Button loading={loading && target === activity.id} name={activity.id} onClick={(event) => handleDeleteActivity(event, activity.id)} floated="right" content="Delete" color="red" />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        </Segment>
    );

}

export default observer(ActivityList);