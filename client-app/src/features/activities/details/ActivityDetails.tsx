import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import Loading from '../../../app/layout/Loading';
import { useStore } from '../../../app/store/store';

const ActivityDetails = () => {

    const { activityStore } = useStore();

    const { selectedActivity, loadActivity, loadingInitial } = activityStore;

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
    }, [id, loadActivity])

    if (loadingInitial || !selectedActivity) {
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
                    <Button as={Link} to={`/manage/${selectedActivity.id}`} color="blue" content="Edit" basic />
                    <Button as={Link} to="/activities" color="grey" content="Cancel" basic />
                </Button.Group>
            </Card.Content>
        </Card>
    )

}

export default observer(ActivityDetails);