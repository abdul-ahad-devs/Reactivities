import React from 'react';
import { Item, Segment, Button, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
}

const ActivityList = ({ activities, selectActivity }: Props) => {

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
                                    <Button floated="right" content="Delete" color="red" />
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