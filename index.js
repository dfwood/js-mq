/**
 * Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
 * Adds support for Number.isInteger() to Internet Explorer.
 */
Number.isInteger = Number.isInteger || function (value) {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
};

/**
 * Functional object designed to help determine which breakpoint the browser is on in JS. Modeled after the
 * `sass-mq` SASS/SCSS library.
 *
 * Example Usage:
 * * const mq = new MQ({sm: 480, md: 768, lg: 1024});
 * * if (mq.from(md)) { // Do something at widths 768px wide or larger }
 * * if (mq.on(sm, md)) { // Do something at widths greater than or equal to 480px and smaller than 768px }
 * * if (mq.until(lg)) { // Do something at widths less than 1024px }
 * Note: You can also pass in a number.
 * * if (mq.from(500)) { // Do something at widths greater than or equal to 500px. }
 *
 * @param {Object} breakpoints
 * @package @dfwood/js-mq
 */
function MQ(breakpoints) {
    this.bp = breakpoints;
}

/**
 * Returns true if the current screen width is greater than or equal to the specified breakpoint size. False otherwise.
 *
 * @param {int|string} breakpoint Integer (in pixels) or string (must match a breakpoint key)
 * @returns {boolean}
 */
MQ.prototype.from = function(breakpoint) {
    if (this.bp[breakpoint]) {
        breakpoint = this.bp[breakpoint];
    }

    if (Number.isInteger(breakpoint)) {
        return window.innerWidth >= breakpoint;
    }

    throw Error('Invalid breakpoint value "' + breakpoint + '" supplied.');
};

/**
 * Returns true if the current screen width is greater than or equal to the from width AND less than the until width. False otherwise.
 *
 * @param {int|string} from Integer (in pixels) or string (must match a breakpoint key)
 * @param {int|string} until Integer (in pixels) or string (must match a breakpoint key)
 * @returns {boolean}
 */
MQ.prototype.on = function (from, until) {
    if (this.bp[from]) {
        from = this.bp[from];
    }
    if (null !== until && this.bp[until]) {
        until = this.bp[until];
    }

    if (Number.isInteger(from) && Number.isInteger(until)) {
        return window.innerWidth >= from && window.innerWidth < until;
    }

    throw Error('Invalid breakpoint value supplied to MQ.on().');
};

/**
 * Returns true if the current screen width is less than the specified breakpoint size. False otherwise.
 *
 * @param {int|string} breakpoint Integer (in pixels) or string (must match a breakpoint key)
 * @returns {boolean}
 */
MQ.prototype.until = function (breakpoint) {
    if (this.bp[breakpoint]) {
        breakpoint = this.bp[breakpoint];
    }

    if (Number.isInteger(breakpoint)) {
        return window.innerWidth < breakpoint;
    }

    throw Error('Invalid breakpoint value "' + breakpoint + '" supplied.');
};

export default MQ;
