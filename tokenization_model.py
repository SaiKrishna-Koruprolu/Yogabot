import json
from transformers import AutoTokenizer, AutoModelForCausalLM

# Load the JSON data
with open('yogadataset.json', 'r', encoding='utf-8') as file:
    json_data = json.load(file)

# Initialize tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("openai-community/gpt2")
model = AutoModelForCausalLM.from_pretrained("openai-community/gpt2")

# Tokenize the JSON data
tokenized_data = []
for item in json_data:
    category = item["category"]
    text = item["text"]
    tokenized_text = tokenizer.tokenize(text)
    tokenized_data.append({"category": category, "tokenized_text": tokenized_text})

# Print tokenized data
for item in tokenized_data:
    print(item)
