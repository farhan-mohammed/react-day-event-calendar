import React, { Component } from "react";
import ReactDOM from "react-dom";
import DummyData from "./DummyData";
import "./styles.css";
import GenerateDayEvents from "./GenerateDayEvents";
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
        // Sort our Events
        this.setState({ events: new GenerateDayEvents(DummyData) });
        //  Figure out the number of columns
    }
    render() {
        let { start, end, step } = this.props;
        start = start || 0;
        end = end || 720;
        step = step || 30;
        let times = [...Array(Number((end - start) / 30) + 1)].map(
            (el, ind) => ind * step + start
        );
        return (
            <div>
                <p>Day Events </p>
                <ol>
                    {times.map((i) => {
                        let hour = Math.floor(i / step / 2);
                        return (
                            <li>
                                <span className="hours">
                                    {hour < 10 ? `0${hour}` : hour}:{i % step}
                                </span>
                                {i < 720 ? "AM" : "PM"}
                            </li>
                        );
                    })}
                </ol>
                <div id="day-event-container" class="day-event-container">
                    {this.state.events.map(
                        ({
                            id,
                            top,
                            left,
                            width,
                            height,
                            start: s,
                            end: e,
                        }) => {
                            return (
                                <div
                                    class="day-event"
                                    key={id}
                                    style={{ top, left, width, height }}
                                >
                                    <div className="evt-txt">EventID: {id}</div>
                                    <span class="evt-txt">
                                        Interval:{s},{e}
                                    </span>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        );
    }
}
ReactDOM.render(<Calendar />, document.getElementById("root"));
