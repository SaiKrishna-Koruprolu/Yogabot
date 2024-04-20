from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model = AutoModelForCausalLM.from_pretrained("openai-community/gpt2")
tokenizer = AutoTokenizer.from_pretrained("openai-community/gpt2")

def is_yoga_related(prompt):
    yoga_keywords = ["yoga", "asana", "sun salutation", "yoga poses", "yoga for beginners", "meditation", "meditation techniques",  "pranayama"]
    return any(keyword in prompt.lower() for keyword in yoga_keywords)

def generate_response(prompt, max_length=500):
    if not is_yoga_related(prompt):
        return "I'm here to help you with your yoga and personal wellness journey. Please ask me something related to that!"

    input_ids = tokenizer.encode(prompt, return_tensors='pt')
    model_device = next(model.parameters()).device
    input_ids = input_ids.to(model_device)

    output = model.generate(input_ids, max_length=max_length, do_sample=True, top_k=50, top_p=0.95, num_return_sequences=1)
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

    # Limit the response text to 500 characters
    generated_text = generated_text[:500] if len(generated_text) > 500 else generated_text

    # Remove the question text if it appears in the response
    if prompt in generated_text:
        generated_text = generated_text.replace(prompt, "").strip()

    return generated_text

if __name__ == '__main__':
    prompt = "What are the benefits of practicing yoga?"
    response = generate_response(prompt, max_length=500)
    print(f"Prompt: {prompt}")
    print(f"Response: {response}")
