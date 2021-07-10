import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item, Button, Icon, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/store/store';

interface Props {
    activity: Activity
}

const ActivityListItem = ({ activity }: Props) => {

    const { activityStore } = useStore();

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src="/assets/user.png" />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" /> {activity.date}
                </span>
                <span>
                    <Icon name="marker" /> {activity.venue}
                </span>
            </Segment>
            <Segment>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} color="teal" content="View" floated="right"/>
            </Segment>
        </Segment.Group>
    )

}

export default ActivityListItem;