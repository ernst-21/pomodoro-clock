import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const themify = (color) => {
  return color === true ? { fontSize: '2rem', color: '#000' } : { fontSize: '2rem', color: '#fff' };
};

const SessionBreakSetter = (props) => {

  useEffect(() => {
    console.log('I am being rendered');
  }, []);

  return (
    <div style={{ width: '20%', placeItems: 'center' }}>
      <div className="break-container">
        <MinusCircleOutlined
          style={themify(props.theme)}
          onClick={props.decrease}
        />
        <Title level={3} style={themify(props.theme)}>{props.children}</Title>
        <PlusCircleOutlined
          onClick={props.increase}
          style={themify(props.theme)}
        />
      </div>
      <div style={{ placeItems: 'center', display: 'grid' }}>
        <Title level={3} style={props.theme === true ? { color: '#000' } : { color: '#fff' }}>{props.child}</Title>
      </div>
    </div>
  );
};

export default (SessionBreakSetter);
