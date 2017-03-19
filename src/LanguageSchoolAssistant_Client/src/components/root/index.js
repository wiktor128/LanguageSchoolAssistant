import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBarHeader from '../appBarHeader';

injectTapEventPlugin();

function Root(props) {
  return (
    <div style={styles.paper}>
      <div style={styles.content}>
        <AppBarHeader />
        { props.children }
      </div>
    </div>
  );
}

const styles = {
  paper: {
    padding: '1em',
    border: '1px solid black',
    display: 'flex',
    margin: '0 auto',
  },
  content: {
    padding: '1em',
    flex: '1 0 auto',
  }
}

export default Root;
