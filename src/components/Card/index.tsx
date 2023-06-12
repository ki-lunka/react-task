import CardBase from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Avatar } from '../Avatar';
import { LineChart } from '../LineChart';
import { IUser } from '../../types';
import { numberToLocaleString } from '../../utils';

interface CardProps {
  user: IUser;
}

export const Card: React.FC<CardProps> = ({ user }) => {
  const { Name, occupation, totalImpressions, totalConversions, totalRevenue, conversions } = user;
  return (
    <CardBase body bg="light">
      <Row>
        <Col className="d-flex justify-content-center mb-1">
          <Avatar name={Name} />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="d-flex flex-column text-center">
          <h5 className="mb-1">{Name}</h5>
          <p className="text-muted">{occupation}</p>
        </Col>
      </Row>
      <Row className="mb-1">
        <Col className="d-flex flex-column align-items-center">
          <p className="text-warning">{totalImpressions}</p>
          <p className="text-muted">impressions</p>
        </Col>
        <Col className="d-flex flex-column align-items-center">
          <p className="text-primary">{totalConversions}</p>
          <p className="text-muted">conversions</p>
        </Col>
      </Row>
      <Row className="mb-1">
        <h4 className="text-success text-center">${numberToLocaleString(totalRevenue)}</h4>
      </Row>
      <div>
        <LineChart data={conversions} />
      </div>
    </CardBase>
  );
};
