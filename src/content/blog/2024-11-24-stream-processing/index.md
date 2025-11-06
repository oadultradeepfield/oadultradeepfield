---
slug: stream-processing
title: "Stream Processing"
tags: [ "Course Notes" ]
description: "Implementing streams and lazy evaluation in JavaScript."
pubDate: 2024-11-24
---

While reviewing for CS1101S AY2024/25 Semester 1 Final Assessment, I found the concepts of streams and lazy evaluation
astonishing, yet challenging. Therefore, I attempted to implement pairs and streams from scratch in pure JavaScript to
sharpen my skills.

**Note**: [CS1101S Programming Methodology](https://nusmods.com/courses/CS1101S/programming-methodology) is one of the
most foundational computer science courses at National University of Singapore (NUS). The course follows the textbook
_Structure and Interpretation of Computer Programs, JavaScript Adaptation (SICP JS)_. Streams are adapted
from [Section 3.5, Stream Processing](https://sourceacademy.org/sicpjs/3.5).

## Building Pairs Functionally

The following lines of code are my approach to creating `pair`, which consists of two data elements in the corresponding
order. Applying `head` function to a pair returns the first element, and using `tail` returns the second element. I am
unsure if Source implements it this way, but this version will serve the following tasks.

```js
function pair(x, y) {
  return (selector) => (selector ? x : y);
}

function head(p) {
  return p(true);
}

function tail(p) {
  return p(false);
}
```

`pair` is a building block of streams. A stream of a certain datatype is defined as a pair, where the head is an element
of that type and the tail is a nullary function that, when called, returns the stream of that type. In this blog, I
focus on streams of numbers, specifically integers.

```js
// Example: Finite stream of two elements
const one_two_three = pair(1,
  () => pair(2,
    () => null));

// Example: Infinite stream of 1 (i.e. 1, 1, 1, ...)
const ones = pair(1, () => ones);

// Example: Infinite stream of Tetranacci Numbers (i.e. 0, 0, 0, 1, 1, 2, 4, 8, 15, 29, 56, 108, 208, ...)
function tetranacci_gen(a, b, c, d) {
  return pair(a,
    () => tetranacci_gen(b,
      c,
      d,
      a + b + c + d));
}

const tetranacci = tetranacci_gen(0, 0, 0, 1);
```

## Recreating Predeclared Stream Functions

### Essential Stream Operations

The fundamental functions `is_null` and `stream_tail` are necessary to work with streams. `is_null` checks whether a
stream has ended, while `stream_tail` retrieves the next element of a stream by evaluating the nullary function in the
tail.

```js
function is_null(s) {
  return s === null;
}

function stream_tail(s) {
  return tail(s)();
}
```

### Stream Generation Functions

To create streams, we need functions that can generate both finite and infinite sequences. The following functions
demonstrate different ways to create streams: from a function and length, from a range of numbers, and from an infinite
sequence of integers.

```js
function build_stream(f, n) {
  function build_stream_helper(i) {
    return i === n ? null : pair(f(i), () => build_stream_helper(i + 1));
  }

  return build_stream_helper(0);
}

function enum_stream(start, end) {
  function enum_stream_helper(i) {
    return i > end ? null : pair(i, () => enum_stream_helper(i + 1));
  }

  return enum_stream_helper(start);
}

function integers_from(start) {
  return pair(start, () => integers_from(start + 1));
}
```

### Stream Processing Functions

Stream processing involves transforming, filtering, and analyzing streams. These functions allow us to work with streams
while maintaining their lazy evaluation properties.

```js
function eval_stream(s, n) {
  function eval_stream_helper(stream, i) {
    return i === n
      ? null
      : pair(head(stream), eval_stream_helper(stream_tail(stream), i + 1));
  }

  return eval_stream_helper(s, 0);
}

function stream_map(f, s) {
  return is_null(s)
    ? null
    : pair(f(head(s)), () => stream_map(f, stream_tail(s)));
}

function stream_filter(pred, s) {
  return is_null(s)
    ? null
    : pred(head(s))
      ? pair(head(s), () => stream_filter(pred, stream_tail(s)))
      : stream_filter(pred, stream_tail(s));
}

function stream_length(s) {
  return is_null(s) ? 0 : 1 + stream_length(stream_tail(s));
}
```

### Stream Combination and Search Functions

These functions handle operations like combining streams, finding elements, and removing values from streams.

```js
function stream_append(s1, s2) {
  return is_null(s1)
    ? s2
    : pair(head(s1), () => stream_append(stream_tail(s1), s2));
}

function stream_member(v, s) {
  return is_null(s)
    ? null
    : head(s) === v
      ? s
      : stream_member(v, stream_tail(s));
}

function stream_ref(s, n) {
  return n === 0 ? head(s) : stream_ref(stream_tail(s), n - 1);
}

// Remove the first occurrence of `v` in `s`
function stream_remove(v, s) {
  return is_null(s)
    ? null
    : head(s) === v
      ? stream_tail(s)
      : pair(head(s), () => stream_remove(v, stream_tail(s)));
}

// Remove all occurrences of `v` in `s`
function stream_remove_all(v, s) {
  return is_null(s)
    ? null
    : head(s) === v
      ? stream_remove_all(v, stream_tail(s))
      : pair(head(s), () => stream_remove_all(v, stream_tail(s)));
}
```

**Note**: I omitted some functions that involved `list` or were not commonly featured in past assessments.

## Extra: Stream Memoization

### Useful Cases

In the second half of the semester, this course introduces the concept of memoization using arrays, which is useful for
avoiding redundant computations in recurrence relations like Fibonacci Numbers: $T(n) = T(n-1) + T(n-2)$,
where $T(0) = 0$ and $T(1) = 1$. Notably, they show us that memoization can sometimes be applied to streams as well!
Here is the function they introduced:

```js
function memo_fun(fun) {
  let already_run = false;
  let result = undefined;

  function mfun() {
    if (already_run) {
      return result;
    }
    result = fun();
    already_run = true;
    return result;
  }

  return mfun;
}
```

It may feel odd and unconvincing at first why this works, but let's walk through it step by step. There are cases where
this function won't work, but there are also cases where it can be highly useful.

Essentially, this function is designed to store the result of a function that has already been evaluated, so you don’t
need to run it again. Consider the example below:

```js
function ms(m, s) {
  display(m);
  return s;
}

const ones_memo = pair(
  1,
  memo_fun(() => ms("B", ones_memo)),
);
```

When we call `stream_ref(ones_memo, 3)`, we will see only one `"B"` displayed. This happens because the name `ones_memo`
is bound to the pair that was created. When `stream_tail` is called, the program refers back to the previously created
function object, so no new pairs are generated. The memoization works because `memo_fun(() => ms("B", ones_memo))` is
executed only once. Subsequent calls simply reference the result stored in the inner function.

Interestingly, all pairs in streams are created with names bound to them. They are separate but accessible through calls
to `stream_tail`, which looks up the name in the environment. Once created in the environment of the CSE Machine, they
persist, saving a significant amount of computation.

### Not Always Useful

The following example is adapted from the AY2021/22 Semester 1 Final Assessment. If we analyze the order of growth in
terms of the number of additions performed when running `eval_stream(integers_2, 3)`, it tells a different story.

```js
function add_streams(s1, s2) {
  return pair(head(s1) + head(s2), () =>
    add_streams(stream_tail(s1), stream_tail(s2)),
  );
}

function partial_sums_2(s) {
  return pair(
    head(s),
    memo(() => add_streams(stream_tail(s), partial_sums_2(s))),
  );
}

const ones = pair(1, () => ones);
const integers_2 = partial_sums_2(ones);
```

In this case, the implementation does not benefit from memoization because the stream `ones` is never reused. Instead,
it is recreated repeatedly throughout the program. As a result, the memoized results cannot be accessed or reused like
in the earlier examples thus the order of growth for the number of additions is
still $1+2+3+\cdots+n-1+n=\displaystyle\frac{n(n+1)}{2}$ which is $\Theta (n^2)$.

Wish me luck for the upcoming finals—here’s hoping all this effort pays off!
