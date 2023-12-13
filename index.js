const {config}  = require('dotenv')
config();
const app = require('./app.js');
const connectionDB = require('./config/Database.config')

const PORT = process.env.PORT || 5000;




// app listening at port 
app.listen(PORT, () => {
    connectionDB();
    console.log(`Server is running on port: http://localhost:${PORT}`);
});
