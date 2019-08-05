import React from 'react';
import './App.css';

class FlexibleVacationDates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tripLength: null,
            tripPlace: null,
            tripRange: null,
            tripResults: false
        }
    }

    parse(inputTime) {
        let numDays = null;
        let properUnits = null;

        let inputTimeValue = 1 * inputTime.replace(new RegExp("[^\\d]", 'g'), "");
        if (inputTime.toLowerCase().includes("week")) {
            numDays = 7 * inputTimeValue;
            properUnits = inputTimeValue > 1 ? " weeks" : " week";
        } else if (inputTime.toLowerCase().includes("month")) {
            numDays = 30 * inputTimeValue;
            properUnits = inputTimeValue > 1 ? " months" : " month";
        } else if (inputTime.toLowerCase().includes("year")) {
            numDays = 365 * inputTimeValue;
            properUnits = inputTimeValue > 1 ? " years" : " year";
        } else {
            numDays = inputTimeValue || 1;
            properUnits = (inputTimeValue || 1) > 1 ? " days" : " day";
        }
        return {
            humanReadable: (inputTimeValue || 1).toString().concat(properUnits),
            numDays: numDays
        }
    }

    setTripLength(el) {
        let time = this.parse(el.innerText);
        el.innerText = time.humanReadable;
        this.setState({...this.state, tripLength: time.numDays});
    }

    setTripPlace(el) {
        this.setState({...this.state, tripPlace: el.innerText});
    }

    setTripRange(el) {
        let time = this.parse(el.innerText);
        el.innerText = time.humanReadable;
        this.setState({...this.state, tripRange: time.numDays});
    }

    searchTrips(el) {

    }

    setTripResults() {

    }

    render() {
        console.log(this.state);
        return (
            <React.Fragment>
                <Navigation/>
                <div className={"trip-details"}>
                    <div>
                        I want to spend <TripLength/> in <TripPlace/> sometime in the next <TripRange/>
                    </div>
                    <hr/>
                    <button className={"search-trips"}
                    >
                        Find places
                        <svg className={"arrow"} xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                             viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0V0z"/>
                            <path fill="currentColor"
                                  d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"
                            />
                        </svg>
                    </button>
                </div>
                <TripResults/>
            </React.Fragment>
        );
    }
}

class Navigation extends FlexibleVacationDates {

    render() {
        return (
            <div className={"nav"}>
                <div className={"nav-item"}>
                    About
                </div>
                <div className={"nav-item"}>
                    GitHub
                </div>
            </div>
        );
    }
}

class TripLength extends FlexibleVacationDates {
    render() {
        return (
            <InlineInput
                handler={el => {
                    this.setTripLength(el)
                }}
                text={"3 days"}
            />
        );
    };
}

class TripPlace extends FlexibleVacationDates {
    render() {
        return (
            <InlineInput
                handler={el => {
                    this.setTripPlace(el)
                }}
                text={"Costa Rica"}
            />
        );
    };
}

class TripRange extends FlexibleVacationDates {
    render() {
        return (
            <InlineInput
                handler={el => {
                    this.setTripRange(el)
                }}
                text={"2 weeks"}
            />
        );
    };
}

class InlineInput extends React.Component {
    addContentEditable(el) {
        if (el) {
            el.contentEditable = true;
        }
    }

    selectContents(el) {
        let range = document.createRange();
        range.selectNodeContents(el);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }

    purgeExcessiveWhitespace(ev) {
        if (ev.keyCode === 13) ev.preventDefault();
        ev.currentTarget.innerText = ev.currentTarget.innerText.replace(new RegExp("[\\s]{2,}", 'g'), " ").trim();
    }

    render() {
        return (
            <React.Fragment>
                &nbsp;
                <span
                    spellCheck={false}
                    onPaste={ev => {
                        ev.preventDefault();
                        return false;
                    }}
                    ref={el => {
                        this.addContentEditable(el)
                    }}
                    onKeyDown={ev => {
                        this.purgeExcessiveWhitespace(ev)
                    }}
                    onFocus={el => {
                        this.selectContents(el.currentTarget)
                    }}
                    onBlur={ev => {
                        this.props.handler(ev.currentTarget)
                    }}
                >
                    {this.props.text}
                </span>
                &nbsp;
            </React.Fragment>
        );
    }
}

class TripResults extends FlexibleVacationDates {
    render() {
        return null;
    };
}

export default FlexibleVacationDates;