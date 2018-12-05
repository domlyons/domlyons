import React, { Component } from 'react';
import { Trail, animated } from 'react-spring';

const getItems = str =>
  'Dom'.split('').map(x => ({ value: x, key: Math.random() }));

class App extends Component {
  state = {
    coords: [0, 0],
    items: getItems('Dom'),
    items2: null
  };

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('click', this.handleMouseClick);
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('click', this.handleMouseClick);
  }

  handleMouseClick = () => {
    if (this.state.items.length < 9) {
      this.setState(prevState => ({
        items: [...prevState.items, ...getItems('Dom')]
      }));
    } else if (!this.state.items2) {
      this.setState({ items2: getItems('Dom') });
    } else if (this.state.items2.length < 9) {
      this.setState(prevState => ({
        items2: [...prevState.items2, ...getItems('Dom')]
      }));
    }
  };

  handleMouseMove = ({ pageX, pageY }) => {
    this.setState({ coords: [pageX, pageY] });
  };

  transform = (x, y) => `translate3d(${x}px, ${y + 25}px, 0)`;
  transform2 = (x, y) =>
    `translate3d(${x}px, ${y - this.state.items2.length * 47.5 - 25}px, 0)`;

  render() {
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Trail
          native
          items={this.state.items}
          to={{ coords: this.state.coords }}
          keys={item => item.key}
        >
          {(item, i) => props => (
            <animated.div
              style={{
                zIndex: this.state.items.length - i,
                fontSize: 40,
                transform: props.coords.interpolate(this.transform)
              }}
            >
              {item.value}
            </animated.div>
          )}
        </Trail>
        {this.state.items2 && (
          <Trail
            native
            items={this.state.items2}
            to={{ coords: this.state.coords }}
            keys={item => item.key}
          >
            {(item, i) => props => (
              <animated.div
                style={{
                  zIndex: this.state.items2.length - i,
                  fontSize: 40,
                  transform: props.coords.interpolate(this.transform2),
                  userSelect: 'none'
                }}
              >
                {item.value}
              </animated.div>
            )}
          </Trail>
        )}
      </div>
    );
  }
}

export default App;
