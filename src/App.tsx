import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks/index';
import { selectCardsState, fetchCardsWithOffset } from './redux/slices/cardsSlice';
import { Card } from './components/Card';
import { Dropdown } from './components/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const { cards, offset, isLoading } = useAppSelector(selectCardsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCardsWithOffset(''));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchCardsWithOffset(offset));
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: '100vh', maxWidth: '90vw' }}
    >
      {isLoading && !offset ? (
        <Spinner />
      ) : (
        <>
          <Row className="justify-content-center">
            {cards.map((userData) => (
              <Col xs={4} key={userData.Id} className="mb-3">
                <Card user={userData} />
              </Col>
            ))}
          </Row>
          <Container className="d-flex justify-content-center gap-3">
            <Button disabled={!offset || isLoading} onClick={handleLoadMore}>
              {isLoading ? <Spinner size="sm" /> : 'Load more'}
            </Button>
            <Dropdown />
          </Container>
        </>
      )}
    </Container>
  );
}

export default App;
