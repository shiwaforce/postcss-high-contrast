import postcss from 'postcss';
import test from 'ava';

import plugin from '../';

function run(t, input, output) {
    return postcss([plugin({
        backgroundColor: '#000',
        altBgColor: '#fff',
        textColor: '#fff',
        linkColor: '#fcff3c',
        linkHoverColor: '#000',
        borderColor: '#fff'
    })]).process(input)
        .then(result => {
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        });
}

test('body doesn\'t have background property', t => {
    return run(
        t,
        `body {
            position: relative;
        }`,
        `body {
            position: relative;
            background-color: #000;
        }`
    );
});

test('div has wrong background property value and misses color', t => {
    return run(
        t,
        `div {
            background: #ccc url(img/postcss.png);
        }`,
        `div {
            background: #000 url(img/postcss.png);
            color: #fff;
        }`
    );
});

test('span has wrong background property value and misses color', t => {
    return run(
        t,
        `span {
            background-color: #ccc;
        }`,
        `span {
            background-color: #000;
            color: #fff;
        }`
    );
});

test('Color doesn\'t match!', t => {
    return run(
        t,
        `a {
            color: #000;
        }`,
        `a {
            color: #fcff3c;
        }`
    );
});

test('Color doesn\'t match!', t => {
    return run(
        t,
        `p {
            color: #000;
        }`,
        `p {
            color: #fff;
        }`
    );
});

test('Missing property', t => {
    return run(
        t,
        `h1 {
            margin: 0 0 24px;
        }`,
        `h1 {
            margin: 0 0 24px;
            color: #fff;
        }`
    );
});

test('Wrong border property value', t => {
    return run(
        t,
        `hr {
            border: solid 2px #000;
        }`,
        `hr {
            border: solid 2px #fff;
        }`
    );
});

test('Wrong border-top property value', t => {
    return run(
        t,
        `hr {
            border-top: solid 2px #000;
        }`,
        `hr {
            border-top: solid 2px #fff;
        }`
    );
});

test('Wrong border-right property value', t => {
    return run(
        t,
        `hr {
            border-right: solid 2px #000;
        }`,
        `hr {
            border-right: solid 2px #fff;
        }`
    );
});

test('Wrong border-bottom property value', t => {
    return run(
        t,
        `hr {
            border-bottom: solid 2px #000;
        }`,
        `hr {
            border-bottom: solid 2px #fff;
        }`
    );
});

test('Wrong border-left property value', t => {
    return run(
        t,
        `hr {
            border-left: solid 2px #000;
        }`,
        `hr {
            border-left: solid 2px #fff;
        }`
    );
});

test('Wrong border-top-color property value', t => {
    return run(
        t,
        `hr {
            border-top-color: #000;
        }`,
        `hr {
            border-top-color: #fff;
        }`
    );
});

test('Wrong border-right-color property value', t => {
    return run(
        t,
        `hr {
            border-right-color: #000;
        }`,
        `hr {
            border-right-color: #fff;
        }`
    );
});

test('Wrong border-bottom-color property value', t => {
    return run(
        t,
        `hr {
            border-bottom-color: #000;
        }`,
        `hr {
            border-bottom-color: #fff;
        }`
    );
});

test('Wrong border-left-color property value', t => {
    return run(
        t,
        `hr {
            border-left-color: #000;
        }`,
        `hr {
            border-left-color: #fff;
        }`
    );
});

test('Wrong box-shadow property value', t => {
    return run(
        t,
        `section {
            box-shadow: 0 0 2px #000;
        }`,
        `section {
            box-shadow: none;
        }`
    );
});

test('Wrong box-shadow property value', t => {
    return run(
        t,
        `label {
            text-shadow: 0 0 2px #000;
        }`,
        `label {
            text-shadow: none;
        }`
    );
});
