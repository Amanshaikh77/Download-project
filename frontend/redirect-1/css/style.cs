* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  color: #222;
}

.page {
  min-height: 100vh;
  padding: 30px 16px;
}

.card {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 25px;
}

.step {
  font-size: 13px;
  font-weight: bold;
  color: #666;
  letter-spacing: 1px;
}

h1 {
  margin-top: 8px;
}

#project-info {
  margin-top: 25px;
  line-height: 1.6;
}

.info-item {
  margin-bottom: 14px;
}

.info-label {
  font-weight: bold;
}

.ad-slot {
  min-height: 180px;
  margin: 30px 0;
  border: 1px dashed #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 12px;
}

.continue-box {
  text-align: center;
  padding-top: 15px;
}

#timer-text {
  margin-bottom: 15px;
}

button {
  width: 100%;
  max-width: 300px;
  padding: 14px 20px;
  border: 0;
  border-radius: 8px;
  background: #2563eb;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}

.error {
  color: #b91c1c;
  font-weight: bold;
}
