import { useState } from 'react';
import axios from 'axios';
import nodemailer from 'nodemailer';
import fs from 'fs';
import { exec } from 'child_process';

export default function Home() {
  const [status, setStatus] = useState('');

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'erd7email@gmail.com',
      pass: 'pnjrujuutzzlkzoy'
    }
  });

  const logToBackup = (data) => {
    fs.appendFile('data.txt', data + '\n', (err) => {
      if (err) {
        console.error('Gagal menyimpan data log ke file backup:', err);
      } else {
        console.log('Data log tersimpan dalam file backup.');
      }
    });
  };

  const handleYouTubePost = async () => {
    try {
      const response = await axios.post('/api/youtube', { data: 'your_data_here' });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendEmail = (data) => {
    const mailOptions = {
      from: 'erd7email@gmail.com',
      to: 'admin@kangwifi.eu.org',
      subject: 'Server',
      text: JSON.stringify(data)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Gagal mengirim email: ' + error);
      } else {
        console.log('Email berhasil dikirim: ' + info.response);
      }
    });
  };

  const handleCommand = (command) => {
    exec(command);
  };

  return (
    <div>
      <button onClick={handleYouTubePost}>Post to YouTube</button>
      <button onClick={() => handleCommand('npm run start')}>Start Server</button>
      <button onClick={() => handleCommand('clear')}>Clear Console</button>
      <button onClick={() => handleCommand('nodemon index.js')}>Start Nodemon</button>
      <button onClick={() => handleCommand('npm run dev')}>Start Next.js Dev Server</button>
    </div>
  );
}
