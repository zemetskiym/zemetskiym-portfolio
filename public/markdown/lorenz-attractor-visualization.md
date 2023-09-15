## Overview

The Lorenz attractor is a three-dimensional dynamical system that exhibits chaotic behavior. It was first described by Edward Lorenz in 1963 and is often used as a simplified model for atmospheric convection. The system is defined by a set of differential equations that describe the motion of a point in three-dimensional space. The equations are highly nonlinear and can produce complex and unpredictable behavior over time.

This repository contains an interactive, three-dimensional visualization of the Lorenz attractor using p5.js, a JavaScript library for creative coding. The visualization is created using the WEBGL renderer, which allows for the creation of an object that accurately represents the Lorenz attractor. The movement of particles through the attractor is visualized with trails that follow the particles' path through the system. The resulting animation provides a captivating and immersive representation of the Lorenz attractor and its chaotic behavior.

## Technologies Used

- P5.js
- JavaScript
- HTML

## Challenges and Solutions

- **Challenge 1**: One of the challenges I encountered while creating this P5.js visualization of the Lorenz attractor was maintaining a smooth and visually appealing flow of the attractor lines. Initially, the lines were jittery and didn't smoothly follow the attractor's path, making the visualization less aesthetically pleasing.
    - **Solution**: To address this problem, I implemented a technique to ensure that the lines followed a continuous and smooth trajectory. I achieved this by calculating the distance between consecutive points in the trail and only adding a new point to the trail if the distance exceeded a certain threshold (in this case, 0.1 units). This prevented the trail from being cluttered with unnecessary points and ensured that the lines flowed smoothly along the attractor's chaotic path. Additionally, I scaled the vertices by a factor of 8.75 for visual purposes, which helped in making the attractor more visually appealing without altering its underlying dynamics.
- **Challenge 2**: Another significant challenge I faced was managing the data for the attractor's trail, especially as the simulation ran for a longer duration. Storing all the positions of the attractor's trail indefinitely would consume a substantial amount of memory and impact the performance of the visualization.
    - **Solution**: To overcome this challenge, I implemented a mechanism to limit the size of the trail data. I set a maximum limit of 500 positions for each trail, and when the trail exceeded this limit, I removed the oldest positions from the array. This ensured that the memory usage remained within acceptable bounds while still preserving the attractor's overall shape and trajectory. This solution allowed me to create a visualization that was both memory-efficient and capable of running for extended periods without performance issues.

## Code Sample

```javascript
// Function that calculates and adds a new vertex to the trail of the specified shape
function addVertexToTrail (i) {
    // Calculate the change in x, y, and z
    dx = prandtlNumber * ( lines[i].y - lines[i].x )
    dy = lines[i].x * ( rayleighNumber - lines[i].z ) - lines[i].y
    dz = lines[i].x * lines[i].y - aspectRatio * lines[i].z
    
    // Set new x, y, and z positions based on change in position and time
    lines[i].x += dx * dt
    lines[i].y += dy * dt
    lines[i].z += dz * dt
  
    if (trail[i].length > 0) {
        // Calculate the distance between the current point and the previous point in the trail
        let prevPoint = trail[i][trail[i].length - 1]
        let dist = sqrt(pow(lines[i].x - prevPoint[0], 2) + pow(lines[i].y - prevPoint[1], 2) + pow(lines[i].z - prevPoint[2], 2))

        // Add the new vertex to the trail array if the distance is greater than 0.1 units
        if(dist > 1) {
            trail[i].push([lines[i].x, lines[i].y, lines[i].z])
        }
    } else {
        // If no vertices exist, add one
        trail[i].push([lines[i].x, lines[i].y, lines[i].z])
    }
    
    // If the trail has more than 500 positions, remove the oldest position
    if(trail[i].length > 500) {
      trail[i].splice(0, 1)
    }
}
```
