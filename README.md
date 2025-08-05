# Video Management System (VMS) with AI Integration

A lightweight Video Management System capable of handling multiple video/image inputs and integrating with AI models for real-time or batch inference.

## Features

- Multiple AI model integration
- Real-time video processing
- Dashboard for stream monitoring
- Alert system for anomalies
- Support for:
  - Video files
  - Camera feeds

## Tech Stack

- **Backend**: FastAPI
- **Frontend**: React + Material-UI
- **AI Processing**: OpenCV
- **Real-time Updates**: WebSocket

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm/yarn
- OpenCV

### Installation

1. Clone the repository
```bash
git@github.com:HimeshSrivastava/vms-assignment.git
cd vms-assignment
```

2. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

3. Frontend Setup
```bash
cd frontend
npm install
```

### Running the Application

1. Start the Backend Server
```bash
cd backend
uvicorn main:app --reload
```

2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## API Endpoints

### Stream Management
- `POST /start_stream` - Start a new video stream
- `GET /streams` - List all active streams
- `POST /stop_stream/{stream_id}` - Stop a specific stream
- `GET /results/{stream_id}` - Get stream analysis results

## AI Models

Currently supported analysis:
- Brightness detection
- Red color detection
- Asset detection
- Defect analysis

## Project Structure

```
vms-assignment/
├── backend/
│   ├── models/
│   │   ├── dummy_model.py
│   
│   ├── test_files/
│   ├── results/
│   └── main.py
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Constant.jsx
    │   │     ├── Api.jsx
    │   │   ├── StreamList.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── StreamCard.jsx
    │   └── App.jsx
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
