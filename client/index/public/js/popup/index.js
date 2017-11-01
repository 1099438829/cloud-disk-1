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

            let left = e.clientX - x;
            let top = e.clientY - y;

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
    };

    render() {
        const {sta, data, close, children} = this.props;
        let pop = {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight,
            box_w: 460,
            box_h: 220,
            closeName: undefined,
            title: '提示',
            titleSta: true,
            maskSta: true,
            closeTime: 0,
            boxHeight: {},
            autoHeight: ''
        };
        if (data) {
            'size' in data ? (pop.box_w = parseInt(data.size[0]), pop.box_h = parseInt(data.size[1])) : null;
            'closeName' in data ? pop.closeName = data.closeName : null;
            'title' in data && data.title ? pop.title = data.title : null;
            'titleSta' in data ? pop.titleSta = data.titleSta : null;
            'maskSta' in data ? pop.maskSta = data.maskSta : null;
            'closeTime' in data ? pop.closeTime = data.closeTime : null;
        }
        pop.w = pop.w / 2 - pop.box_w / 2;
        if (pop.box_h) {
            pop.h = pop.h / 2 - pop.box_h / 2;
            if (pop.titleSta) {
                pop.boxHeight = {height: `${pop.box_h - 42}px`}
            } else {
                pop.boxHeight = {height: '100%'}
            }
            pop.autoHeight = {height: `${pop.box_h}px`}
        } else {
            pop.h = pop.h / 2 - 200;
        }
        let {stas} = this.state;
        let popSty = {
            width: `${pop.box_w}px`,
            top: `${pop.h}px`,
            left: `${pop.w}px`,
            ...pop.autoHeight
        };
        let txtSty = {
            width: '100%',
            ...pop.boxHeight
        };
        let mask = <div className={styles.mask} onClick={() => {close()}}></div>;
        let html = <div ref="box" style={popSty} className={sta ? `${styles.popup} ${styles.in}` : `${styles.popup} ${styles.out}`}>
            <div ref="title" onMouseDown={this.handRemove.bind(this)} className={styles.title}>{pop.title}</div>
            <div style={txtSty}>
                {children}
            </div>
            <div className={styles.close_box} onClick={() => {close()}}>
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
