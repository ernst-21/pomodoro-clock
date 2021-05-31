import React from 'react';
import { Typography } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const BreakCounter = (props) => {

  return (
    <div style={{ width: '20%', placeItems: 'center' }}>
      <div className="break-container">
        <MinusCircleOutlined
          style={{ fontSize: '2rem' }}
          onClick={props.decrease}
        />
        <Title style={{ fontSize: '2.5rem' }}>{props.children}</Title>
        <PlusCircleOutlined
          onClick={props.increase}
          style={{ fontSize: '2rem' }}
        />
      </div>
      <div style={{ placeItems: 'center', display: 'grid' }}>
        <Title level={3}>Break</Title>
      </div>
    </div>
  );
};

export default BreakCounter;
