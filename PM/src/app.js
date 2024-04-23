const express = require('express');
const bodyParser = require('body-parser');
const subjectRoutes = require('./routes/subjectRoutes');
const subjectTermRoutes = require('./routes/subjectTermRoutes');
const studentRoutes = require('./routes/studentRoutes');
const frontendProxy = require('./routes/frontendProxy');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3011;


if(!process.env.JWT_SECRET)
{
  process.env.JWT_SECRET = "dave"
}


app.use(bodyParser.json());
app.use(express.json());

// Register routes
app.use('/api/subject', subjectRoutes);

app.use('/api/subjectTerm', subjectTermRoutes);

app.use('/api/student', studentRoutes);
app.use('/api', authRoutes);
app.use('/', frontendProxy);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
