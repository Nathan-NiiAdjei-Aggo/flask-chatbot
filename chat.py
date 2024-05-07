import spacy
import torch
from model import NeuralNet
from nltk_utils import tokenize, bag_of_words
import json
import random


# Load intents file
with open('intents.json', 'r') as file:
    intents = json.load(file)

# Load trained model data
model_data = torch.load('data.pth', map_location=torch.device('cpu'))
input_size = model_data["input_size"]
hidden_size = model_data["hidden_size"]
output_size = model_data["output_size"]
all_words = model_data['all_words']
tags = model_data['tags']
model_state = model_data["model_state"]

# Load the model
model = NeuralNet(input_size, hidden_size, output_size)
model.load_state_dict(model_state)
model.eval()





def respond_to(input_text):
    # Tokenize and preprocess the input text
    sentence = tokenize(input_text)
    X = bag_of_words(sentence, all_words)
    X = torch.from_numpy(X).reshape(1, X.shape[0])

    with torch.no_grad():
        output = model(X)
        _, predicted = torch.max(output, dim=1)
        tag = tags[predicted.item()]
        probs = torch.softmax(output, dim=1)
        prob = probs[0][predicted.item()]

    # Check if the prediction is strong enough
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent['tag']:
                return random.choice(intent['responses'])
    else:
        return "I do not understand..."
