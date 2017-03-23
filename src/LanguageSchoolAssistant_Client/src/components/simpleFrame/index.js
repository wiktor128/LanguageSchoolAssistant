import React, {Component, PropTypes} from 'react';
import CodeBlockTitle from './CodeBlockTitle';
import ClearFix from 'material-ui/internal/ClearFix';
import Paper from 'material-ui/Paper';


class SimpleFrame extends Component {
  static propTypes = {
    children: PropTypes.node,
    component: PropTypes.bool,
    description: PropTypes.string,
    exampleBlockStyle: React.PropTypes.object,
    layoutSideBySide: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    component: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  render() {
    const {
      children,
      component,
      exampleBlockStyle,
      layoutSideBySide,
    } = this.props;

    const palette = this.context.muiTheme.rawTheme.palette;
    const canvasColor = palette.canvasColor;

    const styles = {
      root: {
        backgroundColor: canvasColor,
        marginBottom: 32,
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: '14px 24px 24px',
        margin: 0,
        width: layoutSideBySide ? '45%' : null,
        float: layoutSideBySide ? 'right' : null,
      },
    };

    return (
      <Paper style={styles.root}>
        <CodeBlockTitle 
          title={this.props.title} 
          iconElementRight={this.props.iconElementRight}
        />
        <ClearFix style={Object.assign(styles.exampleBlock, exampleBlockStyle)}>
          {children}
        </ClearFix>
      </Paper>
    );
  }
}

export default SimpleFrame;
