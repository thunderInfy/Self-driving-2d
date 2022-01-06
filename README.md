# Self-driving-2d
Evolutionary algorithm to train cars in 2d racetrack environment

Rays are sent from the car which strike the boundaries of the racetrack to provide the distances of the closest boundaries for different ray angles. 
Such a list of distances is fed to a neural network, from which an action is obtained. The action is used to control the car. 
Optimization is done through an evolutionary algorithm, with fitness determined from a number of intermediate checkpoints in the racetrack.

Change num in metadata.js (0<=num<=4) to change racetracks. Hosted at https://thunderinfy.github.io/Self-driving-2d/ for num = 1.
