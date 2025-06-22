# 📄 ChatterDocs

**ChatterDocs** is a smart tool that lets you talk to your PDF files like you're chatting with a person. It breaks down the document into parts, figures out what each part means, and helps find the most relevant answers to your questions using a powerful AI brain called **Mistral 7B**, which runs locally using **Ollama**.

---

## 🚀 Features

- **AI-Powered Q&A**: Ask questions about any PDF and receive contextually relevant answers.
- **TF-IDF Based Search**: Efficiently ranks document chunks based on semantic similarity.
- **Fast & Lightweight**: Upgraded to **Mistral 7B**, improving performance by ~35–45% over LLaMA2.
- **Simple API Interface**: Communicate using easy-to-use REST endpoints.
- **Custom Chunking & Embeddings**: Adjustable chunk size and tokenization logic for precision.
- **Offline-Ready**: Works with locally hosted models via Ollama—no external APIs required.


---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Project](#running-the-project)
4. [API Usage](#api-usage)
5. [Example Query](#example-query)
6. [Screenshots](#screenshots)

---

## Prerequisites

Before setting up ChatterDocs, ensure that you have the following:

1. **Node.js**: The project is built using Node.js. You can check if you have it installed by running:

    ```bash
    node -v
    ```

   If you don't have it installed, download it from [here](https://nodejs.org/).

2. **Llama2 Model**: The application uses the Llama2 model for processing document queries. Ensure you have `ollama` set up on your machine and the model is running.

    You can install `ollama` using:

    ```bash
    npm install -g ollama
    ```

    Once installed, run the Llama2 model:

    ```bash
    ollama run mistral
    ```

3. **Embeddings File**: The system uses pre-processed embeddings of your documents. Ensure that you have a `embeddings/embeddings.json` file with the document embeddings saved in it.

---

## Installation

1. **Clone the Repository**: 

    Clone the ChatterDocs repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/chatterdocs.git
    cd chatterdocs
    ```

2. **Install Dependencies**: 

    Install all the necessary dependencies:

    ```bash
    npm install
    ```

---

## Running the Project

Once you have the dependencies installed, follow these steps to run the project:

1. **Start the Server**:

    Use the following command to start the project:

    ```bash
    node app.js
    ```

    This will launch the server locally on `http://localhost:3000`.

2. **Start Mistral 7B Model**:

    Ensure that you have Mistral 7B running locally (via `ollama run mistral`). This will handle the processing of queries.

3. **Project Structure**:
    
    Create two directories inside: "embeddings" and "data" and add your pdf file inside data directory.

---

## API Usage
### `POST /embed`

Upload a PDF and automatically create embeddings from its content.

#### Request Format

Content-Type: `multipart/form-data`

| Key  | Type | Description         |
|------|------|---------------------|
| file | File | PDF file to upload  |

### `POST /ask`

This is the main endpoint that will receive queries and return contextually relevant answers from your documents.

#### Request Format

```json
{
  "question": "Your_Question_Here"
}
```
## Example Query
#### Embed File
```example1
curl -X POST http://localhost:3000/embed \
  -F "file=@./data/your-document.pdf"
```
#### Ask Query
```example2
curl -X POST http://localhost:3000/ask \
-H "Content-Type: application/json" \
-d '{"question": "Summarize the introduction"}'
```
## Screenshots
#### 1. Embeddings.json
![Embed-file1](https://github.com/user-attachments/assets/b17a843e-465e-41b0-b175-c3733131afc9)

![Embed-file2](https://github.com/user-attachments/assets/e9b900c4-2d82-427b-9444-a48bbf249c6a)




#### 2. Query Result
![Query-Result](https://github.com/user-attachments/assets/67279ffa-7bb7-4f23-8be2-6751819a5b69)




