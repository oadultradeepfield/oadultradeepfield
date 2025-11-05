---
slug: two-body-rk4-js
title: "Solving 2-Body Problem with RK4 in JavaScript"
tags: [ "Astronomy" ]
description: "A simple implementation of the fourth-order Runge-Kutta method (RK4) to solve the two-body problem in JavaScript."
pubDate: 2024-12-12
---

I recently made a [C++ program to simulate 3-body problems](https://github.com/oadultradeepfield/three-body-simulation),
which were able to recreate the famous figure-eight orbit. It used numerical approximation to solve Ordinary
Differential Equations (ODEs) with the fourth-order Runge-Kutta method, also known as RK4. The program can handle N-body
simulations too if you let it run long enough. <!-- truncate --> In this blog, I’ll simplify that project and redo it in
JavaScript with just two bodies and two dimensions. My goal is to have a quick reference for RK4 whenever I need it in
future projects. Enjoy!

## Some Backgrounds

### Newtonian Gravity

The classical mechanics problem we’re working on is pretty interesting because it requires solving ODEs not just once,
but twice! We start with Newton's law of gravitation:

$$\mathbf{F} = -\frac{Gm_1m_2}{\Vert\mathbf{r}\Vert^2}\mathbf{\hat{r}}.$$

Here, force ($\mathbf{F}$) equals mass ($m$) times acceleration ($\mathbf{a}$), acceleration is the derivative of
velocity ($\mathbf{v}$) with respect to time ($t$), and velocity is the derivative of position ($\mathbf{r}$) with
respect to time.

We already know the initial positions and velocities for each object, since it is the configuration we are interested.
Using force and mass, we can calculate the initial acceleration, but to update the position, we first need to compute
the velocity from the acceleration.

### RK4 In a Nutshell

Numerical methods are all about approximation, and their main focus is optimizing accuracy. RK4 is just another
approximation method. I won’t dive into the math here, but the “4” in RK4 refers to the order of approximation. The
higher the order, the more accurate it gets because it includes more terms and calculations, but that also makes it
slower.

For an equation like $y' = F(x, y)$ with $y = f(x)$, we can estimate the next value of $y$ using the equation:

$$y_{n+1} = y_n + \frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4).$$

Here, $k_i$ represents the $i$-th order approximation in RK4:

- $k_1 = hF(x_n, y_n)$
- $k_2 = hF(x_n + h/2, y_n + k_1/2)$
- $k_3 = hF(x_n + h/2, y_n + k_2/2)$
- $k_4 = hF(x_n + h, y_n + k_3)$

In these equations, $h$ is just a small change in value, like $dt$ in our case, since we’re integrating changes with
respect to time.

### Breaking Forces to Two Components

Before jumping into the code, it’s worth noting that calculating the changes in $X$ and $Y$ coordinates is much easier
if we break the force into two components and solve for the position changes in each direction separately. This also
makes it easier to plot the results later. The implementation is simple, you just need to use vector projections. I’ve
already done that, and it looks like this:

$$\mathbf{F}_x = \Vert\mathbf{F}\Vert \frac{\Delta x}{\Vert\mathbf{r}\Vert} \mathbf{\hat{x}}, \quad \mathbf{F}_y = \Vert\mathbf{F}\Vert \frac{\Delta y}{\Vert\mathbf{r}\Vert }\mathbf{\hat{y}}.$$

Here, $\Delta x$ and $\Delta y$ are the differences in position between the two objects along the respective axes. These
automatically account for the positive or negative signs, which determine the direction of the force. Note
that $\mathbf{a}_x$ and $\mathbf{a}_y$ is just $\mathbf{F}_x/m$ and $\mathbf{F}_y/m$, respectively.

## Let's Start Coding

To keep things simple, I’ll declare the constants and masses here first before creating the functions. These will act as
the starting values for what we’re working on.

