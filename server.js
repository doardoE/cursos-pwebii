import express from "express";
import {cursos} from "./src/dados/cursos.js";
import { CursoRequestDTO} from "./src/dto/requests/CursoRequestDTO.js"

const app = express();

app.use(express.json());

app.get("/", (req, resp)=>{
    resp.send("Ola Mundo!");
});

app.get("/cursos", (req, resp)=>{
    resp.json(cursos); 
});

app.get("/cursos/:id", (req, res)=>{
    const id = Number(req.params.id);
    const curso = cursos.find(c => c.id === id);
    if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
    }
    res.json(curso);
});

app.post("/cursos", (req, res) => {
    try {
        const novoCurso = new CursoRequestDTO(req.body);  
        
        novoCurso.id = cursos.length > 0 ? cursos[cursos.length - 1].id + 1 : 1;
        cursos.push(novoCurso);
        
        res.status(201).json(novoCurso);
        
    } catch (error) {
        if (error.listaErros) {
            return res.status(400).json({ erros: error.listaErros });
        }
        
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});

app.put("/cursos/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = cursos.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Curso não encontrado para atualização" });
    }

    try {
        const dadosAtualizados = new CursoRequestDTO(req.body);

        dadosAtualizados.id = id;
        cursos[index] = dadosAtualizados;
        res.json(dadosAtualizados);
        
    } catch (error) {
        if (error.listaErros) {
            return res.status(400).json({ erros: error.listaErros });
        }
        
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
