import React from 'react';
import { Tooltip, Typography, Progress } from 'antd';
import {
  PauseCircleOutlined,
  ReloadOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import { themify } from './SessionBreakSetter';

const { Title } = Typography;

const Clock = (props) => {
  return (
    <div className="clock-container">
      <div style={{ textAlign: 'center', display: 'grid' }}>
        <Title style={props.theme === true ? { fontSize: '3rem' } : { fontSize: '3rem', color: '#fff' }}>
          Pomodoro Clock
        </Title>
        <Title style={themify(props.theme)}>{props.counterType}</Title>
      </div>
      <Progress
        type="circle"
        percent={props.percent}
        width={220}
        strokeWidth={2}
        strokeColor={{
          '100%': '#790df3',
          '50%': '#790df3',
          '10%': '#fc3e03'
        }}
        format={() => (
          <Title style={props.theme === true ? { fontSize: '3rem' } : {
            fontSize: '3rem',
            color: '#fff'
          }}>{props.children}</Title>
        )}
      />
      <div className="clock-btn-container">
        {props.running ? (
          <Tooltip title="Pause">
            <span>
              <PauseCircleOutlined
                style={themify(props.theme)}
                onClick={props.onPause}
              />{' '}
            </span>
          </Tooltip>
        ) : (
          <Tooltip title="Play">
            <span>
              <PlayCircleOutlined
                style={themify(props.theme)}
                onClick={props.onPlay}
              />
            </span>
          </Tooltip>
        )}
        <Tooltip title="Reset">
          <span>
            <ReloadOutlined
              style={themify(props.theme)}
              onClick={props.reset}
            />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default Clock;