```js
// Constants
const G = 6.674e-11; // Gravitational constant in Nm^2/kg^2
const m1 = 1.989e30; // Mass of the Sun in kg
const m2 = 5.972e24; // Mass of the Earth in kg

// Initial positions (in meters)
let x1 = 0.0; // Sun's x-position
let y1 = 0.0; // Sun's y-position
let x2 = 1.496e11; // Earth's x-position (1 AU)
let y2 = 0.0; // Earth's y-position

// Initial velocities (in m/s)
let v1x = 0.0; // Sun's x-velocity
let v1y = 0.0; // Sun's y-velocity
let v2x = 0.0; // Earth's x-velocity
let v2y = 2.978e4; // Earth's y-velocity (approx. orbital velocity)
```

First, we’ll create a function to update the state variables. The state $S$ changes over time $t$. In this case, the
states include $v_{1x}$, $v_{1y}$, $v_{2x}$, $v_{2y}$, $x_1$, $y_1$, $x_2$, and $y_2$. From here on, I’ll use scalar
representation for these values, since in 1D, positive and negative signs are enough to represent them. The
subscripts $1$ and $2$ are because we’re dealing with two objects. More generally, we can use $i$ if we’re working on an
N-body simulation.

```js
function dSdt(v1x, v1y, v2x, v2y, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const r = Math.sqrt(dx * dx + dy * dy);

  // Gravitational accelerations
  const a1 = (G * m2) / (r * r);
  const a2 = (G * m1) / (r * r);

  const dv1x = (a1 * dx) / r;
  const dv1y = (a1 * dy) / r;
  const dv2x = -(a2 * dx) / r;
  const dv2y = -(a2 * dy) / r;

  return {
    v1x,
    v1y,
    dv1x,
    dv1y,
    v2x,
    v2y,
    dv2x,
    dv2y,
  };
}
```

It might be a good idea to store each parameter as a row in matrices so it scales better for N-body problems. But for
smaller problems like the one we’re working on, this approach feels more intuitive and straightforward. Now, let’s code
the RK4 function. This function updates the next state at time $t+dt$, given the states at time $t$. It’s interesting to
see how we use an approximated value to make further approximations into the future. This means the results become less
accurate over time. When I worked on a 3-body simulation, I noticed some orbital perturbations after a few revolutions!
This can be fixed by improving approximation accuracy, like using higher-order methods such as RK5, RK6, or even
exploring other numerical techniques.

```js
function rk4_update(current_state, dt) {
  const {v1x, v1y, v2x, v2y, x1, y1, x2, y2} = current_state;

  const k1 = dSdt(v1x, v1y, v2x, v2y, x1, y1, x2, y2);
  const k2 = dSdt(
    v1x + (k1.dv1x * dt) / 2,
    v1y + (k1.dv1y * dt) / 2,
    v2x + (k1.dv2x * dt) / 2,
    v2y + (k1.dv2y * dt) / 2,
    x1 + (k1.v1x * dt) / 2,
    y1 + (k1.v1y * dt) / 2,
    x2 + (k1.v2x * dt) / 2,
    y2 + (k1.v2y * dt) / 2,
  );
  const k3 = dSdt(
    v1x + (k2.dv1x * dt) / 2,
    v1y + (k2.dv1y * dt) / 2,
    v2x + (k2.dv2x * dt) / 2,
    v2y + (k2.dv2y * dt) / 2,
    x1 + (k2.v1x * dt) / 2,
    y1 + (k2.v1y * dt) / 2,
    x2 + (k2.v2x * dt) / 2,
    y2 + (k2.v2y * dt) / 2,
  );
  const k4 = dSdt(
    v1x + k3.dv1x * dt,
    v1y + k3.dv1y * dt,
    v2x + k3.dv2x * dt,
    v2y + k3.dv2y * dt,
    x1 + k3.v1x * dt,
    y1 + k3.v1y * dt,
    x2 + k3.v2x * dt,
    y2 + k3.v2y * dt,
  );

  const next_state = {
    v1x: v1x + (dt / 6) * (k1.dv1x + 2 * k2.dv1x + 2 * k3.dv1x + k4.dv1x),
    v1y: v1y + (dt / 6) * (k1.dv1y + 2 * k2.dv1y + 2 * k3.dv1y + k4.dv1y),
    v2x: v2x + (dt / 6) * (k1.dv2x + 2 * k2.dv2x + 2 * k3.dv2x + k4.dv2x),
    v2y: v2y + (dt / 6) * (k1.dv2y + 2 * k2.dv2y + 2 * k3.dv2y + k4.dv2y),
    x1: x1 + (dt / 6) * (k1.v1x + 2 * k2.v1x + 2 * k3.v1x + k4.v1x),
    y1: y1 + (dt / 6) * (k1.v1y + 2 * k2.v1y + 2 * k3.v1y + k4.v1y),
    x2: x2 + (dt / 6) * (k1.v2x + 2 * k2.v2x + 2 * k3.v2x + k4.v2x),
    y2: y2 + (dt / 6) * (k1.v2y + 2 * k2.v2y + 2 * k3.v2y + k4.v2y),
  };

  return next_state;
}
```

