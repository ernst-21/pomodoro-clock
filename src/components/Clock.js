import React from 'react';
import { Tooltip, Typography, Progress } from 'antd';
import {
  PauseCircleOutlined,
  ReloadOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';

const { Title } = Typography;

const Clock = (props) => {
  return (
    <div className="clock-container">
      <div style={{textAlign: 'center', display: 'grid'}}>
        <Title sytle={{ fontSize: '3rem' }}>Pomodoro Clock</Title>
        <Title sytle={{ fontSize: '2rem' }}>{props.counterType}</Title>
      </div>
      <Progress
        type="circle"
        percent={props.percent}
        width={220}
        strokeWidth={2}
        strokeColor={{
          '100%': '#87d068',
          '5%': '#800303'
        }}
        format={() => (
          <Title style={{ fontSize: '3rem' }}>{props.children}</Title>
        )}
      />

      <div className="clock-btn-container">
        {props.running ? (
          <Tooltip title="Pause">
            <span>
              <PauseCircleOutlined
                style={{ fontSize: '2rem' }}
                onClick={props.onPause}
              />{' '}
            </span>
          </Tooltip>
        ) : (
          <Tooltip title="Play">
            <span>
              <PlayCircleOutlined
                style={{ fontSize: '2rem' }}
                onClick={props.onPlay}
              />
            </span>
          </Tooltip>
        )}

        <Tooltip title="Reset">
          <span>
            <ReloadOutlined
              style={{ fontSize: '2rem' }}
              onClick={props.reset}
            />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default Clock;
