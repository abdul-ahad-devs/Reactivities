import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Segment, Form, Button } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import Loading from '../../../app/layout/Loading';
import { v4 as uuid } from "uuid";

const ActivityForm = () => {

    const history = useHistory();

    const { activityStore } = useStore();

    const { loading, createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;

    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => {
                // In typescript, ! means that Han maloom hai chal apne baap ko mat sikha
                setActivity(activity!)
            })
        }
    }, [id, loadActivity])

    // THIS HANDLER IS SUBMITTING THE FORM
    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity, id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if (loadingInitial) {
        return <Loading content="Loading activity..." />
    }

    // THIS HANDLER IS CHANGING THE VALUE OF INPUT USING CHANGE EVENT OF REACT JS
    return (
        <Segment clearing >
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange} />
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
                <Form.Input input="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />
                <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                <Button as={Link} to="/activities" floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    );
}

export default observer(ActivityForm);