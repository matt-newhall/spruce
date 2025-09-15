import config from "./config/config"
import app from "./src/app"

app.listen(config.port, () =>
  console.log(`Server is running on port ${config.port}`),
);
