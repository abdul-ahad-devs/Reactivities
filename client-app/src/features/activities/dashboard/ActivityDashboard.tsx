import React, { useState } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../forms/ActivityForm'

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean

}

const ActivityDashboard = ({ activities, selectActivity, deleteActivity, createOrEdit, submitting, selectedActivity, cancelActivity, editMode, openForm, closeForm }: Props) => {


    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList  submitting={submitting} activities={activities} deleteActivity={deleteActivity} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width="6">
                {selectedActivity && <ActivityDetails openForm={openForm} activity={selectedActivity} cancelActivity={cancelActivity} />}
                {editMode && <ActivityForm activity={selectedActivity} closeForm={closeForm} submitting={submitting} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;