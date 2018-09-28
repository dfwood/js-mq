# @dfwood/js-mq

A JS helper library to detect screen size by named breakpoints. Based off of the [sass-mq](https://www.npmjs.com/package/sass-mq) library.

## Quick start guide
This documentation assumes you are familiar with and using the ES6 JavaScript syntax in your project. This code will not work in environments the do not support the ES6 syntax without transpiling into ES5.

All breakpoint definitions use the mobile first approach. In this methodology, the pixel size for a breakpoint is the smallest width on the breakpoint. The largest width on the breakpoint is 1px less than the next breakpoint size.

Install js-mq using npm:
`npm install @dfwood/js-mq --save`

For ease of use in your project, it is recommended to setup an intermediate loader. This will allow you to define all your breakpoints for your project once, regardless of the number of places you need access to them.
```ecmascript 6
///////////////////
// "mq.js" file //
/////////////////

import MQ from '@dfwood/js-mq';

const bp = {
    // Values should always be pixel amounts in integer format. No units.
    // Value is the smallest pixel size on the breakpoint (inclusive).
    small: 480,
    medium: 768,
    large: 1024,
};

const mq = new MQ(bp);

// Give easy access to site breakpoints and the js-mq object with breakpoints already defined.
export {mq, bp};
```

Now you can easily import the `mq` variable into any of your projects JavaScript files.
```ecmascript 6
//////////////////////
// Project JS file //
////////////////////

// Import from file created in setup stage
import {mq} from '../mq';

// Alternatively import both the mq variable and the website breakpoints
// (Use one line or the other, do not use both import statements)
import {mq, bp} from '../mq';

// Use in an if statement
if (mq.from('small')) {
    // Do stuff for screens equal to or larger than the "small" breakpoint screen width.
}

if (mq.until('medium')) {
    // Do stuff for screens smaller than the "medium" breakpoint screen width.
}

if (mq.on('small', 'large')) {
    // Do stuff for screens equal to or larger than the "small" breakpoint screen width AND smaller than the "large" breakpoint screen width.
    // i.e. This applies to the entirety of the "small" and "medium" breakpoints.
}

// You can also pass in a pixel value if needed (as an integer).
if (mq.from(1000)) {
    // Do stuff for screens equal to or larger than 1000px in width.
}
```

## Methods
* `mq.from()` - Returns true if screen size is greater than or equal to specified pixel value/breakpoint.
* `mq.until()` - Returns true if screen size is less than specified pixel value/breakpoint.
* `mq.on()` - Takes 2 arguments, Returns true if screen size is greater than or equal to first argument value/breakpoint AND screen size is less than second argument value/breakpoint. 