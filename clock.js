
/**
 * 目盛り
 */
var ScaleObject = React.createClass({
    render: function () {
        {/* this.props.index : 0-59 */}
        var degree = "rotate(" + this.props.index * 6 + ")";
        var id = "#" + this.props.type;
        return <use xlinkHref={id} transform={degree}/>
    }
});

/**
 * 文字盤
 */
var DigitTextObject = React.createClass({
    render: function () {
        {/* this.props.index : 0-11 */}
        var degree = this.props.index * 30;
        var radian = Math.PI / 180 * degree;
        var x = Math.sin(radian) * 300;
        var y = Math.cos(radian) * 300 * -1;
        return <text x={x} y={y+30} fill="#888" fontSize="72" textAnchor="middle">{this.props.text}</text>
    }
});

/**
 * 時計盤（目盛り*文字盤）
 */
var ClockScale = React.createClass({
    render: function () {

        const ID_SCALE_LARGE = "scale_large";
        const ID_SCALE_MEDIUM = "scale_medium";
        const ID_SCALE_SMALL = "scale_small";

        var scaleObjects = [];
        for (var i = 0; i < 60; i++) {
            var type = null;
            if (i % 15 == 0) {
                type = ID_SCALE_LARGE
            } else if (i % 5 == 0) {
                type = ID_SCALE_MEDIUM
            } else {
                type = ID_SCALE_SMALL
            }
            scaleObjects.push(<ScaleObject key={i} index={i} type={type}/>);
        }

        var digitTextObjects = [];
        for (var i = 0; i < 12; i++) {
            var text = String(i == 0 ? 12 : i);
            digitTextObjects.push(<DigitTextObject key={i} index={i} text={text} />);
        }

        return (<svg width="100%" height="100%" viewBox="-500 -500 1000 1000">
            <defs>
                <g id={ID_SCALE_LARGE}>
                    <rect x="-4" y="-400" width="8" height="48" fill="#888"/>
                </g>
                <g id={ID_SCALE_MEDIUM}>
                    <rect x="-3" y="-400" width="6" height="40" fill="#888"/>
                </g>
                <g id={ID_SCALE_SMALL}>
                    <rect x="-2" y="-400" width="4" height="24" fill="#888"/>
                </g>
            </defs>
            <circle cx="0" cy="0" r="440" fill="#ccc"/>
            <circle cx="0" cy="0" r="420" fill="#eee"/>

            {digitTextObjects}
            {scaleObjects}

        </svg>);
    }
});

/**
 * 針（長針+短針+秒針）
 */
var ClockHands = React.createClass({
    getTransformAttr: function (degree) {
        var val = "rotate(" + degree + ")";
        return val;
    },
    render: function () {
        var now = this.props.now;

        var degreeSeconds = (now.getSeconds() / 60) * 360 + (now.getMilliseconds() / 1000) * (360 / 60);
        var degreeMinutes = (now.getMinutes() / 60) * 360 + ((degreeSeconds / 360) * (360 / 60));
        var degreeHours = (now.getHours() / 12) * 360 + ((degreeMinutes / 360) * (360 / 12));

        return <svg width="100%" height="100%" viewBox="-500 -500 1000 1000">

            <defs>
                <g id="def_hand_long">
                    <polygon points="-5,-360 5,-360 10,30 -10,30" fill="#888"/>
                </g>
                <g id="def_hand_short">
                    <polygon points="-5,-300 5,-300 10,30 -10,30" fill="#888"/>
                </g>
                <g id="def_hand_second">
                    <polygon points="-2,-360 2,-360 3,30 -3,30" fill="#CCC"/>
                </g>
            </defs>

            <use id="hand_long" xlinkHref="#def_hand_long" transform={this.getTransformAttr(degreeMinutes)}/>
            <use id="hand_short" xlinkHref="#def_hand_short" transform={this.getTransformAttr(degreeHours)}/>
            <use id="hand_second" xlinkHref="#def_hand_second" transform={this.getTransformAttr(degreeSeconds)}/>

            <circle cx="0" cy="0" r="16" fill="#CCC"/>

        </svg>;
    }
});

/**
 * 時計（時計盤+針）
 */
var ClockApplication = React.createClass({
    render: function () {
        var now = this.props.now;

        var divStyle = {
            width: '95%',
            height: '95%',
            position: 'absolute'
        };

        return <div>
            <div style={divStyle}><ClockScale /></div>
            <div style={divStyle}><ClockHands now={now}/></div>
        </div>;
    }
});

var start = new Date().getTime();
const INTERVAL_MS = 1000; // 描画間隔
const SPEED = 1; // 倍速
setInterval(function () {

    var now = new Date().getTime();
    var diff = now - start;
    var targetDate = new Date(now + diff * (SPEED - 1));

    ReactDOM.render(
        <ClockApplication now={targetDate}/>,
        document.getElementById('container')
    );
}, INTERVAL_MS);