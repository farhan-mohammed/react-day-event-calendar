import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DummyData from './DummyData';
import './styles.scss';
import GenerateDayEvents from './GenerateDayEvents';
export default class Calendar extends Component {
    props = {
        start: 0,
        end: 720,
        step: 30,
        events: [],
    };
    state = {
        events: [],
    };
    componentDidMount() {
        this.setState({
            events: new GenerateDayEvents(
                DummyData,
                document.getElementById('day-event-container').clientWidth,
            ),
        });
    }
    render() {
        const START_TIME = 120 * 0;
        let { start, end, step } = this.props;
        start = start || START_TIME;
        end = end || 720 * 4;
        step = step || 120;
        let times = [...Array(Math.floor((end - start) / step))].map(
            (el, ind) => ind * step + start,
        );
        let emptyBlocks = [...Array(Math.floor((end - start) / step))];
        return (
            <div className="cal-con">
                <div class="cal-title">Day Events</div>
                <div className="cal-body">
                    <ol className="cal-body__times">
                        {times.map((i) => {
                            let hour = Math.floor(i / step);
                            return (
                                <li style={{ marginBottom: step - 14 }}>
                                    <span className="hours">
                                        {hour < 10 ? `0${hour}` : hour}:00
                                    </span>
                                    {i < 720 * 2 ? 'AM' : 'PM'}
                                </li>
                            );
                        })}
                    </ol>
                    <div className="cal-body__events" style={{ height: end - START_TIME }}>
                        <div className="events-bg">
                            {emptyBlocks.map(() => (
                                <div
                                    className="events-bg__divider"
                                    style={{ maxHeight: step }}
                                ></div>
                            ))}
                        </div>
                        <div className="events-con" id="day-event-container">
                            {this.state.events
                                .filter(({ start }) => start >= START_TIME)
                                .map(
                                    ({
                                        top,
                                        left,
                                        width,
                                        height,
                                        start: s,
                                        end: e,
                                        title = 'Title not found',
                                    }) => {
                                        return (
                                            <div
                                                class="day-event"
                                                key={title}
                                                style={{
                                                    top: top - START_TIME,
                                                    left,
                                                    width,
                                                    height,
                                                }}
                                            >
                                                <span class="evt-txt">{title}</span>
                                            </div>
                                        );
                                    },
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<Calendar />, document.getElementById('root'));
