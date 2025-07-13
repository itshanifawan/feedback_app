import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('/api/feedbacks')
      .then(res => setFeedbacks(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/feedbacks', formData)
      .then(res => {
        setFeedbacks([res.data, ...feedbacks]);
        setFormData({ name: '', message: '' });
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Feedback App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Your message"
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        {feedbacks.map((fb) => (
          <div key={fb._id} className="feedback-box">
            <p><strong>{fb.name}</strong></p>
            <p>{fb.message}</p>
            <small>{new Date(fb.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
