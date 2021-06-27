import React, { ChangeEvent, useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    submitting: boolean;
    createOrEdit: (activity: Activity) => void;

}

const ActivityForm = ({ activity: selectedActivity, closeForm, createOrEdit, submitting }: Props) => {

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
        console.log(activity)
        createOrEdit(activity);
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
                <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
                <Button floated="right" type="button" content="Cancel" onClick={() => closeForm()} />
            </Form>
        </Segment>
    );
}

export default ActivityForm;