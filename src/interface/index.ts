import express from "express";
import { configureDependencies } from "../infrastructure/utils/config";
import { connectDB } from "../infrastructure/database/mongo-db/connection"; 


const app = express();
connectDB();
app.use(express.json());

//dependencias e rotas aqui
const { movieController  } = configureDependencies();
 app.post("/movies", (req, res) => movieController.create(req, res));
 app.get('/movies', (req, res) => movieController.listAll(req, res));
 app.get('/movies/:id', (req, res) => movieController.getMovieById(req, res));  
 app.put('/movies/:id', (req, res) => movieController.updateMovie(req, res));
 app.delete('/movies/:id', (req, res) => movieController.deleteMovieById(req, res));
 //app.post("/user", (req, res) => userController.create(req, res));
 //app.get("/user/:email", (req, res) => userController.getUserByEmail(req, res));

if (require.main === module) {
  const PORT = 3333;
  app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    }
    export default app
  