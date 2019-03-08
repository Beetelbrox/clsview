import json
import requests
import numpy as np
import numpy.random as rnd

# Generates n 2D points following the distribution dist
def generate_points(n, center=(0.0, 0.0), stdev = 20, dist='gauss'):
    points = list(zip(rnd.normal(center[0], stdev, n), rnd.normal(center[1], stdev, n)))
    return points


import sys

if __name__ == '__main__':
    print(sys.argv[1])
    print(generate_points(int(sys.argv[1])))
