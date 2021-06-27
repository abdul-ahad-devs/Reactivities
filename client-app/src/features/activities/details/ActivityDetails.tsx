import { observer } from 'mobx-react-lite';
import { Card, Image, Button } from 'semantic-ui-react';
import Loading from '../../../app/layout/Loading';
import { useStore } from '../../../app/store/store';

const ActivityDetails = () => {

    const { activityStore } = useStore();

    const { selectedActivity, openForm, cancelSelectedActivity } = activityStore;

    if (!selectedActivity) {
        return <Loading />
    }
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{selectedActivity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2">
                    <Button onClick={() => openForm(selectedActivity.id)} color="blue" content="Edit" basic />
                    <Button color="grey" content="Cancel" basic onClick={() => cancelSelectedActivity()} />
                </Button.Group>
            </Card.Content>
        </Card>
    )

}

export default observer(ActivityDetails);