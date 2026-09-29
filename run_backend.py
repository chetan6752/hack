import uvicorn

if __name__ == "__main__":
    print("=" * 70)
    print("DevKo Python Backend API Server")
    print("Starting on: http://localhost:8000")
    print("Interactive OpenAPI Documentation: http://localhost:8000/docs")
    print("=" * 70)
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
