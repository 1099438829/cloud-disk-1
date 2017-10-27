/**
 * Created by awei on 2017/9/20.
 */
import React, {Component} from 'react'
import styles from './popup.scss'

class Popup extends Component {
    constructor() {
        super()
        this.state = {
            stas: false,
        }
    }

    componentWillMount() {
        // console.log('will');
    }

    componentDidMount() {
        // console.log('did');
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.sta) {
            setTimeout(() => {
                this.setState({stas: false});
            }, 350)
        } else {
            this.state.stas = nextProps.sta;
        }
    }

    handRemove = (e) => {
        const {title, box} = this.refs;
        const s = box.style;
        let x, y, p = 'onmousemove', d = document;
        title.style.cursor = 'move';
        e = e || event;
        x = e.clientX - box.offsetLeft;
        y = e.clientY - box.offsetTop;
        d[p] = function (e) {
            e = e || event;

            var left = e.clientX - x;
            var top = e.clientY - y;

            if (left <= 0) {
                left = 0;
            } else if (left >= d.documentElement.clientWidth - box.offsetWidth) {
                left = d.documentElement.clientWidth - box.offsetWidth;
            }
            if (top <= 0) {
                top = 0;
            } else if (top >= d.documentElement.clientHeight - box.offsetHeight) {
                top = d.documentElement.clientHeight - box.offsetHeight;
            }

            s.left = left + 'px';
            s.top = top + 'px'
        };
        d.onmouseup = function () {
            d[p] = null
            title.style.cursor = 'default';
        }
    }

    render() {
        // console.log(this.props);
        const {sta, title, children, close} = this.props;
        let {size} = this.props;
        size ? null : size = [450, 150];
        let {stas} = this.state;
        let popSty = {
            width: size[0] + 'px',
            height: size[1] + 'px',
            top: `calc(50% - ${size[1] / 2}px)`,
            left: `calc(50% - ${size[0] / 2}px)`
        };
        let mask = <div className={styles.mask} onClick={() => {
            close()
        }}></div>;
        let html = <div ref="box" style={popSty}
                        className={sta ? `${styles.popup} ${styles.in}` : `${styles.popup} ${styles.out}`}>
            <div ref="title" onMouseDown={this.handRemove.bind(this)} className={styles.title}>{title || '提示'}</div>
            {children}
            <div className={styles.close_box} onClick={() => {
                close()
            }}>
                <span className={styles.close}></span>
            </div>
        </div>;
        return (
            <div>
                {sta ? mask : null}
                {sta ? html : stas ? html : null}
            </div>
        )
    }
}

export default Popup
