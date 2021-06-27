import React, { SyntheticEvent, useState } from 'react';
import { Item, Segment, Button, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
    submitting: boolean;
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

const ActivityList = ({ activities, selectActivity, submitting, deleteActivity }: Props) => {

    const [target, setTarget] = useState('');

    const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    if (activities.length === 0) {
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
                {activities.map(activity => {
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
                                    <Button floated="right" content="view" color="blue" onClick={() => {
                                        selectActivity(activity.id)
                                    }} />
                                    <Button loading={submitting && target === activity.id} name={activity.id} onClick={(event) => handleDeleteActivity(event, activity.id)} floated="right" content="Delete" color="red" />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        </Segment>
    );

}

export default ActivityList;