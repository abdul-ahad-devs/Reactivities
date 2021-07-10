import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';

const ActivityForm = () => {

    const { activityStore } = useStore();

    const { selectedActivity, loading, createActivity, updateActivity } = activityStore;

    // ?? optional parameter
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    // THIS HANDLER IS SUBMITTING THE FORM
    const handleSubmit = () => {
        activity.id ? updateActivity(activity) : createActivity(activity)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
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
                <Button floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    );
}

export default observer(ActivityForm);