Now, let’s see how this works in practice. I’ll run the code with a `dt` of 1 hour (3600 seconds) and simulate it over a
year (about $3.16 \times 10^7$ seconds). Here’s how we can set it up.

```js
const dt = 3600;
const duration = 3.16e7;
const initial_state = {
  v1x: v1x,
  v1y: v1y,
  v2x: v2x,
  v2y: v2y,
  x1: x1,
  y1: y1,
  x2: x2,
  y2: y2,
};
let current_state = initial_state;

for (let step = 0; step < duration / dt; step++) {
  current_state = rk4_update(current_state, dt);
  console.log(
    `Step ${step + 1}:`,
    `Sun - x: ${current_state.x1}, y: ${current_state.y1}`,
    `Earth - x: ${current_state.x2}, y: ${current_state.y2} \n`,
  );
}
```

## Results

I ran the entire code using the JavaScript code editor available on Source Academy (you can check
out [this blog](/blog/stream-processing) to learn more about it). If you want to try running this code yourself, you can
check out [this link](https://share.sourceacademy.org/twobodysimulation). Just make sure to change the language from
Source §4 to full JavaScript before running it. Here’s the output.

```bash
Step 1: Sun - x: 0.11540318675068137, y: 0.0000275671688399945 Earth - x: 149599961564.4778, y: 107207990.81863718

Step 2: Sun - x: 0.4616126878021444, y: 0.00022053732956057895 Earth - x: 149599846257.931, y: 214415926.5491044

Step 3: Sun - x: 1.0386283255526783, y: 0.0007443133894756724 Earth - x: 149599654080.4187, y: 321623752.1032599
...
```

If the implementation is correct, you should see an almost circular motion of Earth around the Sun, with the Sun staying
nearly stationary. This happens because the mass difference makes the Sun less affected by their mutual forces. The
initial velocity is also important: if Earth starts off stationary, you'll see Earth free-falling towards the Sun!

In my 3-body project, I simulated the Sun-Earth-Jupiter system, including the famous figure-eight orbit. You can
actually simulate this yourself and experiment with different initial conditions to create some interesting plots. A
neat trick is to set the gravitational constant to 1. Newtonian gravity will produce the same types of motion as long as
the force follows $F \propto r^{-2}$, but you’ll notice different scaling. Below are the examples I mentioned. Thanks
for reading!

|                                                                    **Sun-Earth-Jupiter**                                                                    |                                                                    **Figure-Eight Orbit**                                                                    |
|:-----------------------------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| ![Example 3D Trajectory](https://github.com/oadultradeepfield/three-body-simulation/blob/main/results/example_01_sun_earth_jupiter_trajectory.png?raw=true) | ![Example 2D Projection](https://github.com/oadultradeepfield/three-body-simulation/blob/main/results/example_02_eight_shaped_orbit_trajectory.png?raw=true) |
