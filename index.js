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

    /**
     * Returns true if the current screen width is greater than or equal to the specified breakpoint size. False otherwise.
     *
     * @param {integer|string} breakpoint Integer (in pixels) or string (must match a breakpoint key)
     * @returns {boolean}
     */
    this.from = (breakpoint) => {
        return from(this.bp, breakpoint);
    };

    /**
     * Returns true if the current screen width is greater than or equal to the from width AND less than the until width. False otherwise.
     *
     * @param {integer|string} from Integer (in pixels) or string (must match a breakpoint key)
     * @param {integer|string} until Integer (in pixels) or string (must match a breakpoint key)
     * @returns {boolean}
     */
    this.on = (from, until) => {
        return on(this.bp, from, until);
    };

    /**
     * Returns true if the current screen width is less than the specified breakpoint size. False otherwise.
     *
     * @param {integer|string} breakpoint Integer (in pixels) or string (must match a breakpoint key)
     * @returns {boolean}
     */
    this.until = (breakpoint) => {
        return until(this.bp, breakpoint);
    };

    /**
     * @param bp
     * @param breakpoint
     * @returns {boolean}
     */
    function from(bp, breakpoint) {
        if (bp[breakpoint]) {
            breakpoint = bp[breakpoint];
        }

        if (Number.isInteger(breakpoint)) {
            return window.innerWidth >= breakpoint;
        }

        throw Error(`Invalid breakpoint value "${breakpoint}" supplied.`);
    }

    /**
     * @param bp
     * @param from
     * @param until
     * @returns {boolean}
     */
    function on(bp, from, until) {
        if (bp[from]) {
            from = bp[from];
        }
        if (null !== until && bp[until]) {
            until = bp[until];
        }

        if (Number.isInteger(from) && Number.isInteger(until)) {
            return window.innerWidth >= from && window.innerWidth < until;
        }

        throw Error('Invalid breakpoint value supplied to MQ.on().');
    }

    /**
     * @param bp
     * @param breakpoint
     * @returns {boolean}
     */
    function until(bp, breakpoint) {
        if (bp[breakpoint]) {
            breakpoint = bp[breakpoint];
        }

        if (Number.isInteger(breakpoint)) {
            return window.innerWidth < breakpoint;
        }

        throw Error(`Invalid breakpoint value "${breakpoint}" supplied.`);
    }
}

export {MQ};
