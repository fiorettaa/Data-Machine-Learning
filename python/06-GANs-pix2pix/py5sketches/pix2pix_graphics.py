import torch
import numpy as np
from py5canvas import canvas
import cv2
from skimage import feature, io
import os


device = 'cuda' if torch.cuda.is_available() else 'cpu' # Can try 'mps' if using mac

def load_model(model_path):
    return torch.jit.load(os.path.expanduser(model_path), map_location=device)

# Assume models are in parent directory
model_path = '../models/edge2rembrandt_195_generator.pt'

generator = load_model(model_path)
# Do not 'eval', which will usually "freeze" batch normalization and dropout layers  that would block meaning that we still use the dropout layers
# https://arxiv.org/pdf/1607.08022.pdf
#generator.eval()

# Empty result initially
result = np.ones((256, 256, 3))

def generate_image(model, img):
    img = torch.tensor((img/255)*2.0 - 1.0, 
                       dtype=torch.float32).to(device) # Scale to -1, 1
    # Convert to torch batch form (NCHW)
    img = img[:, :, :, np.newaxis]
    img = img.permute(3, 2, 0, 1)
    res = model(img)[0].permute(1, 2, 0)
    return (res*0.5 + 0.5).detach().cpu().numpy()

def setup():
    create_canvas(512, 256)
    frame_rate(20) # Our framerate will be pretty low anyhow


def draw():
    # We draw on black background and white strokes
    background(0)
    stroke(255)
    no_fill()
    stroke_weight(2.0)
    # Geneate a simple animation
    np.random.seed(10)
    push()
    translate(height/2, height/2) # Translate to center of left part of canvas
    rotate(frame_count*0.1)    # and rotate continuosly
    # draw some random circles
    for i in range(10):
        circle(np.random.uniform(-height/2, height/2, 2), np.random.uniform(15, 30))
    pop()

    # Get half of canvas
    img = get_image()[:,:256,:]
    # Generate and draw result
    result = generate_image(generator, img)
    image(result, [256,0], [256, 256])
