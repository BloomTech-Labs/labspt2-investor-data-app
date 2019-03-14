import React from 'react'

export default class ClockFunction extends React.Component {
  constructor() {
    super();
      this.state = { time: new Date() }; 
    }
    componentDidMount() {       // Once the component is mounted, the interval is set
      this.update = setInterval(() => {
        this.setState({ time: new Date() });
      }, 1 * 1000);            // Changes and sets the state every second
    }

    componentWillUnmount() {   // deletes interval before component is removed
      clearInterval(this.update);
    }

    render() {
      const { time } = this.state; // retrieves time from state

      return (
        <div className='clock'>
          <h4>
            {time.toLocaleTimeString()}
          </h4>
        </div>
      );
    }
}