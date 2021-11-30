import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader } from 'components/shared';
import { MainLayout } from 'layouts';
import { RouteComponentProps } from 'react-router-dom';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';
import { addStoryToCollection, listCollectionsUser } from 'actions';
import { Form, Button } from 'react-bootstrap';

interface MatchParams {
    id: string;
}

interface AddStoryScreenProps extends RouteComponentProps<MatchParams> { }

const AddStoryScreen = ({
    match: {
        params: { id }
    },
    history
}: AddStoryScreenProps) => {
    const storyId = id;
    const [chooseCollection, setChooseCollection] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();

    const userLogin = useSelector((state: ReduxState) => state.userLogin);
    const { userInfo } = userLogin;

    const collectionUser = useSelector((state: ReduxState) => state.collectionUser);
    const { collections, loading, error } = collectionUser;

    const collectionAddStory = useSelector((state: ReduxState) => state.collectionAddStory);
    const {
        loading: loadingAdd,
        error: errorAdd,
        success: successAdd,
    } = collectionAddStory;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else if (successAdd) {
            history.push('/dashboard');
        } else {
            dispatch(listCollectionsUser());
        }
    }, [
        dispatch,
        history,
        userInfo,
        successAdd,
    ]);

    const addStoryHandler = (collectionId: string, storyId: string) => {
        const story = {
            _id: storyId
        }
        dispatch(addStoryToCollection(collectionId, story));
    };

    console.log(chooseCollection);

    const addStoryDisplay = () => {
        if (loading) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <>
                    <h2>Choose Collections</h2>

                    <select
                        name="collection"
                        id="collectionId"
                        value={chooseCollection}
                        onChange={(e) => setChooseCollection(e.target.value)}
                    >
                        {collections.map((collection) => (
                            <option key={collection._id} value={collection._id}>{collection.name}</option>
                        ))}
                    </select>

                    <Button
                        type="button"
                        className="btn-create"
                        onClick={() => addStoryHandler(chooseCollection, storyId)}
                        disabled={!chooseCollection}
                    >
                        <i className="fas fa-plus"></i>
                    </Button>

                    {loadingAdd && <Loader />}
                    {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
                </>
            )
    }

    return (
        <MainLayout>
            {addStoryDisplay()}
        </MainLayout>
    )
}

export default AddStoryScreen;
